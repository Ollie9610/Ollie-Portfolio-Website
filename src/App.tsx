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
import LiquidBackground from './components/LiquidBackground';
import ResizeObserverErrorBoundary from './components/ResizeObserverErrorBoundary';
import { Project } from './types';

// Aggressive ResizeObserver error suppression
const suppressResizeObserverErrors = () => {
  // Override console.error multiple times to catch all instances
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  // Override console.warn as well
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  // Override console.log as well
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalConsoleLog.apply(console, args);
  };

  // Window error handlers
  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
};

// Run immediately
suppressResizeObserverErrors();

// Run again after a short delay to catch any late-loading errors
setTimeout(suppressResizeObserverErrors, 100);
setTimeout(suppressResizeObserverErrors, 500);

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
  const { isAuthenticated } = useAuth();

  // Check if we're on the admin route
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    if (isAuthenticated) {
      return (
        <ResizeObserverErrorBoundary>
          <AdminDashboard />
        </ResizeObserverErrorBoundary>
      );
    } else {
      // Import Login component dynamically to avoid unused import warning
      const Login = React.lazy(() => import('./components/Login'));
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Login />
        </React.Suspense>
      );
    }
  }

  return <PortfolioApp />;
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

