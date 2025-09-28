import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const ExperienceContainer = styled.section`
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
    rgba(64, 224, 255, 0.8) 50%, 
    transparent 100%
  );
  margin: 0.5rem 0;
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: 0.9rem;
  color: rgba(64, 224, 255, 0.8);
  font-weight: 300;
  letter-spacing: 4px;
  line-height: 1.4;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(64, 224, 255, 0.2);
  margin: 0;
`;

const SubtitleAccent = styled(motion.div)`
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(64, 224, 255, 0.6) 50%, 
    transparent 100%
  );
  margin: 0.2rem 0;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.$active ? '#40e0ff' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$active ? 'rgba(64, 224, 255, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#40e0ff' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #40e0ff;
    background: rgba(64, 224, 255, 0.1);
    color: #40e0ff;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(64, 224, 255, 0.3) 10%, 
    rgba(64, 224, 255, 0.6) 50%, 
    rgba(64, 224, 255, 0.3) 90%, 
    transparent 100%
  );
  transform: translateX(-50%);
`;

const TimelineItem = styled(motion.div)<{ $side: 'left' | 'right' }>`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
  ${props => props.$side === 'left' ? `
    flex-direction: row;
    justify-content: flex-end;
  ` : `
    flex-direction: row-reverse;
    justify-content: flex-start;
  `}
`;

const TimelineContent = styled(motion.div)<{ $side: 'left' | 'right', $type: 'job' | 'education' }>`
  background: ${props => props.$type === 'job' 
    ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.1) 0%, rgba(100, 200, 255, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)'
  };
  border: 1px solid ${props => props.$type === 'job' 
    ? 'rgba(64, 224, 255, 0.3)'
    : 'rgba(255, 215, 0, 0.3)'
  };
  border-radius: 15px;
  padding: 1.5rem;
  width: calc(50% - 2rem);
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    ${props => props.$side === 'left' ? 'right: -8px;' : 'left: -8px;'}
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-${props => props.$side === 'left' ? 'left' : 'right'}: 8px solid ${props => props.$type === 'job' 
      ? 'rgba(64, 224, 255, 0.3)'
      : 'rgba(255, 215, 0, 0.3)'
    };
  }
`;

const TimelineDot = styled.div<{ $type: 'job' | 'education' }>`
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.$type === 'job' 
    ? 'linear-gradient(135deg, #40e0ff, #64c8ff)'
    : 'linear-gradient(135deg, #ffd700, #ffb347)'
  };
  border: 3px solid ${props => props.$type === 'job' 
    ? 'rgba(64, 224, 255, 0.8)'
    : 'rgba(255, 215, 0, 0.8)'
  };
  box-shadow: 0 0 20px ${props => props.$type === 'job' 
    ? 'rgba(64, 224, 255, 0.5)'
    : 'rgba(255, 215, 0, 0.5)'
  };
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ExperienceIcon = styled.div<{ $type: 'job' | 'education' }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.$type === 'job' 
    ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.2), rgba(100, 200, 255, 0.1))'
    : 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1))'
  };
  border: 1px solid ${props => props.$type === 'job' 
    ? 'rgba(64, 224, 255, 0.3)'
    : 'rgba(255, 215, 0, 0.3)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$type === 'job' ? '#40e0ff' : '#ffd700'};
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ExperienceInfo = styled.div`
  flex: 1;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const ExperienceCompany = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.5rem 0;
`;

const ExperienceMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ExperienceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const AchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;

  &::before {
    content: '→';
    color: #40e0ff;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechnologyTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

const formatDuration = (startDate: string, endDate: string | null): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

const Experience: React.FC = () => {
  const { experiences } = useData();
  const [activeFilter, setActiveFilter] = useState<'all' | 'job' | 'education'>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Filter experiences based on active filter
  const filteredExperiences = sortedExperiences.filter(exp => {
    if (activeFilter === 'all') return true;
    return exp.type === activeFilter;
  });

  return (
    <ExperienceContainer id="experience">
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
          transition={{ duration: 4, repeat: Infinity }}
        >
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How I got here...
          </SectionTitle>
          
          <TitleAccent
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            My professional journey
          </SectionSubtitle>
          
          <SubtitleAccent
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </TypographyContainer>
      </SectionHeader>

      <FilterTabs>
        <FilterTab 
          $active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          All
        </FilterTab>
        <FilterTab 
          $active={activeFilter === 'job'} 
          onClick={() => setActiveFilter('job')}
        >
          <FaBriefcase /> Jobs
        </FilterTab>
        <FilterTab 
          $active={activeFilter === 'education'} 
          onClick={() => setActiveFilter('education')}
        >
          <FaGraduationCap /> Education
        </FilterTab>
      </FilterTabs>

      <TimelineContainer ref={ref}>
        <TimelineLine />
        
        {filteredExperiences.map((experience, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <TimelineItem 
              key={experience.id} 
              $side={isLeft ? 'left' : 'right'}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TimelineContent 
                $side={isLeft ? 'left' : 'right'} 
                $type={experience.type}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                <ExperienceHeader>
                  <ExperienceIcon $type={experience.type}>
                    {experience.type === 'job' ? <FaBriefcase /> : <FaGraduationCap />}
                  </ExperienceIcon>
                  
                  <ExperienceInfo>
                    <ExperienceTitle>{experience.title}</ExperienceTitle>
                    <ExperienceCompany>{experience.company}</ExperienceCompany>
                    
                    <ExperienceMeta>
                      <MetaItem>
                        <FaCalendarAlt />
                        {formatDuration(experience.startDate, experience.endDate)}
                      </MetaItem>
                      <MetaItem>
                        <FaMapMarkerAlt />
                        {experience.location}
                      </MetaItem>
                    </ExperienceMeta>
                  </ExperienceInfo>
                </ExperienceHeader>
                
                <ExperienceDescription>{experience.description}</ExperienceDescription>
                
                {experience.achievements.length > 0 && (
                  <AchievementsList>
                    {experience.achievements.map((achievement, idx) => (
                      <AchievementItem key={idx}>{achievement}</AchievementItem>
                    ))}
                  </AchievementsList>
                )}
                
                {experience.technologies.length > 0 && (
                  <TechnologiesList>
                    {experience.technologies.map((tech, idx) => (
                      <TechnologyTag key={idx}>{tech}</TechnologyTag>
                    ))}
                  </TechnologiesList>
                )}
              </TimelineContent>
              
              <TimelineDot $type={experience.type}>
                {experience.type === 'job' ? <FaBriefcase /> : <FaGraduationCap />}
              </TimelineDot>
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </ExperienceContainer>
  );
};

export default Experience;