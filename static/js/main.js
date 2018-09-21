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

//define function to convert data sent from flask into javascript arrays
function jsify (s) {
    s = s.replace(/&#39;/g, "\"").replace(/\(/g, "[").replace(/\)/g, "]");
    s = JSON.parse(s);
    return(s);
}

//pyTasks variable already defined in html template

$(document).ready(function(){
    
    /*DYNAMICALLY ADD HTML DIVS TO SHOW TASKS*/
    var tasks = jsify(pyTasks);
    
    for (i = 0; i < tasks.length; i++) {
        
        var item = document.createElement("div");
        item.setAttribute("class", "to-do-item");
        item.setAttribute("id", tasks[i][0]); //set html id of this task's div to the task id in db
        
        var checkbox = document.createElement("button");
        checkbox.setAttribute("class", "to-do-checkbox");
        checkbox.setAttribute("id", tasks[i][0] + "-b") //so that I can tell which one has been clicked
        var text = document.createTextNode("Done.");
        checkbox.appendChild(text);
        item.appendChild(checkbox);
        
        var title = document.createElement("span");
        title.setAttribute("class", "to-do-title");
        text = document.createTextNode(tasks[i][1]); //task_name
        title.appendChild(text);
        item.appendChild(title);
        
        var description = document.createElement("div");
        description.setAttribute("class", "to-do-description");
        text = document.createTextNode(tasks[i][2]); //task_details
        description.appendChild(text);
        item.appendChild(description);
        
        $("#to-to-list").append(item);
    }
    
    /*HANDLE DELETION OF TASKS (MARKING AS DONE)*/
    
    $(".to-do-checkbox").click(function (e) {
        
        var buttonId = e.target.id;
        var taskId = buttonId.slice(0, buttonId.length - 2);
        var itemId = "#" + taskId;
        
        //Remove from html document
        $(itemId).remove();
    
        //tell server to mark it as done on the db as well
        //copied from https://stackoverflow.com/questions/14908864/how-can-i-use-data-posted-from-ajax-in-flask
        $.ajax({
            type : "POST",
            url : "/task-done",
            data: JSON.stringify(taskId, null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                
            }
        });
        
    });
    
    /*UPDATE LOGOUT USERNAME SPAN*/
    var username = pyUsername
    
    $("#logged-in-username").text(username);
    
});