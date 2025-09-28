import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt, FaChartBar, FaBriefcase, FaCogs, FaEye, FaUser } from 'react-icons/fa';
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

type TabType = 'overview' | 'profile' | 'projects' | 'experience' | 'skills';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { projects, experiences, skills } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [editingProject, setEditingProject] = useState<number | null>(null);

  const handlePreview = () => {
    window.open('/', '_blank');
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
