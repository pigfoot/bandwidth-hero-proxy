// Compresses an image using Sharp library
const sharp = require("sharp");

function compress(imagePath, useWebp, grayscale, quality, originalSize) {
  //let format = useWebp ? "webp" : "jpeg";
  let format = useWebp ? "avif" : "jpeg";
  var options = { quality };

  if (format === "webp" || format === "jpeg") {
    options["progressive"] = true;
    options["optimizeScans"] = true;
  }

  return sharp(imagePath)
    .grayscale(grayscale)
    .toFormat(format, options)
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => ({
      err: null,
      headers: {
        "content-type": `image/${format}`,
        "content-length": info.size,
        "x-original-size": originalSize,
        "x-bytes-saved": originalSize - info.size,
      },
      output: data,
    }))
    .catch((err) => ({ err }));
}

module.exports = compress;
