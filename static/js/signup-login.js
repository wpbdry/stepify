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
    
    /*GOTTA STILL ADD CHECKING PASSWORDS BEFORE SUBMIT*/
});

/*Check that passowrds match before allowing submit*/

$("#signup-form").submit(function(e){
    e.preventDefault();
    var p1 = $("#p1").val();
    var p2 = $("#p2").val();
    //if they are the same, submit
    if (p1 == p2) {
        $("#signup-form")[0].submit();
    }
    // otherwise display error text
    else {
        $("#pw-error").text("Passwords do not match.").css({"display":"block", "color":"red"});
    }
});