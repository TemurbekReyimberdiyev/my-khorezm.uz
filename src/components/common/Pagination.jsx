import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ total, perPage, currentPage, onPageChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button onClick={() => onPageChange(currentPage-1)} disabled={currentPage===1}
        className="p-2 rounded-lg border border-[#E5EAF0] text-[#66758A] hover:border-[#15528B] hover:text-[#15528B] disabled:opacity-40">
        <ChevronLeft size={16}/>
      </button>
      {Array.from({length:pages},(_, i) => i+1).map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p===currentPage ? 'bg-[#15528B] text-white' : 'border border-[#E5EAF0] text-[#66758A] hover:border-[#15528B] hover:text-[#15528B]'}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage+1)} disabled={currentPage===pages}
        className="p-2 rounded-lg border border-[#E5EAF0] text-[#66758A] hover:border-[#15528B] hover:text-[#15528B] disabled:opacity-40">
        <ChevronRight size={16}/>
      </button>
    </div>
  );
}
