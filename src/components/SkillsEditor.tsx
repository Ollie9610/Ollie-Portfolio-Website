import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

interface Skill {
  name: string;
  level: number;
  category: 'Programming & Query Languages' | 'Analytics & Data Platforms' | 'Application Development & Automation' | 'Business Systems';
}

const EditorContainer = styled.div`
  h2 {
    color: #333;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CategorySection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
`;

const CategoryTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #40e0ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const SkillCard = styled(motion.div)`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #40e0ff;
    box-shadow: 0 5px 15px rgba(64, 224, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillName = styled.h3`
  color: #333;
  font-size: 1.1rem;
  margin: 0;
`;



const SkillActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)<{ variant?: 'edit' | 'delete' | 'add' }>`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: #007bff;
          color: white;
          &:hover { background: #0056b3; }
        `;
      case 'delete':
        return `
          background: #dc3545;
          color: white;
          &:hover { background: #c82333; }
        `;
      case 'add':
        return `
          background: #28a745;
          color: white;
          &:hover { background: #218838; }
        `;
      default:
        return `
          background: #6c757d;
          color: white;
          &:hover { background: #5a6268; }
        `;
    }
  }}
`;


const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;


const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.1);
  }
`;


const DotSelector = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const DotOption = styled.button<{ selected: boolean; category: string; level: number }>`
  width: 120px;
  height: 80px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#6c757d';
    }
  })() : '#e9ecef'};
  background: ${props => props.selected ? (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(66, 165, 245, 0.05))';
      case 'Analytics & Data Platforms': return 'linear-gradient(135deg, rgba(123, 31, 162, 0.1), rgba(186, 104, 200, 0.05))';
      case 'Application Development & Automation': return 'linear-gradient(135deg, rgba(56, 142, 60, 0.1), rgba(102, 187, 106, 0.05))';
      case 'Business Systems': return 'linear-gradient(135deg, rgba(245, 124, 0, 0.1), rgba(255, 183, 77, 0.05))';
      default: return '#f8f9fa';
    }
  })() : 'white'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.selected ? (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#495057';
    }
  })() : '#6c757d'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.selected ? (() => {
      switch (props.category) {
        case 'Programming & Query Languages': return 'linear-gradient(135deg, rgba(25, 118, 210, 0.05), transparent)';
        case 'Analytics & Data Platforms': return 'linear-gradient(135deg, rgba(123, 31, 162, 0.05), transparent)';
        case 'Application Development & Automation': return 'linear-gradient(135deg, rgba(56, 142, 60, 0.05), transparent)';
        case 'Business Systems': return 'linear-gradient(135deg, rgba(245, 124, 0, 0.05), transparent)';
        default: return 'transparent';
      }
    })() : 'transparent'};
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${props => props.selected ? (() => {
      switch (props.category) {
        case 'Programming & Query Languages': return '0 8px 25px rgba(25, 118, 210, 0.2)';
        case 'Analytics & Data Platforms': return '0 8px 25px rgba(123, 31, 162, 0.2)';
        case 'Application Development & Automation': return '0 8px 25px rgba(56, 142, 60, 0.2)';
        case 'Business Systems': return '0 8px 25px rgba(245, 124, 0, 0.2)';
        default: return '0 8px 25px rgba(0, 0, 0, 0.15)';
      }
    })() : '0 8px 25px rgba(0, 0, 0, 0.15)'};
    border-color: ${props => (() => {
      switch (props.category) {
        case 'Programming & Query Languages': return '#1976d2';
        case 'Analytics & Data Platforms': return '#7b1fa2';
        case 'Application Development & Automation': return '#388e3c';
        case 'Business Systems': return '#f57c00';
        default: return '#6c757d';
      }
    })()};
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const DotPreview = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  z-index: 1;
`;

const PreviewDot = styled.div<{ filled: boolean; category: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.filled ? (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#6c757d';
    }
  })() : '#e9ecef'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.filled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const ProficiencyLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.25rem;
  z-index: 1;
  text-align: center;
`;

const LevelIndicator = styled.div<{ level: number; category: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => (() => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#6c757d';
    }
  })()};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  opacity: ${props => props.level >= 90 ? 1 : 0.7};
  z-index: 1;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const SaveButton = styled(motion.button)`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(motion.button)`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
  }
`;

const CategoryAddButton = styled(motion.button)<{ category: Skill['category'] }>`
  background: ${props => {
    switch (props.category) {
      case 'Programming & Query Languages': return '#1976d2';
      case 'Analytics & Data Platforms': return '#7b1fa2';
      case 'Application Development & Automation': return '#388e3c';
      case 'Business Systems': return '#f57c00';
      default: return '#6c757d';
    }
  }};
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: ${props => {
      switch (props.category) {
        case 'Programming & Query Languages': return '#1565c0';
        case 'Analytics & Data Platforms': return '#6a1b9a';
        case 'Application Development & Automation': return '#2e7d32';
        case 'Business Systems': return '#ef6c00';
        default: return '#5a6268';
      }
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SkillsEditor: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    level: 50,
    category: 'Programming & Query Languages'
  });
  const [proficiencyDots, setProficiencyDots] = useState(2);

  // Helper functions to convert between dots and percentage
  const dotsToPercentage = (dots: number) => {
    switch (dots) {
      case 1: return 40;  // Beginner
      case 2: return 75;  // Intermediate
      case 3: return 95;  // Expert
      default: return 50;
    }
  };

  const percentageToDots = (percentage: number) => {
    if (percentage >= 90) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  // Ensure form state is properly reset
  useEffect(() => {
    if (!isAdding && !editingSkill) {
      setFormData({
        name: '',
        level: 50,
        category: 'Programming & Query Languages'
      });
      setProficiencyDots(2);
    }
  }, [isAdding, editingSkill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillData = {
      ...formData,
      level: dotsToPercentage(proficiencyDots)
    } as Skill;
    
    if (isAdding) {
      addSkill(skillData);
    } else if (editingSkill) {
      updateSkill(editingSkill, skillData);
    }
    
    // Close the form immediately after submission
    handleClose();
  };

  const handleClose = () => {
    console.log('Closing form, current isAdding:', isAdding);
    setFormData({
      name: '',
      level: 50,
      category: 'Programming & Query Languages'
    });
    setProficiencyDots(2);
    setIsAdding(false);
    setEditingSkill(null);
  };

  const handleAddSkill = (category: Skill['category']) => {
    console.log('Adding skill to category:', category, 'Current isAdding:', isAdding);
    
    // If already adding or editing, close the current form first
    if (isAdding || editingSkill) {
      handleClose();
      // Use setTimeout to ensure state is reset before opening new form
      setTimeout(() => {
        setFormData({
          name: '',
          level: 50,
          category: category
        });
        setProficiencyDots(2);
        setIsAdding(true);
        setEditingSkill(null);
      }, 100);
    } else {
      setFormData({
        name: '',
        level: 50,
        category: category
      });
      setProficiencyDots(2);
      setIsAdding(true);
      setEditingSkill(null);
    }
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setProficiencyDots(percentageToDots(skill.level));
    setEditingSkill(skill.name);
    setIsAdding(false);
  };

  const categories: Skill['category'][] = ['Programming & Query Languages', 'Analytics & Data Platforms', 'Application Development & Automation', 'Business Systems'];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryIcons = {
    'Programming & Query Languages': '💻',
    'Analytics & Data Platforms': '📊',
    'Application Development & Automation': '⚙️',
    'Business Systems': '🏢'
  };

  return (
    <EditorContainer>
      <h2>Manage Skills</h2>

      <AnimatePresence>
        {(isAdding || editingSkill) && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
            <ModalHeader>
              <ModalTitle>
                {isAdding ? 'Add New Skill' : 'Edit Skill'}
              </ModalTitle>
              <CloseButton onClick={handleClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Skill Name</Label>
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  autoFocus
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Category</Label>
                <div style={{ 
                  padding: '0.75rem', 
                  background: '#f8f9fa', 
                  border: '1px solid #ced4da', 
                  borderRadius: '6px',
                  color: '#495057',
                  fontWeight: '500'
                }}>
                  {formData.category}
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Proficiency Level</Label>
                <DotSelector>
                  {[1, 2, 3].map((dots) => (
                    <DotOption
                      key={dots}
                      type="button"
                      selected={proficiencyDots === dots}
                      category={formData.category || 'Programming & Query Languages'}
                      level={dots}
                      onClick={() => setProficiencyDots(dots)}
                    >
                      <LevelIndicator level={dots} category={formData.category || 'Programming & Query Languages'}>
                        {dots}
                      </LevelIndicator>
                      <DotPreview>
                        {[1, 2, 3].map((dotNumber) => (
                          <PreviewDot
                            key={dotNumber}
                            filled={dotNumber <= dots}
                            category={formData.category || 'Programming & Query Languages'}
                          />
                        ))}
                      </DotPreview>
                      <ProficiencyLabel>
                        {dots === 1 ? 'Beginner' : dots === 2 ? 'Intermediate' : 'Expert'}
                      </ProficiencyLabel>
                    </DotOption>
                  ))}
                </DotSelector>
              </FormGroup>

              <FormActions>
                <SaveButton
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSave />
                  {isAdding ? 'Add Skill' : 'Update Skill'}
                </SaveButton>
                <CancelButton
                  type="button"
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes />
                  Cancel
                </CancelButton>
              </FormActions>
            </Form>
          </ModalContent>
        </ModalOverlay>
        )}
      </AnimatePresence>

      <SkillsContainer>
        {categories.map((category) => (
          <CategorySection key={category}>
            <CategoryTitle>
              {categoryIcons[category as keyof typeof categoryIcons]} {category}
            </CategoryTitle>
            <CategoryAddButton
              category={category}
              onClick={() => handleAddSkill(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus />
              Add Skill to {category}
            </CategoryAddButton>
            <SkillsGrid>
              {skillsByCategory[category]?.map((skill) => (
                <SkillCard
                  key={skill.name}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                  </SkillHeader>
                  
                  <SkillActions>
                    <ActionButton
                      variant="edit"
                      onClick={() => handleEdit(skill)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => deleteSkill(skill.name)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </ActionButton>
                  </SkillActions>
                </SkillCard>
              )) || (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  color: '#6c757d', 
                  fontStyle: 'italic',
                  padding: '2rem'
                }}>
                  No skills in this category yet. Add one above!
                </div>
              )}
            </SkillsGrid>
          </CategorySection>
        ))}
      </SkillsContainer>
    </EditorContainer>
  );
};

export default SkillsEditor;

