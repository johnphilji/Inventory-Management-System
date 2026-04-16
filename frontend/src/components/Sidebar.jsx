import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Activity, 
  Users, 
  MessageSquare, 
  Truck, 
  Settings, 
  LogOut, 
  Home,
  Bell
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, badge }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `
      flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 group
      ${isActive ? 'bg-accent/10 border-r-4 border-accent text-accent' : 'text-text-secondary hover:bg-white/5'}
    `}
  >
    <Icon size={20} className="group-hover:translate-x-1 transition-transform" />
    <span className="font-syne font-bold uppercase tracking-wider text-xs">{label}</span>
    {badge && (
      <span className="ml-auto bg-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </NavLink>
);

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0a0a0b] border-r border-border h-screen sticky top-0 flex flex-col pt-8">
      {/* Brand */}
      <div className="px-8 mb-12">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-accent/30 rounded-full" />
          </div>
          <h1 className="text-lg font-extrabold tracking-widest text-text-primary font-syne uppercase">FAST TRACK</h1>
        </div>
        {user && (
          <div className="mt-4 flex items-center gap-2 px-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest truncate">Operator: {user.name}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-grow">
        <SidebarItem icon={Home} label="Home" to="/" />
        <SidebarItem icon={Bell} label="Notifications" to="/messages" badge="6" />
        <div className="my-8 px-6 border-t border-border/50" />
        <SidebarItem icon={BarChart3} label="Statistics" to="/statistics" />
        <SidebarItem icon={Activity} label="Activity" to="/activity" />
        <SidebarItem icon={Users} label="Customers" to="/customers" />
        <SidebarItem icon={MessageSquare} label="Messages" to="/messages" badge="88+" />
        <SidebarItem icon={Truck} label="Vehicles" to="/vehicles" />
      </nav>

      {/* Footer Nav */}
      <div className="mt-auto mb-8">
        <SidebarItem icon={Settings} label="Settings" to="/settings" />
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 group text-text-secondary hover:bg-danger/10 hover:text-danger border-r-0 hover:border-r-4 hover:border-danger"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-syne font-bold uppercase tracking-wider text-xs">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
