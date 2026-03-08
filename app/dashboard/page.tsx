'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  Target, 
  Zap, 
  Clock, 
  Cpu, 
  Terminal, 
  Monitor, 
  Code, 
  Gamepad2, 
  Palette, 
  MessageSquare,
  Download,
  X,
  Home,
  Map,
  Sparkles,
  ShieldAlert,
  Lock,
  Unlock,
  Instagram,
  Twitter,
  Video,
  MessageCircle,
  AlertTriangle
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ActivityChart = dynamic(() => import('../../components/Charts').then(mod => mod.ActivityChart), { ssr: false });
const ProductivityChart = dynamic(() => import('../../components/Charts').then(mod => mod.ProductivityChart), { ssr: false });
import Link from 'next/link';

// --- Types ---

type Theme = 'cyberpunk' | 'gaming' | 'minimalist' | 'nature';

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface Insight {
  id: number;
  text: string;
  type: 'info' | 'warning' | 'success';
}

interface GuardApp {
  id: string;
  name: string;
  limitMinutes: number;
  usedMinutes: number;
  icon: any;
  color: string;
}

// --- Mock Data ---

const MOCK_GUARD_APPS: GuardApp[] = [
  { id: '1', name: 'Instagram', limitMinutes: 30, usedMinutes: 45, icon: Instagram, color: 'pink' },
  { id: '2', name: 'Twitter', limitMinutes: 45, usedMinutes: 20, icon: Twitter, color: 'blue' },
  { id: '3', name: 'TikTok', limitMinutes: 15, usedMinutes: 15, icon: Video, color: 'purple' },
  { id: '4', name: 'Reddit', limitMinutes: 60, usedMinutes: 120, icon: MessageCircle, color: 'orange' },
];

const MOCK_ACTIVITY_DATA: ActivityData[] = [
  { name: 'Development', value: 45, color: '#22d3ee' }, // cyan-400
  { name: 'Gaming', value: 30, color: '#e879f9' },    // fuchsia-400
  { name: 'Learning', value: 15, color: '#4ade80' },  // green-400
  { name: 'Communication', value: 10, color: '#818cf8' }, // indigo-400
];

const MOCK_WEEKLY_DATA = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 72 },
  { day: 'Wed', score: 58 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 90 },
  { day: 'Sat', score: 45 },
  { day: 'Sun', score: 60 },
];

const MOCK_INSIGHTS: Insight[] = [
  { id: 1, text: 'Peak productivity detected between 8 PM - 11 PM.', type: 'success' },
  { id: 2, text: 'Gaming usage exceeded 2 hours today.', type: 'warning' },
  { id: 3, text: 'Consistent coding streak: 4 days.', type: 'info' },
];

// --- Components ---

const GlassCard = ({ children, className = '', title, accentColor = 'cyan' }: { children: React.ReactNode, className?: string, title?: string, accentColor?: string }) => (
  <div 
    className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group animate-fade-in-up ${className}`}
  >
    {/* Animated Border Gradient */}
    <div className={`absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
    
    {/* Colorful Glow effect on hover */}
    <div className={`absolute -inset-1 bg-gradient-to-r from-${accentColor}-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700`} />
    
    <div className="relative z-10 h-full flex flex-col">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 uppercase flex items-center gap-3">
            <div className={`w-1.5 h-5 bg-gradient-to-b from-${accentColor}-400 to-purple-500 rounded-full shadow-[0_0_10px_currentColor] text-${accentColor}-400`} />
            {title}
          </h3>
          <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors">
            <Sparkles className={`w-3 h-3 text-${accentColor}-400 opacity-50 group-hover:opacity-100 transition-opacity`} />
          </div>
        </div>
      )}
      {children}
    </div>
  </div>
);

const StatValue = ({ value, label, color = 'text-white' }: { value: string, label: string, color?: string }) => (
  <div className="flex flex-col">
    <span className={`text-5xl font-black ${color} tracking-tighter drop-shadow-2xl`}>{value}</span>
    <span className="text-xs text-white/50 font-bold uppercase tracking-widest mt-2">{label}</span>
  </div>
);

const PythonDownloadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0a0a1a] border border-cyan-500/30 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-scale-up"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Run Python Version Locally
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8 text-gray-300">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-200 flex gap-3">
            <Zap className="w-5 h-5 shrink-0 text-yellow-400" />
            <div>
              <strong>Note:</strong> This web interface is a preview. The actual desktop tracking features require running the Python application on your local Windows machine.
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-400">1</div>
                Prerequisites
              </h3>
              <ul className="list-disc pl-10 space-y-1 text-sm text-gray-400">
                <li>Python 3.10 or higher</li>
                <li>Windows OS (for window tracking features)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">2</div>
                Installation
              </h3>
              <div className="bg-black rounded-xl p-4 font-mono text-xs border border-white/10 shadow-inner">
                <p className="text-gray-500"># Install dependencies</p>
                <p className="text-green-400">pip install psutil pywin32 plyer matplotlib numpy PySide6</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-xs text-pink-400">3</div>
                Run Application
              </h3>
              <div className="bg-black rounded-xl p-4 font-mono text-xs border border-white/10 shadow-inner">
                <p className="text-gray-500"># Start the dashboard</p>
                <p className="text-green-400">python main.py</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition-all text-sm font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [theme, setTheme] = useState<Theme>('cyberpunk');
  const [showDownload, setShowDownload] = useState(false);
  const [targetGoal, setTargetGoal] = useState('Game Dev');
  const [futureRole, setFutureRole] = useState('Software Architect');

  useEffect(() => {
    const savedInterest = localStorage.getItem('insightAlign_interest');
    if (savedInterest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetGoal(savedInterest);
      // Generate a simple role name based on interest
      const role = savedInterest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Specialist';
      setFutureRole(role);
    }
  }, []);

  // Theme Styles
  const themeStyles = {
    cyberpunk: 'bg-[#050510] text-cyan-50 selection:bg-cyan-500/30',
    gaming: 'bg-[#0f0518] text-purple-50 selection:bg-purple-500/30',
    minimalist: 'bg-[#f8fafc] text-slate-800 selection:bg-slate-300',
    nature: 'bg-[#051a05] text-green-50 selection:bg-green-500/30',
  };

  const accentColor = {
    cyberpunk: '#22d3ee', // cyan-400
    gaming: '#e879f9',    // fuchsia-400
    minimalist: '#3b82f6', // blue-500
    nature: '#4ade80',    // green-400
  }[theme];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${themeStyles[theme]} overflow-x-hidden`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {theme === 'cyberpunk' && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/30 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/30 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full animate-float-slow" />
          </>
        )}
        {theme === 'gaming' && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0f0518] to-[#0f0518]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/30 blur-[120px] rounded-full animate-float-delayed" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/30 blur-[120px] rounded-full animate-float-slow" />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 group">
              <Link href="/" className={`p-3 rounded-xl bg-gradient-to-br from-${theme === 'cyberpunk' ? 'cyan' : 'purple'}-500/20 to-${theme === 'cyberpunk' ? 'blue' : 'pink'}-500/20 border border-white/10 group-hover:border-white/30 transition-all shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                <Brain className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-${theme === 'cyberpunk' ? 'cyan' : 'purple'}-400 to-${theme === 'cyberpunk' ? 'blue' : 'pink'}-400`} />
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">InsightAlign AI</h1>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${theme === 'cyberpunk' ? 'cyan' : 'purple'}-400 opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 bg-${theme === 'cyberpunk' ? 'cyan' : 'purple'}-500`}></span>
                  </span>
                  <p className="text-xs font-bold text-white/50 tracking-wider uppercase">System Online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 mr-4">
                <Link href="/" className="px-4 py-2 rounded-full text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                    <Home className="w-4 h-4" /> Home
                </Link>
                <Link href="/roadmap" className="px-4 py-2 rounded-full text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                    <Map className="w-4 h-4" /> Roadmap
                </Link>
            </nav>

            <div className="hidden md:flex items-center gap-2 bg-black/20 border border-white/10 rounded-full px-4 py-2.5 hover:bg-black/40 transition-colors focus-within:border-cyan-500/50 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <input 
                type="text" 
                placeholder="Ask AI to change theme..." 
                className="bg-transparent border-none outline-none text-sm w-56 placeholder-white/30 font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value.toLowerCase();
                    if (val.includes('game') || val.includes('purple')) setTheme('gaming');
                    else if (val.includes('clean') || val.includes('light')) setTheme('minimalist');
                    else if (val.includes('nature') || val.includes('green')) setTheme('nature');
                    else setTheme('cyberpunk');
                    e.currentTarget.value = '';
                  }
                }}
              />
              <div className="p-1.5 rounded-full bg-white/10">
                <MessageSquare className="w-3 h-3 text-white/70" />
              </div>
            </div>
            
            <button 
              onClick={() => setShowDownload(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-cyan-500/20
                bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border border-white/20 hover:scale-105 active:scale-95
              `}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Get App</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Goal Alignment Score */}
          <GlassCard title="Goal Alignment" className="lg:col-span-1" accentColor="cyan">
            <div className="flex items-center justify-between h-full">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <circle cx="80" cy="80" r="70" stroke="url(#gradientScore)" strokeWidth="12" fill="transparent" strokeDasharray="439.8" strokeDashoffset="88" strokeLinecap="round" className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                  <defs>
                    <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-200 drop-shadow-lg">80%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-1">Aligned</span>
                </div>
              </div>
              <div className="space-y-6 flex-1 pl-4">
                <StatValue value={targetGoal} label="Target Goal" color="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300" />
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white/50 uppercase tracking-wider">
                    <span>Productive</span>
                    <span className="text-green-400">4.5h</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2 border border-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 w-[75%] shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Activity Distribution */}
          <GlassCard title="Activity Distribution" className="lg:col-span-1" accentColor="fuchsia">
            <ActivityChart data={MOCK_ACTIVITY_DATA} />
            <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/60 mt-4 flex-wrap">
              {MOCK_ACTIVITY_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                  {item.name}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Future Path Simulation */}
          <GlassCard title="Future Path Simulation" className="lg:col-span-1" accentColor="blue">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse" />
                <div className={`relative p-5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shadow-2xl`}>
                  <Code className="w-10 h-10 text-cyan-300" />
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-200">{futureRole}</h4>
                <p className="text-xs font-medium text-blue-200/60 max-w-[220px] mx-auto mt-3 leading-relaxed">
                  High engagement with <span className="text-white">relevant tools</span> indicates a trend towards this role.
                </p>
              </div>

              <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5">
                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                  <span className="text-white/50">Probability</span>
                  <span className="text-cyan-400">85%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] relative transition-all duration-1000 ease-out"
                    style={{ width: '85%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Weekly Productivity Trend */}
          <GlassCard title="Productivity Trend" className="lg:col-span-2" accentColor="indigo">
            <ProductivityChart data={MOCK_WEEKLY_DATA} accentColor={accentColor} />
          </GlassCard>

          {/* AI Insights & Personality */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Insights List */}
            <GlassCard title="AI Insights" className="flex-1" accentColor="amber">
              <div className="space-y-4">
                {MOCK_INSIGHTS.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/item hover:translate-x-1 duration-300">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'success' ? 'bg-yellow-500/20 text-yellow-400' :
                      insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    } group-hover/item:scale-110 transition-transform shadow-lg`}>
                      {insight.type === 'success' && <Zap className="w-4 h-4" />}
                      {insight.type === 'warning' && <Target className="w-4 h-4" />}
                      {insight.type === 'info' && <Activity className="w-4 h-4" />}
                    </div>
                    <p className="text-sm text-gray-300 font-medium leading-snug pt-1">{insight.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Personality Traits */}
            <GlassCard title="Digital Personality" accentColor="pink">
              <div className="space-y-5">
                {[
                  { label: 'Focus', val: 78, icon: Target, color: 'from-blue-400 to-indigo-500', shadow: 'blue' },
                  { label: 'Creativity', val: 65, icon: Palette, color: 'from-pink-400 to-rose-500', shadow: 'pink' },
                  { label: 'Discipline', val: 42, icon: Clock, color: 'from-amber-400 to-orange-500', shadow: 'amber' },
                ].map((trait) => (
                  <div key={trait.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-2 text-white/70">
                        <trait.icon className="w-3 h-3 opacity-70" />
                        {trait.label}
                      </span>
                      <span className="font-mono text-white">{trait.val}%</span>
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-2 border border-white/5">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${trait.color} shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} 
                        style={{ width: `${trait.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

          {/* Guard System */}
          <GlassCard title="Guard System" className="lg:col-span-3" accentColor="red">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_GUARD_APPS.map((app) => {
                const isBlocked = app.usedMinutes >= app.limitMinutes;
                const progress = Math.min((app.usedMinutes / app.limitMinutes) * 100, 100);
                
                return (
                  <div key={app.id} className="bg-black/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group/guard">
                    {/* Background glow if blocked */}
                    {isBlocked && (
                      <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                    )}
                    
                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-${app.color}-500/20 text-${app.color}-400`}>
                        <app.icon className="w-6 h-6" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isBlocked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {isBlocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        {isBlocked ? 'Blocked' : 'Active'}
                      </div>
                    </div>
                    
                    <div className="relative z-10 space-y-1 mb-4">
                      <h4 className="text-lg font-bold text-white">{app.name}</h4>
                      <p className="text-xs text-white/50 font-medium">
                        {app.usedMinutes}m / {app.limitMinutes}m daily limit
                      </p>
                    </div>
                    
                    <div className="relative z-10 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          isBlocked ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                          progress > 80 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 
                          'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

        </div>
      </div>

      <PythonDownloadModal isOpen={showDownload} onClose={() => setShowDownload(false)} />
    </div>
  );
}
