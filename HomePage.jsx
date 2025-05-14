import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function HomePage() {
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Define the dynamic style using CSS custom properties for mouse position
  const backgroundStyle = {
    '--mouse-x': `${mouseX}%`,
    '--mouse-y': `${mouseY}%`,
  };

  return (
    <div
      ref={backgroundRef}
      style={backgroundStyle} // Apply the dynamic CSS variables
      className="
        relative min-h-screen flex items-center justify-center overflow-hidden p-6
        bg-black /* Base Layer: Solid Black */

        /* --- Layered Background Effects - Colorful --- */
        bg-[radial-gradient(circle_farthest-corner_at_var(--mouse-x)_var(--mouse-y),_rgba(79,_70,_229,_0.18)_0%,_rgba(20,_184,_166,_0.15)_25%,_rgba(192,_38,_211,_0.12)_50%,_rgba(0,0,0,0)_75%)]
        bg-[radial-gradient(circle_55%_at_var(--mouse-x)_var(--mouse-y),_rgba(16,_185,_129,_0.2)_0%,_rgba(245,_158,_11,_0.18)_35%,_rgba(225,_29,_72,_0.15)_60%,_rgba(0,0,0,0)_80%)]
        /* --- End Layered Background Effects --- */
      "
    >
      {/* Decorative Background Shapes (Kept subtle) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-pulse-slow animation-delay-2000 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-56 h-56 bg-cyan-600 rounded-full mix-blend-screen filter blur-2xl opacity-5 animate-pulse-slow animation-delay-4000 pointer-events-none"></div>

      {/* Content Container - Refined Look */}
      <div
        className="
          relative z-10 flex flex-col items-center justify-center text-center
          max-w-3xl mx-auto p-8 md:p-12 rounded-xl shadow-2xl
          /* Subtle Gradient Background */
          bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80
          /* Enhanced Glassmorphism */
          backdrop-blur-xl
          /* Refined Border - Muted Purple/Blue from theme */
          border border-purple-500/25 hover:border-purple-400/30 transition-colors duration-300
        "
      >
        {/* Content remains the same - Ensure text contrast is good */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-100 drop-shadow-md"> {/* Added drop shadow */}
          Welcome to <span className="text-blue-300">Guidanc<span className='italic'>AI</span></span> {/* Adjusted span color slightly for contrast */}
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300 dark:text-gray-300 leading-relaxed max-w-xl drop-shadow-sm"> {/* Added drop shadow */}
          Discover personalized guidance. Choose your path below, and let our AI experts assist you on your journey.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full">
           {/* Buttons - Might need slight adjustments if previous styles clash */}
          <Link to="/guidance/mental" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full text-lg px-8 py-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2 group border border-blue-500/50 hover:border-blue-400"
            >
              <span role="img" aria-label="brain emoji" className="transform transition-transform duration-300 group-hover:rotate-[-10deg]">🧠</span>
              Mental Guidance
            </Button>
          </Link>
          <Link to="/guidance/technical" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full text-lg px-8 py-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2 group border border-gray-600/50 hover:border-gray-500"
            >
              <span role="img" aria-label="laptop emoji" className="transform transition-transform duration-300 group-hover:translate-x-1">💻</span>
              Technical Guidance
            </Button>
          </Link>
        </div>
      </div>
      {/* Ensure the custom animation CSS ('pulse-slow' etc.) is still in your global CSS */}
    </div>
  );
}

export default HomePage;