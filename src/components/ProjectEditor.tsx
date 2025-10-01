import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Project } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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


const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(64, 224, 255, 0.3);
`;

const SectionTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '';
    width: 3px;
    height: 20px;
    background: linear-gradient(45deg, #40e0ff, #00bfff);
    border-radius: 2px;
  }
`;

const AddSectionButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(45deg, #40e0ff, #00bfff);
  border: 2px solid rgba(64, 224, 255, 0.4);
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(64, 224, 255, 0.4);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(64, 224, 255, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(64, 224, 255, 0.5);
  }
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 255, 0.3);
    transform: translateY(-2px);
  }
`;


const ProjectTitle = styled.h3`
  color: white;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ProjectCategory = styled.span<{ category: string }>`
  display: inline-block;
  padding: 4px 8px;
  background: ${props => props.category === 'dashboard' ? 'rgba(64, 224, 255, 0.2)' : 'rgba(255, 193, 7, 0.2)'};
  color: ${props => props.category === 'dashboard' ? '#40e0ff' : '#ffc107'};
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 15px;
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const TechnologyTag = styled.span<{ category?: string }>`
  background: ${props => {
    if (!props.category) return 'rgba(64, 224, 255, 0.1)';
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.1)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.1)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.1)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.1)';
      default: return 'rgba(64, 224, 255, 0.1)';
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
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid ${props => {
    if (!props.category) return 'rgba(64, 224, 255, 0.2)';
    switch (props.category) {
      case 'Programming & Query Languages': return 'rgba(25, 118, 210, 0.2)';
      case 'Analytics & Data Platforms': return 'rgba(123, 31, 162, 0.2)';
      case 'Application Development & Automation': return 'rgba(56, 142, 60, 0.2)';
      case 'Business Systems': return 'rgba(245, 124, 0, 0.2)';
      default: return 'rgba(64, 224, 255, 0.2)';
    }
  }};
`;

const KeyResults = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 15px;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'edit' ? `
    background: rgba(64, 224, 255, 0.2);
    color: #40e0ff;
    border: 1px solid rgba(64, 224, 255, 0.3);
    
    &:hover {
      background: rgba(64, 224, 255, 0.3);
    }
  ` : `
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    border: 1px solid rgba(255, 107, 107, 0.3);
    
    &:hover {
      background: rgba(255, 107, 107, 0.3);
    }
  `}
`;

const FormContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(64, 224, 255, 0.2);
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 30px;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 255, 0.6), transparent);
  }
`;

const FormTitle = styled.h3`
  color: #40e0ff;
  margin: 0 0 30px 0;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #40e0ff, transparent);
    border-radius: 2px;
  }
`;


const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: #40e0ff;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 0 0 3px rgba(64, 224, 255, 0.15),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea`
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: #40e0ff;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 0 0 3px rgba(64, 224, 255, 0.15),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;


const SkillsCategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillsCategorySection = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 12px;
  border: 1px solid rgba(64, 224, 255, 0.15);
  padding: 18px;
  min-height: 220px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(64, 224, 255, 0.25);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

const SkillsCategoryTitle = styled.h4`
  color: #40e0ff;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(64, 224, 255, 0.3);
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
`;

const SkillsCheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  max-height: 180px;
  overflow-y: auto;
  padding: 4px;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(64, 224, 255, 0.5);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(64, 224, 255, 0.7);
  }
`;

const SkillCheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  min-height: 24px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(64, 224, 255, 0.1);
  }
`;

const SkillCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #40e0ff;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 3px;
  
  &:checked {
    background-color: #40e0ff;
  }
`;

const SkillCheckboxLabel = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  
  &:hover {
    color: #40e0ff;
    text-shadow: 0 0 8px rgba(64, 224, 255, 0.3);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 35px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  position: relative;
  overflow: hidden;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #40e0ff, #00bfff);
    color: white;
    box-shadow: 
      0 6px 20px rgba(64, 224, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, #00bfff, #40e0ff);
      box-shadow: 
        0 8px 25px rgba(64, 224, 255, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      
      &::before {
        left: 100%;
      }
    }
  ` : `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
      border-color: rgba(255, 255, 255, 0.4);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const StatusMessage = styled.div<{ success: boolean }>`
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  background: ${props => props.success ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  color: ${props => props.success ? '#4caf50' : '#f44336'};
  border: 1px solid ${props => props.success ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'};
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectEditor: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, skills } = useData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCategory, setEditingCategory] = useState<'project' | 'dashboard'>('project');
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    briefDescription: '',
    description: '',
    technologies: [] as string[],
    keyResults: ''
  });

  // Helper function to get category for a skill
  const getSkillCategory = (skillName: string): string => {
    const skill = skills.find(s => s.name === skillName);
    return skill?.category || '';
  };


  // Separate projects and dashboards
  const projectItems = projects.filter(project => project.category === 'project');
  const dashboardItems = projects.filter(project => project.category === 'dashboard');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skillName: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(skillName)
        ? prev.technologies.filter(tech => tech !== skillName)
        : [...prev.technologies, skillName]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setStatus({ message: `❌ ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} title is required`, success: false });
      return;
    }
    
            if (!formData.briefDescription.trim()) {
              setStatus({ message: `❌ ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} brief description is required`, success: false });
              return;
            }
            
            if (!formData.description.trim()) {
              setStatus({ message: `❌ ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} full description is required`, success: false });
              return;
            }

    // Set the category based on which button was clicked
    const projectData = {
      ...formData,
      category: editingCategory
    };

    try {
      // Use setTimeout to defer the state updates and prevent ResizeObserver errors
      setTimeout(async () => {
        try {
          if (editingProject && editingProject.id && editingProject.id > 0) {
            await updateProject(editingProject.id, projectData);
            setStatus({ message: `✅ ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} updated successfully!`, success: true });
          } else {
            await addProject(projectData);
            setStatus({ message: `✅ ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} added successfully!`, success: true });
          }
          
          setEditingProject(null);
          setFormData({
            title: '',
            briefDescription: '',
            description: '',
            technologies: [],
            keyResults: ''
          });
          
          setTimeout(() => setStatus(null), 3000);
        } catch (error) {
          setStatus({ message: '❌ Error saving project. Please try again.', success: false });
        }
      }, 0);
    } catch (error) {
      setStatus({ message: '❌ Error in form submission. Please try again.', success: false });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditingCategory(project.category);
    setFormData({
      title: project.title,
      briefDescription: project.briefDescription || '',
      description: project.description,
      technologies: project.technologies,
      keyResults: project.keyResults || ''
    });
  };

  const handleCancel = () => {
    setEditingProject(null);
    setEditingCategory('project');
    setFormData({
      title: '',
      briefDescription: '',
      description: '',
      technologies: [],
      keyResults: ''
    });
  };

  const handleAddNew = (category: 'project' | 'dashboard') => {
    setEditingProject({ id: 0 } as Project); // Use id: 0 to indicate new project
    setEditingCategory(category);
    setFormData({
      title: '',
      briefDescription: '',
      description: '',
      technologies: [],
      keyResults: ''
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setStatus({ message: '✅ Project deleted successfully!', success: true });
        setTimeout(() => setStatus(null), 3000);
      } catch (error) {
        setStatus({ message: '❌ Error deleting project. Please try again.', success: false });
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>Projects Management</Title>
      </Header>

      {editingProject && (
        <FormContainer>
          <FormTitle>
            {editingProject.id && editingProject.id > 0 ? `Edit ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'}` : `Add New ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'}`}
          </FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">{editingCategory === 'dashboard' ? 'Dashboard' : 'Project'} Title *</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={`Enter ${editingCategory === 'dashboard' ? 'dashboard' : 'project'} title`}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="briefDescription">Brief Description (for front page) *</Label>
              <Input
                type="text"
                id="briefDescription"
                name="briefDescription"
                value={formData.briefDescription}
                onChange={handleChange}
                placeholder={`One-line description for the front page`}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Full Description *</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={`Describe your ${editingCategory === 'dashboard' ? 'dashboard' : 'project'}...`}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="keyResults">Key Results / Benefits</Label>
              <TextArea
                id="keyResults"
                name="keyResults"
                value={formData.keyResults}
                onChange={handleChange}
                placeholder={`What were the key results or benefits of this ${editingCategory === 'dashboard' ? 'dashboard' : 'project'}?`}
                style={{ minHeight: '100px' }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Technologies (Select from your skills)</Label>
              {skills.length > 0 ? (
                <SkillsCategoryContainer>
                  {['Programming & Query Languages', 'Analytics & Data Platforms', 'Application Development & Automation', 'Business Systems'].map(category => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <SkillsCategorySection key={category}>
                        <SkillsCategoryTitle>{category}</SkillsCategoryTitle>
                        <SkillsCheckboxContainer>
                          {categorySkills.map(skill => (
                            <SkillCheckboxItem key={skill.name}>
                              <SkillCheckbox
                                type="checkbox"
                                id={`skill-${skill.name}`}
                                checked={formData.technologies.includes(skill.name)}
                                onChange={() => handleSkillToggle(skill.name)}
                              />
                              <SkillCheckboxLabel htmlFor={`skill-${skill.name}`}>
                                {skill.name}
                              </SkillCheckboxLabel>
                            </SkillCheckboxItem>
                          ))}
                        </SkillsCheckboxContainer>
                      </SkillsCategorySection>
                    );
                  })}
                </SkillsCategoryContainer>
              ) : (
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  fontStyle: 'italic',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  No skills available. Please add skills in the Skills section first.
                </div>
              )}
            </FormGroup>

            <FormActions>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingProject.id && editingProject.id > 0 ? `Update ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'}` : `Add ${editingCategory === 'dashboard' ? 'Dashboard' : 'Project'}`}
              </Button>
            </FormActions>
          </form>
          
          {status && <StatusMessage success={status.success}>{status.message}</StatusMessage>}
        </FormContainer>
      )}

      <ProjectsContainer>
        {/* Projects Section */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Projects</SectionTitle>
            <AddSectionButton onClick={() => handleAddNew('project')}>
              ➕ Add Project
            </AddSectionButton>
          </SectionHeader>
          
          <ProjectsGrid>
            {projectItems.length > 0 ? (
              projectItems.map(project => (
                <ProjectCard key={project.id}>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.briefDescription || project.description}</ProjectDescription>
                  
                  <ProjectCategory category={project.category}>
                    Project
                  </ProjectCategory>
                  
                  <TechnologiesList>
                    {project.technologies.map((tech, index) => (
                      <TechnologyTag key={index} category={getSkillCategory(tech)}>{tech}</TechnologyTag>
                    ))}
                  </TechnologiesList>
                  
                  {project.keyResults && (
                    <KeyResults>
                      <strong>Key Results:</strong> {project.keyResults}
                    </KeyResults>
                  )}
                  
                  <ProjectActions>
                    <ActionButton
                      variant="edit"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </ActionButton>
                  </ProjectActions>
                </ProjectCard>
              ))
            ) : (
              <EmptyState>
                No projects yet. Click "Add Project" to get started!
              </EmptyState>
            )}
          </ProjectsGrid>
        </SectionContainer>

        {/* Dashboards Section */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Dashboards</SectionTitle>
            <AddSectionButton onClick={() => handleAddNew('dashboard')}>
              ➕ Add Dashboard
            </AddSectionButton>
          </SectionHeader>
          
          <ProjectsGrid>
            {dashboardItems.length > 0 ? (
              dashboardItems.map(project => (
                <ProjectCard key={project.id}>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.briefDescription || project.description}</ProjectDescription>
                  
                  <ProjectCategory category={project.category}>
                    Dashboard
                  </ProjectCategory>
                  
                  <TechnologiesList>
                    {project.technologies.map((tech, index) => (
                      <TechnologyTag key={index} category={getSkillCategory(tech)}>{tech}</TechnologyTag>
                    ))}
                  </TechnologiesList>
                  
                  {project.keyResults && (
                    <KeyResults>
                      <strong>Key Results:</strong> {project.keyResults}
                    </KeyResults>
                  )}
                  
                  <ProjectActions>
                    <ActionButton
                      variant="edit"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </ActionButton>
                  </ProjectActions>
                </ProjectCard>
              ))
            ) : (
              <EmptyState>
                No dashboards yet. Click "Add Dashboard" to get started!
              </EmptyState>
            )}
          </ProjectsGrid>
        </SectionContainer>
      </ProjectsContainer>
    </Container>
  );
};

export default ProjectEditor;