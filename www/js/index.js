document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

function scan() {
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        var raw = result.text.substring(1);
        var data = raw.split('&');
        var each = [];
        for(x=0;x<data.length;x++) {
          each[x] = data[x].split('=');

          if(each[x][0] != 'tt') {
            document.getElementById(each[x][0]).innerHTML = each[x][1];
          } else {
            var price = each[x][1].split('.');
            document.getElementById(each[x][0]).innerHTML = '$' + parseInt(price[0],10) + '.' + price[1].substring(0,2);
          }
          
        }

        document.getElementById('info').style.display = "none";
        document.getElementById('data').style.display = "block";
        document.getElementById('startBtn').innerHTML = "Escanear otra vez";
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