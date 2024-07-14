import React, { Suspense } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './ErrorBoundary';
import Loading from './components/Loading';
const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => (
  <ErrorBoundary>
    <Layout>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </Layout>
  </ErrorBoundary>
);

export default App;
