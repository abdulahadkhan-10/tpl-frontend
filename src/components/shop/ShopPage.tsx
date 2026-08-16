"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Tag, 
  CheckCircle2, 
  Info,
  Star,
  X
} from 'lucide-react';

const tplAction = '/placeholder.png'; // Using placeholder for now

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Kits' | 'Clothing' | 'Accessories' | 'Coaching' | 'Football Cards' | 'Tickets' | 'Photos';
  rating: number;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Digital Delivery';
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const categories = ['All', 'Kits', 'Clothing', 'Accessories', 'Coaching', 'Football Cards', 'Tickets', 'Photos'];

const products: Product[] = [
  { id: 'sh-1', name: 'TPL Official Home Jersey', price: 55.00, category: 'Kits', rating: 4.8, description: 'Official matchday home kit featuring breathable performance fabric, TPL crest, and classic navy colors.', stockStatus: 'In Stock', image: '/images/slider/sliderMen.png' },
  { id: 'sh-2', name: 'TPL Official Away Jersey', price: 55.00, category: 'Kits', rating: 4.7, description: 'Stunning white away jersey detailed with amber-gold stripes and lightweight ventilated materials.', stockStatus: 'In Stock', image: '/images/slider/sliderWomen.png' },
  { id: 'sh-3', name: 'Academy Pro Training Hoodie', price: 45.00, category: 'Clothing', rating: 4.9, description: 'Cozy thermal-insulated fleece hoodie, perfect for cold morning training drills or casual fan wear.', stockStatus: 'Low Stock', image: '/images/tpl_action.png' },
  { id: 'sh-4', name: 'Premium Insulated Flask', price: 15.00, category: 'Accessories', rating: 4.5, description: 'Double-walled stainless steel flask (750ml) designed to keep hydration fluids ice cold for up to 18 hours.', stockStatus: 'In Stock', image: '/images/stadium-bg.png' },
  { id: 'sh-5', name: 'Matchday Scouting Premium Pass', price: 25.00, category: 'Coaching', rating: 5.0, description: 'VIP stadium entry, designated scouting booth seating, and digital player profile booklet for the weekend.', stockStatus: 'Digital Delivery', image: '/images/tpl_banner_bg.png' },
  { id: 'sh-6', name: 'Academy Flex Training Shorts', price: 22.00, category: 'Clothing', rating: 4.4, description: 'Comfortable dry-fit polyester training shorts with zipped utility pockets for mobile/keys.', stockStatus: 'In Stock', image: '/images/slider/image.png' },
  { id: 'sh-7', name: 'TPL Season 1 Collector Card Pack', price: 9.99, category: 'Football Cards', rating: 4.6, description: 'Includes 5 random player cards from U18 divisions, with a guaranteed holographic card in every pack.', stockStatus: 'In Stock', image: '/images/tpl_academy_banner_new.png' },
  { id: 'sh-8', name: 'TPL U18 Premier Cup Final Ticket', price: 12.00, category: 'Tickets', rating: 4.9, description: 'Admit-one e-ticket for the Grand Finals of the U18 Premier Cup at the National Stadium.', stockStatus: 'In Stock', image: '/images/TPL_slider.jpeg' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Framer Motion shared spring config (stable, no wild oscillations)
  const springConfig = { type: 'spring', damping: 20, stiffness: 100 } as const;
  const bouncierSpring = { type: 'spring', damping: 15, stiffness: 120 } as const;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TPLSTART') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code! Try using TPLSTART.');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const generatedId = `TPL-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutComplete(true);
    setCart([]);
    setDiscountPercent(0);
    setPromoApplied(false);
    setPromoCode('');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmt = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmt;

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
              <ShoppingBag size={14} />
              TPL Official Merchandise
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Official Store
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Browse matchday tickets, official football kits, winter jackets, training vests, and scouting passes. Designed for the modern athlete.
            </p>
          </div>
        </motion.div>

        {/* Promotion Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.01, 1],
            boxShadow: [
              "0px 4px 20px rgba(99, 102, 241, 0.15)",
              "0px 4px 35px rgba(99, 102, 241, 0.35)",
              "0px 4px 20px rgba(99, 102, 241, 0.15)"
            ]
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            boxShadow: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
          className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-500/25"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
              <Tag size={20} className="text-amber-400" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Season Kickoff Sale - 20% Off
            </span>
          </div>
          <p className="text-sm font-medium text-slate-300">
            Apply code <span className="bg-black/40 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-widest border border-white/10">TPLSTART</span> at checkout!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Product Grid */}
          <div className="lg:col-span-8 space-y-6">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-200/50">
              {categories.map((cat) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCheckoutComplete(false);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 shadow-sm border border-slate-200'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springConfig}
                    key={prod.id} 
                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between h-[400px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                  >
                    <div>
                      <div className="relative h-48 bg-slate-50 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 left-4 z-20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm border ${
                          prod.stockStatus === 'In Stock' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                          prod.stockStatus === 'Low Stock' ? 'bg-amber-400/90 text-amber-950 border-amber-300' :
                          'bg-indigo-600/90 text-white border-indigo-500'
                        }`}>
                          {prod.stockStatus}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{prod.category}</span>
                          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
                            <Star size={12} className="fill-current" />
                            <span>{prod.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-bold text-slate-900 leading-tight tracking-tight line-clamp-1">
                          {prod.name}
                        </h3>
                        
                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900">${prod.price.toFixed(2)}</span>
                      <motion.button 
                        whileTap={{ scale: 0.92 }}
                        onClick={() => addToCart(prod)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-sm transition-colors"
                      >
                        <Plus size={14} /> Add
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Cart (Translucent Floating Panel) */}
          <div className="lg:col-span-4">
            <motion.div 
              layout
              className="sticky top-24 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_40px_rgb(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <ShoppingCart size={16} className="text-indigo-600" />
                  Your Cart
                </span>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {cart.reduce((s, c) => s + c.quantity, 0)} Items
                </span>
              </div>

              <AnimatePresence mode="wait">
                {checkoutComplete ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-6 text-center space-y-4"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={bouncierSpring}
                      className="mx-auto w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 size={28} />
                    </motion.div>
                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wide">Order Verified!</h4>
                    <p className="text-xs text-emerald-700 font-mono bg-white/50 p-2 rounded-xl border border-emerald-200/50 font-bold">
                      {orderId}
                    </p>
                    <p className="text-xs text-emerald-800/80 font-medium leading-relaxed">
                      Your premium merchandise is being processed. A receipt has been sent to your registered email.
                    </p>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCheckoutComplete(false)}
                      className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-3"
                  >
                    <ShoppingCart className="mx-auto text-slate-300" size={40} />
                    <h4 className="text-sm font-bold text-slate-500">Your cart is empty</h4>
                    <p className="text-xs text-slate-400">Discover premium TPL gear in the store.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={springConfig}
                            key={item.product.id}
                            className="group flex items-center justify-between p-3 bg-white/50 border border-slate-100 rounded-2xl hover:bg-white transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-900 line-clamp-1">{item.product.name}</span>
                                <span className="text-[10px] text-slate-500 font-medium">${item.product.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center bg-slate-100/80 rounded-lg p-0.5">
                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.product.id, -1)} className="p-1 text-slate-500 hover:text-slate-900"><Minus size={10} /></motion.button>
                                <span className="text-[10px] font-bold px-1.5 w-4 text-center">{item.quantity}</span>
                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.product.id, 1)} className="p-1 text-slate-500 hover:text-slate-900"><Plus size={10} /></motion.button>
                              </div>
                              <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                              >
                                <X size={14} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <form onSubmit={applyPromo} className="pt-2 border-t border-slate-200/50">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                          <input 
                            type="text"
                            placeholder="Promo Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 text-xs font-medium placeholder:text-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl transition-colors"
                        >
                          Apply
                        </motion.button>
                      </div>
                      {promoApplied && (
                        <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                          <CheckCircle2 size={12} /> TPLSTART applied (-20%)
                        </motion.span>
                      )}
                    </form>

                    <div className="pt-4 border-t border-slate-200/50 space-y-2 text-xs font-medium text-slate-500">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Discount</span>
                          <span>-${discountAmt.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-black text-slate-900">
                        <span>Total</span>
                        <span className="text-indigo-600">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <ShoppingBag size={14} /> Checkout Securely
                    </motion.button>

                    <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <Info size={12} />
                      <span>Secure transaction via TPL Payment Gateway</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
