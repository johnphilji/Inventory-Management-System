import React from 'react';
import { Users, Mail, Phone, ShoppingBag, Plus, MoreVertical } from 'lucide-react';

const CustomersPage = () => {
  // We'll use some mock data for the initial view
  const mockCustomers = [
    { id: 1, name: 'Robert Steel Corp', company: 'Steel Dynamics', email: 'procurement@steely.com', phone: '+1 555-0123', status: 'Active', orders: 154 },
    { id: 2, name: 'Alice Henderson', company: 'City Construction', email: 'alice@cityconst.co', phone: '+1 555-0456', status: 'Lead', orders: 0 },
    { id: 3, name: 'Mark Builderson', company: 'Bridge Builders LLC', email: 'mark@bb.com', phone: '+1 555-0890', status: 'Active', orders: 42 },
  ];

  return (
    <div className="animate-fade-in-down space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">CRM / Customers</h2>
          <p className="text-text-secondary text-sm">Operator network and distributor management.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary px-6 py-2.5 rounded-xl font-bold font-syne uppercase text-xs tracking-wider transition-all">
          <Plus size={18} strokeWidth={3} />
          New Customer
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {mockCustomers.map((customer) => (
          <div key={customer.id} className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary border border-border rounded-xl flex items-center justify-center text-accent">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text-primary uppercase tracking-tight">{customer.name}</h4>
                <p className="text-xs text-text-muted font-mono">{customer.company}</p>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-1 items-start">
               <div className="flex items-center gap-2 text-xs text-text-secondary">
                 <Mail size={14} className="text-text-muted" />
                 {customer.email}
               </div>
               <div className="flex items-center gap-2 text-xs text-text-secondary">
                 <Phone size={14} className="text-text-muted" />
                 {customer.phone}
               </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Total Orders</p>
                <div className="flex items-center gap-2 text-text-primary font-mono font-bold">
                  <ShoppingBag size={14} className="text-accent" />
                  {customer.orders}
                </div>
              </div>
              
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                customer.status === 'Active' ? 'bg-success/10 border-success/20 text-success' : 'bg-accent/10 border-accent/20 text-accent'
              }`}>
                {customer.status}
              </div>

              <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
