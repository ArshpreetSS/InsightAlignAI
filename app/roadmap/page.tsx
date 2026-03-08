'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Circle, Clock, Star, Zap, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

interface RoadmapPhase {
  phase: string;
  status: 'completed' | 'in-progress' | 'planned' | 'future';
  color: string;
  items: string[];
}

const DEFAULT_ROADMAP_ITEMS: RoadmapPhase[] = [
  {
    phase: 'Phase 1: Foundation',
    status: 'completed',
    color: 'from-cyan-400 to-blue-500',
    items: [
      'Core Activity Tracking Engine (Windows)',
      'Basic Goal Alignment Algorithm',
      'Local SQLite Database Integration',
      'Initial Dashboard UI (PySide6)',
    ]
  },
  {
    phase: 'Phase 2: Intelligence',
    status: 'in-progress',
    color: 'from-purple-400 to-pink-500',
    items: [
      'Advanced AI Insights Engine',
      'Personality Trait Analysis',
      'Smart Notification System',
      'Theme Engine with AI Voice Command',
    ]
  },
  {
    phase: 'Phase 3: Expansion',
    status: 'planned',
    color: 'from-amber-400 to-orange-500',
    items: [
      'Mac & Linux Support',
      'Cloud Sync (Optional)',
      'Mobile Companion App',
      'Gamification & Achievements',
    ]
  },
  {
    phase: 'Phase 4: Singularity',
    status: 'future',
    color: 'from-emerald-400 to-teal-500',
    items: [
      'Full AI Voice Assistant Integration',
      'Predictive Career Simulation 2.0',
      'Neural Interface Support (Experimental)',
      'Global Leaderboards',
    ]
  }
];

export default function RoadmapPage() {
  const [interest, setInterest] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(DEFAULT_ROADMAP_ITEMS);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  // Load saved roadmap on mount
  useEffect(() => {
    const savedRoadmap = localStorage.getItem('insightAlign_roadmap');
    const savedInterest = localStorage.getItem('insightAlign_interest');
    if (savedRoadmap && savedInterest) {
      try {
        setRoadmap(JSON.parse(savedRoadmap));
        setInterest(savedInterest);
        setGenerated(true);
      } catch (e) {
        console.error('Failed to parse saved roadmap');
      }
    }
  }, []);

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest.trim()) return;

    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Generate a 4-phase learning/development roadmap for: "${interest}".
      Return a JSON object with a "phases" array. Each phase must have:
      - "phase": string (e.g. "Phase 1: Basics")
      - "status": string (one of: "completed", "in-progress", "planned", "future")
      - "color": string (a tailwind gradient string, e.g. "from-cyan-400 to-blue-500")
      - "items": array of strings (3-5 specific tasks/topics)
      
      Make the roadmap progressive, starting from basics to advanced.
      Use these status/color combinations roughly:
      1. completed (cyan/blue)
      2. in-progress (purple/pink)
      3. planned (amber/orange)
      4. future (emerald/teal)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ['completed', 'in-progress', 'planned', 'future'] },
                    color: { type: Type.STRING },
                    items: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['phase', 'status', 'color', 'items']
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.phases) {
        setRoadmap(data.phases);
        setGenerated(true);
        localStorage.setItem('insightAlign_roadmap', JSON.stringify(data.phases));
        localStorage.setItem('insightAlign_interest', interest);
      }
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      // Ideally show a toast or error message here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden relative">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-6 lg:p-12">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 
            className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-fade-in-up"
          >
            {generated ? 'Custom Roadmap' : 'Future Roadmap'}
          </h1>
          <p 
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200"
          >
            {generated 
              ? `A personalized path for mastering "${interest}"`
              : "The evolution of InsightAlign AI. Or generate your own path."}
          </p>

          {/* Input Section */}
          <div 
            className="max-w-xl mx-auto relative group animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <form onSubmit={generateRoadmap} className="relative flex items-center bg-[#0a0a1a] rounded-xl border border-white/10 p-2 shadow-2xl">
              <Sparkles className="w-5 h-5 text-purple-400 ml-3 mr-2 animate-pulse" />
              <input 
                type="text" 
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="What do you want to learn? (e.g. Python, Design...)"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 px-2 py-2"
              />
              <button 
                type="submit"
                disabled={loading || !interest.trim()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
              </button>
            </form>
          </div>
        </header>

        {/* Timeline */}
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          
          {roadmap.map((phase, index) => (
            <div 
              key={phase.phase + index} // Added index to key for uniqueness if phases repeat
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-in-up ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              
              {/* Icon/Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050510] bg-[#1a1a2e] shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                {phase.status === 'completed' && <CheckCircle className="w-5 h-5 text-cyan-400" />}
                {phase.status === 'in-progress' && <Zap className="w-5 h-5 text-purple-400 animate-pulse" />}
                {phase.status === 'planned' && <Clock className="w-5 h-5 text-amber-400" />}
                {phase.status === 'future' && <Star className="w-5 h-5 text-emerald-400" />}
                
                {/* Glow behind dot */}
                <div className={`absolute inset-0 rounded-full blur-md bg-gradient-to-r ${phase.color} opacity-50`} />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-white/20">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-gradient-to-r ${phase.color} text-black`}>
                  {phase.status.replace('-', ' ')}
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${phase.color}`}>
                  {phase.phase}
                </h3>
                <ul className={`space-y-2 text-sm text-gray-300 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
            <Link 
              href="/dashboard"
              className="block px-12 py-4 rounded-full bg-[#050510] hover:bg-[#0a0a1a] transition-colors text-xl font-bold tracking-wide uppercase group relative overflow-hidden"
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:text-white transition-colors">
                Launch Dashboard
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
