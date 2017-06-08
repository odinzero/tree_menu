
    $('#decrypt').click(function() {

        var k = $('#key').val(); // "Secret Passphrase"

        if(k != "") 
        {
        $('#derror').text("");
         
        $.ajax({
            //type: "post",
            dataType: 'html',
            url: 'https://odinzero.github.io/tree_menu/decr.php',
            //jsonCallback: 'jsonp',
            success: function(data) 
            {
                  var d = data.toString();
            
                  alert("click");
            
          //  var id = "name";
            var id = ["name","city"];
            
            var str_decrypted = decrypt_str(d, id, k);
            
            alert(str_decrypted);
            
            if (str_decrypted != "") {
                $('#e_resume').remove();
                $('#d_result').html(str_decrypted);
            } else {
                alert("pass key is wrong !");
            }
            },
            error: function(data) {
                alert("error");
            }

        });
       } 
       else 
       {
           $('#derror').text("fill this field");
       }
    });
// ================================= DECRYPTION ================================
    function decrypt_str(data, id, k)
    {
        if (typeof id === "string")
        {
            var str_encrypted = data.match(new RegExp("[\s]*<(div|ul|span|p|h1|h2|h3|h4|h5|h6)[\s]* id=\"" + id[i] +
                                                      "\">[\r\n|\r\n\s]*(.+)[\r\n|\r\n\s]*<\/(div|ul|span|p|h1|h2|h3|h4|h5|h6)>[\s]*",
                                                      "im"));

            var decrypted = CryptoJS.AES.decrypt(str_encrypted[2], k);
            var str_decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            
            return str_decrypted;
        }
        if (id instanceof Array)
        {
           var d_arr = []; 
           for(var i = 0; i < id.length; i++)
           {
            var str_encrypted = data.match(new RegExp("[\s]*<(div|ul|span|p|h1|h2|h3|h4|h5|h6)[\s]* id=\"" + id[i]
                                                 + "\">[\r\n|\r\n\s]*(.+)[\r\n|\r\n\s]*<\/(div|ul|span|p|h1|h2|h3|h4|h5|h6)>[\s]*",
                                                     "im"));

            alert(str_encrypted[2]);
            var decrypted = CryptoJS.AES.decrypt(str_encrypted[2], k);
            var str_decrypted = decrypted.toString(CryptoJS.enc.Utf8); 
            d_arr[i] = id[i] + ": " + str_decrypted + "<br>";
           }
            return d_arr;
        }
    }
            
   
