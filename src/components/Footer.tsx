export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400 text-sm">
      <div>
        &copy; 2024 Blue Crab Modeling
        <span className="mx-2">|</span>
        <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
        <span className="mx-2">|</span>
        <a href="/terms" className="hover:text-blue-400">Terms</a>
        <span className="mx-2">|</span>
        <a href="/contact" className="hover:text-blue-400">Contact</a>
      </div>
    </footer>
  );
} 