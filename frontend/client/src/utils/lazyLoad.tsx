import { lazy, Suspense } from 'react';
import Loading from '../pages/loading';

const lazyLoad = (importFunc: () => Promise<any>) => {
    const LazyComponent = lazy(importFunc);
    return (props: any) => (
        <Suspense fallback = { <Loading /> }>
            <LazyComponent { ...props } />
        </Suspense>
    );
};

export default lazyLoad;