var glob = require('glob'),
    path = require('path');

const ImmutableStyles = require('./src/immutableStyles');

require('babel-register')({
  'plugins': [
    ['transform-react-jsx', {
      'pragma': 'ImmutableStyles.createStyle'
    }]
  ]
});

glob.sync('./sample/**/*.?(jsx|js)').forEach((file) => {
  console.log(`\nFile: ${file}\n`);
  const styles = require(path.resolve(file))(ImmutableStyles);
  ImmutableStyles.createCSS(styles);
});