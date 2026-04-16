import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Shield, Bell, User, Cpu, Database, Save } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in-down space-y-10">
      <header>
        <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">Terminal Config</h2>
        <p className="text-text-secondary text-sm">System parameters and security protocols.</p>
      </header>

      <div className="max-w-4xl space-y-8">
        {/* User Identity Section */}
        <div className="bg-card border border-border p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-accent opacity-5 group-hover:opacity-10 transition-opacity">
            <User size={120} />
          </div>
          
          <h3 className="text-xs font-syne font-extrabold uppercase tracking-[0.2em] text-accent mb-8 flex items-center gap-2">
            <User size={16} />
            Identity Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Operator Name</label>
               <input type="text" className="w-full bg-primary border-border text-text-primary px-4 py-3 rounded-lg" defaultValue={user?.name || 'Operator'} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Operator Email</label>
               <input type="email" readOnly className="w-full bg-primary/50 border-border text-text-muted px-4 py-3 rounded-lg cursor-not-allowed" defaultValue={user?.email || 'operator@system'} />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card border border-border p-8 rounded-2xl">
          <h3 className="text-xs font-syne font-extrabold uppercase tracking-[0.2em] text-accent mb-8 flex items-center gap-2">
            <Shield size={16} />
            Security Protocols
          </h3>

          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-primary/30 rounded-xl border border-border">
                <div>
                   <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight">Two-Factor Authorization</h4>
                   <p className="text-xs text-text-muted italic">Mandatory security layer for node access.</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full shadow-lg" />
                </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-primary/30 rounded-xl border border-border">
                <div>
                   <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight">Encryption Mode (AES-256)</h4>
                   <p className="text-xs text-text-muted italic">Standard encryption for international data stream.</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full shadow-lg" />
                </div>
             </div>
          </div>
        </div>

        {/* System Monitoring Section */}
        <div className="bg-card border border-border p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary border border-border rounded-xl flex items-center justify-center text-accent shrink-0">
                    <Cpu size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight">CPU Latency</h4>
                    <p className="text-2xl font-mono text-accent">1.2ms</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">Optimal Range</p>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary border border-border rounded-xl flex items-center justify-center text-accent shrink-0">
                    <Database size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight">Database Load</h4>
                    <p className="text-2xl font-mono text-accent">14%</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">Healthy Node</p>
                </div>
            </div>
        </div>

        <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary px-8 py-3 rounded-xl font-bold font-syne uppercase text-xs tracking-wider transition-all">
                <Save size={18} strokeWidth={3} />
                Save Protocols
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
