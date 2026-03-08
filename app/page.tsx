'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Brain, Code, Cpu, Globe, Layers, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 group-hover:border-white/30 transition-all">
            <Brain className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-200">
            InsightAlign AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link href="/roadmap" className="hover:text-purple-400 transition-colors">Roadmap</Link>
          <Link href="https://github.com" target="_blank" className="hover:text-pink-400 transition-colors">GitHub</Link>
        </div>
        <Link 
          href="/onboarding"
          className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all text-sm font-bold tracking-wide text-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
        >
          Launch App
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div
          className="max-w-4xl mx-auto space-y-8 animate-fade-in-up"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            v1.0 Public Beta Now Live
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Align Your Habits
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
              With Your Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The AI-powered desktop companion that analyzes your digital life, predicts your career trajectory, and keeps you focused on what matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link 
              href="/onboarding"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            
            <Link 
              href="/roadmap"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-medium text-lg text-gray-300 hover:text-white backdrop-blur-sm"
            >
              View Roadmap
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div 
          className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20 group perspective-1000 animate-fade-in-up delay-200"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050510] z-10" />
          <Image 
            src="https://picsum.photos/seed/cyberpunk/1920/1080" 
            alt="Dashboard Preview" 
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          
          {/* Floating UI Elements */}
          <div className="absolute top-1/4 left-1/4 p-4 bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl z-20 animate-float-slow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase">Current Focus</div>
                <div className="text-sm font-bold text-white">Development</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1/3 right-1/4 p-4 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-xl z-20 animate-float-delayed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase">AI Insight</div>
                <div className="text-sm font-bold text-white">Peak Flow State</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Intelligence for Your Workflow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            More than just a time tracker. InsightAlign understands the context of your work and guides you towards your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Layers,
              title: "Smart Categorization",
              desc: "Automatically identifies and categorizes apps, websites, and activities without manual input.",
              color: "cyan"
            },
            {
              icon: Cpu,
              title: "AI Predictions",
              desc: "Analyzes long-term patterns to predict your career trajectory and skill development.",
              color: "purple"
            },
            {
              icon: Globe,
              title: "Privacy First",
              desc: "All data processing happens locally on your device. No cloud uploads, no surveillance.",
              color: "pink"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">InsightAlign AI</span>
          </div>
          <div className="text-sm text-gray-600">
            © 2026 InsightAlign AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
