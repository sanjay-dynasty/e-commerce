import { X, Trash2, ShoppingBag, Plus, Minus, ArrowLeft, CheckCircle2, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onClearCart }) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState('cart');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      setCurrentStep('success');
    }
  };

  const handleCloseReset = () => {
    if (currentStep === 'success') {
      onClearCart();
    }
    setCurrentStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={handleCloseReset} />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-neutral-100">
          
          {/* STEP 1: CART REVIEW */}
          {currentStep === 'cart' && (
            <>
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-800 tracking-wider uppercase flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#d9658b]" /> Your Cart ({cartItems.length})
                </h2>
                <button onClick={handleCloseReset} className="p-1 rounded-lg text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 transition-colors cursor-pointer">
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 py-12">
                    <ShoppingBag className="w-10 h-10 mb-2 stroke-[1.25]" />
                    <p className="text-xs font-semibold uppercase tracking-wider">Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-white border border-neutral-200" />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                        <p className="text-xs font-extrabold text-neutral-900 mt-1">Rs. {item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-white border border-neutral-200 hover:bg-neutral-50 cursor-pointer"><Minus className="w-3 h-3 text-neutral-500" /></button>
                          <span className="text-xs font-bold text-neutral-800 px-1">{item.quantity}</span>
                          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-white border border-neutral-200 hover:bg-neutral-50 cursor-pointer"><Plus className="w-3 h-3 text-neutral-500" /></button>
                        </div>
                      </div>
                      <button type="button" onClick={() => onRemove(item.id)} className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"><Trash2 className="w-4 h-4 stroke-[1.5]" /></button>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t border-neutral-100 bg-neutral-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Subtotal</span>
                    <span className="text-lg font-black text-neutral-900">Rs. {totalCost}</span>
                  </div>
                  <button type="button" onClick={() => setCurrentStep('checkout')} className="w-full bg-[#d9658b] hover:bg-[#c55479] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all cursor-pointer">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING INPUT FORM */}
          {currentStep === 'checkout' && (
            <>
              <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
                <button type="button" onClick={() => setCurrentStep('cart')} className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-50 cursor-pointer">
                  <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
                </button>
                <h2 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Delivery Details</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="flex-grow flex flex-col justify-between overflow-hidden">
                <div className="flex-grow overflow-y-auto p-5 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Sanjay Kumar" className="w-full px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Delivery Address</label>
                    <textarea name="address" required rows="3" value={formData.address} onChange={handleInputChange} placeholder="Flat/House No, Building name, Street address" className="w-full px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50 focus:bg-white resize-none" />
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 mt-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Payment Method</span>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-bold bg-white p-3 rounded-lg border border-neutral-200">
                      <CreditCard className="w-4 h-4 text-[#d9658b]" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-neutral-100 bg-neutral-50/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Payable</span>
                    <span className="text-lg font-black text-neutral-900">Rs. {totalCost}</span>
                  </div>
                  <button type="submit" className="w-full bg-black hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all cursor-pointer">
                    Place Order
                  </button>
                </div>
              </form>
            </>
          )}

          {/* STEP 3: SUCCESS PANEL */}
          {currentStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 stroke-[1.25]" />
              <h2 className="text-xl font-serif-theobroma font-bold text-gray-900 mb-1">Order Confirmed!</h2>
              <p className="text-xs text-[#d9658b] font-bold tracking-wider uppercase mb-4">Order Received Successfully</p>
              <div className="bg-[#a3d9cf]/10 border border-[#a3d9cf]/40 p-4 rounded-2xl max-w-sm mb-8 text-left text-xs text-gray-700">
                <p><strong>Thank you for ordering!</strong> Your handcrafted treats are being prepared.</p>
              </div>
              <button type="button" onClick={handleCloseReset} className="border border-neutral-800 text-neutral-800 hover:bg-neutral-900 hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all cursor-pointer">
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
