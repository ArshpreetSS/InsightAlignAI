from PySide6.QtWidgets import (QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
                               QLabel, QFrame, QGridLayout, QLineEdit, QPushButton,
                               QGraphicsDropShadowEffect)
from PySide6.QtCore import Qt, QTimer, QSize
from PySide6.QtGui import QColor

from .theme_manager import ThemeManager
from charts.chart_generator import ChartGenerator
from analyzer.goal_alignment import GoalAlignment
from analyzer.insight_engine import InsightEngine
from analyzer.personality_analyzer import PersonalityAnalyzer

class Dashboard(QMainWindow):
    def __init__(self, db_manager):
        super().__init__()
        self.db_manager = db_manager
        self.theme_manager = ThemeManager()
        self.chart_gen = ChartGenerator(self.theme_manager)
        
        self.goal_analyzer = GoalAlignment(db_manager)
        self.insight_engine = InsightEngine(db_manager)
        self.personality_analyzer = PersonalityAnalyzer(db_manager)
        
        self.setWindowTitle("InsightAlign AI // Dashboard")
        self.resize(1200, 800)
        
        self.setup_ui()
        self.apply_theme()
        
        # Timer to refresh data
        self.timer = QTimer()
        self.timer.timeout.connect(self.refresh_data)
        self.timer.start(5000) # Refresh every 5 seconds

    def setup_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        self.main_layout = QVBoxLayout(central_widget)
        self.main_layout.setContentsMargins(20, 20, 20, 20)
        self.main_layout.setSpacing(20)
        
        # Header
        header_layout = QHBoxLayout()
        self.title_label = QLabel("INSIGHT ALIGN // SYSTEM ACTIVE")
        self.title_label.setObjectName("Header")
        header_layout.addWidget(self.title_label)
        
        header_layout.addStretch()
        
        self.theme_input = QLineEdit()
        self.theme_input.setPlaceholderText("Tell AI to change theme...")
        self.theme_input.setFixedWidth(250)
        self.theme_input.returnPressed.connect(self.process_ai_command)
        header_layout.addWidget(self.theme_input)
        
        self.main_layout.addLayout(header_layout)
        
        # Grid Content
        grid = QGridLayout()
        grid.setSpacing(20)
        
        # 1. Goal Alignment Panel (Top Left)
        self.goal_panel = self.create_panel("GOAL ALIGNMENT")
        self.goal_score_label = QLabel("0%")
        self.goal_score_label.setObjectName("BigScore")
        self.goal_score_label.setAlignment(Qt.AlignCenter)
        self.goal_panel.layout().addWidget(self.goal_score_label)
        grid.addWidget(self.goal_panel, 0, 0)
        
        # 2. Activity Chart (Top Center)
        self.activity_panel = self.create_panel("ACTIVITY DISTRIBUTION")
        self.pie_layout = QVBoxLayout()
        self.activity_panel.layout().addLayout(self.pie_layout)
        grid.addWidget(self.activity_panel, 0, 1)
        
        # 3. Future Path (Top Right)
        self.future_panel = self.create_panel("FUTURE PATH SIMULATION")
        self.future_label = QLabel("Analyzing...")
        self.future_label.setAlignment(Qt.AlignCenter)
        self.future_label.setStyleSheet("font-size: 18px; font-weight: bold;")
        self.future_panel.layout().addWidget(self.future_label)
        grid.addWidget(self.future_panel, 0, 2)
        
        # 4. Insights (Bottom Left)
        self.insight_panel = self.create_panel("AI INSIGHTS")
        self.insight_text = QLabel("Gathering data...")
        self.insight_text.setWordWrap(True)
        self.insight_panel.layout().addWidget(self.insight_text)
        grid.addWidget(self.insight_panel, 1, 0, 1, 2)
        
        # 5. Personality (Bottom Right)
        self.personality_panel = self.create_panel("DIGITAL PERSONALITY")
        self.personality_text = QLabel("Analyzing...")
        self.personality_panel.layout().addWidget(self.personality_text)
        grid.addWidget(self.personality_panel, 1, 2)

        self.main_layout.addLayout(grid)
        
        # Footer
        footer = QLabel("PRIVACY: DATA STORED LOCALLY. ENCRYPTION: OFF (DEMO).")
        footer.setStyleSheet("opacity: 0.5; font-size: 10px;")
        self.main_layout.addWidget(footer)

    def create_panel(self, title):
        frame = QFrame()
        frame.setObjectName("Panel")
        
        # Add Glow Effect
        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(20)
        shadow.setColor(QColor(0, 243, 255, 80))
        shadow.setOffset(0, 0)
        frame.setGraphicsEffect(shadow)
        
        layout = QVBoxLayout(frame)
        
        title_lbl = QLabel(title)
        title_lbl.setStyleSheet("font-weight: bold; font-size: 12px; opacity: 0.8;")
        layout.addWidget(title_lbl)
        
        return frame

    def apply_theme(self):
        self.setStyleSheet(self.theme_manager.get_stylesheet())
        # Re-create charts with new theme colors
        self.refresh_data()

    def process_ai_command(self):
        text = self.theme_input.text()
        new_theme = self.theme_manager.analyze_text_for_theme(text)
        if new_theme:
            self.theme_manager.set_theme(new_theme)
            self.apply_theme()
            self.theme_input.setText(f"Theme switched to {new_theme.upper()}")
        else:
            self.theme_input.setText("AI could not understand theme request.")

    def refresh_data(self):
        # 1. Update Score
        score = self.goal_analyzer.calculate_score()
        self.goal_score_label.setText(f"{score}%")
        
        # 2. Update Pie Chart
        # Clear old chart
        while self.pie_layout.count():
            child = self.pie_layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()
        
        summary = self.db_manager.get_daily_summary()
        if summary:
            chart = self.chart_gen.create_activity_pie(summary)
            self.pie_layout.addWidget(chart)
        else:
            self.pie_layout.addWidget(QLabel("No Data Yet"))
            
        # 3. Update Insights
        insights = self.insight_engine.generate_insights()
        self.insight_text.setText("\n\n".join(insights))
        
        # 4. Update Future Path
        path = self.personality_analyzer.predict_future_path()
        self.future_label.setText(path)
        
        # 5. Update Personality
        traits = self.personality_analyzer.analyze()
        trait_str = "\n".join([f"{k}: {v}%" for k, v in traits.items()])
        self.personality_text.setText(trait_str)
