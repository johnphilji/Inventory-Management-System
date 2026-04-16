import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SalesRevenueChart, PerformanceChart, SalesGrowthChart } from '../components/DashboardCharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Globe } from 'lucide-react';

const StatisticsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching data for stats', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in-down space-y-10">
      <header>
        <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">Enterprise Analytics</h2>
        <p className="text-text-secondary text-sm">Real-time inventory and market intelligence reports.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesRevenueChart data={products} />
        <PerformanceChart data={products} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SalesGrowthChart data={products} />
        <div className="lg:col-span-2 bg-card border border-border p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <Globe size={48} className="text-accent mb-6 animate-pulse" />
            <h3 className="text-xl font-syne font-bold text-text-primary mb-4 uppercase tracking-widest">Global Supply Chain Status</h3>
            <p className="max-w-md text-text-secondary text-sm">
                Advanced node monitoring active. All international hubs report stable connectivity. 
                Next data synchronization scheduled in 14 minutes.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
