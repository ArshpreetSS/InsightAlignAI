'use client';

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  AreaChart, 
  Area,
  XAxis,
  YAxis
} from 'recharts';
import { Activity } from 'lucide-react';

export const ActivityChart = ({ data }: { data: any[] }) => (
  <div className="h-[200px] w-full relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={8}
          dataKey="value"
          cornerRadius={6}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" className="filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', padding: '12px' }}
          itemStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </PieChart>
    </ResponsiveContainer>
    {/* Center Icon */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Activity className="w-8 h-8 text-white/20" />
    </div>
  </div>
);

export const ProductivityChart = ({ data, accentColor }: { data: any[], accentColor: string }) => (
  <div className="h-[240px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={accentColor} stopOpacity={0.6}/>
            <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="day" 
          stroke="#ffffff40" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: '#ffffff60', fontSize: 10, fontWeight: 'bold' }}
          dy={10}
        />
        <YAxis 
          stroke="#ffffff40" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: '#ffffff60', fontSize: 10, fontWeight: 'bold' }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
          itemStyle={{ color: accentColor, fontWeight: 'bold' }}
          cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2, strokeDasharray: '5 5' }}
        />
        <Area 
          type="monotone" 
          dataKey="score" 
          stroke={accentColor} 
          fillOpacity={1} 
          fill="url(#colorScore)" 
          strokeWidth={4} 
          className="filter drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
