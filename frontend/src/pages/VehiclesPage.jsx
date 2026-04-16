import React from 'react';
import { Truck, MapPin, Gauge, ShieldCheck, Plus, AlertTriangle } from 'lucide-react';

const VehiclesPage = () => {
  const mockVehicles = [
    { id: 1, name: 'Freight Liner 01', plate: 'TX-8841', type: 'Heavy Truck', status: 'In Transit', fuel: '76%', location: 'Dallas Hub' },
    { id: 2, name: 'LogiVans Express', plate: 'TX-1102', type: 'Delivery Van', status: 'Available', fuel: '100%', location: 'Terminal 01' },
    { id: 3, name: 'Cargo Master', plate: 'TX-9952', type: 'Container Carrier', status: 'Maintenance', fuel: '12%', location: 'Workshop B' },
  ];

  return (
    <div className="animate-fade-in-down space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">Fleet Management</h2>
          <p className="text-text-secondary text-sm">Industrial vehicle tracking and logistics coordination.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary px-6 py-2.5 rounded-xl font-bold font-syne uppercase text-xs tracking-wider transition-all">
          <Plus size={18} strokeWidth={3} />
          Register Vehicle
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-card border border-border p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-all">
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-primary border border-border rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                 <Truck size={24} />
               </div>
               <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-2 ${
                  vehicle.status === 'Available' ? 'bg-success/10 border-success/20 text-success' : 
                  vehicle.status === 'In Transit' ? 'bg-accent/10 border-accent/20 text-accent' : 
                  'bg-danger/10 border-danger/20 text-danger'
               }`}>
                  {vehicle.status === 'Maintenance' && <AlertTriangle size={12} />}
                  {vehicle.status}
               </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-text-primary uppercase tracking-tight">{vehicle.name}</h4>
                <p className="text-[10px] text-text-muted font-mono font-bold tracking-[0.2em]">{vehicle.plate} | {vehicle.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-text-muted" />
                  <span className="text-xs text-text-secondary font-medium">{vehicle.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge size={16} className="text-text-muted" />
                  <span className="text-xs text-text-secondary font-medium">{vehicle.fuel} Fuel</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-primary border border-border text-text-secondary hover:text-accent hover:border-accent/30 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all">
                  Telemetry Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;
