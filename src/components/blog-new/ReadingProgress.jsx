import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-[#e2e8f0]">
      <div
        className="h-full bg-gradient-to-l from-[#867957] to-[#3C6652] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
