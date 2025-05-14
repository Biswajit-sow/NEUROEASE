import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Assuming Button component path is correct

// Define categories (unchanged)
const categories = {
  mental: [
    { 
      id: "anxiety", 
    name: "Anxiety", 
    },
  { 
    id: "depression", 
    name: "Depression", 
    
  },
  { 
    id: "time management", 
    name: "Time Management", 
    
  },
  { 
    id: "anger issue", 
    name: "Anger Issues", 
    
      
  },
  { 
    id: "relationship issue", 
    name: "Relationship Issues", 

  },
  { 
    id: "eating disorders", 
    name: "Eating Disorders", 
    
  },
  { 
    id: "stress", 
    name: "Trauma and Stressor-Related Disorders", 
    
  },
  { 
    id: "sleeping disorder", 
    name: "Sleeping Disorders", 
    
  },
  { 
    id: "personality disorders", 
    name: "Personality Disorders", 
    
  }
],
technical: [
  { 
    id: "frontend", 
    name: "Frontend Development", 
    
  },
  { 
    id: "backend", 
    name: "Backend Development", 
   
  },
  { 
    id: "programming_languages", 
    name: "Programming Languages", 
   
  },
  { 
    id: "fullstack", 
    name: "Full Stack Development", 
    
  },
  { 
    id: "database", 
    name: "Database Management", 
   
  },
  { 
    id: "devops", 
    name: "DevOps & Cloud Computing", 
    
  },
  { 
    id: "aiml", 
    name: "Artificial Intelligence & Machine Learning", 
   
  },
  { 
    id: "datascience", 
    name: "Data Science & Analytics", 
    
  },
  { 
    id: "cybersecurity", 
    name: "Cybersecurity & Ethical Hacking", 
    
  },
  { 
    id: "blockchain", 
    name: "Blockchain & Web3 Development", 
    
  },
  { 
    id: "game_dev", 
    name: "Game Development", 
    
  },
  { 
    id: "mobile_dev", 
    name: "Mobile App Development", 
    
  },
  { 
    id: "software_testing", 
    name: "Software Testing & QA", 
    
  },
  { 
    id: "software_architecture", 
    name: "Software Architecture & Design Patterns", 
    
  },
  { 
    id: "nocode", 
    name: "Low-Code / No-Code Development", 
    
  },
  { 
    id: "embedded", 
    name: "Embedded Systems & IoT", 
    
  },
  { 
    id: "robotics", 
    name: "Robotics & Automation", 
    
  },
  { 
    id: "pcb", 
    name: "PCB & Circuit Design", 
    
  },
  { 
    id: "networking", 
    name: "Networking & Telecommunications", 
   
  },
  { 
    id: "semiconductor", 
    name: "Semiconductor vlsi Design", 
   
  },
  { 
    id: "hardware_troubleshooting", 
    name: "Computer Hardware & Troubleshooting", 
    
  },
  { 
    id: "power_electronics_electrical_systems", 
    name: "power electronics electrical systems", 
    
  },
  { 
    id: "automotive_ev_technology", 
    name: "Automative  Ev Technology", 
    
  },
  { 
    id: "quantum_computing", 
    name: "Quantum Computing", 
    
  },
  { 
    id: "3d_printing_prototyping", 
    name: "3d Printing Prototyping", 
    
  },
  { 
    id: "drawing", 
    name: "Drawing", 
    
  },
  { 
    id: "design", 
    name: "Design", 
    
  },
  { 
    id: "thesis", 
    name: "Thesis Creation", 
    
  },
  { 
    id: "public_speaking", 
    name: "Public Speaking", 
    
  },
  { 
    id: "leadership", 
    name: "Leadership", 
    
  },
  { 
    id: "management", 
    name: "Management", 
   
  },
  { 
    id: "business", 
    name: "Business & Entrepreneurship", 
    
  }
]
};

// Map category IDs to relevant emojis (unchanged)
const categoryEmojis = {
  anxiety: '😥',
  depression: '😞',
  stress: '🤯',
  aiml: '🤖',
  blockchain: '🔗',
  datascience: '📊',
};

function CategorySelection() {
  const { type } = useParams(); // 'mental' or 'technical'
  const navigate = useNavigate();

  // --- Background Effect State and Logic (Unchanged) ---
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      requestAnimationFrame(() => {
        if (backgroundRef.current) {
            const rect = backgroundRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setMouseX(x);
            setMouseY(y);
        }
      });
    };
    const currentRef = backgroundRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundStyle = {
    '--mouse-x': `${mouseX}%`,
    '--mouse-y': `${mouseY}%`,
  };
  // --- End Background Effect Logic ---

  const currentCategories = categories[type];
  const guidanceTypeReadable = type === 'mental' ? 'Mental' : 'Technical';

  if (!currentCategories) {
    navigate('/');
    return null;
  }

  // Determine theme colors based on type
  const themeColor = type === 'mental' ? 'cyan' : 'purple';
  const gradientFrom = type === 'mental' ? `from-cyan-900/90` : `from-purple-900/90`;
  const gradientVia = type === 'mental' ? `via-blue-950/85` : `via-indigo-950/85`;
  const gradientTo = type === 'mental' ? `to-blue-950/90` : `to-indigo-950/90`;
  const borderColor = type === 'mental' ? `border-cyan-400/40 hover:border-cyan-300/60` : `border-purple-400/40 hover:border-purple-300/60`;
  const buttonBaseColor = type === 'mental' ? 'cyan' : 'purple';
  const buttonHoverColor = type === 'mental' ? 'blue' : 'indigo';

  // *** UPDATED: Define specific text gradient classes based on type ***
  const headingGradientClass = type === 'mental'
    // Brighter, higher contrast gradient for Mental Guidance
    ? 'from-cyan-200 via-sky-300 to-blue-300'
    // Original gradient for Technical Guidance (adjust if needed too)
    : `from-purple-200 via-purple-300 to-indigo-400`; // Adjusted technical gradient slightly for consistency

  // *** Optional: Add a subtle text shadow for definition ***
  const headingTextShadow = type === 'mental'
    ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] drop-shadow-[0_0_2px_rgba(200,240,255,0.3)]' // Darker base shadow + subtle light glow
    : 'drop-shadow-lg'; // Standard shadow for technical

  return (
    <div
      ref={backgroundRef}
      style={backgroundStyle}
      className={`
        relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-6
        bg-gray-950 /* Base Dark Background */

        /* --- Enhanced Fluid Background Effect --- */
        bg-[radial-gradient(circle_farthest-corner_at_var(--mouse-x)_var(--mouse-y),_rgba(20,_184,_166,_0.25)_0%,_rgba(79,_70,_229,_0.3)_35%,_rgba(192,_38,_211,_0.2)_60%,_rgba(14,_16,_21,_0)_80%)]
        bg-[radial-gradient(circle_45%_at_var(--mouse-x)_var(--mouse-y),_rgba(6,_182,_212,_0.3)_0%,_rgba(236,_72,_153,_0.25)_40%,_rgba(245,_158,_11,_0.2)_70%,_rgba(14,_16,_21,_0)_90%)]
      `}
    >
      {/* Content Container - Refined Look */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center text-center
          max-w-4xl w-full mx-auto p-8 md:p-12 rounded-xl shadow-xl
          bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}
          backdrop-blur-lg
          border ${borderColor} transition-colors duration-300
        `}
      >
        {/* Back Button (Unchanged) */}
         <button
           onClick={() => navigate('/')}
           className={`
             absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2
             text-${themeColor}-200 hover:text-white
             transition-colors duration-200
             px-3 py-1.5 rounded-md bg-${themeColor}-800/40 hover:bg-${themeColor}-700/50
             border border-${themeColor}-600/60 hover:border-${themeColor}-500
             text-sm font-medium
           `}
         >
           <span aria-hidden="true" className="text-base">←</span> Back Home
         </button>

        {/* Heading - Conditional Gradient & Shadow */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 ${headingTextShadow}`}>
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${headingGradientClass}`}>
            {guidanceTypeReadable} Guidance
          </span>
        </h1>

        {/* Paragraph (Unchanged) */}
        <p className="text-lg font-medium text-center mb-10 text-gray-200 dark:text-gray-200 max-w-xl mx-auto drop-shadow">
          Please select a specific area you'd like to explore:
        </p>

        {/* Button Grid (Unchanged) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {currentCategories.map((category) => (
            <Link key={category.id} to={`/chat/${type}/${category.id}`} className="block w-full group">
              <Button
                variant="custom"
                className={`
                  w-full text-center py-4 px-5 text-lg font-semibold rounded-lg shadow-md
                  flex items-center justify-center gap-3
                  transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg
                  bg-gradient-to-br from-${buttonBaseColor}-600/30 via-transparent to-${buttonBaseColor}-700/20
                  border border-${buttonBaseColor}-500/50
                  text-${buttonBaseColor}-100
                  hover:bg-${buttonBaseColor}-600/40
                  hover:border-${buttonBaseColor}-400/70
                  hover:text-white
                `}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110" role="img" aria-label={`${category.name} emoji`}>
                  {categoryEmojis[category.id] || '✨'}
                </span>
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySelection;