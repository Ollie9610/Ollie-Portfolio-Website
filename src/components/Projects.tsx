import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaChartBar } from 'react-icons/fa';
import { Project } from '../types';
import { useData } from '../contexts/DataContext';

const ProjectsContainer = styled.section`
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.8) 0%, 
    rgba(30, 41, 59, 0.9) 50%, 
    rgba(15, 23, 42, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;


const ProjectsContent = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;

const TypographyContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
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

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 0;
  font-weight: 400;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
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

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
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

  @media (max-width: 768px) {
    font-size: 1.6rem;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    gap: 0.3rem;
  }
`;

const SubsectionIcon = styled.div`
  color: #ffd700;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const SubsectionDescription = styled(motion.p)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
`;


const ViewButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const ShowMoreButton = styled.button`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px auto 0;
  width: fit-content;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;


const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    min-height: 280px;
  }

  @media (max-width: 480px) {
    min-height: 260px;
  }
`;





const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.6rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const TechnologyTag = styled.span<{ category?: string }>`
  background: rgba(64, 224, 255, 0.15);
  color: rgba(64, 224, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(64, 224, 255, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const ProjectMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-start;
  }
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
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
  const { skills } = useData();
  const ref = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllDashboards, setShowAllDashboards] = useState(false);

  // Helper function to get category for a skill
  const getSkillCategory = (skillName: string): string => {
    const skill = skills.find(s => s.name === skillName);
    return skill?.category || '';
  };

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
      onClick={() => onProjectSelect(project)}
    >
      
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.briefDescription || project.description}</ProjectDescription>
        
        <ProjectTechnologies>
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <TechnologyTag key={techIndex} category={getSkillCategory(tech)}>
              {tech}
            </TechnologyTag>
          ))}
          {project.technologies.length > 3 && (
            <TechnologyTag>
              +{project.technologies.length - 3}
            </TechnologyTag>
          )}
        </ProjectTechnologies>
        
        
        <div style={{ textAlign: 'center', marginTop: 'auto' }}>
          <ViewButton>
            <span>View Details</span>
            <span>→</span>
          </ViewButton>
        </div>
      </ProjectContent>
    </ProjectCard>
  );

  return (
    <ProjectsContainer id="projects" ref={ref}>
      <ProjectsContent>
        <SectionHeader>
          <SectionTitle>
            My Work
          </SectionTitle>
          
          <SectionSubtitle>
            A showcase of {projects.length} projects and dashboards I've created
          </SectionSubtitle>
        </SectionHeader>

      {/* Projects Section */}
      <ProjectsSection>
        <SubsectionTitle>
          <SubsectionIcon>
            <FaProjectDiagram />
          </SubsectionIcon>
          Projects
        </SubsectionTitle>
        
        <SubsectionDescription>
          Data analysis projects and machine learning solutions
        </SubsectionDescription>

        <ProjectsGrid>
          {(showAllProjects ? projectItems : projectItems.slice(0, 6)).map((project, index) => renderProjectCard(project, index))}
        </ProjectsGrid>
        {projectItems.length > 6 && (
          <ShowMoreButton 
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? (
              <>
                <span>👆</span>
                <span>Show Less</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Explore More Projects</span>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>({projectItems.length - 6} more)</span>
              </>
            )}
          </ShowMoreButton>
        )}
      </ProjectsSection>

      {/* Dashboards Section */}
      <ProjectsSection>
        <SubsectionTitle>
          <SubsectionIcon>
            <FaChartBar />
          </SubsectionIcon>
          Dashboards
        </SubsectionTitle>
        
        <SubsectionDescription>
          Interactive dashboards and analytical models
        </SubsectionDescription>

        <ProjectsGrid>
          {(showAllDashboards ? dashboardItems : dashboardItems.slice(0, 6)).map((project, index) => renderProjectCard(project, index))}
        </ProjectsGrid>
        {dashboardItems.length > 6 && (
          <ShowMoreButton 
            onClick={() => setShowAllDashboards(!showAllDashboards)}
          >
            {showAllDashboards ? (
              <>
                <span>👆</span>
                <span>Show Less</span>
              </>
            ) : (
              <>
                <span>📊</span>
                <span>Discover More Dashboards</span>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>({dashboardItems.length - 6} more)</span>
              </>
            )}
          </ShowMoreButton>
        )}
      </ProjectsSection>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects;

