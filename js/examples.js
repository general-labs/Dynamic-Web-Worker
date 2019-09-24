

// Inline Web Worker Dynamic Function
var dynamicWorker = function (e) {
  let timeTaken;
  var start = Date.now(); // milliseconds
  var x = 0;
  for (var i = 0; i < 4000000000; i++) {
    x = x + i;
  }
  timeTaken = -(start - Date.now()) / 1000;
  //updateDOM(`[Main Thread]: ${timeTaken} seconds to process`);
  self.postMessage(timeTaken);
};


//dynamicWorker();
//dynamicWorker();

if (window.Worker) {

  // WORKER 3
  var workerInstanceCache = createWorker(workerCacheURL);
  workerInstanceCache.postMessage("Helloooooo");


  // Worker 1
  var workerInstance = createWorker(dynamicWorker);
  workerInstance.postMessage("Helloooooo");

  workerInstance.onmessage = function (oEvent) {
    updateDOM(`[Worker Thread]: ${oEvent.data}`);
  };


  // Worker 1
  var workerSlowInstance = createWorker(dynamicWorker);
  workerSlowInstance.postMessage("Helloooooo");

  workerSlowInstance.onmessage = function (oEvent) {
    updateDOM(`[Worker one]: ${oEvent.data}`);
  };

}







/*







 */
