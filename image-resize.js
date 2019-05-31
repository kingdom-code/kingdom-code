const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const baseDir = '/src/_assets/_img';
const dest = './tmp';
const imageSizes = [320, 640, 800];

const directoryPath = path.join(__dirname, './src/_assets/_img/cities/**/*.jpg');

glob(directoryPath, (e, f) => {
  f.forEach((s) => {
    rwdResizer(s);
  });
})

const resizer = (file, size) => {
  const dirName = path.dirname(file).replace(__dirname, '').replace(baseDir, '');
  const ext = path.extname(file);
  const fname = path.basename(file, ext);
  const fDest = `${dest}${dirName}`;

  mkdirp(fDest);

  sharp(file)
    .resize(size)
    .toFile(`${fDest}/${fname}-${size}.${ext}`);
};

const rwdResizer = (file) => {
  imageSizes.forEach((s) => {
    resizer(file, s);
  });
}
