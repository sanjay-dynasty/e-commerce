export default function Sidebar({ categories, activeCategory, onCategorySelect }) {
  return (
    <aside className="w-60 flex-shrink-0 bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm self-start">
      <h2 className="text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-3 tracking-wide">
        Categories
      </h2>
      <ul className="space-y-0.5">
        {categories.map((cat, index) => {
          const isActive = cat.name.toLowerCase() === activeCategory.toLowerCase();
          return (
            <li 
              key={index} 
              onClick={() => onCategorySelect(cat.name)}
              className={isActive 
                ? "flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg cursor-pointer bg-neutral-50 text-gray-900 border-l-4 border-gray-800" 
                : "flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50/50 hover:text-gray-800 transition-colors"
              }
            >
              <span className={isActive ? "active-category-line" : ""}>{cat.name}</span>
              <span className="text-gray-400 text-[11px] font-normal">{cat.count}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

