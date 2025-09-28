import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { 
  FaCode, 
  FaChartBar,
  FaCogs,
  FaBuilding
} from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const SkillsContainer = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SkillsContent = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)<{ category: string }>`
  background: ${props => {
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.15)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.15)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.15)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.15)';
      default: return 'rgba(64, 224, 255, 0.15)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.2)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.2)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.2)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.2)';
      default: return 'rgba(64, 224, 255, 0.2)';
    }
  }};
  border-radius: 30px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => {
      switch (props.category) {
        case 'Programming & Query Languages': return 'linear-gradient(45deg, rgba(25, 118, 210, 0.1), transparent, rgba(66, 165, 245, 0.1))';
        case 'Analytics & Data Platforms': return 'linear-gradient(45deg, rgba(123, 31, 162, 0.1), transparent, rgba(186, 104, 200, 0.1))';
        case 'Application Development & Automation': return 'linear-gradient(45deg, rgba(56, 142, 60, 0.1), transparent, rgba(102, 187, 106, 0.1))';
        case 'Business Systems': return 'linear-gradient(45deg, rgba(245, 124, 0, 0.1), transparent, rgba(255, 183, 77, 0.1))';
        default: return 'linear-gradient(45deg, rgba(64, 224, 255, 0.1), transparent, rgba(100, 200, 255, 0.1))';
      }
    }};
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: ${props => {
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.4)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.4)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.4)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.4)';
        default: return 'rgba(64, 224, 255, 0.4)';
      }
    }};
    box-shadow: ${props => {
      switch (props.category) {
        case 'Programming & Query Languages': return '0 25px 50px rgba(25, 118, 210, 0.2)';
        case 'Analytics & Data Platforms': return '0 25px 50px rgba(123, 31, 162, 0.2)';
        case 'Application Development & Automation': return '0 25px 50px rgba(56, 142, 60, 0.2)';
        case 'Business Systems': return '0 25px 50px rgba(245, 124, 0, 0.2)';
        default: return '0 25px 50px rgba(64, 224, 255, 0.2)';
      }
    }};

    &::before {
      opacity: 1;
    }
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const CategoryIcon = styled(motion.div)<{ category: string }>`
  color: ${props => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#ffd700';
    }
  }};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillItem = styled(motion.div)<{ category: string; proficiency: number }>`
  background: ${props => {
    if (props.proficiency >= 90) {
      // 3-dot skills get gradient background
      switch (props.category) {
        case 'Programming & Query Languages': return 'linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(66, 165, 245, 0.1))';
        case 'Analytics & Data Platforms': return 'linear-gradient(135deg, rgba(123, 31, 162, 0.2), rgba(186, 104, 200, 0.1))';
        case 'Application Development & Automation': return 'linear-gradient(135deg, rgba(56, 142, 60, 0.2), rgba(102, 187, 106, 0.1))';
        case 'Business Systems': return 'linear-gradient(135deg, rgba(245, 124, 0, 0.2), rgba(255, 183, 77, 0.1))';
        default: return 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 237, 78, 0.1))';
      }
    }
    // Regular skills get solid background
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.1)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.1)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.1)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.1)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border: ${props => {
    const baseColor = (() => {
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.3)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.3)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.3)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.3)';
        default: return 'rgba(255, 255, 255, 0.2)';
      }
    })();
    
    // 3-dot skills get prominent outline
    if (props.proficiency >= 90) {
      switch (props.category) {
        case 'Programming & Query Languages': return '2px solid #1976d2';
        case 'Analytics & Data Platforms': return '2px solid #7b1fa2';
        case 'Application Development & Automation': return '2px solid #388e3c';
        case 'Business Systems': return '2px solid #f57c00';
        default: return '2px solid #ffd700';
      }
    }
    return `1px solid ${baseColor}`;
  }};
  border-radius: 30px;
  padding: 0.75rem 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: ${props => props.proficiency >= 90 ? '600' : '500'};
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => props.proficiency >= 90 ? '0 0 8px rgba(255, 215, 0, 0.8)' : 'none'};
  z-index: ${props => props.proficiency >= 90 ? '2' : '1'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.proficiency >= 90 ? (() => {
      switch (props.category) {
        case 'Programming & Query Languages': return 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), transparent)';
        case 'Analytics & Data Platforms': return 'linear-gradient(135deg, rgba(123, 31, 162, 0.1), transparent)';
        case 'Application Development & Automation': return 'linear-gradient(135deg, rgba(56, 142, 60, 0.1), transparent)';
        case 'Business Systems': return 'linear-gradient(135deg, rgba(245, 124, 0, 0.1), transparent)';
        default: return 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent)';
      }
    })() : 'transparent'};
    border-radius: 30px;
    opacity: ${props => props.proficiency >= 90 ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: ${props => {
      if (props.proficiency >= 90) {
        // Enhanced hover for 3-dot skills
        switch (props.category) {
          case 'Programming & Query Languages': return 'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(66, 165, 245, 0.2))';
          case 'Analytics & Data Platforms': return 'linear-gradient(135deg, rgba(123, 31, 162, 0.3), rgba(186, 104, 200, 0.2))';
          case 'Application Development & Automation': return 'linear-gradient(135deg, rgba(56, 142, 60, 0.3), rgba(102, 187, 106, 0.2))';
          case 'Business Systems': return 'linear-gradient(135deg, rgba(245, 124, 0, 0.3), rgba(255, 183, 77, 0.2))';
          default: return 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 237, 78, 0.2))';
        }
      }
      // Regular hover for other skills
      switch (props.category) {
        case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.2)';
        case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.2)';
        case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.2)';
        case 'Business Systems': return 'rgba(245, 124, 0, 0.2)';
        default: return 'rgba(255, 215, 0, 0.2)';
      }
    }};
    border-color: ${props => {
      switch (props.category) {
        case 'Programming & Query Languages': return '#1976d2';
        case 'Analytics & Data Platforms': return '#7b1fa2';
        case 'Application Development & Automation': return '#388e3c';
        case 'Business Systems': return '#f57c00';
        default: return '#ffd700';
      }
    }};
    transform: translateY(-2px);
    box-shadow: ${props => props.proficiency >= 90 ? '0 4px 12px rgba(255, 215, 0, 0.9)' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  }
`;

const SkillContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SkillName = styled.span`
  flex: 1;
`;

const ProficiencyDots = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Dot = styled.div<{ filled: boolean; category: string; isExpert?: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.filled ? (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#ffd700';
    }
  })() : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  box-shadow: none;
  border: none;
`;


const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = useData();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  const categoryIcons = {
    'Programming & Query Languages': <FaCode />,
    'Analytics & Data Platforms': <FaChartBar />,
    'Application Development & Automation': <FaCogs />,
    'Business Systems': <FaBuilding />
  };

  const categoryOrder = ['Programming & Query Languages', 'Analytics & Data Platforms', 'Application Development & Automation', 'Business Systems'];

  // Helper function to get proficiency dots (1-3 dots)
  const getProficiencyDots = (level: number) => {
    if (level >= 90) return 3;
    if (level >= 60) return 2;
    return 1;
  };


  return (
    <SkillsContainer id="skills" ref={ref}>
      <SkillsContent>
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
              What I know...
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
              Not everything; but the essentials
            </SectionSubtitle>
            
            <SubtitleAccent
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </TypographyContainer>
        </SectionHeader>

        <SkillsGrid>
        {categoryOrder.map((categoryName, index) => {
          const categorySkills = skillsByCategory[categoryName] || [];
          if (categorySkills.length === 0) return null;
          
          return (
            <SkillCategory
              key={categoryName}
              category={categoryName}
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
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryTitle>
                <CategoryIcon 
                  category={categoryName}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {categoryIcons[categoryName as keyof typeof categoryIcons]}
                </CategoryIcon>
                {categoryName}
              </CategoryTitle>
            <SkillsList>
              {categorySkills
                .sort((a, b) => b.level - a.level) // Sort by proficiency (highest first)
                .map((skill, skillIndex) => {
                  const dots = getProficiencyDots(skill.level);
                  return (
                    <SkillItem
                      key={skill.name}
                      category={categoryName}
                      proficiency={skill.level}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + skillIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SkillContent>
                        <SkillName>{skill.name}</SkillName>
                        <ProficiencyDots>
                          {[1, 2, 3].map((dotNumber) => (
                            <Dot
                              key={dotNumber}
                              filled={dotNumber <= dots}
                              category={categoryName}
                              isExpert={skill.level >= 90}
                            />
                          ))}
                        </ProficiencyDots>
                      </SkillContent>
                    </SkillItem>
                  );
                })}
            </SkillsList>
            </SkillCategory>
          );
        })}
        </SkillsGrid>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills;
