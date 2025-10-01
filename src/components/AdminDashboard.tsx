import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import ProfileEditor from './ProfileEditor';
import SkillsEditor from './SkillsEditor';
import ProjectEditor from './ProjectEditor';
import ExperienceEditor from './ExperienceEditor';
import LiquidBackground from './LiquidBackground';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding: 20px;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
  z-index: 0;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.2), rgba(64, 224, 255, 0.1))' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.active 
    ? 'rgba(64, 224, 255, 0.6)' 
    : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 8px;
  color: ${props => props.active ? '#40e0ff' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 80px;
  text-align: center;
  white-space: nowrap;
  box-shadow: ${props => props.active 
    ? '0 4px 15px rgba(64, 224, 255, 0.3)' 
    : 'none'};
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, rgba(64, 224, 255, 0.25), rgba(64, 224, 255, 0.15))' 
      : 'rgba(255, 255, 255, 0.2)'};
    border-color: ${props => props.active 
      ? 'rgba(64, 224, 255, 0.8)' 
      : 'rgba(255, 255, 255, 0.5)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.active 
      ? '0 8px 25px rgba(64, 224, 255, 0.4)' 
      : '0 4px 15px rgba(255, 255, 255, 0.2)'};
  }
`;

const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 500px;
`;

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', component: <ProfileEditor /> },
    { id: 'skills', label: 'Skills', component: <div style={{color: 'white', padding: '20px'}}><h2>Skills Editor</h2><SkillsEditor /></div> },
    { id: 'projects', label: 'Projects', component: <div style={{color: 'white', padding: '20px'}}><h2>Projects Editor</h2><ProjectEditor /></div> },
    { id: 'experience', label: 'Experience', component: <div style={{color: 'white', padding: '20px'}}><h2>Experience Editor</h2><ExperienceEditor /></div> }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <AdminContainer>
      <BackgroundPattern />
      <LiquidBackground />
      <MainContent>
        <Header>
          <HeaderLeft>
            <Title>Portfolio Admin Dashboard</Title>
            <TabContainer>
              {tabs.map(tab => (
                <Tab
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabContainer>
          </HeaderLeft>
          
          <HeaderRight>
            <LogoutButton onClick={logout}>
              Logout
            </LogoutButton>
          </HeaderRight>
        </Header>

        <ContentContainer>
          {tabs.find(tab => tab.id === activeTab)?.component}
        </ContentContainer>
      </MainContent>
    </AdminContainer>
  );
};

export default AdminDashboard;
