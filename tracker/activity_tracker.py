import time
import threading
import psutil
import platform
from datetime import datetime

# Import Windows specific libraries only if on Windows
if platform.system() == 'Windows':
    try:
        import win32gui
        import win32process
    except ImportError:
        pass

class ActivityTracker(threading.Thread):
    def __init__(self, db_manager):
        super().__init__()
        self.db_manager = db_manager
        self.running = True
        self.paused = False
        self.current_window = None
        self.start_time = None
        self.daemon = True # Daemon thread to exit when main app exits

    def get_active_window_info(self):
        if platform.system() != 'Windows':
            return "Non-Windows OS", "Unknown"

        try:
            window = win32gui.GetForegroundWindow()
            pid = win32process.GetWindowThreadProcessId(window)
            if pid[-1] > 0:
                try:
                    process = psutil.Process(pid[-1])
                    app_name = process.name()
                    window_title = win32gui.GetWindowText(window)
                    return app_name, window_title
                except psutil.NoSuchProcess:
                    pass
        except Exception as e:
            print(f"Tracking error: {e}")
        return None, None

    def categorize_app(self, app_name, window_title):
        app_name = app_name.lower()
        title = window_title.lower() if window_title else ""
        
        # Simple categorization logic
        if any(x in app_name for x in ['code', 'pycharm', 'visual studio', 'sublime', 'atom', 'unity', 'unreal']):
            return "Development"
        elif any(x in app_name for x in ['chrome', 'firefox', 'edge', 'brave']):
            if any(x in title for x in ['youtube', 'netflix', 'twitch']):
                return "Entertainment"
            elif any(x in title for x in ['stackoverflow', 'github', 'docs']):
                return "Learning"
            return "Browsing"
        elif any(x in app_name for x in ['discord', 'slack', 'teams', 'zoom']):
            return "Communication"
        elif any(x in app_name for x in ['steam', 'game', 'league', 'valorant', 'minecraft']):
            return "Gaming"
        elif any(x in app_name for x in ['photoshop', 'blender', 'figma', 'illustrator']):
            return "Creative"
        else:
            return "Other"

    def run(self):
        while self.running:
            if not self.paused:
                app_name, window_title = self.get_active_window_info()
                
                if app_name:
                    now = datetime.now()
                    
                    if self.current_window != app_name:
                        # Window changed, log previous
                        if self.current_window and self.start_time:
                            duration = (now - self.start_time).total_seconds()
                            if duration > 1: # Only log if > 1 second
                                category = self.categorize_app(self.current_window, self.last_title)
                                self.db_manager.log_activity(
                                    self.current_window, 
                                    self.last_title, 
                                    self.start_time, 
                                    duration, 
                                    category
                                )
                        
                        # Reset for new window
                        self.current_window = app_name
                        self.last_title = window_title
                        self.start_time = now
                    else:
                        # Same window, just update title if changed
                        self.last_title = window_title

            time.sleep(1) # Check every second

    def stop(self):
        self.running = False
        # Log final session
        if self.current_window and self.start_time:
            duration = (datetime.now() - self.start_time).total_seconds()
            category = self.categorize_app(self.current_window, self.last_title)
            self.db_manager.log_activity(
                self.current_window, 
                self.last_title, 
                self.start_time, 
                duration, 
                category
            )

    def pause(self):
        self.paused = True

    def resume(self):
        self.paused = False
        self.start_time = datetime.now()
        self.current_window = None
