document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
cordova.plugins.barcodeScanner.scan(
      function (result) {
        var data = result.split('&');
        var result = [];
        for(x=0;x<data.length) {
          result[x] = data[x].split('=');
          alert('el resultado de ' + result[x][0] + ' es ' + result[x][1]);
        }
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

/*
  re rfc del emisor
  rr rfc del receptor
  tt cantidad
  id numero de la factura
*/