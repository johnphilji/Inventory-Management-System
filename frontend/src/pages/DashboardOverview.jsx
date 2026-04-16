import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MetricCard, 
  SalesRevenueChart, 
  SalesGrowthChart, 
  PerformanceChart 
} from '../components/DashboardCharts';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { Plus, Download } from 'lucide-react';

const DashboardOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      addToast('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item from the terminal?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      addToast('Item removed from inventory');
    } catch (err) {
      addToast('Failed to delete item', 'error');
    }
  };

  const addProduct = async (data) => {
    try {
      await axios.post('/api/products', data);
      await fetchProducts();
      setShowForm(false);
      addToast('Product synchronized successfully');
    } catch (err) {
      addToast('Failed to sync product', 'error');
    }
  };

  const updateProduct = async (id, data) => {
    try {
      await axios.put(`/api/products/${id}`, data);
      await fetchProducts();
      setEditingProduct(null);
      setShowForm(false);
      addToast('Inventory data updated');
    } catch (err) {
      addToast('Update failed', 'error');
    }
  };

  // Aggregated Stats
  const stats = {
    totalValue: products.reduce((acc, p) => acc + (p.price * p.quantity), 0),
    stockLevel: products.reduce((acc, p) => acc + p.quantity, 0),
    avgMargin: products.length > 0 ? (products.reduce((acc, p) => acc + (p.price - p.purchasePrice), 0) / products.length) : 0,
    winRate: "30%"
  };

  return (
    <>
        <header className="flex justify-between items-center mb-10 animate-fade-in-down">
          <div>
            <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">Dashboard Overview</h2>
            <p className="text-text-secondary text-sm">Industrial Logistics & Supply Chain Terminal</p>
          </div>
          <div className="flex gap-4">
            <button className="p-2.5 bg-card border border-border text-text-secondary rounded-xl hover:text-accent transition-all">
              <Download size={20} />
            </button>
            <button 
              onClick={() => {
                setEditingProduct(null);
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary px-6 py-2.5 rounded-xl font-bold font-syne uppercase text-xs tracking-wider transition-all shadow-lg shadow-accent/20"
            >
              <Plus size={18} strokeWidth={3} />
              Add Inventory
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <MetricCard title="Current Opportunities" value="207" change="+10.08%" isPositive={true} />
          <MetricCard title="Current Purchase Value" value={`₹${(stats.totalValue / 1000).toFixed(1)}K`} change="-10.08%" isPositive={false} />
          <MetricCard title="Average Purchase Value" value={`₹${(stats.avgMargin).toFixed(0)}`} change="-10.08%" isPositive={false} />
          <MetricCard title="Win Rate" value={stats.winRate} change="+10.08%" isPositive={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 animate-fade-in-left">
            <SalesRevenueChart data={products} />
          </div>
          <div className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <PerformanceChart data={products} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <div className="animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
             <SalesGrowthChart data={products} />
           </div>
           <div className="lg:col-span-2 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="bg-card border border-border/50 rounded-2xl p-8 h-full">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-text-muted text-xs font-syne font-extrabold uppercase tracking-widest">Live Inventory Stream</h3>
                </div>
                <ProductTable 
                  products={products} 
                  loading={loading}
                  deleteProduct={deleteProduct}
                  setEditingProduct={(p) => {
                    setEditingProduct(p);
                    setShowForm(true);
                  }}
                />
              </div>
           </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-slide-up">
              <ProductForm 
                editingProduct={editingProduct} 
                setEditingProduct={(p) => {
                  setEditingProduct(p);
                  if (!p) setShowForm(false);
                }}
                addProduct={addProduct}
                updateProduct={updateProduct}
              />
            </div>
          </div>
        )}

        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          {toasts.map((toast) => (
            <div 
              key={toast.id}
              className={`px-6 py-4 bg-card border-l-4 rounded-md shadow-2xl flex items-center gap-3 animate-slide-up ${
                toast.type === 'error' ? 'border-danger' : 'border-accent'
              }`}
            >
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          ))}
        </div>
    </>
  );
};

export default DashboardOverview;
