import sqlite3
import os
from datetime import datetime, timedelta

class DBManager:
    def __init__(self, db_path="insight_align.db"):
        self.db_path = db_path
        self.conn = None
        self.create_tables()

    def connect(self):
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        return self.conn

    def close(self):
        if self.conn:
            self.conn.close()

    def create_tables(self):
        conn = self.connect()
        cursor = conn.cursor()

        # User Profile
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                career_goal TEXT,
                interests TEXT,
                habits_build TEXT,
                habits_reduce TEXT,
                theme_preference TEXT DEFAULT 'cyberpunk'
            )
        ''')

        # Activity Logs
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS activity_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                app_name TEXT,
                window_title TEXT,
                start_time TIMESTAMP,
                end_time TIMESTAMP,
                duration REAL,
                category TEXT
            )
        ''')

        conn.commit()
        conn.close()

    def get_user_profile(self):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_profile LIMIT 1")
        profile = cursor.fetchone()
        conn.close()
        return profile

    def save_user_profile(self, goal, interests, build, reduce):
        conn = self.connect()
        cursor = conn.cursor()
        # Check if exists
        cursor.execute("SELECT id FROM user_profile LIMIT 1")
        exists = cursor.fetchone()
        
        if exists:
            cursor.execute('''
                UPDATE user_profile SET 
                career_goal=?, interests=?, habits_build=?, habits_reduce=?
                WHERE id=?
            ''', (goal, interests, build, reduce, exists['id']))
        else:
            cursor.execute('''
                INSERT INTO user_profile (career_goal, interests, habits_build, habits_reduce)
                VALUES (?, ?, ?, ?)
            ''', (goal, interests, build, reduce))
        
        conn.commit()
        conn.close()

    def log_activity(self, app_name, window_title, start_time, duration, category):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO activity_logs (app_name, window_title, start_time, end_time, duration, category)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (app_name, window_title, start_time, datetime.now(), duration, category))
        conn.commit()
        conn.close()

    def get_recent_activities(self, limit=50):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM activity_logs ORDER BY start_time DESC LIMIT ?", (limit,))
        rows = cursor.fetchall()
        conn.close()
        return rows

    def get_daily_summary(self):
        conn = self.connect()
        cursor = conn.cursor()
        today = datetime.now().date()
        cursor.execute('''
            SELECT category, SUM(duration) as total_duration 
            FROM activity_logs 
            WHERE date(start_time) >= ? 
            GROUP BY category
        ''', (today,))
        rows = cursor.fetchall()
        conn.close()
        return rows

    def clear_data(self):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM activity_logs")
        cursor.execute("DELETE FROM user_profile")
        conn.commit()
        conn.close()
