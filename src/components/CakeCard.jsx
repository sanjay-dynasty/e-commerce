import { Plus } from 'lucide-react';

export default function CakeCard({ cake, onAdd }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
      
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-grow">
          <div className="flex items-center justify-center border border-green-600 w-3.5 h-3.5 rounded-[2px] bg-white p-0.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
          </div>
          
          <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight tracking-wide mb-1">
            {cake.name}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed mb-1 pr-2">
            {cake.description}
          </p>
          <button className="text-[10px] text-gray-800 font-bold border-b border-gray-800 pb-0.5 hover:text-[#d9658b] hover:border-[#d9658b]">
            Read more
          </button>
        </div>

        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 border border-neutral-200">
          <img 
            src={cake.image} 
            alt={cake.name} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              // Fallback image source if network drops out or blocks unsplash assets
              e.target.src = "https://placehold.co";
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
        <span className="text-[14px] font-extrabold text-neutral-900 tracking-wide">
          Rs. {cake.price}
        </span>
        <button 
          onClick={() => onAdd(cake)} 
          className="flex items-center gap-1 border border-neutral-200 text-neutral-500 hover:border-[#d9658b] hover:bg-[#d9658b] hover:text-white px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-white shadow-sm transition-all duration-200"
        >
          <Plus className="w-3 h-3 stroke-[2.5]" /> Add
        </button>
      </div>
      
    </div>
  );
}
