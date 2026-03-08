class GoalAlignment:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def calculate_score(self):
        profile = self.db_manager.get_user_profile()
        if not profile:
            return 0
        
        goal = profile['career_goal'].lower()
        interests = profile['interests'].lower()
        
        summary = self.db_manager.get_daily_summary()
        
        total_time = 0
        aligned_time = 0
        
        # Define alignment mapping (simplified)
        productive_categories = ['Development', 'Learning', 'Creative']
        
        # Adjust based on goal
        if 'game' in goal or 'developer' in goal:
            productive_categories.append('Development')
        if 'artist' in goal or 'design' in goal:
            productive_categories.append('Creative')
            
        for row in summary:
            category = row['category']
            duration = row['total_duration']
            total_time += duration
            
            if category in productive_categories:
                aligned_time += duration
                
            # Bonus for specific keywords in interests
            if category.lower() in interests:
                aligned_time += duration * 0.2 # 20% bonus
                
        if total_time == 0:
            return 0
            
        score = (aligned_time / total_time) * 100
        return min(100, int(score))

    def get_breakdown(self):
        return self.db_manager.get_daily_summary()
