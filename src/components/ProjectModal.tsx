import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChartLine, FaUsers, FaClock, FaTrophy } from 'react-icons/fa';
import { Project } from '../types';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ProjectSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ProjectImage = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionIcon = styled.div`
  color: #ffd700;
  font-size: 1.1rem;
`;

const SectionContent = styled.div`
  color: #555;
  line-height: 1.6;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetricCard = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const TechnologiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechnologyTag = styled.span`
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  color: #555;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #4ade80;
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #333;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
    }
  ` : `
    background: transparent;
    color: #333;
    border: 2px solid #ddd;
    
    &:hover {
      border-color: #ffd700;
      color: #ffd700;
    }
  `}
`;

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
            <ProjectSubtitle>{project.description}</ProjectSubtitle>
            <ProjectImage>
              <FaChartLine />
            </ProjectImage>
          </ModalHeader>

          <ModalBody>
            <Section>
              <SectionTitle>
                <SectionIcon><FaTrophy /></SectionIcon>
                Project Impact
              </SectionTitle>
              <MetricsGrid>
                <MetricCard>
                  <MetricValue>{project.metrics.views}</MetricValue>
                  <MetricLabel>Views</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{project.metrics.impact}</MetricValue>
                  <MetricLabel>Business Impact</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{project.metrics.duration}</MetricValue>
                  <MetricLabel>Duration</MetricLabel>
                </MetricCard>
              </MetricsGrid>
            </Section>

            <Section>
              <SectionTitle>
                <SectionIcon><FaChartLine /></SectionIcon>
                Challenge
              </SectionTitle>
              <SectionContent>{project.details.challenge}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>
                <SectionIcon><FaUsers /></SectionIcon>
                Solution
              </SectionTitle>
              <SectionContent>{project.details.solution}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>
                <SectionIcon><FaTrophy /></SectionIcon>
                Results
              </SectionTitle>
              <SectionContent>{project.details.results}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>
                <SectionIcon><FaClock /></SectionIcon>
                Technologies Used
              </SectionTitle>
              <TechnologiesGrid>
                {project.details.technologies.map((tech, index) => (
                  <TechnologyTag key={index}>{tech}</TechnologyTag>
                ))}
              </TechnologiesGrid>
            </Section>

            <Section>
              <SectionTitle>
                <SectionIcon><FaChartLine /></SectionIcon>
                Key Features
              </SectionTitle>
              <FeaturesList>
                {project.details.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeaturesList>
            </Section>

            <ActionButtons>
              <ActionButton variant="primary">
                <FaExternalLinkAlt />
                View Live Demo
              </ActionButton>
              <ActionButton variant="secondary">
                <FaGithub />
                View Code
              </ActionButton>
            </ActionButtons>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default ProjectModal;


