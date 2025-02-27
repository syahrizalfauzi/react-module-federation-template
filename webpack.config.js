require('dotenv').config();
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { DefinePlugin } = require('webpack');
const PACKAGE = require('./package.json');

// const REMOTES = {
//     module_other: process.env.MODULE_OTHER_URL
// };

const SINGLETONS = ['react', 'react-dom'];

const federationConfig = {
    name: PACKAGE.name,
    filename: 'remoteEntry.js',
    // remotes: Object.fromEntries(
    //     Object.entries(REMOTES).map(([name, url]) => [name, `${name}@${url}/remoteEntry.js`])
    // ),
    remotes: {},
    exposes: {
        './Counter': './src/exposes/Counter',
        './Input': './src/exposes/Input'
    },
    shared: {
        ...PACKAGE.dependencies,
        ...Object.fromEntries(
            SINGLETONS.map(name => [
                name,
                { singleton: true, requiredVersion: PACKAGE.dependencies[name] }
            ])
        )
    }
};

const envKeys = Object.keys(process.env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
}, {});

const config = {
    mode: process.env.NODE_ENV ?? 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        filename: `main.${PACKAGE.version}.[fullhash].js`,
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        // Uncomment if you use react-router
        // historyApiFallback: true
        port: process.env.PORT ?? 3000
    },
    stats: false,
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: 'src/index.html',
            inject: 'body'
        }),
        new ModuleFederationPlugin(federationConfig),
        new FederatedTypesPlugin({
            federationConfig
        }),
        new ESLintWebpackPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx']
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `${PACKAGE.name} is running here: http://localhost:${process.env.PORT ?? 3000}`
                ]
            }
        }),
        new DefinePlugin(envKeys)
    ]
};

module.exports = config;
