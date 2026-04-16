import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadialBarChart, RadialBar, Legend 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const MetricCard = ({ title, value, change, isPositive }) => (
  <div className="bg-[#16161a] border border-border/50 p-6 rounded-xl hover:border-accent/30 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[50px] rounded-full -mr-10 -mt-10 group-hover:bg-accent/10 transition-all" />
    <h3 className="text-text-muted text-[10px] font-syne font-extrabold uppercase tracking-[0.2em] mb-4">{title}</h3>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-mono text-text-primary tracking-tight font-bold">{value}</span>
      <div className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{change} than last week</span>
      </div>
    </div>
  </div>
);

export const SalesRevenueChart = ({ data }) => {
  // Process data for the monthly line chart
  const monthlyTotals = Array(12).fill(0);
  data.forEach(p => {
    p.monthlyTrend.forEach((val, i) => {
      monthlyTotals[i] += val * p.price;
    });
  });

  const chartData = [
    { name: 'Jan', revenue: monthlyTotals[0] },
    { name: 'Feb', revenue: monthlyTotals[1] },
    { name: 'Mar', revenue: monthlyTotals[2] },
    { name: 'Apr', revenue: monthlyTotals[3] },
    { name: 'May', revenue: monthlyTotals[4] },
    { name: 'Jun', revenue: monthlyTotals[5] },
    { name: 'Jul', revenue: monthlyTotals[6] },
    { name: 'Aug', revenue: monthlyTotals[7] },
    { name: 'Sep', revenue: monthlyTotals[8] },
    { name: 'Oct', revenue: monthlyTotals[9] },
    { name: 'Nov', revenue: monthlyTotals[10] },
    { name: 'Dec', revenue: monthlyTotals[11] },
  ];

  // Dynamic Metrics Calculation
  const activeVendors = new Set(data?.map(p => p.vendor).filter(Boolean)).size || 0;
  
  const prevMonthRev = monthlyTotals[10] || 0;
  const currMonthRev = monthlyTotals[11] || 0;
  let growth = 0;
  if (prevMonthRev === 0 && currMonthRev > 0) growth = 100;
  else if (prevMonthRev > 0) growth = ((currMonthRev - prevMonthRev) / prevMonthRev) * 100;
  const growthFormatted = growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;

  return (
    <div className="bg-[#16161a] border border-border/50 p-8 rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-text-muted text-xs font-syne font-extrabold uppercase tracking-widest mb-6">Average Monthly Sales Revenue</h3>
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] text-text-muted uppercase mb-2">Active Vendors</p>
              <p className="text-2xl font-mono text-accent">{activeVendors}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase mb-2">MoM Revenue Growth</p>
              <p className={`text-2xl font-mono ${growth >= 0 ? 'text-success' : 'text-danger'}`}>{growthFormatted}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase mb-2">Sales Revenue</p>
              <p className="text-2xl font-mono text-accent">₹{(chartData[11].revenue / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff8a00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff8a00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, "Revenue"]}
              contentStyle={{ backgroundColor: '#111118', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              itemStyle={{ color: '#ff8a00' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ff8a00" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRev)" 
              dot={{ r: 4, fill: '#ff8a00', strokeWidth: 2, stroke: '#111118' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const SalesGrowthChart = ({ data }) => {
  // Process data for the monthly volume chart
  const monthlyVolume = Array(12).fill(0);
  data?.forEach(p => {
    if (p.monthlyTrend) {
      p.monthlyTrend.forEach((val, i) => {
        monthlyVolume[i] += (val * p.quantity);
      });
    }
  });

  const chartData = [
    { name: 'Jan', value: monthlyVolume[0] || 400 },
    { name: 'Feb', value: monthlyVolume[1] || 300 },
    { name: 'Mar', value: monthlyVolume[2] || 600 },
    { name: 'Apr', value: monthlyVolume[3] || 500 },
    { name: 'May', value: monthlyVolume[4] || 800 },
    { name: 'Jun', value: monthlyVolume[5] || 700 },
    { name: 'Jul', value: monthlyVolume[6] || 900 },
    { name: 'Aug', value: monthlyVolume[7] || 850 },
    { name: 'Sep', value: monthlyVolume[8] || 750 },
    { name: 'Oct', value: monthlyVolume[9] || 950 },
    { name: 'Nov', value: monthlyVolume[10] || 900 },
    { name: 'Dec', value: monthlyVolume[11] || 1100 },
  ];

  return (
    <div className="bg-[#16161a] border border-border/50 p-8 rounded-2xl h-full flex flex-col">
       <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-text-muted text-xs font-syne font-extrabold uppercase tracking-widest mb-6">Stock Volume Distribution</h3>
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] text-text-muted uppercase mb-2">Total Volume Handled</p>
              <p className="text-2xl font-mono text-accent">{(chartData.reduce((a,b)=>a+b.value, 0).toLocaleString())}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
            <YAxis hide domain={[0, 1200]} />
            <Tooltip 
               cursor={{fill: 'rgba(255,138,0,0.05)'}}
               contentStyle={{ backgroundColor: '#111118', border: '1px solid #2a2a3a', borderRadius: '8px' }}
            />
            <Bar 
              dataKey="value" 
              fill="#f1f5f9" 
              radius={[4, 4, 0, 0]} 
              barSize={12} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-[10px] text-text-muted uppercase mt-4">Accumulated Item Movement last 12 months</p>
    </div>
  );
};

export const PerformanceChart = ({ data: products }) => {
  // Calculate dynamic Category Performance based on Total Value (Price * Qty)
  const categoryMap = {};
  let totalValue = 0;

  products?.forEach(p => {
    const val = (p.price || 0) * (p.quantity || 0);
    categoryMap[p.category] = (categoryMap[p.category] || 0) + val;
    totalValue += val;
  });

  const colors = ['#ff8a00', '#64748b', '#334155', '#10b981', '#3b82f6'];
  const data = Object.keys(categoryMap).map((cat, index) => ({
    name: cat,
    value: categoryMap[cat],
    fill: colors[index % colors.length],
    percentage: totalValue ? Math.round((categoryMap[cat] / totalValue) * 100) : 0
  })).sort((a,b) => b.value - a.value).slice(0, 5); // top 5

  const topCategory = data.length > 0 ? data[0] : { name: 'N/A', percentage: 0 };

  return (
    <div className="bg-[#16161a] border border-border/50 p-8 rounded-2xl h-full flex flex-col items-center justify-center">
      <h3 className="text-text-muted text-xs font-syne font-extrabold uppercase tracking-widest mb-8 self-start">Category Distribution (Value)</h3>
      <div className="relative w-full aspect-square max-w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-mono text-text-primary font-bold">{topCategory.percentage}%</span>
          <span className="text-[10px] text-text-muted uppercase truncate w-24 text-center">{topCategory.name}</span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 w-full">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-xs text-text-secondary">{item.name}</span>
            </div>
            <span className="text-xs font-mono text-text-primary">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
