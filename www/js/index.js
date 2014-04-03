document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

function scan() {
  //starting qr plugin
  cordova.plugins.barcodeScanner.scan(
      function (result) {

        //removing the first ?
        var raw = result.text.substring(1);

        //spliting the data by the &
        var data = raw.split('&');
        var each = [];
        for(x=0;x<data.length;x++) {
          if(document.getElementById("elemId") != null){
            //getting the var and the value
            each[x] = data[x].split('=');
  
            //if this is price, we need to do an additional thing...
            if(each[x][0] != 'tt') {
              document.getElementById(each[x][0]).innerHTML = each[x][1];
            } else {
              //we split the integer and the cents
              var price = each[x][1].split('.');
  
              //the we transform the integer part into a real INT, and then take only the first two cent characters
              document.getElementById(each[x][0]).innerHTML = '$' + parseInt(price[0],10) + '.' + price[1].substring(0,2);
            } else {
              //if the id doesn't existes (because the qr was wrong)
              error();
            }
          }
        }

        //changing the ui
        document.getElementById('body').className  = "success";
      }, 
      function (error) {
          error();
      }
   );
}

function error() {
  document.getElementById('body').className  = "error";
}