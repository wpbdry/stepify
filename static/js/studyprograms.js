

/*global
    $, console
*/

$(document).ready(function(e){
    $(".study-program").click(function(){
        var program = $(this).attr("id");
        $("#hidden-input").val(program);
        $("#hidden-form").submit();
    });
});