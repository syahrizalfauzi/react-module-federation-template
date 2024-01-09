import Heading from 'components/Heading';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <>
            <Heading>This is a Module Federation App</Heading>
            <br />
            <p>
                This template contains 2 components that can be used by adding this URL to other MF
                remote config and then importing the /remoteEntry.js them as a component
            </p>
            <p>
                Note that you must build and serve this module, the dev server does not serve the
                remoteEntry.js. This template also generates type definitions for the exposed
                components, so you can import them like so with full type support
            </p>
            <code>
                <pre>
                    {`
import Counter from 'module_main/Counter';
import Input from 'module_main/Input';
`}
                </pre>
            </code>
            <p>
                Check the <code>webpack.config.js</code> file to configure which component should be
                exposed
            </p>
        </>
    );
};

export default HomePage;
