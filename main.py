import sys
import os
from PySide6.QtWidgets import QApplication, QDialog

from database.db_manager import DBManager
from tracker.activity_tracker import ActivityTracker
from ui.dashboard import Dashboard
from ui.onboarding import OnboardingDialog
from notifications.reminder_system import ReminderSystem

def main():
    app = QApplication(sys.argv)
    
    # Initialize Database
    db = DBManager()
    
    # Check if first run (simple check if profile exists)
    profile = db.get_user_profile()
    if not profile:
        onboarding = OnboardingDialog(db)
        if onboarding.exec() != QDialog.Accepted:
            sys.exit(0)
    
    # Start Tracker
    tracker = ActivityTracker(db)
    tracker.start()
    
    # Start Reminders
    reminders = ReminderSystem(db)
    reminders.start()
    
    # Launch Dashboard
    dashboard = Dashboard(db)
    dashboard.show()
    
    exit_code = app.exec()
    
    # Cleanup
    tracker.stop()
    reminders.stop()
    db.close()
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
