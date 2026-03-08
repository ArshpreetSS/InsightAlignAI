from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import numpy as np

class ChartGenerator:
    def __init__(self, theme_manager):
        self.theme_manager = theme_manager

    def create_activity_pie(self, data):
        t = self.theme_manager.get_theme()
        
        fig = Figure(figsize=(4, 3), dpi=100, facecolor=t['bg_panel'])
        ax = fig.add_subplot(111)
        ax.set_facecolor(t['bg_panel'])
        
        labels = [d['category'] for d in data]
        sizes = [d['total_duration'] for d in data]
        
        # Futuristic colors
        colors = [t['accent'], t['text_primary'], t['text_secondary'], '#ffffff', '#888888']
        
        wedges, texts, autotexts = ax.pie(
            sizes, 
            labels=labels, 
            autopct='%1.1f%%',
            startangle=90,
            colors=colors,
            textprops=dict(color=t['text_secondary'])
        )
        
        for text in autotexts:
            text.set_color(t['bg_main'])
            
        return FigureCanvas(fig)

    def create_weekly_trend(self):
        t = self.theme_manager.get_theme()
        
        fig = Figure(figsize=(4, 2), dpi=100, facecolor=t['bg_panel'])
        ax = fig.add_subplot(111)
        ax.set_facecolor(t['bg_panel'])
        
        # Mock data for demo
        days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        productivity = [60, 75, 40, 80, 90, 30, 50]
        
        ax.plot(days, productivity, color=t['accent'], marker='o', linewidth=2)
        ax.fill_between(days, productivity, color=t['accent'], alpha=0.2)
        
        ax.spines['bottom'].set_color(t['border'])
        ax.spines['top'].set_color('none')
        ax.spines['left'].set_color(t['border'])
        ax.spines['right'].set_color('none')
        
        ax.tick_params(axis='x', colors=t['text_secondary'])
        ax.tick_params(axis='y', colors=t['text_secondary'])
        
        return FigureCanvas(fig)
