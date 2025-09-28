import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaEye, FaClock, FaProjectDiagram, FaChartBar } from 'react-icons/fa';
import { Project } from '../types';

const ProjectsContainer = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectsContent = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const TypographyContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const SectionTitle = styled(motion.h2)`
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
  position: relative;
  text-shadow: 0 0 30px rgba(64, 224, 255, 0.3);
  filter: drop-shadow(0 0 20px rgba(64, 224, 255, 0.2));
  margin: 0;
`;

const TitleAccent = styled(motion.div)`
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(64, 224, 255, 0.3) 20%,
    rgba(64, 224, 255, 0.8) 50%,
    rgba(64, 224, 255, 0.3) 80%,
    transparent 100%
  );
  margin: 0.5rem 0;
  border-radius: 1px;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 0.9rem;
  color: rgba(64, 224, 255, 0.8);
  font-weight: 300;
  letter-spacing: 4px;
  line-height: 1.4;
  text-transform: uppercase;
  position: relative;
  margin: 0;
  text-shadow: 0 0 10px rgba(64, 224, 255, 0.2);
  overflow: hidden;
  
  
  
  
`;

const ParticleTrail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(64, 224, 255, 1) 0%, rgba(64, 224, 255, 0.6) 50%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(64, 224, 255, 0.8), 0 0 24px rgba(64, 224, 255, 0.4);
`;

const SubtitleAccent = styled(motion.div)`
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(64, 224, 255, 0.4) 50%,
    transparent 100%
  );
  margin: 0.2rem 0;
  border-radius: 1px;
`;

const ProjectsSection = styled.div`
  margin-bottom: 4rem;
`;

const SubsectionTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SubsectionIcon = styled.div`
  color: #ffd700;
  font-size: 1.5rem;
`;

const SubsectionDescription = styled(motion.p)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(64, 224, 255, 0.15);
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(64, 224, 255, 0.3);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(64, 224, 255, 0.1), 
      transparent, 
      rgba(100, 200, 255, 0.1)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px rgba(64, 224, 255, 0.2);
    border-color: rgba(64, 224, 255, 0.4);

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, 
    rgba(64, 224, 255, 0.2) 0%, 
    rgba(100, 200, 255, 0.1) 100%
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(64, 224, 255, 0.6);
  font-size: 3rem;
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProjectCard}:hover &::before {
    opacity: 1;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  gap: 1rem;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffd700;
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechnologyTag = styled.span`
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(255, 215, 0, 0.3);
`;

const ProjectMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const MetricIcon = styled.div`
  color: #ffd700;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: white;
  font-size: 1.2rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffd700;
  border-radius: 50%;
  margin-right: 1rem;
`;

interface ProjectsProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  loading: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onProjectSelect, loading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (loading) {
    return (
      <ProjectsContainer id="projects">
        <LoadingContainer>
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Loading projects...
        </LoadingContainer>
      </ProjectsContainer>
    );
  }

  // Separate projects by category
  const projectItems = projects.filter(project => project.category === 'project');
  const dashboardItems = projects.filter(project => project.category === 'dashboard');

  const renderProjectCard = (project: Project, index: number) => (
    <ProjectCard
      key={project.id}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 50, 
        rotateX: -15,
        scale: 0.9
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onProjectSelect(project)}
    >
      <ProjectImage>
        {project.category === 'dashboard' ? <FaChartBar /> : <FaProjectDiagram />}
        <ProjectOverlay>
          <OverlayButton
            onClick={(e) => {
              e.stopPropagation();
              onProjectSelect(project);
            }}
          >
            <FaEye />
          </OverlayButton>
          <OverlayButton
            onClick={(e) => {
              e.stopPropagation();
              // Handle external link
            }}
          >
            <FaExternalLinkAlt />
          </OverlayButton>
        </ProjectOverlay>
      </ProjectImage>
      
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        
        <ProjectTechnologies>
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <TechnologyTag key={techIndex}>
              {tech}
            </TechnologyTag>
          ))}
          {project.technologies.length > 4 && (
            <TechnologyTag>
              +{project.technologies.length - 4} more
            </TechnologyTag>
          )}
        </ProjectTechnologies>
        
        <ProjectMetrics>
          <Metric>
            <MetricIcon>
              <FaEye />
            </MetricIcon>
            {project.metrics.views} views
          </Metric>
          <Metric>
            <MetricIcon>
              <FaClock />
            </MetricIcon>
            {project.metrics.duration}
          </Metric>
        </ProjectMetrics>
      </ProjectContent>
    </ProjectCard>
  );

  return (
    <ProjectsContainer id="projects" ref={ref}>
      <ProjectsContent>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <TypographyContainer
            animate={{
              textShadow: [
                "0 0 30px rgba(64, 224, 255, 0.3)",
                "0 0 50px rgba(64, 224, 255, 0.6)",
                "0 0 30px rgba(64, 224, 255, 0.3)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SectionTitle>
              Stuff I've worked on...
            </SectionTitle>
            
            <TitleAccent
              animate={{
                scaleX: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <SectionSubtitle
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ParticleTrail>
                {[...Array(8)].map((_, i) => (
                  <Particle
                    key={i}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  animate={{
                    x: [0, Math.random() * 80 - 40],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0, 1, 0.6, 1, 0],
                    scale: [0, 1.5, 0.8, 1.2, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                  />
                ))}
              </ParticleTrail>
              A selection of things I've brought to life
            </SectionSubtitle>
            
            <SubtitleAccent
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </TypographyContainer>
        </SectionHeader>

      {/* Projects Delivered Section */}
      <ProjectsSection>
        <SubsectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SubsectionIcon>
            <FaProjectDiagram />
          </SubsectionIcon>
          Projects Delivered
        </SubsectionTitle>
        
        <SubsectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          End-to-end data analysis projects and machine learning solutions
        </SubsectionDescription>

        <ProjectsGrid>
          {projectItems.map((project, index) => renderProjectCard(project, index))}
        </ProjectsGrid>
      </ProjectsSection>

      {/* Dashboards & Models Section */}
      <ProjectsSection>
        <SubsectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SubsectionIcon>
            <FaChartBar />
          </SubsectionIcon>
          Dashboards & Models
        </SubsectionTitle>
        
        <SubsectionDescription
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Interactive dashboards and analytical models for real-time insights
        </SubsectionDescription>

        <ProjectsGrid>
          {dashboardItems.map((project, index) => renderProjectCard(project, index))}
        </ProjectsGrid>
      </ProjectsSection>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects;

