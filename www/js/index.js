document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

function scan() {
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        var raw = result.text;
        var data = raw.split('&');
        var each = [];
        for(x=0;x<data.length;x++) {
          each[x] = data[x].split('=');
          alert('el resultado de ' + each[x][0] + ' es ' + each[x][1]);
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