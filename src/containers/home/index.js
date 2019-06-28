import React, { Suspense, lazy } from 'react';

import ProgressBar from 'components/progress-bar';

const Home = lazy(() => import('./home'));

const LazyHome = props => (
  <Suspense fallback={<ProgressBar />}>
    <Home {...props} />
  </Suspense>
);

export default LazyHome;
