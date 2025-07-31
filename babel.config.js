module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@features': './src/features',
          '@service': './src/service',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@themes': './src/themes',
          '@screens': './src/screens',
          '@redux': './src/features/course/redux',
          '@domain': './src/features/course/domain',
          '@utils': './src/utils',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
