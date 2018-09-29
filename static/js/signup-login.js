/*************************************************************************
_/                _/  _/_/_/    _/_/_/    _/_/_/    _/_/_/    _/      _/  
_/              _/   _/    _/  _/    _/  _/    _/  _/    _/    _/  _/     
_/    _/_/    _/    _/_/_/    _/_/_/    _/    _/  _/_/_/        _/        
_/  _/  _/  _/     _/        _/    _/  _/    _/  _/  _/        _/         
_/_/    _/_/      _/        _/_/_/    _/_/_/    _/    _/      _/  made it!
*************************************************************************/

/*global
    $, console
*/

$(document).ready(function(){
    /*Switch between login and sign up*/
    
    $("#login").css("display", "none");
    $("#pw-error").css("display", "none");
    
    $("#show-login").click(function(){
        $("#signup").css("display", "none");
        $("#login").css("display", "block");
        document.title = 'Stepify | Log in';
    });
    
    $("#show-signup").click(function(){
        $("#login").css("display", "none");
        $("#signup").css("display", "block");
        document.title = "Stepify | Sign up";
    });
    
});

/* HANDLE FORM SUBMIT*/

//function takes string, key, and returns encrypted string
function encrypt(s, k) {
    //get key in usable format
    var key = forge.pki.publicKeyFromPem(k);
    //encrypt string
    var encrypted = key.encrypt(
        s,
        "RSA-OAEP",
        {
            md: forge.md.sha256.create(),
            mgf1: forge.mgf1.create()
        }
    );
    //encode as base64 for web transfer
    var base64 = forge.util.encode64(encrypted);
    //return
    return(base64);
}

$("#signup-form").submit(function(e){
    //Check that passwords match before allowing submit
    e.preventDefault();
    var p1 = $("#p1").val();
    var p2 = $("#p2").val();
    //if they are the same, submit
    if (p1 == p2) {
        //Encrypt password
        var enc = encrypt(p1, publicKey);
        console.log(enc);
        //Submit
        $("#p1").val(enc);
        $("#signup-form")[0].submit();
    }
    // otherwise display error text
    else {
        $("#pw-error").text("Passwords do not match.").css({"display":"block", "color":"red"});
    }
});