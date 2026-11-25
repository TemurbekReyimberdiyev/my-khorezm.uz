import PagePathBar from './PagePathBar';

export default function PageHero({ title, subtitle, image, badge }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <div className="relative h-44 sm:h-52 md:h-56 rounded-2xl overflow-hidden shadow-xs">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(16,42,76,0.88) 0%, rgba(21,82,139,0.65) 55%, rgba(21,82,139,0.22) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <PagePathBar variant="hero" className="mb-2" />
          {badge && <div className="mb-2 self-start">{badge}</div>}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
