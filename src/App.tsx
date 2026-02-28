import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Star,
  ArrowRight,
  Search
} from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";

/**
 * Jinu Creation - Handmade Home Decor
 * A premium React frontend for an artisanal Indian brand.
 */

// --- Types & Interfaces ---
type Category = "All" | "Wall Decor" | "Toran" | "Crafts";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Constants & Data ---
const WHATSAPP_NUMBER = "919876543210"; // Placeholder business number

const TESTIMONIALS = [
  { id: 1, name: "Ananya Sharma", text: "The Toran I ordered is absolutely stunning! It adds such a festive and traditional touch to my entrance.", role: "Interior Designer", rating: 5 },
  { id: 2, name: "Rahul Verma", text: "Exceptional quality. You can really feel the love and effort put into these handmade crafts.", role: "Homeowner", rating: 5 },
  { id: 3, name: "Priya Patel", text: "Beautifully packaged and delivered on time. The wall hanging is the highlight of my living room.", role: "Art Enthusiast", rating: 4 },
];

// --- Utility Functions ---
const openWhatsApp = (items: CartItem[] | string) => {
  let message = "";
  if (typeof items === "string") {
    message = `Hi, I'm interested in ${items} from Jinu Creation.`;
  } else {
    const itemList = items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`).join("\n");
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message = `Hi Jinu Creation, I'd like to order:\n${itemList}\n\nTotal: ₹${total}\n\nPlease confirm availability!`;
  }
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
};

// --- Components ---

/**
 * Navbar Component
 */
const Navbar = ({ cartCount, onOpenCart, activePage, onPageChange }: { 
  cartCount: number, 
  onOpenCart: () => void,
  activePage: string,
  onPageChange: (page: string) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home" },
    { name: "Products" },
    { name: "About" },
    { name: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => onPageChange("Home")} className="font-serif text-2xl font-bold tracking-tight text-brand-ink group">
          Jinu <span className="text-brand-clay italic group-hover:text-brand-ink transition-colors">Creation</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => onPageChange(link.name)} 
              className={`transition-colors relative group ${activePage === link.name ? "text-brand-clay" : "hover:text-brand-clay"}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-clay transition-all duration-300 ${activePage === link.name ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </button>
          ))}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenCart}
              className="p-2 hover:bg-brand-clay/10 rounded-full transition-colors relative group"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-clay text-white text-[10px] flex items-center justify-center rounded-full font-black animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={onOpenCart} className="p-2 relative">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-clay text-white text-[8px] flex items-center justify-center rounded-full font-black">
                {cartCount}
              </span>
            )}
          </button>
          <button className="p-2 text-brand-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-brand-ink/5 overflow-hidden"
          >
            <div className="flex flex-col space-y-6 p-8 text-center font-bold uppercase tracking-widest text-sm">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    onPageChange(link.name);
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`transition-colors ${activePage === link.name ? "text-brand-clay" : "hover:text-brand-clay"}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/**
 * Toast Notification Component
 */
const Toast = ({ message, isVisible }: { message: string, isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-brand-ink text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm uppercase tracking-widest"
      >
        <div className="w-6 h-6 bg-brand-clay rounded-full flex items-center justify-center text-[10px]">✓</div>
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * Cart Drawer Component
 */
const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemove: (id: number) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-ink/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-ink">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="text-lg font-light">Your cart is empty</p>
                  <button onClick={onClose} className="text-brand-clay font-bold uppercase tracking-widest text-xs">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-bold text-brand-ink text-sm">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-brand-ink/20 hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-brand-ink/40 uppercase tracking-widest mt-1">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-brand-ink/10 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 hover:bg-brand-cream transition-colors"
                          >-</button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 hover:bg-brand-cream transition-colors"
                          >+</button>
                        </div>
                        <p className="font-serif font-medium">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-brand-cream border-t border-brand-ink/5 space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-brand-ink/60 uppercase tracking-widest text-xs font-bold">Subtotal</p>
                  <p className="text-2xl font-serif font-bold">₹{total}</p>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-5 bg-brand-ink text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-brand-clay transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-brand-ink/20"
                >
                  <MessageCircle size={18} />
                  Checkout on WhatsApp
                </button>
                <p className="text-[10px] text-center text-brand-ink/40 uppercase tracking-widest">Free shipping on all handmade orders</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * Hero Section
 */
const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-brand-ink">
          Handmade with <br />
          <span className="text-brand-clay italic font-serif font-light">Love</span> for Your Home
        </h1>
        <p className="text-lg text-brand-ink/60 max-w-lg mb-12 leading-relaxed font-light">
          Experience the warmth of Indian craftsmanship. Our premium handmade collections 
          bring timeless elegance and a personal touch to every corner of your sanctuary.
        </p>
        <div className="flex flex-wrap gap-6">
          <button onClick={onShopNow} className="group px-10 py-5 bg-brand-ink text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-brand-clay transition-all duration-500 flex items-center gap-3 shadow-xl shadow-brand-ink/20">
            Shop Now
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="px-10 py-5 border border-brand-ink/10 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:border-brand-ink transition-all duration-500">
            Our Story
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative px-4"
      >
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
          <img 
            src="https://loremflickr.com/1000/1250/interior,decor,handmade" 
            className="w-full h-full object-cover"
            alt="Handmade Decor"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/20 to-transparent"></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-clay/10 rounded-full -z-0 blur-2xl"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 border-2 border-brand-clay/20 rounded-full -z-0"></div>
      </motion.div>
    </div>
  </section>
);

/**
 * Product Section
 */
const ProductSection = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [filter, setFilter] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const categories: Category[] = ["All", "Wall Decor", "Toran", "Crafts"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === "All" || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="products" className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-cream/0 to-white/80"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-brand-ink">Our Creations</h2>
            <p className="text-brand-ink/50 text-lg font-light mb-8">
              Each piece is uniquely handcrafted to bring a touch of tradition and elegance to your modern home.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/30" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-brand-cream border border-brand-ink/5 focus:border-brand-clay outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  filter === cat 
                    ? "bg-brand-clay text-white shadow-lg shadow-brand-clay/30 scale-105" 
                    : "bg-brand-cream text-brand-ink/60 hover:bg-brand-sage hover:text-brand-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-clay border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  key={product.id}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-[2rem] rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden mb-6 bg-brand-cream shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-clay/20 transition-all duration-700">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-brand-clay shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="bg-white text-brand-ink px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-brand-clay hover:text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 px-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-clay transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-xl font-serif font-medium text-brand-ink">₹{product.price}</p>
                    </div>
                    
                    <button 
                      onClick={() => openWhatsApp(product.name)}
                      className="w-full py-4 bg-brand-cream text-brand-ink rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-500 hover:text-white transition-all duration-500 group/btn"
                    >
                      <MessageCircle size={16} className="group-hover/btn:animate-bounce" />
                      Order on WhatsApp
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * About Section
 */
const About = () => (
  <section id="about" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-brand-sage/10 backdrop-blur-sm -z-10"></div>
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
      <div className="relative">
        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-square">
          <img src="https://loremflickr.com/800/800/artisan,craft,hands" alt="Artisan at work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-rose rounded-[3rem] -z-0 rotate-12"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-white rounded-full -z-0"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-10 text-brand-ink leading-tight">
          Crafting <span className="text-brand-clay italic font-serif">Soul</span> <br /> into Every Piece
        </h2>
        <div className="space-y-8 text-brand-ink/60 text-lg font-light leading-relaxed">
          <p>
            Jinu Creation was born from a simple belief: that every home deserves a touch of 
            the human spirit. In a world of mass-produced items, we celebrate the beauty of 
            imperfection and the warmth of handmade art.
          </p>
          <p>
            Our journey began in a small home studio in Jaipur, fueled by a passion for traditional 
            Indian crafts and a vision to blend them with modern aesthetics. Today, we work with 
            skilled artisans to bring you decor that isn't just beautiful—it's meaningful.
          </p>
          <div className="pt-6 border-t border-brand-ink/10">
            <p className="font-serif text-2xl italic text-brand-clay mb-2">"Handmade isn't just a process; it's a promise."</p>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-ink/40">— Jinu S., Founder</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/**
 * Testimonials Section
 */
const Testimonials = () => (
  <section className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-brand-ink">Customer Stories</h2>
        <p className="text-brand-ink/40 text-lg font-light">The love we receive from our community keeps us inspired.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-10 rounded-[2.5rem] bg-brand-cream/50 border border-brand-ink/5 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, idx) => (
                <Star 
                  key={idx} 
                  size={16} 
                  className={idx < t.rating ? "fill-brand-clay text-brand-clay" : "text-brand-ink/10"} 
                />
              ))}
            </div>
            <p className="text-brand-ink/70 italic mb-10 text-lg leading-relaxed font-light">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-sage flex items-center justify-center font-bold text-brand-clay">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-brand-ink">{t.name}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-ink/30">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Contact Section
 */
const Contact = ({ onShowToast }: { onShowToast: (msg: string) => void }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onShowToast("Message Submitted Successfully!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-brand-mustard/5 -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 text-brand-ink">Let's Connect</h2>
          <p className="text-brand-ink/50 text-lg font-light mb-12">
            Have a custom request or want to collaborate? Reach out to us and let's create something beautiful together.
          </p>
          
          <div className="space-y-10">
            {[
              { icon: Mail, label: "Email Us", value: "hello@jinucreation.com" },
              { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
              { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-clay shadow-sm group-hover:scale-110 group-hover:bg-brand-clay group-hover:text-white transition-all duration-500">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/30 mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-brand-ink">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-brand-ink/5">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/40 ml-2">Your Name</label>
              <input required type="text" className="w-full px-8 py-5 rounded-2xl bg-brand-cream/50 border border-transparent focus:border-brand-clay focus:bg-white outline-none transition-all duration-500" placeholder="Enter your name" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/40 ml-2">Email Address</label>
              <input required type="email" className="w-full px-8 py-5 rounded-2xl bg-brand-cream/50 border border-transparent focus:border-brand-clay focus:bg-white outline-none transition-all duration-500" placeholder="Enter your email" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/40 ml-2">Your Message</label>
              <textarea required rows={4} className="w-full px-8 py-5 rounded-2xl bg-brand-cream/50 border border-transparent focus:border-brand-clay focus:bg-white outline-none transition-all duration-500 resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full py-6 bg-brand-ink text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-brand-clay transition-all duration-500 shadow-xl shadow-brand-ink/20">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Component
 */
const Footer = ({ onPageChange }: { onPageChange: (page: string) => void }) => (
  <footer className="py-20 bg-brand-ink text-white/90">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <button onClick={() => onPageChange("Home")} className="font-serif text-4xl font-bold tracking-tight text-white mb-8 block">
            Jinu <span className="text-brand-clay italic">Creation</span>
          </button>
          <p className="text-white/40 max-w-sm mb-10 leading-relaxed font-light">
            Bringing the soul of Indian craftsmanship to your modern living spaces. 
            Handmade with love, delivered with care.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, href: "https://instagram.com/jinucreation", label: "Instagram" },
              { Icon: Facebook, href: "https://facebook.com/jinucreation", label: "Facebook" },
              { Icon: Mail, href: "mailto:hello@jinucreation.com", label: "Email" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-clay hover:border-brand-clay transition-all duration-500 group"
              >
                <social.Icon size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/40">Explore</h4>
          <ul className="space-y-5 text-sm font-bold">
            <li><button onClick={() => onPageChange("Home")} className="hover:text-brand-clay transition-colors">Home</button></li>
            <li><button onClick={() => onPageChange("Products")} className="hover:text-brand-clay transition-colors">Shop All</button></li>
            <li><button onClick={() => onPageChange("About")} className="hover:text-brand-clay transition-colors">Our Story</button></li>
            <li><button onClick={() => onPageChange("Contact")} className="hover:text-brand-clay transition-colors">Contact</button></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
        <p>© 2024 Jinu Creation. Handcrafted in India.</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * Floating WhatsApp Button
 */
const FloatingWhatsApp = () => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => openWhatsApp("general inquiry")}
    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
  >
    <MessageCircle size={32} />
    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
  </motion.button>
);

/**
 * Background Decoration Component
 * Renders colorful, floating abstract shapes for an artistic feel.
 */
const BackgroundDecor = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        x: [0, 100, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="art-blob w-[500px] h-[500px] bg-brand-mustard -top-20 -left-20"
    />
    <motion.div 
      animate={{ 
        x: [0, -80, 0], 
        y: [0, 100, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="art-blob w-[400px] h-[400px] bg-brand-teal bottom-40 -right-20"
    />
    <motion.div 
      animate={{ 
        x: [0, 50, 0], 
        y: [0, -100, 0],
        scale: [1, 1.3, 1]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="art-blob w-[600px] h-[600px] bg-brand-terracotta top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
    />
    <div className="absolute inset-0 bg-brand-cream/40 backdrop-blur-[120px]"></div>
  </div>
);


/**
 * Main App Component
 */
export default function JinuCreation() {
  const [activePage, setActivePage] = useState("Home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: "", visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    openWhatsApp(cart);
    showToast("Order Placed Successfully!");
    setCart([]);
    setIsCartOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    switch (activePage) {
      case "Home": return <Hero onShopNow={() => setActivePage("Products")} />;
      case "Products": return <ProductSection onAddToCart={addToCart} />;
      case "About": return <About />;
      case "Contact": return <Contact onShowToast={showToast} />;
      default: return <Hero onShopNow={() => setActivePage("Products")} />;
    }
  };

  return (
    <div className="selection:bg-brand-clay selection:text-white scroll-smooth grain min-h-screen designer-bg relative">
      <div className="fixed inset-0 grid-pattern pointer-events-none"></div>
      <BackgroundDecor />
      
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Testimonials />
      <Footer onPageChange={setActivePage} />
      <FloatingWhatsApp />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Toast message={toast.message} isVisible={toast.visible} />
    </div>
  );
}


