import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex gap-1 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-accent/60 rounded-full" />
            <div className="w-2 h-2 bg-accent/30 rounded-full" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[0.3em] text-text-primary font-syne uppercase">FAST TRACK</h1>
          <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest mt-2">New Node Registration</p>
        </div>

        <div className="bg-card border border-border p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <h2 className="text-xs font-syne font-extrabold tracking-[0.2em] text-accent uppercase mb-8">Establish New Identity</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger text-xs font-bold uppercase tracking-tight flex items-center gap-2">
              <span className="w-1 h-1 bg-danger rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Operator Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#111116] border-border text-text-primary focus:border-accent transition-all"
                placeholder="Chief Operator"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Operator Email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-[#111116] border-border text-text-primary focus:border-accent transition-all"
                placeholder="operator@fasttrack.system"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Security Clearance (Pass)</label>
              <input 
                type="password" 
                required 
                className="w-full bg-[#111116] border-border text-text-primary focus:border-accent transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-primary py-4 rounded-xl font-syne font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/10"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  <UserPlus size={18} strokeWidth={3} />
                  Authorize Identity
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-text-muted text-[10px] uppercase font-bold">
            Existing Operator? {' '}
            <Link to="/login" className="text-accent hover:text-accent-hover transition-colors">Log In To Node</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
