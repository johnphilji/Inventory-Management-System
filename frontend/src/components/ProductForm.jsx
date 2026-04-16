import React, { useState, useEffect } from 'react';

const ProductForm = ({ editingProduct, setEditingProduct, addProduct, updateProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    vendor: '',
    price: '',
    purchasePrice: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || '',
        vendor: editingProduct.vendor || '',
        price: editingProduct.price?.toString() || '',
        purchasePrice: editingProduct.purchasePrice?.toString() || '',
        quantity: editingProduct.quantity?.toString() || ''
      });
      setErrors({});
    } else {
      setFormData({ name: '', category: '', vendor: '', price: '', purchasePrice: '', quantity: '' });
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.vendor.trim()) newErrors.vendor = 'Vendor is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.purchasePrice || isNaN(formData.purchasePrice) || parseFloat(formData.purchasePrice) < 0) {
      newErrors.purchasePrice = 'Valid purchase price is required';
    }
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const data = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      vendor: formData.vendor.trim(),
      price: parseFloat(formData.price),
      purchasePrice: parseFloat(formData.purchasePrice),
      quantity: parseInt(formData.quantity)
    };

    if (editingProduct) {
      await updateProduct(editingProduct._id, data);
    } else {
      await addProduct(data);
    }
    
    setIsSubmitting(false);
    if (!editingProduct) {
      setFormData({ name: '', category: '', vendor: '', price: '', purchasePrice: '', quantity: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className={`p-6 bg-card border border-border rounded-xl relative overflow-hidden transition-all ${editingProduct ? 'border-l-4 border-l-accent' : ''}`}>
      <h2 className="text-xs font-syne font-extrabold tracking-[0.15em] text-accent uppercase mb-6 flex items-center gap-2">
        {editingProduct && <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />}
        {editingProduct ? 'Edit Product' : 'Add Product'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Industrial Steel Beam"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-danger' : ''}
          />
          {errors.name && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Construction"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'border-danger' : ''}
            />
            {errors.category && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.category}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Vendor</label>
            <input
              type="text"
              name="vendor"
              placeholder="e.g. MetalWorks Inc"
              value={formData.vendor}
              onChange={handleChange}
              className={errors.vendor ? 'border-danger' : ''}
            />
            {errors.vendor && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.vendor}</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Sale Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-mono">₹</span>
              <input
                type="text"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={`pl-8 font-mono ${errors.price ? 'border-danger' : ''}`}
              />
            </div>
            {errors.price && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.price}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Purchase Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-mono">₹</span>
              <input
                type="text"
                name="purchasePrice"
                placeholder="0.00"
                value={formData.purchasePrice}
                onChange={handleChange}
                className={`pl-8 font-mono ${errors.purchasePrice ? 'border-danger' : ''}`}
              />
            </div>
            {errors.purchasePrice && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.purchasePrice}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Stock Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="0"
            value={formData.quantity}
            onChange={handleChange}
            className={`font-mono ${errors.quantity ? 'border-danger' : ''}`}
          />
          {errors.quantity && <span className="text-[10px] text-danger uppercase font-bold tracking-tight">{errors.quantity}</span>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-accent hover:bg-accent-hover text-primary py-4 rounded-lg font-syne font-bold uppercase tracking-[0.1em] flex justify-center items-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            editingProduct ? 'Update Inventory' : 'Add to Inventory'
          )}
        </button>

        {editingProduct && (
          <button 
            type="button"
            onClick={() => setEditingProduct(null)}
            className="w-full border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary py-3 rounded-lg font-medium text-sm transition-all"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
