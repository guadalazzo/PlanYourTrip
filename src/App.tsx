import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => (
  <ErrorBoundary>
    <Layout>
      <Home />
    </Layout>
  </ErrorBoundary>
);

export default App;
