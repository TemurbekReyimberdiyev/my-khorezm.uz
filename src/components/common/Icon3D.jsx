export default function Icon3D({ name, alt = '', size = 24, className = '', eager = false }) {
  return (
    <img
      src={`/images/icons3d/${name}.png`}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`inline-block object-contain shrink-0 select-none ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
