from plyer import notification
import threading
import time

class ReminderSystem(threading.Thread):
    def __init__(self, db_manager):
        super().__init__()
        self.db_manager = db_manager
        self.running = True
        self.daemon = True

    def run(self):
        while self.running:
            # Check every 30 minutes in real app, 1 minute for demo
            time.sleep(60) 
            self.check_habits()

    def check_habits(self):
        profile = self.db_manager.get_user_profile()
        if not profile:
            return

        summary = self.db_manager.get_daily_summary()
        
        # Simple logic: If gaming > 2 hours, warn
        gaming = next((x for x in summary if x['category'] == 'Gaming'), None)
        if gaming and gaming['total_duration'] > 7200: # 2 hours
            self.send_notification(
                "Goal Drift Detected", 
                "You have spent over 2 hours gaming today. Time to refocus?"
            )

    def send_notification(self, title, message):
        try:
            notification.notify(
                title=title,
                message=message,
                app_name='InsightAlign AI',
                timeout=10
            )
        except Exception as e:
            print(f"Notification failed: {e}")

    def stop(self):
        self.running = False
