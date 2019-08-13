/* eslint-disable */
import PNG from './png';
import hsl2rgb from './hsl2rgb';

// The random number is a js implementation of the Xorshift PRNG
var randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed) {
  for (var i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (var i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  var t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor() {
  //saturation is the whole color spectrum
  var h = Math.floor(rand() * 360);
  //saturation goes from 40 to 100, it avoids greyish colors
  var s = rand() * 60 + 40;
  //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  var l = (rand() + rand() + rand() + rand()) * 25;

  return [h / 360, s / 100, l / 100];
}

function createImageData(size) {
  var width = size; // Only support square icons for now
  var height = size;

  var dataWidth = Math.ceil(width / 2);
  var mirrorWidth = width - dataWidth;

  var data = [];
  for (var y = 0; y < height; y++) {
    var row = [];
    for (var x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand() * 2.3);
    }
    var r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    for (var i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

function buildOpts(opts) {
  if (!opts.seed) {
    throw 'No seed provided';
  }

  seedrand(opts.seed);

  return Object.assign(
    {
      size: 8,
      scale: 16,
      color: createColor(),
      bgcolor: createColor(),
      spotcolor: createColor(),
    },
    opts
  );
}

export function toDataUrl(address) {
  const opts = buildOpts({ seed: address.toLowerCase() });

  const imageData = createImageData(opts.size);
  const width = Math.sqrt(imageData.length);

  const p = new PNG(opts.size * opts.scale, opts.size * opts.scale, 3);
  const bgcolor = p.color(...hsl2rgb(...opts.bgcolor));
  const color = p.color(...hsl2rgb(...opts.color));
  const spotcolor = p.color(...hsl2rgb(...opts.spotcolor));

  for (var i = 0; i < imageData.length; i++) {
    var row = Math.floor(i / width);
    var col = i % width;
    // if data is 0, leave the background
    if (imageData[i]) {
      // if data is 2, choose spot color, if 1 choose foreground
      const pngColor = imageData[i] == 1 ? color : spotcolor;
      p.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale, pngColor);
    }
  }
  return `data:image/png;base64,${p.getBase64()}`;
}
