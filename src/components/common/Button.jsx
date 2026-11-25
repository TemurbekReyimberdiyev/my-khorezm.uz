import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-[#15528B] text-white hover:bg-[#123A61]',
  secondary: 'bg-[#F7F9FC] text-[#17243B] hover:bg-[#E5EAF0]',
  outline: 'border border-[#15528B] text-[#15528B] hover:bg-[#EBF3FA]',
  ghost: 'text-[#15528B] hover:bg-[#EBF3FA]',
  accent: 'bg-[#C58B43] text-white hover:bg-[#A97534]',
};
const sizes = { sm:'px-3 py-1.5 text-sm', md:'px-4 py-2 text-sm', lg:'px-6 py-3 text-base' };

export default function Button({ children, variant='primary', size='md', href, as, className='', ...props }) {
  const cls = `inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]||variants.primary} ${sizes[size]||sizes.md} ${className}`;
  if (href) return <Link to={href} className={cls}>{children}</Link>;
  const Tag = as || 'button';
  return <Tag className={cls} {...props}>{children}</Tag>;
}
