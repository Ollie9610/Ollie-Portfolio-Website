import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import { Project } from '../types';

const EditorContainer = styled.div`
  h2 {
    color: #333;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ProjectsList = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffd700;
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProjectDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const TechTag = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProjectActions = styled.div`
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

const FormContainer = styled(motion.div)`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.1);
  }
`;

const TechInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  min-height: 50px;
  align-items: center;
`;

const TechTagInput = styled.span`
  background: #007bff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TechRemove = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.25rem;

  &:hover {
    color: #ffc107;
  }
`;

const TechAddInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
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

interface ProjectEditorProps {
  onEdit: (id: number | null) => void;
  editingId: number | null;
  onClose: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ onEdit, editingId, onClose }) => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    category: 'project',
    metrics: {
      views: 0,
      impact: '',
      duration: ''
    },
    details: {
      challenge: '',
      solution: '',
      results: '',
      technologies: [],
      features: []
    }
  });
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (editingId) {
      const project = projects.find(p => p.id === editingId);
      if (project) {
        setFormData(project);
        setIsAdding(false);
      }
    } else {
      setIsAdding(false);
    }
  }, [editingId, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdding) {
      addProject(formData as Project);
    } else if (editingId) {
      updateProject(editingId, formData as Project);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      metrics: {
        views: 0,
        impact: '',
        duration: ''
      },
      details: {
        challenge: '',
        solution: '',
        results: '',
        technologies: [],
        features: []
      }
    });
    setIsAdding(false);
    onClose();
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details!,
          features: [...(prev.details?.features || []), newFeature.trim()]
        }
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        features: prev.details?.features?.filter((_, i) => i !== index) || []
      }
    }));
  };

  return (
    <EditorContainer>
      <h2>Manage Projects</h2>

      <ActionButton
        variant="add"
        onClick={() => setIsAdding(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginBottom: '1rem' }}
      >
        <FaPlus />
        Add New Project
      </ActionButton>

      {(isAdding || editingId) && (
        <FormContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Project Title</Label>
              <Input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Select
                value={formData.category || 'project'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'project' | 'dashboard' }))}
              >
                <option value="project">Project Delivered</option>
                <option value="dashboard">Dashboard & Model</option>
              </Select>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Views</Label>
                <Input
                  type="number"
                  value={formData.metrics?.views || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics!, views: parseInt(e.target.value) || 0 }
                  }))}
                />
              </FormGroup>
              <FormGroup>
                <Label>Impact</Label>
                <Input
                  type="text"
                  value={formData.metrics?.impact || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics!, impact: e.target.value }
                  }))}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Duration</Label>
              <Input
                type="text"
                value={formData.metrics?.duration || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metrics: { ...prev.metrics!, duration: e.target.value }
                }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Technologies</Label>
              <TechInput>
                {(formData.technologies || []).map((tech, index) => (
                  <TechTagInput key={index}>
                    {tech}
                    <TechRemove onClick={() => handleRemoveTech(index)}>
                      ×
                    </TechRemove>
                  </TechTagInput>
                ))}
                <TechAddInput
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="Add technology..."
                />
              </TechInput>
            </FormGroup>

            <FormGroup>
              <Label>Challenge</Label>
              <TextArea
                value={formData.details?.challenge || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, challenge: e.target.value }
                }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Solution</Label>
              <TextArea
                value={formData.details?.solution || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, solution: e.target.value }
                }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Results</Label>
              <TextArea
                value={formData.details?.results || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, results: e.target.value }
                }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Key Features</Label>
              <TechInput>
                {(formData.details?.features || []).map((feature, index) => (
                  <TechTagInput key={index}>
                    {feature}
                    <TechRemove onClick={() => handleRemoveFeature(index)}>
                      ×
                    </TechRemove>
                  </TechTagInput>
                ))}
                <TechAddInput
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  placeholder="Add feature..."
                />
              </TechInput>
            </FormGroup>

            <FormActions>
              <SaveButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSave />
                {isAdding ? 'Add Project' : 'Update Project'}
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
        </FormContainer>
      )}

      <ProjectsList>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTechnologies>
                {project.technologies.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </ProjectTechnologies>
            </ProjectInfo>
            <ProjectActions>
              <ActionButton
                variant="edit"
                onClick={() => onEdit(project.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEdit />
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={() => deleteProject(project.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </ActionButton>
            </ProjectActions>
          </ProjectCard>
        ))}
      </ProjectsList>
    </EditorContainer>
  );
};

export default ProjectEditor;

