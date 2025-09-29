import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt, FaChartBar, FaBriefcase, FaCogs, FaEye, FaUser, FaDownload, FaUpload, FaUndo } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import ProjectEditor from './ProjectEditor';
import ExperienceEditor from './ExperienceEditor';
import SkillsEditor from './SkillsEditor';
import ProfileEditor from './ProfileEditor';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const LogoutButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 215, 0, 0.2)' : 'transparent'};
  border: ${props => props.active ? '1px solid rgba(255, 215, 0, 0.5)' : '1px solid transparent'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ContentArea = styled.div`
  background: rgba(20, 20, 30, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  }
`;

const PreviewButton = styled(motion.button)`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const DataManagementButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DataButton = styled(motion.button)<{ variant: 'export' | 'import' | 'reset' }>`
  background: ${props => {
    switch (props.variant) {
      case 'export': return 'linear-gradient(45deg, #4CAF50, #66BB6A)';
      case 'import': return 'linear-gradient(45deg, #2196F3, #42A5F5)';
      case 'reset': return 'linear-gradient(45deg, #f44336, #ef5350)';
      default: return 'linear-gradient(45deg, #ffd700, #ffed4e)';
    }
  }};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DataManagementTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

type TabType = 'overview' | 'profile' | 'projects' | 'experience' | 'skills';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { projects, experiences, skills, exportData, importData, resetToDefaults } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [importMessage, setImportMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleExport = () => {
    exportData();
    setImportMessage('Data exported successfully!');
    setTimeout(() => setImportMessage(''), 3000);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importData(file);
        setImportMessage('Data imported successfully!');
        setTimeout(() => setImportMessage(''), 3000);
      } catch (error) {
        setImportMessage('Error importing data. Please check the file format.');
        setTimeout(() => setImportMessage(''), 5000);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'projects', label: 'Projects', icon: <FaBriefcase /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'skills', label: 'Skills', icon: <FaCogs /> }
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Portfolio CMS Dashboard</Title>
        <UserInfo>
          <span>Welcome, Admin</span>
          <LogoutButton
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt />
            Logout
          </LogoutButton>
        </UserInfo>
      </Header>

      <TabsContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.icon}
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>

      <ContentArea>
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Dashboard Overview</h2>
            
            <StatsGrid>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <StatNumber>{projects.length}</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatCard>
              
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <StatNumber>{experiences.length}</StatNumber>
                <StatLabel>Experience Entries</StatLabel>
              </StatCard>
              
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <StatNumber>{skills.length}</StatNumber>
                <StatLabel>Skills</StatLabel>
              </StatCard>
            </StatsGrid>

            <ActionButtons>
              <ActionButton
                onClick={() => setActiveTab('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit />
                Manage Projects
              </ActionButton>
              
              <ActionButton
                onClick={() => setActiveTab('experience')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit />
                Manage Experience
              </ActionButton>
              
              <ActionButton
                onClick={() => setActiveTab('skills')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit />
                Manage Skills
              </ActionButton>
              
              <PreviewButton
                onClick={handlePreview}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEye />
                Preview Website
              </PreviewButton>
            </ActionButtons>

            <DataManagementButtons>
              <DataManagementTitle>Data Management</DataManagementTitle>
              <DataButton
                variant="export"
                onClick={handleExport}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Export Data
              </DataButton>
              
              <DataButton
                variant="import"
                onClick={handleImport}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUpload />
                Import Data
              </DataButton>
              
              <DataButton
                variant="reset"
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUndo />
                Reset to Defaults
              </DataButton>
              
              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />
            </DataManagementButtons>

            {importMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: '1rem',
                  background: importMessage.includes('Error') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                  border: `1px solid ${importMessage.includes('Error') ? '#f44336' : '#4CAF50'}`,
                  borderRadius: '10px',
                  color: importMessage.includes('Error') ? '#f44336' : '#4CAF50',
                  textAlign: 'center',
                  marginTop: '1rem'
                }}
              >
                {importMessage}
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileEditor />
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <ProjectEditor
            onEdit={setEditingProject}
            editingId={editingProject}
            onClose={() => setEditingProject(null)}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceEditor />
        )}

        {activeTab === 'skills' && (
          <SkillsEditor />
        )}
      </ContentArea>
    </DashboardContainer>
  );
};

export default AdminDashboard;
