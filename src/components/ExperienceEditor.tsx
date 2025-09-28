import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const EditorContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const EditorTitle = styled.h3`
  color: #40e0ff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #40e0ff;
    box-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #40e0ff;
    box-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #40e0ff;
    box-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const AchievementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AchievementInput = styled(Input)`
  flex: 1;
`;

const TechnologyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TechnologyTag = styled.span`
  background: rgba(64, 224, 255, 0.2);
  color: #40e0ff;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(64, 224, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TechnologyInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #40e0ff, #64c8ff);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(64, 224, 255, 0.4);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ff4757, #ff6b7a);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
        `;
    }
  }}
`;

const SmallButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  &:hover {
    background: rgba(255, 71, 87, 0.3);
    border-color: #ff4757;
    color: #ff4757;
  }
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ExperienceCard = styled.div<{ $type: 'job' | 'education' }>`
  background: ${props => props.$type === 'job' 
    ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.1) 0%, rgba(100, 200, 255, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)'
  };
  border: 1px solid ${props => props.$type === 'job' 
    ? 'rgba(64, 224, 255, 0.3)'
    : 'rgba(255, 215, 0, 0.3)'
  };
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ExperienceIcon = styled.div<{ $type: 'job' | 'education' }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
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
  font-size: 1rem;
  flex-shrink: 0;
`;

const ExperienceDetails = styled.div`
  flex: 1;
`;

const ExperienceTitle = styled.h4`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const ExperienceCompany = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

const ExperienceMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
`;

const ExperienceActions = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ExperienceEditor: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: 'job' as 'job' | 'education',
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    achievements: [''],
    technologies: [] as string[],
    newTechnology: ''
  });

  useEffect(() => {
    if (editingId) {
      const experience = experiences.find(exp => exp.id === editingId);
      if (experience) {
        setFormData({
          type: experience.type,
          title: experience.title,
          company: experience.company,
          startDate: experience.startDate,
          endDate: experience.endDate || '',
          location: experience.location,
          description: experience.description,
          achievements: experience.achievements.length > 0 ? experience.achievements : [''],
          technologies: experience.technologies,
          newTechnology: ''
        });
      }
    }
  }, [editingId, experiences]);

  const resetForm = () => {
    setFormData({
      type: 'job',
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      achievements: [''],
      technologies: [],
      newTechnology: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData = {
      type: formData.type,
      title: formData.title,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      location: formData.location,
      description: formData.description,
      achievements: formData.achievements.filter(achievement => achievement.trim() !== ''),
      technologies: formData.technologies
    };

    if (editingId) {
      updateExperience(editingId, experienceData);
    } else {
      addExperience(experienceData);
    }
    
    resetForm();
  };

  const handleAddAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const handleUpdateAchievement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) => 
        i === index ? value : achievement
      )
    }));
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleAddTechnology = () => {
    if (formData.newTechnology.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTechnology.trim()],
        newTechnology: ''
      }));
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

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

  return (
    <EditorContainer>
      <EditorTitle>
        {isAdding || editingId ? (
          editingId ? (
            <>
              <FaEdit /> Edit Experience
            </>
          ) : (
            <>
              <FaPlus /> Add New Experience
            </>
          )
        ) : (
          <>
            <FaBriefcase /> Experience Management
          </>
        )}
      </EditorTitle>

      {isAdding || editingId ? (
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>
                <FaBriefcase /> Type
              </Label>
              <Select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  type: e.target.value as 'job' | 'education' 
                }))}
                required
              >
                <option value="job">Job</option>
                <option value="education">Education</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>
                {formData.type === 'job' ? <FaBriefcase /> : <FaGraduationCap />}
                {formData.type === 'job' ? 'Job Title' : 'Degree/Program'}
              </Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={formData.type === 'job' ? 'e.g., Senior Data Analyst' : 'e.g., Master of Science in Data Science'}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                {formData.type === 'job' ? 'Company' : 'Institution'}
              </Label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder={formData.type === 'job' ? 'e.g., TechCorp Solutions' : 'e.g., University of California, Berkeley'}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaCalendarAlt /> Start Date
              </Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaCalendarAlt /> End Date
              </Label>
              <Input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                placeholder="Leave empty for current/ongoing"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaMapMarkerAlt /> Location
              </Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., San Francisco, CA"
                required
              />
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your role, responsibilities, and key contributions..."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Achievements</Label>
            <AchievementList>
              {formData.achievements.map((achievement, index) => (
                <AchievementItem key={index}>
                  <AchievementInput
                    type="text"
                    value={achievement}
                    onChange={(e) => handleUpdateAchievement(index, e.target.value)}
                    placeholder="Enter an achievement..."
                  />
                  <SmallButton
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    disabled={formData.achievements.length === 1}
                  >
                    <FaTrash />
                  </SmallButton>
                </AchievementItem>
              ))}
            </AchievementList>
            <Button 
              type="button" 
              onClick={handleAddAchievement}
              style={{ marginTop: '0.5rem' }}
            >
              <FaPlus /> Add Achievement
            </Button>
          </FormGroup>

          <FormGroup>
            <Label>Technologies</Label>
            <TechnologyList>
              {formData.technologies.map((tech, index) => (
                <TechnologyTag key={index}>
                  {tech}
                  <SmallButton
                    type="button"
                    onClick={() => handleRemoveTechnology(index)}
                  >
                    <FaTrash />
                  </SmallButton>
                </TechnologyTag>
              ))}
            </TechnologyList>
            <TechnologyInput>
              <Input
                type="text"
                value={formData.newTechnology}
                onChange={(e) => setFormData(prev => ({ ...prev, newTechnology: e.target.value }))}
                placeholder="Add a technology..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
              />
              <Button type="button" onClick={handleAddTechnology}>
                <FaPlus /> Add
              </Button>
            </TechnologyInput>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" $variant="primary">
              {editingId ? 'Update Experience' : 'Add Experience'}
            </Button>
            <Button type="button" onClick={resetForm}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      ) : (
        <>
          <Button onClick={() => setIsAdding(true)} $variant="primary">
            <FaPlus /> Add New Experience
          </Button>

          <ExperienceList>
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} $type={experience.type}>
                <ExperienceHeader>
                  <ExperienceIcon $type={experience.type}>
                    {experience.type === 'job' ? <FaBriefcase /> : <FaGraduationCap />}
                  </ExperienceIcon>
                  
                  <ExperienceDetails>
                    <ExperienceTitle>{experience.title}</ExperienceTitle>
                    <ExperienceCompany>{experience.company}</ExperienceCompany>
                    <ExperienceMeta>
                      <span>{formatDuration(experience.startDate, experience.endDate)}</span>
                      <span>•</span>
                      <span>{experience.location}</span>
                    </ExperienceMeta>
                  </ExperienceDetails>

                  <ExperienceActions>
                    <Button
                      onClick={() => setEditingId(experience.id)}
                      style={{ padding: '0.5rem' }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => deleteExperience(experience.id)}
                      $variant="danger"
                      style={{ padding: '0.5rem' }}
                    >
                      <FaTrash />
                    </Button>
                  </ExperienceActions>
                </ExperienceHeader>
              </ExperienceCard>
            ))}
          </ExperienceList>
        </>
      )}
    </EditorContainer>
  );
};

export default ExperienceEditor;