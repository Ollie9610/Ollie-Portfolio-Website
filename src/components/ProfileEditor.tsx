import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSave, FaUser, FaImage, FaUpload, FaTimes } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

// Suppress ResizeObserver loop errors
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalError.apply(console, args);
};

// Additional ResizeObserver error suppression
const originalConsoleError = console.error;
console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

const EditorContainer = styled.div`
  h2 {
    color: #333;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
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
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 1rem 0;
  border: 3px solid #667eea;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
  }

  &.secondary {
    background: #f8f9fa;
    color: #6c757d;
    border: 1px solid #dee2e6;

    &:hover {
      background: #e9ecef;
    }
  }

  &.upload {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
    }
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DropZone = styled.div<{ isDragOver: boolean }>`
  border: 2px dashed ${props => props.isDragOver ? '#28a745' : '#ced4da'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background: ${props => props.isDragOver ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #28a745;
    background: rgba(40, 167, 69, 0.05);
  }
`;

const DropText = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const DropSubtext = styled.div`
  color: #adb5bd;
  font-size: 0.8rem;
`;


const ImageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RemoveButton = styled(motion.button)`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: #dc3545;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  &:hover {
    background: #c82333;
  }
`;

const MessageContainer = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'success' 
    ? 'rgba(40, 167, 69, 0.1)' 
    : 'rgba(220, 53, 69, 0.1)'
  };
  border: 1px solid ${props => props.type === 'success' 
    ? 'rgba(40, 167, 69, 0.3)' 
    : 'rgba(220, 53, 69, 0.3)'
  };
  color: ${props => props.type === 'success' 
    ? '#28a745' 
    : '#dc3545'
  };
  text-align: center;
  font-weight: 500;
`;

const RoleInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RoleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RoleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    border-color: #dee2e6;
  }
`;

const RoleText = styled.span`
  font-weight: 500;
  color: #495057;
`;

const RemoveRoleButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s ease;
  
  &:hover {
    background: #c82333;
  }
`;

const EmptyState = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.5rem;
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px dashed #dee2e6;
`;

const ProfileEditor: React.FC = () => {
  const { profile, updateProfile } = useData();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    profileImage: '',
    bio: '',
    greeting: '',
    roles: '',
    linkedin: ''
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Immediate ResizeObserver error suppression
  React.useEffect(() => {
    const suppressResizeObserverError = () => {
      const originalError = console.error;
      console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
          return;
        }
        originalError.apply(console, args);
      };
    };
    suppressResizeObserverError();
  }, []);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    setFormData(profile);
    // Load roles from profile.roles (newline-separated string)
    if (profile.roles) {
      setRoles(profile.roles.split('\n').filter(role => role.trim()));
    } else {
      setRoles([]);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    
    // Use multiple deferral techniques to prevent ResizeObserver issues
    setTimeout(async () => {
      try {
        // Convert roles array back to newline-separated string
        const updatedFormData = {
          ...formData,
          roles: roles.join('\n')
        };
        
        // Use requestIdleCallback if available, otherwise setTimeout
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            updateProfile(updatedFormData);
          });
        } else {
          setTimeout(() => {
            updateProfile(updatedFormData);
          }, 0);
        }
        
        setSaveMessage('Profile saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        console.error('Error saving profile:', error);
        setSaveMessage('Error saving profile. Please try again.');
        setTimeout(() => setSaveMessage(''), 5000);
      } finally {
        setIsSaving(false);
      }
    }, 0);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRole = () => {
    if (newRole.trim() && roles.length < 5) {
      setRoles(prev => [...prev, newRole.trim()]);
      setNewRole('');
    }
  };

  const removeRole = (index: number) => {
    setRoles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRole();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, profileImage: '' }));
  };


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData(prev => ({ ...prev, profileImage: result }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  return (
    <EditorContainer>
      <h2>
        <FaUser />
        Profile Settings
      </h2>

      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Form onSubmit={handleSubmit}>
          {saveMessage && (
            <MessageContainer type={saveMessage.includes('Error') ? 'error' : 'success'}>
              {saveMessage}
            </MessageContainer>
          )}
          
          <FormGroup>
            <Label>Profile Image</Label>
            <UploadSection>
              <DropZone
                isDragOver={isDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('profileImage')?.click()}
              >
                <DropText>
                  <FaUpload style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
                </DropText>
                <DropText>Drag & drop a square image here</DropText>
                <DropSubtext>or click to browse files (1:1 aspect ratio recommended)</DropSubtext>
              </DropZone>
              
              <FileInput
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleFileUpload}
              />
              
              <Input
                type="url"
                value={formData.profileImage}
                onChange={(e) => handleChange('profileImage', e.target.value)}
                placeholder="Or paste image URL here..."
              />
            </UploadSection>
            <ImagePreview>
              {formData.profileImage ? (
                <>
                  <PreviewImage src={formData.profileImage} alt="Profile Preview" />
                  <ImageActions>
                    <RemoveButton
                      type="button"
                      onClick={handleRemoveImage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTimes />
                      Remove
                    </RemoveButton>
                  </ImageActions>
                </>
              ) : (
                <ImagePlaceholder>
                  <FaImage />
                </ImagePlaceholder>
              )}
            </ImagePreview>
          </FormGroup>

          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Professional Roles (Max 5)</Label>
            <RoleInputContainer>
              <Input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a role (e.g., Data Analyst)"
                disabled={roles.length >= 5}
              />
              <Button
                type="button"
                onClick={addRole}
                disabled={!newRole.trim() || roles.length >= 5}
                style={{ 
                  padding: '0.5rem 1rem', 
                  fontSize: '0.9rem',
                  minWidth: 'auto'
                }}
              >
                Add
              </Button>
            </RoleInputContainer>
            
            {roles.length > 0 && (
              <RoleList>
                {roles.map((role, index) => (
                  <RoleItem key={index}>
                    <RoleText>{role}</RoleText>
                    <RemoveRoleButton
                      type="button"
                      onClick={() => removeRole(index)}
                    >
                      Remove
                    </RemoveRoleButton>
                  </RoleItem>
                ))}
              </RoleList>
            )}
            
            {roles.length === 0 && (
              <EmptyState>
                No roles added yet. These will appear on your homepage with rotating highlights.
              </EmptyState>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, Country"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>

          <FormGroup>
            <Label>LinkedIn Profile</Label>
            <Input
              type="url"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/your-profile"
            />
          </FormGroup>

          <FormGroup>
            <Label>Professional Bio <span style={{ color: '#40e0ff', fontSize: '0.9rem' }}>(This appears on your homepage)</span></Label>
            <TextArea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="I transform raw data into strategic insights that drive business growth. With expertise in Python, SQL, and advanced analytics, I help organizations make data-driven decisions through compelling visualizations and machine learning solutions. Let's turn your data into your competitive advantage."
              rows={5}
              style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                background: 'linear-gradient(135deg, rgba(64, 224, 255, 0.02) 0%, rgba(100, 200, 255, 0.01) 100%)',
                border: '2px solid rgba(64, 224, 255, 0.2)',
                borderRadius: '8px',
                padding: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(64, 224, 255, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(64, 224, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(64, 224, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '0.5rem',
              fontStyle: 'italic'
            }}>
              💡 Tip: Keep it concise but compelling. Mention your key skills and value proposition.
            </div>
          </FormGroup>

          <ButtonGroup>
            <Button
              type="submit"
              className="primary"
              disabled={isSaving}
              whileHover={{ scale: isSaving ? 1 : 1.05 }}
              whileTap={{ scale: isSaving ? 1 : 0.95 }}
            >
              <FaSave />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>

    </EditorContainer>
  );
};

export default ProfileEditor;
