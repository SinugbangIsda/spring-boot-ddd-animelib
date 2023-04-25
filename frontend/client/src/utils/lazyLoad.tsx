import { Flex } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { CubeSpinner } from 'react-spinners-kit';

const lazyLoad = (importFunc: () => Promise<any>) => {
    const Loading = () => {
        return (
            <Flex
                minH = "100vh"
                align = "center"
                justify = "center"
                bg = "#141517"
            >
                <CubeSpinner size = { 50 } frontColor = "#E6613E" backColor = "#b95238" loading />
            </Flex>
        )
    };
    
    const LazyComponent = lazy(importFunc);
    return (props: any) => (
        <Suspense fallback = { <Loading /> }>
            <LazyComponent { ...props } />
        </Suspense>
    );
};

export default lazyLoad;