'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, Sparkles, Loader2, Target, Activity } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [interests, setInterests] = useState('');
  const [habits, setHabits] = useState('');
  const [goal, setGoal] = useState('');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleGeneratePlan = async () => {
    if (!interests || !habits || !goal) return;
    
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Based on the following user profile:
      - Interests: ${interests}
      - Current Habits: ${habits}
      - Primary Goal: ${goal}
      
      Generate a 4-phase learning/development roadmap to help them achieve their goal.
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
        localStorage.setItem('insightAlign_roadmap', JSON.stringify(data.phases));
        localStorage.setItem('insightAlign_interest', goal);
        localStorage.setItem('insightAlign_onboarding_complete', 'true');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to generate plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <Brain className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200">
            Let&apos;s Align Your Path
          </h1>
          <p className="text-gray-400 text-lg">
            Tell us about yourself so our AI can craft your personalized roadmap.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up delay-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="space-y-8 mt-4">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white">What are your main interests?</h2>
                </div>
                <p className="text-sm text-gray-400">e.g., Web Development, UI/UX Design, Game Dev, Data Science</p>
                <textarea 
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all min-h-[120px]"
                  placeholder="I'm interested in..."
                />
                <button 
                  onClick={handleNext}
                  disabled={!interests.trim()}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 text-purple-400 mb-2">
                  <Activity className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white">What are your current daily habits?</h2>
                </div>
                <p className="text-sm text-gray-400">e.g., I spend 2 hours coding, 1 hour scrolling social media, 30 mins reading.</p>
                <textarea 
                  value={habits}
                  onChange={(e) => setHabits(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[120px]"
                  placeholder="My daily routine usually involves..."
                />
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!habits.trim()}
                    className="flex-1 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 text-pink-400 mb-2">
                  <Target className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white">What is your primary goal?</h2>
                </div>
                <p className="text-sm text-gray-400">e.g., Become a Senior Frontend Engineer in 1 year, Launch my own indie game.</p>
                <input 
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                  placeholder="My main goal is..."
                />
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleGeneratePlan}
                    disabled={!goal.trim() || loading}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Profile...
                      </>
                    ) : (
                      <>
                        Generate AI Plan <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
