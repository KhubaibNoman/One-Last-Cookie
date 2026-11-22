'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, X, Upload, Check } from 'lucide-react';
import { formatPrice, slugify } from '@/lib/utils';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  basePrice?: string | null;
  salePrice?: string | null;
  description: string | null;
  imageUrl: string | null;
  inStock: boolean;
  featured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [form, setForm] = useState({
    name: '', basePrice: '', salePrice: '', description: '', imageUrl: '', inStock: true, featured: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const openCreate = () => {
    setEditProduct(null);
    setForm({ name: '', basePrice: '', salePrice: '', description: '', imageUrl: '', inStock: true, featured: false });
    setUploadError('');
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      basePrice: p.basePrice || p.price,
      salePrice: p.salePrice || '',
      description: p.description || '',
      imageUrl: p.imageUrl || '',
      inStock: p.inStock,
      featured: p.featured,
    });
    setUploadError('');
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        setUploadError(data.error || 'Failed to upload image');
      }
    } catch {
      setUploadError('Network error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const effectivePrice = form.salePrice && parseFloat(form.salePrice) > 0
      ? parseFloat(form.salePrice).toFixed(2)
      : parseFloat(form.basePrice || '0').toFixed(2);

    const payload = {
      name: form.name,
      slug: slugify(form.name),
      price: effectivePrice,
      basePrice: form.basePrice ? parseFloat(form.basePrice).toFixed(2) : null,
      salePrice: form.salePrice ? parseFloat(form.salePrice).toFixed(2) : null,
      description: form.description,
      imageUrl: form.imageUrl,
      inStock: form.inStock,
      featured: form.featured,
    };

    if (editProduct) {
      await fetch(`/api/products/${editProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    setShowModal(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-4xl text-[#1C1008] mb-1">Products</h1>
          <p className="text-[#8B7355] text-sm">{products.length} items in catalog</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#1C1008] text-[#F9F5EE] px-5 py-3 text-xs tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#1C1008] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E]" />
        </div>
      ) : (
        <div className="bg-white border border-[#C9A96E]/20 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#C9A96E]/20 bg-[#F9F5EE]">
                {['Product', 'Price', 'Stock', 'Featured', 'Actions'].map((h) => (
                  <th key={h} className={`px-6 py-4 text-xs tracking-widest uppercase text-[#8B7355] ${h === 'Price' || h === 'Actions' ? 'text-right' : 'text-left'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#C9A96E]/10 last:border-0 hover:bg-[#F9F5EE]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-[#C9A96E]/10 flex items-center justify-center rounded text-lg">🥐</div>
                      )}
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-[#8B7355]">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.salePrice && parseFloat(p.salePrice) > 0 && parseFloat(p.salePrice) < parseFloat(p.basePrice || p.price) ? (
                      <div className="flex flex-col items-end">
                        <span className="line-through text-stone-400 text-xs font-mono">
                          {formatPrice(p.basePrice || p.price)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-display text-base font-semibold text-emerald-700">
                            {formatPrice(p.salePrice)}
                          </span>
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Sale
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="font-display text-[#9E6B1F] font-bold text-base">
                        {formatPrice(p.basePrice || p.price)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.featured && <span className="text-xs px-2 py-0.5 bg-[#C9A96E]/20 text-[#8B7355] rounded">Featured</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 hover:text-[#C9A96E] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#8B7355] hover:text-[#1C1008]">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-display text-2xl mb-6">{editProduct ? 'Edit Product' : 'New Product'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Pistachio Cardamom Cookie"
                  required
                  className="w-full border border-[#C9A96E]/30 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-1 font-medium">
                    Base Price (PKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                    placeholder="650"
                    required
                    className="w-full border border-[#C9A96E]/30 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                  />
                  <p className="text-[10px] text-[#8B7355] mt-1">Regular price in PKR (e.g. 650)</p>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-1 font-medium flex items-center justify-between">
                    <span>Sale Price (PKR)</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold uppercase">Optional</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={form.salePrice}
                    onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                    placeholder="550"
                    className="w-full border border-[#C9A96E]/30 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                  />
                  <p className="text-[10px] text-[#8B7355] mt-1">Discounted price (strikethrough base)</p>
                </div>
              </div>

              {form.salePrice && parseFloat(form.salePrice) > 0 && parseFloat(form.basePrice || '0') > parseFloat(form.salePrice) && (
                <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded flex items-center justify-between text-xs text-amber-900">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Sale Preview:</span>
                    <span className="line-through text-stone-400 font-mono">Rs. {parseFloat(form.basePrice).toLocaleString()}</span>
                    <span className="text-emerald-700 font-bold">Rs. {parseFloat(form.salePrice).toLocaleString()}</span>
                  </span>
                  <span className="bg-amber-200/60 text-amber-900 font-semibold px-2 py-0.5 rounded text-[11px]">
                    {Math.round((1 - parseFloat(form.salePrice) / parseFloat(form.basePrice)) * 100)}% OFF
                  </span>
                </div>
              )}

              {/* Direct Photo Upload */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-1.5 font-medium">
                  Product Image
                </label>

                {form.imageUrl ? (
                  <div className="relative border border-[#C9A96E]/40 rounded-lg p-3 bg-[#FAF8F5] flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden border border-[#C9A96E]/30 shrink-0 bg-white shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-[#1C1008] truncate">{form.imageUrl}</p>
                      <p className="text-[10px] text-emerald-600 flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Image uploaded & ready
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: '' })}
                      className="p-1.5 text-stone-400 hover:text-red-500 rounded hover:bg-stone-200/50 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-[#C9A96E]/40 hover:border-[#C9A96E] rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#C9A96E]" />
                        <span className="text-xs text-[#8B7355]">Uploading image from your device…</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center py-2">
                        <div className="w-9 h-9 rounded-full bg-[#C9A96E]/15 flex items-center justify-center text-[#C9A96E] mb-2 group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-medium text-[#1C1008]">
                          Click to upload image directly from your computer
                        </p>
                        <p className="text-[10px] text-[#8B7355] mt-0.5">
                          PNG, JPG, WebP supported
                        </p>
                      </div>
                    )}
                  </label>
                )}

                {uploadError && (
                  <p className="text-xs text-red-500 mt-1">{uploadError}</p>
                )}
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-[#C9A96E]/30 px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="accent-[#C9A96E]" />
                  <span className="text-sm text-[#8B7355]">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#C9A96E]" />
                  <span className="text-sm text-[#8B7355]">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#1C1008] text-[#F9F5EE] py-3 text-xs tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#1C1008] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editProduct ? 'Save Changes' : 'Create Product'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-6 border border-[#C9A96E]/30 text-sm text-[#8B7355] hover:border-[#C9A96E] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
