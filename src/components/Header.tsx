import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';


const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.15);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(64, 224, 255, 0.3);
  padding: 1.2rem 2rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
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

const NavLink = styled(motion.button)<{ $isActive: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isActive ? '#40e0ff' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  transition: all 0.3s ease;
  z-index: -1;
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: rgba(64, 224, 255, 0.15);
  border: 1px solid rgba(64, 224, 255, 0.4);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.75rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(64, 224, 255, 0.2);
  z-index: 1001;

  &:hover {
    background: rgba(64, 224, 255, 0.25);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 15px rgba(64, 224, 255, 0.3);
  }

  @media (max-width: 768px) {
    display: block;
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
    z-index: 998;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = useMemo(() => [
    { id: 'hero', name: 'Home' },
    { id: 'skills', name: 'Skills' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      // If we're at the very top, set to hero
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }
      
      // Check each section to see which one is currently in view
      let currentSection = 'hero';
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is in view if it's at least 50% visible
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sections[i].id;
            break;
          }
          // If we've scrolled past the top of this section, it's the current one
          else if (rect.top <= 100) {
            currentSection = sections[i].id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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
            ? 'rgba(10, 10, 10, 0.25)' 
            : 'rgba(10, 10, 10, 0.15)',
          borderBottomColor: scrolled 
            ? 'rgba(64, 224, 255, 0.5)' 
            : 'rgba(64, 224, 255, 0.3)',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Nav>
          <NavLinks>
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
        </Nav>

        <MobileNavLinks
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
              key={`mobile-${section.id}`}
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
        </MobileNavLinks>

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
      </HeaderContainer>
    </>
  );
};

export default Header;
