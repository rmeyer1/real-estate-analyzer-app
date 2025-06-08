export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-slate-900 text-center py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900/80 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50 mb-4">Modern Real Estate Financial Modeling</h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8">Analyze multifamily investments with speed and confidence.</p>
        <a href="/signup" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white text-lg font-semibold shadow hover:bg-blue-700 transition-colors">Get Started</a>
      </div>
    </section>
  );
} 