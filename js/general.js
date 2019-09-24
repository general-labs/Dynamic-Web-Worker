(function ($) {
  "use strict"; // Start of use strict

  let counter = 0;
  $(".web_worker_test").click(function () {
    //alert("Counting ... " + counter);
    $(this).text("Counting ... " + counter);
    counter++;
  });
  
  $.ajax({
    url: "data.json",
    context: document.body
  }).done(function(data) {
    //console.log("JSON DATA", data.data);
    data.data.forEach(function (obj) {
      $(".sample_link").html(obj.nid);
      //console.log(obj.nid);
    });
  });


  let loopCounter = 0;
  let interval = 1;
  let loopTimer = () => {
    setTimeout(function () {
      if (loopCounter == interval) {
        $(".web_worker_test").click();
        loopCounter = 0;
      }
      loopTimer();
      loopCounter++;
    }, 1000);
  };
  loopTimer();

})(jQuery); // End of use strict