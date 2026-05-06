import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            setPosition({ x: clientX, y: clientY });
            
            // Trail effect (ring follows with slight delay)
            setTimeout(() => {
                setTrailPosition({ x: clientX, y: clientY });
            }, 50);
        };

        const handleHover = (e) => {
            const isClickable = e.target.closest('a, button, input, textarea, [role="button"], .clickable');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <>
            <div 
                className="cursor-follower"
                style={{ 
                    left: `${position.x}px`, 
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: position.x === 0 ? 0 : 1
                }}
            />
            <div 
                className={`cursor-follower-ring ${isHovering ? 'hovering' : ''}`}
                style={{ 
                    left: `${trailPosition.x}px`, 
                    top: `${trailPosition.y}px`,
                    transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
                    opacity: trailPosition.x === 0 ? 0 : 1
                }}
            />
        </>
    );
};

export default CustomCursor;
