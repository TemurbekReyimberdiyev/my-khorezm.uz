const variants = {
  primary: 'bg-[#EBF3FA] text-[#15528B]',
  accent: 'bg-[#FFF3E0] text-[#C58B43]',
  success: 'bg-[#E8F5EE] text-[#319568]',
  gray: 'bg-[#F7F9FC] text-[#66758A]',
  red: 'bg-red-50 text-red-600',
  purple: 'bg-purple-50 text-purple-600',
};
export default function Badge({ children, variant='primary', className='' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]||variants.gray} ${className}`}>
      {children}
    </span>
  );
}
