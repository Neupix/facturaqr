document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
cordova.plugins.barcodeScanner.scan(
      function (result) {
        var data = result.split('&');
        var strings = [];
        for(x=0;x<data.length;x++) {
          strings[x] = data[x].split('=');
          alert('el resultado de ' + strings[x][0] + ' es ' + strings[x][1]);
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