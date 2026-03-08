from PySide6.QtGui import QColor

class ThemeManager:
    THEMES = {
        "cyberpunk": {
            "bg_main": "#050510",
            "bg_panel": "#0a0a1a",
            "text_primary": "#00f3ff",
            "text_secondary": "#b0b0ff",
            "accent": "#ff00ff",
            "border": "#00f3ff",
            "glow": "#00f3ff",
            "font": "Segoe UI"
        },
        "gaming": {
            "bg_main": "#120024",
            "bg_panel": "#1e0038",
            "text_primary": "#d400ff",
            "text_secondary": "#e0aaff",
            "accent": "#00ff9d",
            "border": "#d400ff",
            "glow": "#d400ff",
            "font": "Roboto"
        },
        "minimalist": {
            "bg_main": "#f0f2f5",
            "bg_panel": "#ffffff",
            "text_primary": "#2c3e50",
            "text_secondary": "#7f8c8d",
            "accent": "#3498db",
            "border": "#bdc3c7",
            "glow": "#3498db",
            "font": "Helvetica Neue"
        },
        "nature": {
            "bg_main": "#1a2f1a",
            "bg_panel": "#254025",
            "text_primary": "#aaffaa",
            "text_secondary": "#ccffcc",
            "accent": "#ffcc00",
            "border": "#55aa55",
            "glow": "#55aa55",
            "font": "Verdana"
        }
    }

    def __init__(self):
        self.current_theme = "cyberpunk"

    def get_theme(self):
        return self.THEMES[self.current_theme]

    def set_theme(self, theme_name):
        if theme_name in self.THEMES:
            self.current_theme = theme_name
            return True
        return False

    def analyze_text_for_theme(self, text):
        text = text.lower()
        if any(w in text for w in ['cyber', 'neon', 'future', 'dark', 'hacker']):
            return "cyberpunk"
        elif any(w in text for w in ['game', 'purple', 'stream', 'play']):
            return "gaming"
        elif any(w in text for w in ['clean', 'white', 'light', 'simple', 'minimal']):
            return "minimalist"
        elif any(w in text for w in ['green', 'nature', 'calm', 'forest']):
            return "nature"
        return None

    def get_stylesheet(self):
        t = self.get_theme()
        return f"""
            QMainWindow {{
                background-color: {t['bg_main']};
            }}
            QWidget {{
                color: {t['text_secondary']};
                font-family: {t['font']};
                font-size: 14px;
            }}
            QFrame#Panel {{
                background-color: {t['bg_panel']};
                border: 1px solid {t['border']};
                border-radius: 15px;
            }}
            QLabel#Header {{
                color: {t['text_primary']};
                font-size: 18px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 2px;
            }}
            QLabel#BigScore {{
                color: {t['accent']};
                font-size: 48px;
                font-weight: bold;
            }}
            QPushButton {{
                background-color: rgba(0,0,0,0);
                border: 1px solid {t['accent']};
                color: {t['accent']};
                padding: 8px 16px;
                border-radius: 5px;
            }}
            QPushButton:hover {{
                background-color: {t['accent']};
                color: {t['bg_main']};
            }}
            QLineEdit {{
                background-color: {t['bg_panel']};
                border: 1px solid {t['border']};
                color: {t['text_primary']};
                padding: 5px;
                border-radius: 5px;
            }}
        """
