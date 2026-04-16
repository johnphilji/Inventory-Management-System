import React from 'react';
import { MessageSquare, Mail, User, Clock, Search, MoreHorizontal } from 'lucide-react';

const MessagesPage = () => {
  const mockMessages = [
    { id: 1, from: 'System Admin', subject: 'Node Sync Success', content: 'Protocol X-45 establishment has been confirmed by all international hubs.', time: '2 mins ago', read: false },
    { id: 2, from: 'MetalWorks Inc', subject: 'Invoice #8841', content: 'Attached is the invoice for the last 40 Industrial Steel Beams delivered.', time: '1 hour ago', read: true },
    { id: 3, from: 'SafeGuard', subject: 'Stock replenishment request', content: 'Low stock detected for Safety Helmet Packs. Immediate order required.', time: '5 hours ago', read: false },
  ];

  return (
    <div className="animate-fade-in-down space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">Signal / Messages</h2>
          <p className="text-text-secondary text-sm">Secure terminal communication and notifications.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search signals..." 
            className="pl-10 py-2.5 bg-card border border-border rounded-xl text-xs font-mono w-64"
          />
        </div>
      </header>

      <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`p-6 flex gap-6 cursor-pointer hover:bg-white/5 transition-colors group ${!msg.read ? 'border-l-4 border-l-accent' : ''}`}>
             <div className="w-12 h-12 rounded-xl bg-primary border border-border flex items-center justify-center text-text-secondary group-hover:text-accent transition-all shrink-0">
                <User size={24} />
             </div>
             <div className="flex-grow">
               <div className="flex justify-between items-center mb-1">
                 <h4 className={`text-sm ${!msg.read ? 'text-text-primary font-bold' : 'text-text-secondary'}`}>{msg.from}</h4>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] text-text-muted font-mono uppercase italic">{msg.time}</span>
                    {!msg.read && <div className="w-2 h-2 bg-accent rounded-full" />}
                    <MoreHorizontal size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               </div>
               <p className={`text-xs uppercase font-syne font-bold tracking-widest mb-2 ${!msg.read ? 'text-accent' : 'text-text-muted'}`}>{msg.subject}</p>
               <p className="text-sm text-text-secondary line-clamp-1">{msg.content}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
