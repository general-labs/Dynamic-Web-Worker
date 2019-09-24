/**
 *  Helper function to dynamically create Web Workers.
 */
function createWorker(fn) {
  var blob = new Blob(["self.onmessage = ", fn.toString()], {
    type: "text/javascript"
  });
  var url = window.URL.createObjectURL(blob);
  return new Worker(url);
}

const updateDOM = (data) => {
  $("h2.blocking_starts").append(`<h2>${data} seconds to process</h2>`);
}

var workerCacheURL = function (e) {
  importScripts("http://localhost/web-worker-examples/js/worker-libs.js");

  const urls = [
    "http://localhost/web-worker-experiment/data.json",
    "http://localhost/web-worker-experiment/img/bg-masthead.jpg",
    "http://localhost/web-worker-experiment/img/bg-signup.jpg",
    "https://steemitimages.com/DQmeUCXKV86fptwuHDSGpu8c5c6UXqbxX5R9VDwg8HfawYZ/Nature-Wallpapers.jpg",
    "https://1320frequencyshift.files.wordpress.com/2018/08/5558686-pic-of-nature.jpg",
    "http://img.fliptab.io/nature/1920x1200/7771594.jpg",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12233",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12234",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12235",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12236",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12237",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12238",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12239",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?12210",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?43221",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?43222",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?43224",
    "https://naturalspacesdomes.com/wp-content/uploads/2017/12/Crop2.jpg?432278"
  ];

  setTimeout(function () {
    cacheMyURLs(urls);
  }, 1000);
};