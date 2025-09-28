import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const pulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(64, 224, 255, 0.4);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 0 8px rgba(64, 224, 255, 0);
    transform: scale(1.02);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(64, 224, 255, 0.2);
  padding: 1rem 2rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;


const NavLinks = styled(motion.div)<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(10, 10, 30, 0.95));
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    z-index: 999;
  }
`;

const MobileBackdrop = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 998;
  }
`;

const NavLink = styled(motion.a)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? '#40e0ff' : 'white'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    color: #40e0ff;
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.1), rgba(64, 224, 255, 0.05))' 
      : 'transparent'};
    border-radius: 8px;
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    background: linear-gradient(135deg, rgba(64, 224, 255, 0.15), rgba(64, 224, 255, 0.08));
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${props => props.$isActive ? '80%' : '0%'};
    height: 2px;
    background: linear-gradient(90deg, #40e0ff, #00bfff);
    transform: translateX(-50%);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 1px;
  }

  &:hover::after {
    width: 80%;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1rem 2rem;
    text-align: center;
    width: 100%;
    
    &::before {
      border-radius: 12px;
    }
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 224, 255, 0.1), rgba(64, 224, 255, 0.05));
  border-radius: 8px;
  border: 1px solid rgba(64, 224, 255, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
  z-index: -1;

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;


const MobileMenuButton = styled(motion.button)`
  display: none;
  background: rgba(64, 224, 255, 0.1);
  border: 1px solid rgba(64, 224, 255, 0.3);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(64, 224, 255, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <MobileBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <HeaderContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.15)' 
            : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Nav>
          <NavLinks 
            isOpen={isMenuOpen}
            initial={false}
            animate={isMenuOpen ? { x: 0 } : { x: '-100%' }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
          {sections.map((section, index) => (
            <NavLink
              key={section.id}
              $isActive={activeSection === section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              {section.name}
              {activeSection === section.id && (
                <ActiveIndicator
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                />
              )}
            </NavLink>
          ))}
          <NavLink
            $isActive={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('/admin', '_blank')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: sections.length * 0.1,
              ease: "easeOut"
            }}
          >
            Admin
          </NavLink>
        </NavLinks>

        <MobileMenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
    </>
  );
};

export default Header;

