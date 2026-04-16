import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Clock, Server, User } from 'lucide-react';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // This will call the endpoint we'll register in server.js
        const res = await axios.get('/api/activities');
        setActivities(res.data);
      } catch (err) {
        console.error('Error fetching activities', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="animate-fade-in-down space-y-10">
      <header>
        <h2 className="text-2xl font-bold font-syne text-text-primary tracking-tight">System Logs</h2>
        <p className="text-text-secondary text-sm">Chronological record of terminal and inventory operations.</p>
      </header>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border bg-primary/20">
            <h3 className="text-xs font-syne font-extrabold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <History size={16} />
                Audit Trail
            </h3>
        </div>
        
        <div className="divide-y divide-border">
          {loading ? (
             <div className="p-20 text-center text-text-muted font-mono uppercase text-xs animate-pulse">Synchronizing Logs...</div>
          ) : activities.length === 0 ? (
             <div className="p-20 text-center">
                <p className="text-text-muted text-sm font-mono uppercase">Log file empty. No significant events detected.</p>
             </div>
          ) : (
            activities.map((activity) => (
              <div key={activity._id} className="p-6 flex gap-6 hover:bg-white/5 transition-colors group">
                <div className="pt-1">
                    <div className="w-10 h-10 rounded-lg bg-primary border border-border flex items-center justify-center text-accent group-hover:border-accent/50 transition-all shadow-lg">
                        <Server size={18} />
                    </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-text-primary text-sm">{activity.type}</h4>
                    <span className="text-[10px] text-text-muted font-mono uppercase flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{activity.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
