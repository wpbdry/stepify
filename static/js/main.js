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
    
    //Change string dates to date objects
    for (var i=0; i < ob.length; i++) {
        var taskDate = new Date(ob[i]['deadline']);
        ob[i]['deadline'] = taskDate;
    }
    return(ob);
}

/*Convert tasks string to object*/
var tasks = objectFromString(tasksString);

//Function to close right panel
function closeRightPanel () {
  $( "#firstpanel" ).toggleClass( "firstpanel-shadow" );
  $('#secondpanel').toggle();
  $('#secondpanel-empty').toggle();
}

//Function to sort tasks into today, tomorrow, upcoming

function sortTasks (tasks) {
    var tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate()+1);
    tomorrowDate.setHours(0, 0, 0, 0);
    var afterTomorrowDate = new Date();
    afterTomorrowDate.setDate(afterTomorrowDate.getDate()+1);
    afterTomorrowDate.setHours(0, 0, 0, 0);
    
    var sortedTasks = {
        today: [],
        tomorrow: [],
        upcoming: []
    };
    
    for (var i=0; i < tasks.length; i++) {
        
        //if ASAP or date is today
        if (tasks[i]['deadline_type'] == 0 || tasks[i]['deadline_type'] == 1 && tasks[i]['deadline'] < tomorrowDate) {
            sortedTasks['today'].push(tasks[i])
        }
        
        //else if deadline type is finite date, and date is tomorrow
        else if (tasks[i]['deadline_type'] == 1 && tasks[i]['deadline'] < afterTomorrowDate) {
            sortedTasks['tomorrow'].push(tasks[i]);
        }
        
        //else if date is after tomorrow or there is no deadline
        else {
            sortedTasks['upcoming'].push(tasks[i]);
        }
    }
    return sortedTasks;
}


//Create function to append html elements
    function appendTasks (tasksList, elementSelector) {
        
        /*
        ELEMENT STRUCTURE
        <div class="uk-grid-small uk-child-width-auto uk-grid" id="00-task">
            <input class="uk-checkbox" type="checkbox">
            <span class="no-bottom-margin task-title" id="00-title">
                Task title
                <span class="mandatory">
                    *
                </span>
            </span>
        </div>
        */
        
        for (var i=0; i<tasksList.length; i++) {
            var taskId = tasksList[i]['task_id'];
            
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
            titleSpan.setAttribute("class", "no-bottom-margin task-title");
            titleSpan.setAttribute("id", taskId + "-title");
            
            var titleText = document.createTextNode(tasksList[i]['title']);
            titleSpan.appendChild(titleText);
            
            if (tasksList[i]['mandatory'] == true) {
                var mandatorySpan = document.createElement("span");
                mandatorySpan.setAttribute("class", "mandatory");
                var mandatoryText = document.createTextNode(" *");
                mandatorySpan.appendChild(mandatoryText);
                titleSpan.appendChild(mandatorySpan);
            }
            
            /*THEN DO THE REST*/
            
            var checkbox = document.createElement("input");
            checkbox.setAttribute("class", "uk-checkbox task-checkbox");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", taskId + "-checkbox");
            
            var taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "uk-grid-small uk-child-width-auto uk-grid");
            taskDiv.setAttribute("id", taskId + "-task");
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(titleSpan);
            
            $(elementSelector).append(taskDiv);
        }
    };

function displayTasks (tasks) {
    //Sort tasks into today, tomorrow, and upcoming
    var sortedTasks = sortTasks (tasks);
    
    //Append html elements
    
    //first hide all headings, they will be shown later if necessary
    $('.task-category').css('display', 'none');
    
    //also remove all content to start fresh
    $('.tasklist').empty();
    
    //today section
    if (sortedTasks['today'].length !== 0) {
        $('#task-category-today').css('display', 'block');
        appendTasks(sortedTasks['today'], "#tasks-today");
    }
    
    //tomorrow section
    if (sortedTasks['tomorrow'].length !== 0) {
        $('#task-category-tomorrow').css('display', 'block');
        appendTasks(sortedTasks['tomorrow'], "#tasks-tomorrow");
    }
    
    //upcoming section
    if (sortedTasks['upcoming'].length !== 0) {
        $('#task-category-upcoming').css('display', 'block');
        appendTasks(sortedTasks['upcoming'], "#tasks-upcoming");
    }
    
    //In case there are no tasks
    if (sortedTasks['today'].length == 0 && sortedTasks['tomorrow'].length == 0 && sortedTasks['upcoming'].length == 0) {
        $('#task-category-today').css('display', 'block');
        $('#task-category-today h2').text("Good job! You're all caught up");
    }
};

function setProgress () {
    //Display percentage
    progressPercentage = (doneTasks / totalTasks) * 100;
    progressPercentage = Math.round(progressPercentage);
    $('.progress-percentage').text(progressPercentage);
    
    //Display way to go text
    $('.tasks-done').text(doneTasks);
    $('.total-tasks').text(totalTasks);
    
    //Set progress bar value
    $('#progress-bar').attr('value', progressPercentage);
}

$(document).ready(function(){
    
    /*SET USERNAME SPAN*/
    $('.username').text(username);
    
    
    /*PROGRESS BAR*/
    
    setProgress();


    /*DYNAMICALLY ADD HTML ELEMENTS TO SHOW TASKS*/
    
    displayTasks(tasks);


    /*HANDLE DELETION OF TASKS (MARKING AS DONE)*/

    $(".task-checkbox").click(function (e) {
    
        var checkboxId = e.target.id;
        var taskId = checkboxId.slice(0, checkboxId.length - 9);
        var taskDivSelector = "#" + taskId + "-task";
        
        //Remove task from original tasks array
        for (i=0; i < tasks.length; i++) {
            if (tasks[i]['task_id'] == taskId) {
                tasks.splice(i, 1);
            }
        }
        
        //update progress bar
        doneTasks ++;
        setProgress()
        
        //Remove tasks
        $(taskDivSelector).remove();
        
        //Check if anything is empty, and hide it if it is
        var catToday = document.getElementById("tasks-today");
        if (!catToday.firstChild) {
            $('#task-category-today').css('display', 'none');
        }
        var catTomorrow = document.getElementById("tasks-tomorrow");
        if (!catTomorrow.firstChild) {
            $('#task-category-tomorrow').css('display', 'none');
        }
        var catUpcoming = document.getElementById("tasks-upcoming");
        if (!catUpcoming.firstChild) {
            $('#task-category-upcoming').css('display', 'none');
        }
        
        //In case there are no tasks
        if (!catToday.firstChild && !catTomorrow.firstChild && !catUpcoming.firstChild) {
            $('#task-category-today').css('display', 'block');
            $('#task-category-today h2').text("Good job! You're all caught up");
        }
        
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
});
