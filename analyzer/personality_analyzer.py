class PersonalityAnalyzer:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def analyze(self):
        summary = self.db_manager.get_daily_summary()
        traits = {
            "Focus": 50,
            "Creativity": 50,
            "Analytical": 50,
            "Discipline": 50,
            "Curiosity": 50
        }
        
        if not summary:
            return traits

        total_duration = sum(row['total_duration'] for row in summary)
        if total_duration == 0:
            return traits

        cat_map = {row['category']: row['total_duration'] for row in summary}

        # Calculate traits based on category ratios
        if 'Development' in cat_map:
            traits['Analytical'] += (cat_map['Development'] / total_duration) * 40
            traits['Focus'] += (cat_map['Development'] / total_duration) * 30
            
        if 'Creative' in cat_map:
            traits['Creativity'] += (cat_map['Creative'] / total_duration) * 50
            
        if 'Learning' in cat_map:
            traits['Curiosity'] += (cat_map['Learning'] / total_duration) * 50
            
        if 'Gaming' in cat_map:
            traits['Discipline'] -= (cat_map['Gaming'] / total_duration) * 20
            
        # Normalize to 100
        for k in traits:
            traits[k] = min(100, max(0, int(traits[k])))
            
        return traits

    def predict_future_path(self):
        summary = self.db_manager.get_daily_summary()
        if not summary:
            return "Undetermined"
            
        top_cat = max(summary, key=lambda x: x['total_duration'])
        cat = top_cat['category']
        
        if cat == 'Development':
            return "Senior Software Architect"
        elif cat == 'Creative':
            return "Digital Artist / UI Designer"
        elif cat == 'Gaming':
            return "Esports Professional / Streamer"
        elif cat == 'Learning':
            return "Researcher / Academic"
        else:
            return "Digital Nomad"
