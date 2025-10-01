import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaChevronDown, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(8px); }
`;

const floatUp = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(5deg); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(64, 224, 255, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(64, 224, 255, 0.6);
    transform: scale(1.05);
  }
`;

const pulseBorder = keyframes`
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.02) rotate(180deg);
    opacity: 1;
  }
`;


const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
  z-index: 2;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`;

const ProfileImageContainer = styled(motion.div)`
  width: 540px;
  height: 540px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, 
    rgba(64, 224, 255, 0.3) 0%, 
    rgba(100, 200, 255, 0.2) 50%, 
    rgba(64, 224, 255, 0.3) 100%
  );
  backdrop-filter: blur(10px);
  border: 6px solid rgba(64, 224, 255, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(64, 224, 255, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      inset 0 0 30px rgba(64, 224, 255, 0.2),
      0 0 40px rgba(64, 224, 255, 0.3);
    border-color: rgba(64, 224, 255, 0.6);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #40e0ff, #64c8ff, #40e0ff);
    border-radius: 50%;
    z-index: -1;
    animation: ${css`${pulseBorder} 4s ease-in-out infinite`};
  }

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(45deg, 
      rgba(64, 224, 255, 0.8), 
      rgba(100, 200, 255, 0.6), 
      rgba(64, 224, 255, 0.8)
    );
    border-radius: 50%;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(64, 224, 255, 0.2) 0%, 
    rgba(100, 200, 255, 0.1) 50%, 
    rgba(64, 224, 255, 0.2) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: rgba(64, 224, 255, 0.6);
  animation: ${css`${float} 3s ease-in-out infinite`};
`;

const TextSection = styled.div`
  color: white;
  position: relative;
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 600px;

  .greeting-container {
    @media (max-width: 1024px) {
      justify-content: center;
    }
  }

  @media (max-width: 1024px) {
    text-align: center;
    align-items: center;
  }
`;

const Greeting = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 100;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    rgba(64, 224, 255, 0.95) 30%,
    rgba(100, 200, 255, 0.8) 70%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  display: inline;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  @media (max-width: 1024px) {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    font-size: 3.2rem;
    letter-spacing: -1px;
  }
`;

const Name = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 100;
  margin: 0;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    rgba(64, 224, 255, 0.95) 30%,
    rgba(100, 200, 255, 0.8) 70%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -2px;
  display: inline;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  @media (max-width: 1024px) {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    font-size: 3.2rem;
    letter-spacing: -1px;
  }
`;

const Title = styled(motion.h3)`
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  min-height: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 0.6px;
  
  @media (max-width: 1024px) {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.4;
    letter-spacing: 0.4px;
  }
`;

const RoleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 2.5rem;
  justify-content: flex-start;
  line-height: 1.4;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const RoleItem = styled.span<{ $isActive?: boolean }>`
  display: inline-block;
  color: ${props => props.$isActive ? '#40e0ff' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: 400;
  font-size: 1.15rem;
  transition: color 0.5s ease, text-shadow 0.5s ease;
  text-shadow: ${props => props.$isActive ? '0 0 6px rgba(64, 224, 255, 0.15)' : 'none'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 0.4px;
  position: relative;
  
  ${props => props.$isActive && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(64, 224, 255, 0.04) 50%, transparent 100%);
      border-radius: 4px;
      z-index: -1;
    }
  `}
  
  &:not(:last-child)::after {
    content: ' • ';
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0.75rem;
    font-weight: 400;
    font-size: 1.15rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 0.3px;
    
    &:not(:last-child)::after {
      font-size: 1rem;
      margin: 0 0.5rem;
    }
  }
`;

const Bio = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  text-align: left;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 300;
  letter-spacing: 0.4px;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    line-height: 1.7;
    letter-spacing: 0.3px;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #40e0ff;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  letter-spacing: 0.3px;
  border-radius: 6px;
  transition: all 0.3s ease;
  line-height: 1.2;
  background: rgba(64, 224, 255, 0.1);
  
  &:hover {
    background: rgba(64, 224, 255, 0.2);
    color: rgba(255, 255, 255, 0.95);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
    letter-spacing: 0.2px;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #40e0ff;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 1.2;
  background: rgba(64, 224, 255, 0.1);
  
  &:hover {
    background: rgba(64, 224, 255, 0.2);
    transform: translateX(4px);
  }
  
  &::after {
    content: '↗';
    opacity: 1;
    transition: opacity 0.3s ease;
    margin-left: 0.25rem;
    font-size: 0.8rem;
    color: #40e0ff;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ContactIcon = styled.span`
  color: #40e0ff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1rem;
`;


const ScrollArrow = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #40e0ff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #64c8ff;
    transform: translateX(-50%) translateY(-5px);
  }
`;

const ScrollText = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
`;

const ArrowIcon = styled.div`
  font-size: 1.5rem;
  animation: ${css`${bounce} 2s ease-in-out infinite`};
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0ff, #00bfff);
  border: 2px solid rgba(64, 224, 255, 0.4);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${css`${glow} 3s ease-in-out infinite`};
  box-shadow: 0 4px 20px rgba(64, 224, 255, 0.3);
  
  &:hover {
    animation: ${css`${floatUp} 1s ease-in-out infinite`};
    box-shadow: 0 8px 30px rgba(64, 224, 255, 0.6);
    transform: scale(1.1);
    border-color: rgba(64, 224, 255, 0.8);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const Hero: React.FC = () => {
  const { profile } = useData();
  const [showPieChart, setShowPieChart] = useState(true);
  const [showSQL, setShowSQL] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [greetingText, setGreetingText] = useState('');
  const [nameText, setNameText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showName, setShowName] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const roles = profile.roles ? profile.roles.split('\n').filter((role: string) => role.trim()) : [];

  // Helper function to extract LinkedIn username from URL
  const getLinkedInDisplay = (url: string) => {
    if (!url) return 'LinkedIn Profile';
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      // Extract username from /in/username format
      const match = pathname.match(/\/in\/(.+)/);
      return match ? match[1] : 'LinkedIn Profile';
    } catch {
      return 'LinkedIn Profile';
    }
  };

  // Handle profile picture click to toggle between image and SQL
  const handleProfileClick = () => {
    if (showProfileImage) {
      // Currently showing profile image, switch to show SQL
      setShowProfileImage(false);
      setShowSQL(true);
    } else {
      // Currently showing SQL or pie chart, switch to show profile image
      setShowSQL(false);
      setShowPieChart(false);
      setShowProfileImage(true);
    }
  };

  // Reset role index when roles change
  useEffect(() => {
    setCurrentRoleIndex(0);
  }, [roles.length]);


  // Simple typing animation - runs only once
  useEffect(() => {
    if (hasAnimated) return;
    
    const greeting = "Hi, I'm";
    const name = "Ollie"; // Hardcoded as requested
    
    setTimeout(() => {
      setHasAnimated(true);
      setIsTyping(true);
      
      // Type first line
      let index = 0;
      const typeGreeting = () => {
        if (index < greeting.length) {
          setGreetingText(greeting.slice(0, index + 1));
          index++;
          setTimeout(typeGreeting, 150); // Slower typing
        } else {
          // Pause, then start second line
          setTimeout(() => {
            setShowName(true);
            
            // Type second line
            let nameIndex = 0;
            const typeName = () => {
              if (nameIndex < name.length) {
                setNameText(name.slice(0, nameIndex + 1));
                nameIndex++;
                setTimeout(typeName, 180); // Slower typing
              } else {
                // Animation complete
                setTimeout(() => {
                  setIsTyping(false);
                  // Auto-transition to profile image after typing completes
                  setTimeout(() => {
                    setShowPieChart(false);
                    setShowProfileImage(true);
                  }, 500);
                }, 800);
              }
            };
            
            typeName();
          }, 600);
        }
      };
      
      typeGreeting();
    }, 1000);
  }, [hasAnimated]);

  // Role rotation effect
  useEffect(() => {
    if (!isTyping && roles.length > 0) {
      const interval = setInterval(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 3000); // Change role every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [isTyping, roles.length]);

  // Switch from analytical animation to profile image
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPieChart(false);
    }, 3000); // 3 seconds for SQL animation sequence
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300); // Show button after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer id="home">
      <HeroContent>
        <ProfileSection>
          <ProfileImageContainer
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100
            }}
            onClick={handleProfileClick}
            style={{ 
              cursor: 'pointer',
              position: 'relative'
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {showPieChart ? (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}>
                {/* Outer spinning ring */}
                <div style={{
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                  border: '3px solid transparent',
                  borderTop: '3px solid #40e0ff',
                  borderRadius: '50%',
                  animation: 'spin 2s linear infinite'
                }}></div>
                
                {/* Inner spinning ring */}
                <div style={{
                  position: 'absolute',
                  width: '70%',
                  height: '70%',
                  border: '2px solid transparent',
                  borderBottom: '2px solid #64c8ff',
                  borderRadius: '50%',
                  animation: 'spin 1.5s linear infinite reverse'
                }}></div>

                {/* Center content */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  width: '100%',
                  padding: '20px'
                }}>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '13px',
                    textAlign: 'left',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    lineHeight: '1.5',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    border: '1px solid rgba(64, 224, 255, 0.2)',
                    marginBottom: '15px',
                    maxWidth: '95%'
                  }}>
                    <div style={{ color: '#ff6b6b', marginBottom: '2px' }}>
                      <span style={{ color: '#40e0ff' }}>SELECT</span> *
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      FROM <span style={{ color: '#64c8ff' }}>ollie</span>.<span style={{ color: '#64c8ff' }}>photographs</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      WHERE <span style={{ color: '#64c8ff' }}>type</span> = <span style={{ color: '#ffd93d' }}>'profile_pic'</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      AND <span style={{ color: '#64c8ff' }}>version</span> = <span style={{ color: '#ffd93d' }}>'final_final_v2'</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      ORDER BY <span style={{ color: '#64c8ff' }}>awesomeness</span> <span style={{ color: '#ff6b6b' }}>DESC</span>
                    </div>
                    <div style={{ color: '#40e0ff' }}>
                      LIMIT <span style={{ color: '#ffd93d' }}>1</span>;
                    </div>
                  </div>

                  {/* Status Text */}
                  <div style={{
                    color: '#64c8ff',
                    fontSize: '11px',
                    textAlign: 'center',
                    opacity: 0.7,
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                  }}>
                    Executing query...
                  </div>
                </div>

                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : showSQL ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
                  borderRadius: '50%'
                }}
              >
                {/* SQL Query Display */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  width: '100%',
                  padding: '20px'
                }}>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '13px',
                    textAlign: 'left',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    lineHeight: '1.5',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    border: '1px solid rgba(64, 224, 255, 0.2)',
                    marginBottom: '15px',
                    maxWidth: '95%'
                  }}>
                    <div style={{ color: '#ff6b6b', marginBottom: '2px' }}>
                      <span style={{ color: '#40e0ff' }}>SELECT</span> *
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      FROM <span style={{ color: '#64c8ff' }}>ollie</span>.<span style={{ color: '#64c8ff' }}>photographs</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      WHERE <span style={{ color: '#64c8ff' }}>type</span> = <span style={{ color: '#ffd93d' }}>'profile_pic'</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      AND <span style={{ color: '#64c8ff' }}>version</span> = <span style={{ color: '#ffd93d' }}>'final_final_v2'</span>
                    </div>
                    <div style={{ color: '#40e0ff', marginBottom: '2px' }}>
                      ORDER BY <span style={{ color: '#64c8ff' }}>awesomeness</span> <span style={{ color: '#ff6b6b' }}>DESC</span>
                    </div>
                    <div style={{ color: '#40e0ff' }}>
                      LIMIT <span style={{ color: '#ffd93d' }}>1</span>;
                    </div>
                  </div>
                  <div style={{
                    color: '#00ff88',
                    fontSize: '11px',
                    textAlign: 'center',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                  }}>
                    ✓ Query executed successfully
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {profile.profileImage && profile.profileImage !== '/api/placeholder/300/300' ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <ProfilePlaceholder>
                    <span>👨‍💻</span>
                  </ProfilePlaceholder>
                )}
              </motion.div>
            )}
          </ProfileImageContainer>
        </ProfileSection>

        <TextSection>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start', 
              flexWrap: 'wrap', 
              gap: '0.75rem', 
              marginBottom: '1.5rem',
              minHeight: '3.5rem'
            }}
            className="greeting-container"
          >
            <Greeting>
              {greetingText}
              {isTyping && !showName && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ 
                    marginLeft: '2px',
                    color: '#40e0ff',
                    fontWeight: 'bold'
                  }}
                >
                  |
                </motion.span>
              )}
            </Greeting>
            
            {showName && (
              <Name>
                {nameText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ 
                      marginLeft: '2px',
                      color: '#40e0ff',
                      fontWeight: 'bold'
                    }}
                  >
                    |
                  </motion.span>
                )}
              </Name>
            )}
          </div>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <RoleContainer>
              {roles.length > 0 ? roles.map((role: string, index: number) => (
                <RoleItem
                  key={role}
                  $isActive={index === currentRoleIndex}
                >
                  {role}
                </RoleItem>
              )) : (
                <RoleItem $isActive={true}>
                  Professional
                </RoleItem>
              )}
            </RoleContainer>
          </Title>
          
          <Bio
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {profile.bio || 'Passionate data analyst with expertise in transforming complex data into actionable insights. Specializing in business intelligence, machine learning, and data visualization to drive strategic decision-making.'}
          </Bio>

          <ContactInfo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {profile.location && (
              <ContactItem>
                <ContactIcon><FaMapMarkerAlt /></ContactIcon>
                <span>{profile.location}</span>
              </ContactItem>
            )}
            {profile.email && (
              <ContactLink href={`mailto:${profile.email}`}>
                <ContactIcon><FaEnvelope /></ContactIcon>
                <span>{profile.email}</span>
              </ContactLink>
            )}
            <ContactLink href={profile.linkedin || "https://linkedin.com/in/ollie-gillyon"} target="_blank" rel="noopener noreferrer">
              <ContactIcon><FaLinkedin /></ContactIcon>
              <span>{getLinkedInDisplay(profile.linkedin || "https://linkedin.com/in/ollie-gillyon")}</span>
            </ContactLink>
          </ContactInfo>

        </TextSection>
      </HeroContent>

      <ScrollArrow
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => {
          const nextSection = document.getElementById('skills');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ScrollText>Explore More</ScrollText>
        <ArrowIcon>
          <FaChevronDown />
        </ArrowIcon>
      </ScrollArrow>

      <AnimatePresence>
        {showScrollToTop && (
          <ScrollToTopButton
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </HeroContainer>
  );
};

export default Hero;