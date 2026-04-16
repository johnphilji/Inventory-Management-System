import React, { useState } from 'react';

const ProductTable = ({ products, loading, deleteProduct, setEditingProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'added today';
    if (days === 1) return 'added yesterday';
    return `added ${days} days ago`;
  };

  const getQtyColor = (qty) => {
    if (qty === 0) return 'var(--danger)';
    if (qty < 5) return 'var(--accent)';
    return 'var(--success)';
  };

  if (loading) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 w-32 skeleton rounded"></div>
          <div className="h-10 w-48 skeleton rounded-lg"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 w-full skeleton rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 border border-border rounded-xl flex flex-col overflow-hidden">
      <div className="overflow-x-auto">
        {filteredProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <h3 className="font-syne text-text-muted uppercase tracking-widest text-[10px] mb-2">No data stream detected</h3>
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-syne text-text-muted uppercase tracking-[0.2em] opacity-60">
                <th className="px-4 py-2 text-left font-extrabold">ID</th>
                <th className="px-4 py-2 text-left font-extrabold">Product Name</th>
                <th className="px-4 py-2 text-left font-extrabold">Price</th>
                <th className="px-4 py-2 text-left font-extrabold">Stock</th>
                <th className="px-4 py-2 text-center font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr 
                  key={product._id} 
                  className="group bg-primary/40 hover:bg-accent/5 transition-all duration-300"
                >
                  <td className="px-4 py-3 first:rounded-l-lg font-mono text-[10px] text-text-muted">
                    {product._id.slice(-4).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 border-l-0 group-hover:border-l-2 group-hover:border-l-accent transition-all">
                    <div>
                      <p className="text-xs font-bold text-text-primary tracking-tight">{product.name}</p>
                      <span className="text-[9px] text-text-muted uppercase">{product.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-accent">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                       <span className={`font-mono text-xs ${product.quantity < 5 ? 'text-danger' : 'text-success'}`}>
                        {product.quantity}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 last:rounded-r-lg">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="p-1.5 text-text-muted hover:text-accent transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => deleteProduct(product._id)}
                        className="p-1.5 text-text-muted hover:text-danger transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
