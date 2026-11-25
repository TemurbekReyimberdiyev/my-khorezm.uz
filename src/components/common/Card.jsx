import { Link } from 'react-router-dom';

export default function Card({
  image,
  imageAlt = '',
  category,
  title,
  subtitle,
  description,
  footer,
  href,
  horizontal = false,
  className = '',
  children,
  onClick,
}) {
  const isClickable = href || onClick;

  const content = (
    <>
      {image && (
        <div className={`overflow-hidden ${horizontal ? 'w-24 sm:w-36 flex-shrink-0' : 'rounded-t-xl'}`}>
          <img
            src={image}
            alt={imageAlt}
            className={`
              w-full object-cover transition-transform duration-300 group-hover:scale-105
              ${horizontal ? 'h-full min-h-[80px] rounded-l-xl' : 'h-48'}
            `}
          />
        </div>
      )}
      <div className={`${horizontal ? 'flex-1 p-4' : 'p-5'} flex flex-col gap-1.5`}>
        {category && (
          <span className="text-xs font-semibold text-[#15528B] uppercase tracking-wide">
            {category}
          </span>
        )}
        {title && (
          <h3 className="text-base font-semibold text-[#17243B] leading-snug line-clamp-2">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-xs text-[#66758A]">{subtitle}</p>
        )}
        {description && (
          <p className="text-sm text-[#66758A] leading-relaxed line-clamp-3 mt-1">
            {description}
          </p>
        )}
        {children}
        {footer && (
          <div className="mt-auto pt-3 border-t border-[#E5EAF0]">
            {footer}
          </div>
        )}
      </div>
    </>
  );

  const baseClass = `
    group bg-white border border-[#E5EAF0] rounded-xl shadow-sm
    transition-all duration-200
    ${isClickable ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''}
    ${horizontal ? 'flex flex-row' : 'flex flex-col'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (href) {
    return (
      <Link to={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClass} onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}
