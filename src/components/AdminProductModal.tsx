import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, FlaskConical, Droplets } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSaveProduct: (product: Product) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSaveProduct
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'milk',
    tag: '',
    shortDesc: '',
    fullDesc: '',
    price: 399,
    originalPrice: 599,
    testsCount: 20,
    detects: ['Detergent', 'Urea', 'Starch'],
    testDurationSeconds: 45,
    preOrderBatch: 'Batch #1 - Launch Edition',
    estimatedDelivery: 'Dispatches by Sept 15, 2026',
    inStock: true,
    active: true,
    solutionName: 'Milawat Proof™ Chemical Testing Solution',
    solutionVialType: '20x Pre-filled 10ml Solution Vials',
    colorReaction: {
      pureColor: 'Natural Pale Green / Clear Cream',
      pureColorHex: '#10B981',
      pureColorClass: 'bg-emerald-500 text-white',
      pureDescription: 'Chemical solution stays natural clear green. Safe pure dairy.',
      adulteratedColor: 'Deep Crimson Red',
      adulteratedColorHex: '#EF4444',
      adulteratedColorClass: 'bg-red-600 text-white',
      adulteratedDescription: 'Chemical solution turns vivid crimson red upon contacting adulterants.'
    },
    chemicalReactionDetails: 'Add product sample directly into the chemical solution vial to trigger instant color shift.'
  });

  const [detectInput, setDetectInput] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({
        id: `prod-${Date.now()}`,
        name: '',
        category: 'milk',
        tag: 'New Kit',
        shortDesc: '',
        fullDesc: '',
        price: 399,
        originalPrice: 599,
        testsCount: 20,
        detects: ['Detergent', 'Urea', 'Starch'],
        testDurationSeconds: 45,
        preOrderBatch: 'Batch #1 - Launch Edition',
        estimatedDelivery: 'Dispatches by Sept 15, 2026',
        inStock: true,
        active: true,
        solutionName: 'Milawat Proof™ Chemical Testing Solution',
        solutionVialType: '20x Pre-filled 10ml Solution Vials',
        colorReaction: {
          pureColor: 'Natural Pale Green / Clear Cream',
          pureColorHex: '#10B981',
          pureColorClass: 'bg-emerald-500 text-white',
          pureDescription: 'Chemical solution stays natural clear green. Safe pure dairy.',
          adulteratedColor: 'Deep Crimson Red',
          adulteratedColorHex: '#EF4444',
          adulteratedColorClass: 'bg-red-600 text-white',
          adulteratedDescription: 'Chemical solution turns vivid crimson red upon contacting adulterants.'
        },
        chemicalReactionDetails: 'Add product sample directly into the chemical solution vial to trigger instant color shift.'
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddDetect = () => {
    if (detectInput.trim() && formData.detects) {
      setFormData({
        ...formData,
        detects: [...formData.detects, detectInput.trim()]
      });
      setDetectInput('');
    }
  };

  const handleRemoveDetect = (index: number) => {
    if (formData.detects) {
      setFormData({
        ...formData,
        detects: formData.detects.filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const finalProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: formData.name || 'Untitled Chemical Solution Kit',
      category: formData.category || 'milk',
      tag: formData.tag || '',
      shortDesc: formData.shortDesc || '',
      fullDesc: formData.fullDesc || '',
      price: Number(formData.price) || 399,
      originalPrice: Number(formData.originalPrice) || 599,
      testsCount: Number(formData.testsCount) || 10,
      detects: formData.detects && formData.detects.length > 0 ? formData.detects : ['Food Adulterants'],
      testDurationSeconds: Number(formData.testDurationSeconds) || 45,
      preOrderBatch: formData.preOrderBatch || 'Batch #1',
      estimatedDelivery: formData.estimatedDelivery || 'Dispatches soon',
      inStock: formData.inStock ?? true,
      active: formData.active ?? true,
      solutionName: formData.solutionName || 'Milawat Proof™ Chemical Testing Solution',
      solutionVialType: formData.solutionVialType || 'Pre-filled Solution Vials',
      colorReaction: formData.colorReaction || {
        pureColor: 'Natural Clear',
        pureColorHex: '#10B981',
        pureColorClass: 'bg-emerald-500 text-white',
        pureDescription: 'Solution stays clear.',
        adulteratedColor: 'Deep Crimson Red',
        adulteratedColorHex: '#EF4444',
        adulteratedColorClass: 'bg-red-600 text-white',
        adulteratedDescription: 'Solution turns crimson red.'
      },
      chemicalReactionDetails: formData.chemicalReactionDetails || 'Chemical reaction indicates presence of adulteration.'
    };

    onSaveProduct(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="admin-product-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative"
      >
        <div className="bg-[#FAF8F5] p-5 border-b border-[#111827]/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#111827] flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-[#E53935]" />
              <span>{productToEdit ? 'Edit Chemical Solution Kit' : 'Add New Chemical Solution Kit'}</span>
            </h2>
            <p className="text-xs text-[#111827]/70">
              Configure product details, chemical solution vials, color shift reactions, and pricing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#111827]/60 hover:text-[#111827] rounded-full hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Kit Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Milawat Proof™ Milk Chemical Solution Rapid Testing Kit"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Category *
              </label>
              <select
                value={formData.category || 'milk'}
                onChange={e => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              >
                <option value="milk">🥛 Milk Solution Vials</option>
                <option value="paneer">🧀 Paneer & Dairy Solids</option>
                <option value="ghee">🧈 Desi Ghee & Butter</option>
                <option value="combo">🛡️ Combo Master Pack</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Badge / Tag (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Bestseller / Launch Deal"
                value={formData.tag || ''}
                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Pre-Order Price (₹) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.price ?? 399}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Original MRP (₹) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.originalPrice ?? 599}
                onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Total Chemical Solution Vials
              </label>
              <input
                type="number"
                min={1}
                value={formData.testsCount ?? 20}
                onChange={e => setFormData({ ...formData, testsCount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Color Reaction Time (Seconds)
              </label>
              <input
                type="number"
                min={10}
                value={formData.testDurationSeconds ?? 45}
                onChange={e => setFormData({ ...formData, testDurationSeconds: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Chemical Solution Active Reagent Name
              </label>
              <input
                type="text"
                placeholder="e.g. Milawat Proof™ Chromogenic Surfactant-Reactive Solution"
                value={formData.solutionName || ''}
                onChange={e => setFormData({ ...formData, solutionName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Solution Vial Packaging Specification
              </label>
              <input
                type="text"
                placeholder="e.g. 20x Calibrated 10ml Ready-to-Use Solution Vials + Precision Pipette"
                value={formData.solutionVialType || ''}
                onChange={e => setFormData({ ...formData, solutionVialType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Chemical Solution Color Reaction Fields */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#111827]/10 space-y-3">
            <span className="text-xs font-bold uppercase text-[#111827] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#E53935]" />
              Chemical Solution Color Reaction Settings
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-emerald-800 mb-1">
                  Pure Sample Color Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Natural Pale Green / Clear Cream"
                  value={formData.colorReaction?.pureColor || ''}
                  onChange={e => setFormData({
                    ...formData,
                    colorReaction: {
                      ...formData.colorReaction!,
                      pureColor: e.target.value
                    }
                  })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-red-800 mb-1">
                  Adulterated Sample Color Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deep Crimson Red / Purple"
                  value={formData.colorReaction?.adulteratedColor || ''}
                  onChange={e => setFormData({
                    ...formData,
                    colorReaction: {
                      ...formData.colorReaction!,
                      adulteratedColor: e.target.value
                    }
                  })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-red-300 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                  Reaction Chemistry Details
                </label>
                <input
                  type="text"
                  placeholder="Explain how putting product in solution causes color shift..."
                  value={formData.chemicalReactionDetails || ''}
                  onChange={e => setFormData({ ...formData, chemicalReactionDetails: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#111827]/20 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Short Description *
            </label>
            <input
              type="text"
              required
              placeholder="Brief 1-line benefit for product cards"
              value={formData.shortDesc || ''}
              onChange={e => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Full Description & Solution Overview
            </label>
            <textarea
              rows={3}
              placeholder="Detailed description for customers"
              value={formData.fullDesc || ''}
              onChange={e => setFormData({ ...formData, fullDesc: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
            />
          </div>

          {/* Detects List */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Adulterants Detected
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Detergent, Urea, Starch"
                value={detectInput}
                onChange={e => setDetectInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDetect();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#111827]/20"
              />
              <button
                type="button"
                onClick={handleAddDetect}
                className="px-3 py-1.5 bg-[#111827] text-white text-xs font-bold rounded-lg hover:bg-[#111827]/90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.detects?.map((d, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#E53935] border border-red-200 px-2 py-0.5 rounded-md"
                >
                  <span>{d}</span>
                  <button type="button" onClick={() => handleRemoveDetect(i)} className="hover:text-red-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Active / In Stock Switches */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#111827]">
              <input
                type="checkbox"
                checked={formData.active ?? true}
                onChange={e => setFormData({ ...formData, active: e.target.checked })}
                className="rounded text-[#16A34A] focus:ring-[#16A34A]"
              />
              <span>Published / Visible to Customers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#111827]">
              <input
                type="checkbox"
                checked={formData.inStock ?? true}
                onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded text-[#16A34A] focus:ring-[#16A34A]"
              />
              <span>Pre-order Stock Open</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#111827]/10 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-[#FAF8F5] rounded-lg border border-[#111827]/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#111827] hover:bg-[#111827]/90 rounded-lg shadow-sm"
            >
              {productToEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
