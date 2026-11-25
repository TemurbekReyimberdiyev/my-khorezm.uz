export default function LoadingSpinner({ size = 'md' }) {
  const s = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  return (
    <div className="flex items-center justify-center py-16">
      <div className={`${s} border-3 border-[#E5EAF0] border-t-[#15528B] rounded-full animate-spin`}/>
    </div>
  );
}
