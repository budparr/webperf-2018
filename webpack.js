const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//import WatchExternalFilesPlugin from 'webpack-watch-files-plugin'
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = {
  mode: 'production',
  entry: {
    app: './assets/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets/output'),
    filename: 'js/[name].js', // string
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,        
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true || {
                discardComments: {
                  removeAll: true,
                },
                minifyFontValues: false,
                autoprefixer: false,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import'),
                require('tailwindcss')('./assets/css/tailwind.js'),
                require('@fullhuman/postcss-purgecss')({
                  content: ['layouts/**/*.html', 'layout_modules/**/**/*.html'],
                  extractors: [
                    {
                      extractor: TailwindExtractor,
                      extensions: ['html'],
                    },
                  ],
                  fontFace: false,
                  whitelist: [                    
                    'bg-primary-color',
                    'body',
                    'fill-current',
                    'hidden',
                    'install',
                    'pagination',
                    'opacity-25',
                    'results-hidden',
                    'rounded',
                    'mx-2',
                    'bg-red-light',
                    'bg-grey-darker',
                    'buttons',
                    'kill',
                  ],
                }),
                require('autoprefixer')({      
                  browsers: ['>3%']
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/fonts',
              name: '[name].[ext]',
              outputPath: './../../static/fonts/',
              // useRelativePath: true
            },
          },
        ],
      },
      {
        //Mustache loader for Algolia templates
        test: /\.html$/,
        loader: 'mustache-loader?minify',
      },
    ],
  },
  plugins: [
		new WatchExternalFilesPlugin({
      files: [
				'./layouts/**/*.*',
				'./layout_modules/**/*.*',
				        
      ]
    }),    
    new CleanWebpackPlugin(
      ['./static/fonts/', './assets/output'],
      {
        root: __dirname,
        verbose: true,
        dry: false,
        allowExternal: true,
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
