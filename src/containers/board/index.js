import React, { Suspense, lazy } from 'react';

import ProgressBar from 'components/progress-bar';

const Board = lazy(() => import('./board'));

const LazyBoard = props => (
  <Suspense fallback={<ProgressBar />}>
    <Board {...props} />
  </Suspense>
);

export default LazyBoard;
