import React, { useState, useEffect, useRef, useMemo } from 'react'; // Import necessary hooks
import { useParams, useNavigate } from 'react-router-dom';
// You can use an icon library like Heroicons or just an emoji
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ChatInterface from '../components/ChatInterface'; // Ensure path is correct

function ChatPage() {
    const { type, category } = useParams();
    const navigate = useNavigate();

    // --- Background Effect State & Logic ---
    const [mouseX, setMouseX] = useState(50);
    const [mouseY, setMouseY] = useState(50);
    const backgroundRef = useRef(null); // Ref for the main container

    useEffect(() => {
        const handleMouseMove = (event) => {
            requestAnimationFrame(() => { // Optimize updates
                if (backgroundRef.current) {
                    const rect = backgroundRef.current.getBoundingClientRect();
                    // Calculate position relative to the element
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    setMouseX(x);
                    setMouseY(y);
                }
            });
        };

        const currentRef = backgroundRef.current;
        currentRef?.addEventListener('mousemove', handleMouseMove); // Listen on the element

        return () => {
            currentRef?.removeEventListener('mousemove', handleMouseMove); // Cleanup
        };
    }, []); // Run only once on mount

    // Style object for CSS variables controlling the mouse position
    const backgroundPositionStyle = {
        '--mouse-x': `${mouseX}%`,
        '--mouse-y': `${mouseY}%`,
    };
    // --- End Background Effect Logic ---


    // --- Validation (Keep as is) ---
    const validTypes = ['mental', 'technical'];
    const validCategories = {
        mental: [ "anxiety",
            "depression",
            "time management",
            "anger issue",
            "relationship issue",
            "eating disorders",
            "stress",
            "sleeping disorder",
            "personality disorders"],
        technical: ["frontend",
          "backend",
          "programming languages",
          "full stack development",
          "database ",
          "devops",
          "aiml",
          "datascience",
          "cybersecurity",
          "blockchain",
          "game_dev",
          "mobile_dev",
          "software_testing",
          "software_architecture",
          "no_code",
          "embedded",
          "robotics",
          "pcb",
          "networking",
          "semiconductor",
          "hardware_troubleshooting",
          "power_electronics_electrical_systems",
          "automotive_ev_technology",
          "quantum_computing",
          "3d_printing_prototyping",
          "drawing",
          "design",
          "thesis",
          "public_speaking",
          "leadership",
          "management",
          "business"]
    };

    const isValid = type && category && validTypes.includes(type) && validCategories[type]?.includes(category);

    if (!isValid) {
        console.error("Invalid type or category in URL:", type, category);
        navigate(validTypes.includes(type || '') ? `/guidance/${type}` : '/');
        return null;
    }
    // --- End Validation ---

    // --- Dynamic Theming ---
    const theme = useMemo(() => {
        const isMental = type === 'mental';
        return {
            isMental: isMental,
            // Define theme variables for use in inline styles (rgba)
            primaryVar: isMental ? '--mental-primary-rgb' : '--technical-primary-rgb',
            secondaryVar: isMental ? '--mental-secondary-rgb' : '--technical-secondary-rgb',
            // Define Tailwind color names for simpler classes
            primaryColorName: isMental ? 'cyan' : 'purple',
            secondaryColorName: isMental ? 'blue' : 'indigo',
        };
    }, [type]);

    // Apply theme colors as CSS variables for easier use in rgba()
    const themeStyle = {
        '--theme-primary-rgb': `var(${theme.primaryVar})`,
        '--theme-secondary-rgb': `var(${theme.secondaryVar})`,
    };

    return (
        <div
            ref={backgroundRef} // Attach ref for mouse listener bounds
            style={{ ...backgroundPositionStyle, ...themeStyle }} // Apply mouse & theme vars
            className={`
                    relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-6
                bg-gray-950 /* Base Dark Background */

                /* --- Enhanced Fluid Background Effect --- */
                bg-[radial-gradient(circle_farthest-corner_at_var(--mouse-x)_var(--mouse-y),_rgba(20,_184,_166,_0.25)_0%,_rgba(79,_70,_229,_0.3)_35%,_rgba(192,_38,_211,_0.2)_60%,_rgba(14,_16,_21,_0)_80%)]
                bg-[radial-gradient(circle_45%_at_var(--mouse-x)_var(--mouse-y),_rgba(6,_182,_212,_0.3)_0%,_rgba(236,_72,_153,_0.25)_40%,_rgba(245,_158,_11,_0.2)_70%,_rgba(14,_16,_21,_0)_90%)]
            `}
        >
            {/* --- Elegant Fluid Background Layer --- */}
            {/* Positioned behind content (-z-10), uses mouse variables */}
            <div
              className="absolute inset-0 -z-10 transition-opacity duration-700 ease-out opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse 60% 50% at var(--mouse-x) var(--mouse-y),
                    rgba(var(--theme-primary-rgb), 0.18), /* Subtle primary color glow */
                    transparent 70%
                  ),
                  radial-gradient(ellipse 70% 60% at calc(100% - var(--mouse-x)) calc(100% - var(--mouse-y)),
                    rgba(var(--theme-secondary-rgb), 0.12), /* Subtle secondary counter-glow */
                    transparent 80%
                  )
                `
                
              }}
            ></div>

            {/* --- Back Button (Corner Aligned) --- */}
            <button
                onClick={() => navigate(`/guidance/${type}`)}
                aria-label="Change guidance category"
                className={`
                    absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 z-20 group
                    px-3 py-1.5 rounded-md shadow
                    bg-gray-800/60 hover:bg-gray-700/80 /* Dark theme background */
                    border border-[rgba(var(--border-dark),0.6)] hover:border-[rgba(var(--border-dark),0.8)]
                    text-[color:var(--text-light)] hover:text-[color:var(--text-lighter)] /* Dark theme text */
                    backdrop-blur-sm /* Subtle glass effect */
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-${theme.primaryColorName}-500/70 focus:ring-offset-2 focus:ring-offset-gray-950
                `}
            >
                <span className="text-lg transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true">
                   ← {/* Simple Arrow */}
                </span>
                <span className="text-sm font-medium">Change Category</span>
            </button>

            {/* --- Main Content Container (Centering the Chat Interface) --- */}
            {/* This div ensures the max-width and holds the chat interface */}
            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-12 md:mt-8">
                 {/* Optional: Add a subtle title above the chat if desired */}
                 {/* <h1 className="text-xl font-semibold text-gray-300 mb-4 text-center">
                    {type === 'mental' ? 'Mental Guidance' : 'Technical Guidance'} on {category}
                 </h1> */}

                {/* --- Chat Interface Container (Glassmorphism on Dark) --- */}
                <div className={`
                    w-full h-[80vh] md:h-[85vh] /* Adjusted height slightly */
                    rounded-xl shadow-xl overflow-hidden /* Rounded & shadow */
                    border border-[rgba(255,255,255,0.1)] /* Subtle light border */
                    /* Darker glassmorphism background with subtle theme hint */
                    bg-gradient-to-br from-[rgba(var(--bg-dark),0.7)] via-[rgba(var(--theme-primary-rgb),0.04)] to-[rgba(var(--bg-dark),0.8)]
                    backdrop-blur-lg /* The glass effect */
                `}>
                    {/* Ensure ChatInterface is visible above potential pseudo-elements */}
                    <div className="relative z-10 h-full w-full">
                        {/* Add padding here IF ChatInterface itself doesn't handle it */}
                        {/* <div className="p-1 md:p-2 h-full w-full"> */}
                           <ChatInterface category={category} type={type} />
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;