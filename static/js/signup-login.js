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