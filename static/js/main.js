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

/*
    VARIABLED ALREADY DEFINED (IN HTML TEMPLATE)
        tasksString  // A list of complete tasks, in json format in a string, in order of date, most urgent first
        totalTasks  // to total number of tasks as an integer
        doneTasks  // the number of complete tasks as int
        username  // the username of the currently logged in user
*/

//define function to convert data received from flask with '{{ data|tojson }}' into JS array / object
function objectFromString (s) {
    var st = s.slice(1, tasksString.length - 1); //gets rid or leading and ending "
    ob = JSON.parse(st);
    return(ob);
}

/*Convert tasks string to object*/
var tasks = objectFromString(tasksString);

function closeRightPanel () {
  $( "#firstpanel" ).toggleClass( "firstpanel-shadow" );
  $('#secondpanel').toggle();
  $('#secondpanel-empty').toggle();
}

$(document).ready(function(){
    
    /*SET USERNAME SPAN*/
    $('.username').text(username);
    
    
    /*PROGRESS BAR*/
    
    //Display percentage
    progressPercentage = doneTasks / totalTasks;
    $('.progress-percentage').text(progressPercentage);
    
    //Display way to go text
    $('.tasks-done').text(doneTasks);
    $('.total-tasks').text(totalTasks);
    
    //Set progress bar value
    $('#progress-bar').attr('value', progressPercentage);


    /*DYNAMICALLY ADD HTML DIVS TO SHOW TASKS*/
    
    //Sort tasks into today, tomorrow, and upcoming, and convert date from str to js date obj
    
    var tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate()+1);
    tomorrowDate.setHours(0, 0, 0, 0);
    var afterTomorrowDate = new Date();
    afterTomorrowDate.setDate(afterTomorrowDate.getDate()+1);
    afterTomorrowDate.setHours(0, 0, 0, 0);
    
    var tasksToday = [];
    var tasksTomorrow = [];
    var tasksUpcoming = [];
    
    for (var i=0; i < tasks.length; i++) {
        var taskDate = new Date(tasks[i]['deadline']);
        tasks[i]['deadline'] = taskDate;
        
        //if ASAP or date is today
        if (tasks[i]['deadline_type'] == 0 || tasks[i]['deadline_type'] == 1 && tasks[i]['deadline'] < tomorrowDate) {
            tasksToday.push(tasks[i])
        }
        
        //else if deadline type is finite date, and date is tomorrow
        else if (tasks[i]['deadline_type'] == 1 && tasks[i]['deadline'] < afterTomorrowDate) {
            tasksTomorrow.push(tasks[i]);
        }
        
        //else if date is after tomorrow or there is no deadline
        else {
            tasksUpcoming.push(tasks[i])
        }
    }
    
    
    //Create function to append html elements
    function appendTasks (tasksList, elementSelector) {
        
        /*
        ELEMENT STRUCTURE
        <div class="uk-grid-small uk-child-width-auto uk-grid" id="00-task">
            <label>
                <input class="uk-checkbox task-checkbox" type="checkbox" id="00-checkbox">
                <span class="uk-margin-auto-left no-bottom-margin task-title" id="00-title">
                    Task title
                    <span class="mandatory">
                        *
                    </span>
                </span>
            </label>
        </div>
        */
        
        for (var i=0; i<appendTasks.length; i++) {
            
            /*
            START WITH THIS PART
            <span class="uk-margin-auto-left no-bottom-margin task-title" id="00-title">
                    Task title
                    <span class="mandatory">
                        *
                    </span>
                </span>
            */
            
            var titleSpan = document.createElement("span");
            titleSpan.setAttribute("class", "uk-margin-auto-left no-bottom-margin task-title");
            titleSpan.setAttribute("id", tasksList[i]['id'] + "-title");
            
            var titleText = document.createTextNode(tasksList[i]['title']);
            titleSpan.appendChild(titleText);
            
            if (tasksList[i]['mandatory'] == true) {
                var mandatorySpan = document.createElement("span");
                mandatorySpan.setAttribute("class", "mandatory");
                var mandatoryText = document.createTextNode(" *");
                mandatorySpan.appendChild(mandatoryText);
                titleSpan.appendChild(mandatorySpan);
            }
            
            /*THEN GO FROM INSIDE OUT*/
            
            var checkbox = document.createElement("input");
            checkbox.setAttribute("class", "uk-checkbox task-checkbox");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", tasksList[i]['id'] + "-checkbox");
            
            var myLabel = document.createElement("label");
            myLabel.appendChild(checkbox);
            myLabel.appendChild(titleSpan);
            
            var taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "uk-grid-small uk-child-width-auto uk-grid");
            taskDiv.setAttribute("id", tasksList[i]['id'] + "-task");
            taskDiv.appendChild(myLabel);
            
            $(elementSelector).append(taskDiv);
        }
    }
    
    
    //Append html elements
    
    //first hide all headings, will be shown later if necessary
    $('.task-category').css('display', 'none');
    
    //today section
    if (tasksToday.length !== 0) {
        $('#task-category-today').css('display', 'block');
        appendTasks(tasksToday, "#task-category-today");
    }
    
    //tomorrow section
    if (tasksTomorrow.length !== 0) {
        $('#task-category-tomorrow').css('display', 'block');
        appendTasks(tasksTomorrow, "#task-category-tomorrow");
    }
    
    //upcoming section
    if (tasksUpcoming.length !== 0) {
        $('#task-category-upcoming').css('display', 'block');
        appendTasks(tasksUpcoming, "#task-category-upcoming");
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
    //var username = pyUsername

    $("#logged-in-username").text(username);

});
