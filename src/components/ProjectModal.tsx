import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaClock, FaTrophy, FaInfoCircle } from 'react-icons/fa';
import { Project } from '../types';
import { useData } from '../contexts/DataContext';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(64, 224, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  border: 2px solid rgba(64, 224, 255, 0.4);
  border-radius: 30px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(64, 224, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      #40e0ff 0%, 
      #00bfff 25%, 
      #40e0ff 50%, 
      #00bfff 75%, 
      #40e0ff 100%
    );
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.6);
    color: #ff6b6b;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    top: 1rem;
    right: 1rem;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem 3rem 1rem;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, 
    rgba(64, 224, 255, 0.1) 0%, 
    rgba(100, 200, 255, 0.03) 50%, 
    transparent 100%
  );
  border-bottom: 1px solid rgba(64, 224, 255, 0.15);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(64, 224, 255, 0.02) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.05) rotate(180deg); opacity: 0.6; }
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem 0.5rem;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    #40e0ff 30%, 
    #00bfff 70%, 
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 20px rgba(64, 224, 255, 0.2);
  filter: drop-shadow(0 0 15px rgba(64, 224, 255, 0.1));
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ProjectSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


const ModalBody = styled.div`
  padding: 1.5rem 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem 2rem 1.5rem;
    gap: 1rem;
  }
`;

const Section = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(64, 224, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 255, 0.05), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(64, 224, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(64, 224, 255, 0.1);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #40e0ff;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-shadow: 0 0 8px rgba(64, 224, 255, 0.2);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
`;

const SectionIcon = styled.div`
  color: #ffd700;
  font-size: 1.1rem;
`;

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1rem;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  /* Better paragraph spacing */
  p {
    margin: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Better list styling for key results */
  ul, ol {
    margin: 0 0 1rem 0;
    padding-left: 1.2rem;
    
    li {
      margin-bottom: 0.4rem;
      line-height: 1.5;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(64, 224, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(64, 224, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(64, 224, 255, 0.2);
  }
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #40e0ff;
  margin-bottom: 0.8rem;
  text-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
`;

const MetricLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 500;
`;

const TechnologiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const TechnologyTag = styled.span<{ category?: string }>`
  background: ${props => {
    if (!props.category) return 'rgba(64, 224, 255, 0.15)';
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.15)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.15)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.15)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.15)';
      default: return 'rgba(64, 224, 255, 0.15)';
    }
  }};
  color: ${props => {
    if (!props.category) return '#40e0ff';
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#40e0ff';
    }
  }};
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid ${props => {
    if (!props.category) return 'rgba(64, 224, 255, 0.3)';
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.3)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.3)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.3)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.3)';
      default: return 'rgba(64, 224, 255, 0.3)';
    }
  }};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: ${props => {
      if (!props.category) return 'rgba(64, 224, 255, 0.25)';
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.25)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.25)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.25)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.25)';
        default: return 'rgba(64, 224, 255, 0.25)';
      }
    }};
    border-color: ${props => {
      if (!props.category) return 'rgba(64, 224, 255, 0.5)';
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.5)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.5)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.5)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.5)';
        default: return 'rgba(64, 224, 255, 0.5)';
      }
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      if (!props.category) return 'rgba(64, 224, 255, 0.3)';
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.3)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.3)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.3)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.3)';
        default: return 'rgba(64, 224, 255, 0.3)';
      }
    }};

    &::before {
      left: 100%;
    }
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: 0.8rem 0;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-left: 1.8rem;
  font-size: 1.05rem;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #40e0ff;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
  }
`;

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { skills } = useData();

  // Helper function to get category for a skill
  const getSkillCategory = (skillName: string): string => {
    const skill = skills.find(s => s.name === skillName);
    return skill?.category || '';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>

          <ModalHeader>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectSubtitle>{project.briefDescription || project.description}</ProjectSubtitle>
          </ModalHeader>

          <ModalBody>
            <Section>
              <SectionTitle>
                <SectionIcon><FaInfoCircle /></SectionIcon>
                Description
              </SectionTitle>
              <SectionContent>
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ 
                    marginBottom: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {paragraph.trim()}
                  </p>
                ))}
              </SectionContent>
            </Section>

            {project.keyResults && (
              <Section>
                <SectionTitle>
                  <SectionIcon><FaTrophy /></SectionIcon>
                  Key Results & Benefits
                </SectionTitle>
                <SectionContent>
                  {project.keyResults.split('\n').map((line, index) => {
                    // Check if line looks like a bullet point or list item
                    if (line.trim().match(/^[-•*]\s/) || line.trim().match(/^\d+\.\s/)) {
                      return (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          marginBottom: '0.6rem',
                          lineHeight: '1.5'
                        }}>
                          <span style={{ 
                            color: '#40e0ff', 
                            marginRight: '0.6rem', 
                            marginTop: '0.1rem',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}>•</span>
                          <span style={{ flex: 1 }}>{line.trim().replace(/^[-•*]\s/, '')}</span>
                        </div>
                      );
                    }
                    // Regular paragraph
                    return (
                      <p key={index} style={{ marginBottom: '0.8rem' }}>
                        {line}
                      </p>
                    );
                  })}
                </SectionContent>
              </Section>
            )}

            <Section>
              <SectionTitle>
                <SectionIcon><FaClock /></SectionIcon>
                Technologies Used
              </SectionTitle>
              <TechnologiesGrid>
                {project.technologies.map((tech, index) => (
                  <TechnologyTag key={index} category={getSkillCategory(tech)}>{tech}</TechnologyTag>
                ))}
              </TechnologiesGrid>
            </Section>

          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default ProjectModal;


