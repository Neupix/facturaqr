document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

var hasFailed = 0;
var each = [];
var stringPrice = 0;

function scan() {
  //reset fail detector
  hasFailed = 0;

  //starting qr plugin
  cordova.plugins.barcodeScanner.scan(
      function (result) {

        //removing the first ?
        var raw = result.text.substring(1);

        //spliting the data by the &
        var data = raw.split('&');
        
        for(x=0;x<data.length;x++) {
          
          //getting the var and the value
          each[x] = data[x].split('=');

          //currect sintax and prev fails
          if(each[x][0].length == 2 && hasFailed == 0){
            //if this is price, we need to do an additional thing...
            if(each[x][0] != 'tt') {
              document.getElementById(each[x][0]).innerHTML = each[x][1];
            } else {
              //we split the integer and the cents
              var price = each[x][1].split('.');
  
              //the we transform the integer part into a real INT, and then take only the first two cent characters
              stringPrice = '$' + parseInt(price[0],10) + '.' + price[1].substring(0,2);
              document.getElementById(each[x][0]).innerHTML = stringPrice;
            }

          } else {
             //if the id doesn't existes (because the qr was wrong)
             error();
          }
        }
        //changing the ui
        if(hasFailed == 0) document.getElementById('body').className = "success";
      }, 
      function (error) {
          error();
      }
  );
}

function email() {
  var userEmail = prompt("¿Cuál es tu email?");
  var bodyMsj = "RFC del emisor: " + each[0][1] + "\n\nRFC del receptor: " + each[1][1] + "\n\nCantidad: " + stringPrice + "\n\nID de la factura: " + each[3][1] + "\n\n\nEmail generado por Factura QR, de http://neupix.com/";
  bodyMsj = encodeURIComponent(bodyMsj.trim());
  var mailToUrl = "mailto:" + userEmail + "?subject=Factura:" + each[3][1] + "&body=" + bodyMsj;
  window.location = mailToUrl;
}

function error() {
  hasFailed = 1;
  document.getElementById('body').className = "error";
}