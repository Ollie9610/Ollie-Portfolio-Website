import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Skill } from '../types';
import { 
  FaCode, 
  FaChartBar,
  FaCogs,
  FaBuilding
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 2rem;
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #40e0ff, #00bfff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 10px rgba(64, 224, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #00bfff, #40e0ff);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(64, 224, 255, 0.4);
  }
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
  }
`;

const CategorySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  max-height: 250px;
  overflow-y: auto;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CategoryIcon = styled.div`
  color: #40e0ff;
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled.div<{ isEditing?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.isEditing ? 'rgba(64, 224, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
  cursor: ${props => props.isEditing ? 'default' : 'pointer'};
  
  &:hover {
    background: ${props => props.isEditing ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.isEditing ? 'rgba(64, 224, 255, 0.5)' : 'rgba(64, 224, 255, 0.3)'};
    transform: ${props => props.isEditing ? 'none' : 'translateY(-1px)'};
  }
`;

const SkillInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const SkillName = styled.span`
  color: white;
  font-weight: 500;
  font-size: 12px;
  flex: 1;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Dot = styled.div<{ filled: boolean; isExpert?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => 
    props.filled 
      ? props.isExpert 
        ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
        : 'rgba(64, 224, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.2)'
  };
  border: 1px solid ${props => 
    props.filled 
      ? props.isExpert 
        ? 'rgba(255, 215, 0, 0.8)'
        : 'rgba(64, 224, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.3)'
  };
  transition: all 0.3s ease;
`;

const SkillActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-end;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: rgba(64, 224, 255, 0.2);
          color: #40e0ff;
          border: 1px solid rgba(64, 224, 255, 0.3);
          &:hover {
            background: rgba(64, 224, 255, 0.3);
          }
        `;
      case 'delete':
        return `
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          border: 1px solid rgba(244, 67, 54, 0.3);
          &:hover {
            background: rgba(244, 67, 54, 0.3);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
    }
  }}
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  padding: 10px;
  font-size: 12px;
`;

const InlineInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(64, 224, 255, 0.3);
  border-radius: 4px;
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: rgba(64, 224, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ClickableDotsContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

const ClickableDot = styled.div<{ filled: boolean; isExpert?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => 
    props.filled 
      ? props.isExpert 
        ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
        : 'rgba(64, 224, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.2)'
  };
  border: 1px solid ${props => 
    props.filled 
      ? props.isExpert 
        ? 'rgba(255, 215, 0, 0.8)'
        : 'rgba(64, 224, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.3)'
  };
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: ${props => 
      props.filled 
        ? props.isExpert 
          ? '0 0 8px rgba(255, 215, 0, 0.6)'
          : '0 0 6px rgba(64, 224, 255, 0.6)'
        : '0 0 4px rgba(255, 255, 255, 0.4)'
    };
  }
`;

const InlineDotsSelect = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(64, 224, 255, 0.3);
  border-radius: 4px;
  color: white;
  padding: 2px 4px;
  font-size: 10px;
  width: 60px;
  
  &:focus {
    outline: none;
    border-color: rgba(64, 224, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #1a1a1a;
    color: white;
  }
`;

const InlineActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
`;

const AddSkillButton = styled.button`
  padding: 6px 12px;
  background: rgba(64, 224, 255, 0.1);
  color: #40e0ff;
  border: 1px solid rgba(64, 224, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  
  &:hover {
    background: rgba(64, 224, 255, 0.2);
    border-color: rgba(64, 224, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const SaveAllButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #40e0ff, #00bfff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 10px rgba(64, 224, 255, 0.3);
  margin: 20px auto 0;
  
  &:hover {
    background: linear-gradient(135deg, #00bfff, #40e0ff);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(64, 224, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const InlineButton = styled.button<{ variant?: 'save' | 'cancel' | 'delete' }>`
  padding: 2px 6px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'save':
        return `
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
          border: 1px solid rgba(76, 175, 80, 0.3);
          &:hover {
            background: rgba(76, 175, 80, 0.3);
          }
        `;
      case 'cancel':
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
      case 'delete':
        return `
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          border: 1px solid rgba(244, 67, 54, 0.3);
          &:hover {
            background: rgba(244, 67, 54, 0.3);
          }
        `;
      default:
        return `
          background: rgba(64, 224, 255, 0.2);
          color: #40e0ff;
          border: 1px solid rgba(64, 224, 255, 0.3);
          &:hover {
            background: rgba(64, 224, 255, 0.3);
          }
        `;
    }
  }}
`;

const SkillsEditor: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [editingData, setEditingData] = useState<{ name: string; dots: number; category: string }>({
    name: '',
    dots: 2,
    category: 'Programming & Query Languages'
  });
  const [pendingEdit, setPendingEdit] = useState<{category: string, name: string} | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-start editing when a new skill is added
  React.useEffect(() => {
    if (pendingEdit) {
      const skillIndex = skills.findIndex(skill => 
        skill.name === pendingEdit.name && skill.category === pendingEdit.category
      );
      
      if (skillIndex !== -1) {
        setEditingSkill(skillIndex);
        setEditingData({
          name: pendingEdit.name,
          dots: 2,
          category: pendingEdit.category
        });
        setPendingEdit(null);
        
        // Focus the input field after a short delay to ensure it's rendered
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // Select all text for easy replacement
          }
        }, 50);
      }
    }
  }, [skills, pendingEdit]);

  const categories = [
    { name: 'Programming & Query Languages', icon: FaCode },
    { name: 'Analytics & Data Platforms', icon: FaChartBar },
    { name: 'Application Development & Automation', icon: FaCogs },
    { name: 'Business Systems', icon: FaBuilding }
  ];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);



  const handleEdit = (skill: Skill, index: number) => {
    setEditingData({
      name: skill.name,
      dots: skill.dots,
      category: skill.category
    });
    setEditingSkill(index);
    
    // Focus the input field after a short delay to ensure it's rendered
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select(); // Select all text for easy replacement
      }
    }, 50);
  };

  const handleInlineChange = (field: string, value: string | number) => {
    setEditingData(prev => ({
      ...prev,
      [field]: field === 'dots' ? parseInt(value as string) : value
    }));
  };

  const handleInlineSave = async (index: number) => {
    if (!editingData.name.trim()) {
      setStatus({ message: '❌ Skill name is required', success: false });
      return;
    }

    try {
      await updateSkill(index, editingData as Skill);
      setStatus({ message: '✅ Skill updated successfully!', success: true });
      setEditingSkill(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ message: '❌ Error updating skill. Please try again.', success: false });
    }
  };

  const handleInlineCancel = () => {
    setEditingSkill(null);
    setEditingData({
      name: '',
      dots: 2,
      category: 'Programming & Query Languages'
    });
  };

  const handleDotClick = (dotNumber: number) => {
    setEditingData(prev => ({
      ...prev,
      dots: dotNumber
    }));
  };

  const handleAddSkill = async (category: string) => {
    const newSkill: Skill = {
      name: 'New Skill',
      dots: 2,
      category: category as 'Programming & Query Languages' | 'Analytics & Data Platforms' | 'Application Development & Automation' | 'Business Systems'
    };
    
    try {
      await addSkill(newSkill);
      
      // Set pending edit to trigger auto-editing when skills array updates
      setPendingEdit({
        category: category,
        name: 'New Skill'
      });
      
      setStatus({ message: '✅ Skill added! You can now edit the name and dots.', success: true });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ message: '❌ Error adding skill. Please try again.', success: false });
    }
  };

  const handleSaveAll = async () => {
    try {
      // The skills are already saved individually when edited
      // This is more of a confirmation/refresh action
      setStatus({ message: '✅ All changes saved successfully!', success: true });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ message: '❌ Error saving changes. Please try again.', success: false });
    }
  };

  const handleDelete = async (index: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(index);
        setStatus({ message: '✅ Skill deleted successfully!', success: true });
        setTimeout(() => setStatus(null), 3000);
      } catch (error) {
        setStatus({ message: '❌ Error deleting skill. Please try again.', success: false });
      }
    }
  };


  return (
    <Container>
      <Header>
        <Title>Skills Management</Title>
      </Header>

      <CategoriesContainer>
        {categories.map((category) => {
          const categorySkills = skillsByCategory[category.name] || [];
          const IconComponent = category.icon;
          
          return (
            <CategorySection key={category.name}>
              <CategoryHeader>
                <CategoryIcon>
                  <IconComponent />
                </CategoryIcon>
                <CategoryTitle>{category.name}</CategoryTitle>
              </CategoryHeader>
              
              <SkillsList>
                {categorySkills.length > 0 ? (
                  categorySkills.map((skill, index) => {
                    const globalIndex = skills.findIndex(s => s.name === skill.name);
                    const isEditing = editingSkill === globalIndex;
                    
                    return (
                      <SkillItem key={skill.name} isEditing={isEditing}>
                        <SkillInfo>
                          {isEditing ? (
                            <>
                              <InlineInput
                                ref={inputRef}
                                type="text"
                                value={editingData.name}
                                onChange={(e) => handleInlineChange('name', e.target.value)}
                                placeholder="Skill name"
                              />
                              <ClickableDotsContainer>
                                {[1, 2, 3].map((dotNumber) => (
                                  <ClickableDot
                                    key={dotNumber}
                                    filled={dotNumber <= editingData.dots}
                                    isExpert={editingData.dots === 3}
                                    onClick={() => handleDotClick(dotNumber)}
                                  />
                                ))}
                              </ClickableDotsContainer>
                            </>
                          ) : (
                            <>
                              <SkillName>{skill.name}</SkillName>
                              <DotsContainer>
                                {[1, 2, 3].map((dotNumber) => (
                                  <Dot
                                    key={dotNumber}
                                    filled={dotNumber <= skill.dots}
                                    isExpert={skill.dots === 3}
                                  />
                                ))}
                              </DotsContainer>
                            </>
                          )}
                        </SkillInfo>
                        
                        {isEditing ? (
                          <InlineActions>
                            <InlineButton
                              variant="save"
                              onClick={() => handleInlineSave(globalIndex)}
                            >
                              Save
                            </InlineButton>
                            <InlineButton
                              variant="cancel"
                              onClick={handleInlineCancel}
                            >
                              Cancel
                            </InlineButton>
                          </InlineActions>
                        ) : (
                          <SkillActions>
                            <ActionButton
                              variant="edit"
                              onClick={() => handleEdit(skill, globalIndex)}
                            >
                              Edit
                            </ActionButton>
                            <ActionButton
                              variant="delete"
                              onClick={() => handleDelete(globalIndex)}
                            >
                              Delete
                            </ActionButton>
                          </SkillActions>
                        )}
                      </SkillItem>
                    );
                  })
                ) : (
                  <EmptyState>
                    No skills in this category
                  </EmptyState>
                )}
              </SkillsList>
              
              <AddSkillButton onClick={() => handleAddSkill(category.name)}>
                ➕ Add Skill
              </AddSkillButton>
            </CategorySection>
          );
        })}
      </CategoriesContainer>
      
      <SaveAllButton onClick={handleSaveAll}>
        💾 Save All Changes
      </SaveAllButton>
      
      {status && (
        <div style={{
          padding: '10px 15px',
          borderRadius: '6px',
          marginTop: '20px',
          background: status.success ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
          color: status.success ? '#4caf50' : '#f44336',
          border: `1px solid ${status.success ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'}`
        }}>
          {status.message}
        </div>
      )}
    </Container>
  );
};

export default SkillsEditor;