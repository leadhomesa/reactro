import React, { Suspense, lazy } from 'react';

import ProgressBar from 'components/progress-bar';

const Team = lazy(() => import('./team'));

const LazyTeam = props => (
  <Suspense fallback={<ProgressBar />}>
    <Team {...props} />
  </Suspense>
);

export default LazyTeam;
