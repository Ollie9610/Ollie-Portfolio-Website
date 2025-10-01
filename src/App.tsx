import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ProjectModal from './components/ProjectModal';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import LiquidBackground from './components/LiquidBackground';
import ResizeObserverErrorBoundary from './components/ResizeObserverErrorBoundary';
import { Project } from './types';

// Simple ResizeObserver error suppression
const suppressResizeObserverErrors = () => {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalError.apply(console, args);
  };
};

// Run once on load
suppressResizeObserverErrors();

const AppContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
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

const PortfolioApp: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AppContainer>
      <BackgroundPattern />
      <MainContent>
        <Header />
        <Hero />
        <Skills />
        <Experience />
        <Projects 
          projects={projects} 
          onProjectSelect={setSelectedProject}
          loading={loading}
        />
      </MainContent>
      
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // Check if we're on the admin route
  const isAdminRoute = window.location.pathname === '/admin';

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (isAdminRoute) {
    if (isAuthenticated) {
      return (
        <ResizeObserverErrorBoundary>
          <AdminDashboard />
        </ResizeObserverErrorBoundary>
      );
    } else {
      return <Login />;
    }
  }

  return (
    <ResizeObserverErrorBoundary>
      <PortfolioApp />
    </ResizeObserverErrorBoundary>
  );
};

const AppWithProviders: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <LiquidBackground />
        <App />
      </DataProvider>
    </AuthProvider>
  );
};

export default AppWithProviders;

