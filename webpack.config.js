const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point for your app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before every build
  },
  mode: 'development', // Set mode to 'development'
  devtool: 'inline-source-map', // Source maps for easier debugging
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Automatically resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Transpile TypeScript and JSX files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template for the generated HTML file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static files from 'dist'
    },
    compress: true, // Enable gzip compression
    port: 3000, // Port to run the dev server
    open: true, // Automatically open the browser when server starts
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // Fallback for single-page applications
  },
};
