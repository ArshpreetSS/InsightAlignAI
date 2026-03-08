from datetime import datetime

class InsightEngine:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def generate_insights(self):
        insights = []
        summary = self.db_manager.get_daily_summary()
        
        if not summary:
            return ["Not enough data to generate insights yet."]

        # Find top category
        top_cat = max(summary, key=lambda x: x['total_duration'])
        top_cat_name = top_cat['category']
        top_cat_hours = round(top_cat['total_duration'] / 3600, 1)
        
        insights.append(f"Your dominant activity today is {top_cat_name} ({top_cat_hours} hours).")

        # Distraction check
        gaming = next((x for x in summary if x['category'] == 'Gaming'), None)
        dev = next((x for x in summary if x['category'] == 'Development'), None)
        
        if gaming and dev:
            if gaming['total_duration'] > dev['total_duration']:
                insights.append("Insight: You spent more time Gaming than Developing today.")
        
        # Productivity Peak (Mock logic as we need hourly data for real implementation)
        # In a real app, we'd query hourly buckets
        current_hour = datetime.now().hour
        if 20 <= current_hour <= 23:
             insights.append("You are currently in your peak productivity window.")

        return insights
