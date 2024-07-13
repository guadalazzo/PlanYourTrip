import React, { Suspense } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './ErrorBoundary';

const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => (
  <ErrorBoundary>
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        // TODO: Add a loading component
        <Home />
      </Suspense>
    </Layout>
  </ErrorBoundary>
);

export default App;
