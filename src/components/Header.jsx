import { Search, MapPin, User, LogOut, ShoppingBag } from 'lucide-react';

export default function Header({ cartCount, searchQuery, onSearchChange, activeTab, onTabSelect, onCartOpen, onLoginOpen, userSession, onLogout }) {
  const links = ['Home', 'About Us', 'Products', 'Order Now', 'Contact'];

  return (
    <header className="w-full">
      <div className="bg-[#d9658b] text-white text-center py-2.5 text-[11px] font-semibold tracking-wider uppercase">
        Level Up Your Celebrations With Handcrafted Delights! 
      </div>
      
      <div className="bg-[#a3d9cf]/40 px-8 py-3.5 flex items-center justify-between gap-6 border-b border-[#a3d9cf]/20">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onTabSelect('Home')}>
          <span className="text-4xl font-serif-theobroma text-[#d9658b] font-bold tracking-tight lowercase">theobroma</span>
        </div>
        
        <div className="flex-grow max-w-xl relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for items, collections or pages..." 
            className="w-full pl-5 pr-12 py-2 rounded-md bg-white border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50" 
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-4 top-2.5 stroke-[1.5]" />
        </div>
        
        <div className="flex items-center gap-7 text-[13px] text-gray-700 font-medium tracking-wide">
          <button className="flex items-center gap-1.5 hover:text-[#d9658b]"><MapPin className="w-4 h-4 stroke-[1.5]" /> Track</button>
          
          {userSession ? (
            <div className="flex items-center gap-3 bg-white/60 border border-[#a3d9cf]/40 pl-3 pr-2 py-1 rounded-full text-xs font-bold text-gray-800">
              <span className="capitalize text-[11px]">Hi, {userSession}</span>
              <button onClick={onLogout} className="p-1 rounded-full bg-neutral-100 hover:bg-red-50 hover:text-red-500 transition-colors" title="Logout">
                <LogOut className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          ) : (
            <button onClick={onLoginOpen} className="flex items-center gap-1.5 hover:text-[#d9658b] cursor-pointer">
              <User className="w-4 h-4 stroke-[1.5]" /> Login
            </button>
          )}
          
          <button 
            onClick={onCartOpen}
            className="bg-black text-white px-5 py-2.5 rounded flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Cart 
            <span className="ml-1 bg-[#d9658b] text-white px-1.5 py-0.5 rounded-full text-[10px]">{cartCount}</span>
          </button>
        </div>
      </div>

      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-600">
          {links.map((tab) => {
            const isTabActive = tab.toLowerCase() === activeTab.toLowerCase();
            return (
              <button 
                key={tab}
                onClick={() => onTabSelect(tab)}
                className={isTabActive ? "transition-all pb-0.5 cursor-pointer text-[#d9658b] border-b-2 border-[#d9658b]" : "transition-all pb-0.5 cursor-pointer text-gray-600 hover:text-[#d9658b]"}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
