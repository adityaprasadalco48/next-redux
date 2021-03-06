import React from 'react';
import {wrapper} from '../redux/store';

const App = ({Component, pageProps}) => {
    console.log('-----------------___APP', {pageProps});
    return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
