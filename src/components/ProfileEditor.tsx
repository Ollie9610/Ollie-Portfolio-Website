import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Profile } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.8rem;
`;

const EditForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(64, 224, 255, 0.3);
  border-radius: 6px;
  padding: 15px;
  backdrop-filter: blur(10px);
  margin-bottom: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 13px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(64, 224, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 13px;
  min-height: 50px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(64, 224, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;


const FormActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(45deg, #40e0ff, #00bfff);
    color: white;
    border: 2px solid rgba(64, 224, 255, 0.4);
    box-shadow: 0 4px 15px rgba(64, 224, 255, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(64, 224, 255, 0.5);
      border-color: rgba(64, 224, 255, 0.8);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }
  `}
`;

const StatusMessage = styled.div<{ success: boolean }>`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  background: ${props => props.success ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  border: 1px solid ${props => props.success ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
  color: ${props => props.success ? '#4caf50' : '#f44336'};
  text-align: center;
`;

const ProfilePreview = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const PreviewTitle = styled.h3`
  color: white;
  margin: 0 0 15px 0;
  font-size: 1.2rem;
`;

const PreviewContent = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ImageUploadArea = styled.div<{ dragOver: boolean; hasImage: boolean }>`
  border: 2px dashed ${props => props.dragOver ? '#40e0ff' : props.hasImage ? 'rgba(64, 224, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  background: ${props => props.dragOver ? 'rgba(64, 224, 255, 0.1)' : props.hasImage ? 'rgba(64, 224, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  &:hover {
    border-color: #40e0ff;
    background: rgba(64, 224, 255, 0.1);
  }
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 15px;
  display: block;
  border: 3px solid rgba(64, 224, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const UploadText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 10px;
`;

const UploadSubtext = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const RolesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoleInput = styled.input`
  width: 100%;
  padding: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 12px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(64, 224, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const RoleLabel = styled.label`
  display: block;
  color: white;
  margin-bottom: 3px;
  font-weight: 500;
  font-size: 11px;
`;

const RoleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RoleInputContainer = styled.div`
  flex: 1;
`;




const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h3`
  color: white;
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '';
    width: 2px;
    height: 14px;
    background: linear-gradient(45deg, #40e0ff, #00bfff);
    border-radius: 1px;
  }
`;

const BasicInfoLayout = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormInputsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImageColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }
`;

const ProfileImageLabel = styled(Label)`
  margin-bottom: 15px;
  text-align: center;
`;

const ProfessionalDetailsLayout = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfessionalColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProfileEditor: React.FC = () => {
  const { profile, updateProfile } = useData();
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [formData, setFormData] = useState<Profile>({
    name: profile?.name || '',
    location: profile?.location || '',
    email: profile?.email || '',
    profileImage: profile?.profileImage || '',
    bio: profile?.bio || '',
    roles: profile?.roles || '',
    linkedin: profile?.linkedin || ''
  });
  
  const [roles, setRoles] = useState<string[]>(() => {
    if (profile?.roles) {
      const existingRoles = profile.roles.split('\n').filter(role => role.trim());
      // Ensure we always have exactly 5 slots, filling empty ones
      const rolesArray = new Array(5).fill('');
      existingRoles.forEach((role, index) => {
        if (index < 5) rolesArray[index] = role;
      });
      return rolesArray;
    }
    return ['', '', '', '', '']; // Initialize with 5 empty roles
  });
  
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    setRoles(newRoles);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({
        ...prev,
        profileImage: result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      setStatus({ message: '❌ Name is required', success: false });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ message: '❌ Email is required', success: false });
      return;
    }
    
    // Convert roles array to string
    const rolesString = roles.filter(role => role.trim()).join('\n');
    
    try {
      await updateProfile({
        ...formData,
        roles: rolesString
      });
      setStatus({ message: '✅ Profile updated successfully!', success: true });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ message: '❌ Error updating profile. Please try again.', success: false });
    }
  };


  return (
    <Container>
      <Header>
        <Title>Profile Management</Title>
      </Header>

      <EditForm>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>
          Edit Profile Information
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '20px' }}>
          * Required fields: Name and Email
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Profile Editor Section */}
          <FormSection>
            <SectionTitle>Profile Editor</SectionTitle>
            <BasicInfoLayout>
              {/* Left side - Profile image */}
              <ProfileImageColumn>
                <ProfileImageLabel>Profile Image</ProfileImageLabel>
                <ImageUploadArea
                  dragOver={dragOver}
                  hasImage={!!formData.profileImage}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('profileImageInput')?.click()}
                >
                  {formData.profileImage ? (
                    <>
                      <ImagePreview src={formData.profileImage} alt="Profile preview" />
                      <UploadText>Click or drag to change</UploadText>
                      <UploadSubtext>JPG, PNG, GIF</UploadSubtext>
                    </>
                  ) : (
                    <>
                      <UploadText>📷 Drag & drop image</UploadText>
                      <UploadSubtext>or click to browse</UploadSubtext>
                    </>
                  )}
                  <HiddenFileInput
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </ImageUploadArea>
              </ProfileImageColumn>
              
              {/* Right side - Text content */}
              <FormInputsColumn>
                {/* Basic Information */}
                <FormGroup>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State/Country"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </FormGroup>
              </FormInputsColumn>
            </BasicInfoLayout>

            {/* Roles and Bio below */}
            <ProfessionalDetailsLayout>
              {/* Left side - Roles */}
              <ProfessionalColumn>
                <FormGroup>
                  <Label>Roles (5 slots available)</Label>
                  <RolesContainer>
                    {roles.map((role, index) => (
                      <RoleItem key={index}>
                        <RoleInputContainer>
                          <RoleLabel htmlFor={`role-${index}`}>
                            Role {index + 1}
                          </RoleLabel>
                          <RoleInput
                            id={`role-${index}`}
                            type="text"
                            value={role}
                            onChange={(e) => handleRoleChange(index, e.target.value)}
                            placeholder={`e.g., Data Analyst ${index + 1}`}
                          />
                        </RoleInputContainer>
                      </RoleItem>
                    ))}
                  </RolesContainer>
                </FormGroup>
              </ProfessionalColumn>

              {/* Right side - Bio */}
              <ProfessionalColumn>
                <FormGroup>
                  <Label htmlFor="bio">Bio</Label>
                  <TextArea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your experience, and what you do..."
                    style={{ minHeight: '200px' }}
                  />
                </FormGroup>
              </ProfessionalColumn>
            </ProfessionalDetailsLayout>
          </FormSection>

          <FormActions>
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </FormActions>
        </form>
        
        {status && (
          <StatusMessage success={status.success}>
            {status.message}
          </StatusMessage>
        )}
      </EditForm>

      <ProfilePreview>
        <PreviewTitle>Preview</PreviewTitle>
        <PreviewContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
            {formData.profileImage && (
              <ImagePreview 
                src={formData.profileImage} 
                alt="Profile preview" 
                style={{ width: '80px', height: '80px', margin: '0' }}
              />
            )}
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600' }}>
                Hi, I'm {formData.name || 'Not set'}
              </p>
              <p style={{ margin: '0 0 5px 0', color: 'rgba(255, 255, 255, 0.7)' }}>
                {formData.location || 'Not set'}
              </p>
              <p style={{ margin: '0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                {formData.email || 'Not set'}
              </p>
            </div>
          </div>
          
          {roles.filter(role => role.trim()).length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Roles:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {roles.filter(role => role.trim()).map((role, index) => (
                  <span 
                    key={index}
                    style={{
                      background: 'rgba(64, 224, 255, 0.2)',
                      color: '#40e0ff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      border: '1px solid rgba(64, 224, 255, 0.3)'
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {formData.bio && (
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Bio:</p>
              <p style={{ margin: '0', lineHeight: '1.5' }}>{formData.bio}</p>
            </div>
          )}
          
          {formData.linkedin && (
            <div>
              <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>LinkedIn:</p>
              <a 
                href={formData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#40e0ff', textDecoration: 'none' }}
              >
                {formData.linkedin}
              </a>
            </div>
          )}
        </PreviewContent>
      </ProfilePreview>
    </Container>
  );
};

export default ProfileEditor;
