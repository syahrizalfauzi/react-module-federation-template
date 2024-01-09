import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <h3>This is a Module Federation App</h3>
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
import Counter from 'module1/Button';
import Input from 'module1/Input';
                `}
            </pre>
        </code>
        <p>
            Check the <code>webpack.config.js</code> file to configure which component should be
            exposed
        </p>
    </React.StrictMode>
);
