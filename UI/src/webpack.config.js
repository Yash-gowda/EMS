const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.join(__dirname, '/dist'), 
    filename: 'bundle.js', 
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/, // Match both .js and .jsx files
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'], 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
    }),
  ],
  devServer: {
    static: path.join(__dirname, '/dist'), 
    port: 3000, 
    open: true, 
  },
};
