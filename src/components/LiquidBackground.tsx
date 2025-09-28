import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  z-index: 0;
`;

const Droplet = styled.div<{ 
  size: number; 
  delay: number; 
  duration: number; 
  drift: number;
  x: number;
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle at 30% 30%, 
    rgba(64, 224, 255, 0.8) 0%, 
    rgba(64, 224, 255, 0.4) 40%, 
    rgba(64, 224, 255, 0.1) 70%, 
    transparent 100%
  );
  border-radius: 50% 10% 50% 10%;
  left: ${props => props.x}%;
  animation: dropletFloat ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  --drift: ${props => props.drift}px;
  filter: blur(0.5px);
  box-shadow: 
    0 0 ${props => props.size * 0.5}px rgba(64, 224, 255, 0.3),
    inset 0 0 ${props => props.size * 0.3}px rgba(255, 255, 255, 0.2);
`;

const Ripple = styled.div<{ 
  x: number; 
  y: number; 
  delay: number; 
  duration: number;
}>`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(64, 224, 255, 0.6);
  border-radius: 50%;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  animation: ${ripple} ${props => props.duration}s ease-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LiquidOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(64, 224, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(100, 200, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(64, 224, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
`;

const LiquidBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createDroplet = () => {
      if (!containerRef.current) return;

      const size = Math.random() * 15 + 5; // 5-20px
      const delay = Math.random() * 5; // 0-5s delay
      const duration = Math.random() * 10 + 15; // 15-25s duration
      const drift = (Math.random() - 0.5) * 200; // -100 to 100px drift
      const x = Math.random() * 100; // 0-100% horizontal position

      const droplet = document.createElement('div');
      droplet.style.position = 'absolute';
      droplet.style.width = `${size}px`;
      droplet.style.height = `${size}px`;
      droplet.style.background = `radial-gradient(circle at 30% 30%, 
        rgba(64, 224, 255, 0.8) 0%, 
        rgba(64, 224, 255, 0.4) 40%, 
        rgba(64, 224, 255, 0.1) 70%, 
        transparent 100%)`;
      droplet.style.borderRadius = '50% 10% 50% 10%';
      droplet.style.left = `${x}%`;
      droplet.style.animation = `dropletFloat ${duration}s linear infinite`;
      droplet.style.animationDelay = `${delay}s`;
      droplet.style.setProperty('--drift', `${drift}px`);
      droplet.style.filter = 'blur(0.5px)';
      droplet.style.boxShadow = `
        0 0 ${size * 0.5}px rgba(64, 224, 255, 0.3),
        inset 0 0 ${size * 0.3}px rgba(255, 255, 255, 0.2)
      `;

      containerRef.current.appendChild(droplet);

      // Remove droplet after animation completes
      setTimeout(() => {
        if (droplet.parentNode) {
          droplet.parentNode.removeChild(droplet);
        }
      }, (duration + delay) * 1000);
    };

    // Create initial droplets
    for (let i = 0; i < 8; i++) {
      setTimeout(createDroplet, i * 2000);
    }

    // Create new droplets periodically
    const interval = setInterval(createDroplet, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundContainer ref={containerRef}>
      <LiquidOverlay />
      {/* Static droplets for variety */}
      {Array.from({ length: 12 }, (_, i) => (
        <Droplet
          key={`static-${i}`}
          size={Math.random() * 12 + 4}
          delay={Math.random() * 8}
          duration={Math.random() * 12 + 18}
          drift={(Math.random() - 0.5) * 150}
          x={Math.random() * 100}
        />
      ))}
      {/* Ripples */}
      {Array.from({ length: 6 }, (_, i) => (
        <Ripple
          key={`ripple-${i}`}
          x={Math.random() * 100}
          y={Math.random() * 100}
          delay={Math.random() * 10}
          duration={Math.random() * 3 + 2}
        />
      ))}
    </BackgroundContainer>
  );
};

export default LiquidBackground;
