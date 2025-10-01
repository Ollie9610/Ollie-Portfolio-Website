import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(45deg, #4caf50, #45a049);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const ExperienceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ExperienceTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.2rem;
  flex: 1;
`;

const ExperienceActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'edit' ? `
    background: rgba(33, 150, 243, 0.2);
    color: #2196f3;
    border: 1px solid rgba(33, 150, 243, 0.3);
    
    &:hover {
      background: rgba(33, 150, 243, 0.3);
    }
  ` : `
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
    
    &:hover {
      background: rgba(244, 67, 54, 0.3);
    }
  `}
`;

const ExperienceMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  flex-wrap: wrap;
`;

const ExperienceDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const ExperienceEditor: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useData();
  const [editingExperience, setEditingExperience] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    type: 'job' as 'job' | 'education',
    startDate: '',
    endDate: null as string | null,
    location: '',
    duration: '',
    achievements: [] as string[],
    technologies: [] as string[]
  });

  const handleAdd = () => {
    setEditingExperience(-1);
    setFormData({
      title: '',
      company: '',
      description: '',
      type: 'job',
      startDate: '',
      endDate: null,
      location: '',
      duration: '',
      achievements: [],
      technologies: []
    });
  };

  const handleEdit = (index: number) => {
    setEditingExperience(index);
    setFormData({
      title: experiences[index].title,
      company: experiences[index].company,
      description: experiences[index].description,
      type: experiences[index].type,
      startDate: experiences[index].startDate,
      endDate: experiences[index].endDate || null,
      location: experiences[index].location,
      duration: experiences[index].duration,
      achievements: experiences[index].achievements || [],
      technologies: experiences[index].technologies || []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingExperience === -1) {
        await addExperience(formData);
      } else if (editingExperience !== null) {
        await updateExperience(editingExperience, formData);
      }
      setEditingExperience(null);
      setFormData({
        title: '',
        company: '',
        description: '',
        type: 'job',
        startDate: '',
        endDate: null,
        location: '',
        duration: '',
        achievements: [],
        technologies: []
      });
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleCancel = () => {
    setEditingExperience(null);
    setFormData({
      title: '',
      company: '',
      description: '',
      type: 'job',
      startDate: '',
      endDate: null,
      location: '',
      duration: '',
      achievements: [],
      technologies: []
    });
  };

  const handleDelete = async (index: number) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(index);
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>Experience Management</Title>
        <AddButton onClick={handleAdd}>
          Add Experience
        </AddButton>
      </Header>

      <ExperienceList>
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id}>
            <ExperienceHeader>
              <ExperienceTitle>{experience.title}</ExperienceTitle>
              <ExperienceActions>
                <ActionButton variant="edit" onClick={() => handleEdit(index)}>
                  Edit
                </ActionButton>
                <ActionButton variant="delete" onClick={() => handleDelete(index)}>
                  Delete
                </ActionButton>
              </ExperienceActions>
            </ExperienceHeader>
            <ExperienceMeta>
              <span>{experience.company}</span>
              <span>{experience.type}</span>
              <span>{experience.duration}</span>
              <span>{experience.location}</span>
            </ExperienceMeta>
            <ExperienceDescription>{experience.description}</ExperienceDescription>
            {experience.achievements && experience.achievements.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Achievements:</strong>
                </div>
                <ul style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, paddingLeft: '20px' }}>
                  {experience.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            {experience.technologies && experience.technologies.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Technologies:</strong>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {experience.technologies.map((tech, i) => (
                    <span key={i} style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </ExperienceCard>
        ))}
      </ExperienceList>

      {editingExperience !== null && (
        <Form onSubmit={handleSubmit}>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>
            {editingExperience === -1 ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          
          <FormGroup>
            <Label htmlFor="title">Title/Position</Label>
            <Input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Software Developer, Data Analyst"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="company">Company/Institution</Label>
            <Input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="e.g., Google, University of Manchester"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'job' | 'education' }))}
            >
              <option value="job">Job</option>
              <option value="education">Education</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your role and achievements..."
              rows={3}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="month"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date (leave empty if current)</Label>
            <Input
              type="month"
              id="endDate"
              value={formData.endDate ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value || null }))}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Manchester, UK"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="duration">Duration (display text)</Label>
            <Input
              type="text"
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 2020 - Present, 2 years"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="achievements">Achievements (comma-separated)</Label>
            <Input
              type="text"
              id="achievements"
              value={formData.achievements.join(', ')}
              onChange={(e) => {
                const achievements = e.target.value.split(',').map(a => a.trim()).filter(a => a);
                setFormData(prev => ({ ...prev, achievements }));
              }}
              placeholder="e.g., Increased efficiency by 30%, Led team of 5 developers"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              type="text"
              id="technologies"
              value={formData.technologies.join(', ')}
              onChange={(e) => {
                const technologies = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                setFormData(prev => ({ ...prev, technologies }));
              }}
              placeholder="e.g., React, Node.js, Python, SQL"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingExperience === -1 ? 'Add Experience' : 'Update Experience'}
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Container>
  );
};

export default ExperienceEditor;
