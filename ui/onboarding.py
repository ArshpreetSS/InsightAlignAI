from PySide6.QtWidgets import (QDialog, QVBoxLayout, QLabel, QLineEdit, 
                               QPushButton, QFormLayout, QWidget)
from PySide6.QtCore import Qt

class OnboardingDialog(QDialog):
    def __init__(self, db_manager, parent=None):
        super().__init__(parent)
        self.db_manager = db_manager
        self.setWindowTitle("Initialize InsightAlign AI")
        self.setMinimumSize(500, 400)
        self.setStyleSheet("""
            QDialog { background-color: #050510; color: #00f3ff; }
            QLabel { color: #00f3ff; font-family: 'Segoe UI'; }
            QLineEdit { 
                background-color: #0a0a1a; 
                border: 1px solid #00f3ff; 
                color: white; 
                padding: 8px; 
                border-radius: 5px;
            }
            QPushButton {
                background-color: #00f3ff;
                color: #050510;
                border-radius: 5px;
                padding: 10px;
                font-weight: bold;
            }
            QPushButton:hover { background-color: white; }
        """)
        
        layout = QVBoxLayout()
        
        title = QLabel("WELCOME TO INSIGHT ALIGN")
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet("font-size: 24px; font-weight: bold; letter-spacing: 4px; margin-bottom: 20px;")
        layout.addWidget(title)
        
        form_layout = QFormLayout()
        
        self.goal_input = QLineEdit()
        self.interest_input = QLineEdit()
        self.build_input = QLineEdit()
        self.reduce_input = QLineEdit()
        
        form_layout.addRow("Primary Career Goal:", self.goal_input)
        form_layout.addRow("Key Interests (comma sep):", self.interest_input)
        form_layout.addRow("Habits to Build:", self.build_input)
        form_layout.addRow("Habits to Reduce:", self.reduce_input)
        
        layout.addLayout(form_layout)
        
        save_btn = QPushButton("INITIALIZE SYSTEM")
        save_btn.clicked.connect(self.save_data)
        layout.addWidget(save_btn)
        
        self.setLayout(layout)

    def save_data(self):
        self.db_manager.save_user_profile(
            self.goal_input.text(),
            self.interest_input.text(),
            self.build_input.text(),
            self.reduce_input.text()
        )
        self.accept()
