module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 20 * 1024, // 20Kb
        outputPath: 'assets',
        publicPath: '../assets',
        name: '[name]-[hash:6].[ext]',
        esModule: false
      }
    }
  }
]
