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

$("#secondpanel").addClass("animated");
$("#secondpanel-empty").addClass("animated");

var taskSelected = false;

$( window ).resize(function() {
    if(taskSelected) {
      openRightPanel();
    } else {
      closeRightPanel();
    }
});

//Function to close right panel
function closeRightPanel () {
    taskSelected = false;
    $("#secondpanel-empty").removeClass("fadeOutLeft");
    $("#secondpanel").addClass("fadeOutLeft");
    $("#secondpanel-empty").addClass("fadeInRight");
    setTimeout(() => {
        if (Foundation.MediaQuery.current === 'medium' || Foundation.MediaQuery.current === 'small') {
            $("#firstpanel").show();
        }
        $('#secondpanel').hide();
        $('#secondpanel-empty').show();
    }, 200);

    //remove highlighting from task in left panel
    $(".task-title-left-panel").removeClass("selected-task");
}

//Open right panel
function openRightPanel () {
    taskSelected = true;
    $("#secondpanel").removeClass("fadeOutLeft");
    $("#secondpanel-empty").addClass("fadeOutLeft");
    $("#secondpanel").addClass("fadeInRight");

    setTimeout(() => {
        if (Foundation.MediaQuery.current === 'medium' || Foundation.MediaQuery.current === 'small') {
            $("#secondpanel").attr('style','display: block !important');
            $("#firstpanel").hide();
          } else {
            $("#secondpanel").css("display", "");
            $("#secondpanel-empty").css("display", "none");
          }
    }, 200);
}

//Show next task
var currentlyDisplayedTaskId;
function showNextTask() {
    //Stop page from reloading if it's on the last task already
    if (currentlyDisplayedTaskId == tasks[tasks.length - 1]['task_id']) {
        return false;
    }

    //Otherwise show next task. Page doesn't reload anyway
    for (var i=0; i<tasks.length; i++) {
        if (tasks[i]['task_id'] == currentlyDisplayedTaskId) {
            var nextTaskId = tasks[i + 1]['task_id'];
            displayTaskRight(nextTaskId);
            break;
        }
    }
}


// Handle marking of tasks as done and not done
function setEventListenerForTaskTitles() {
    
    //Task checkboxes
    $(".task-checkbox").click(function (e) {
        var taskId = e.target.dataset.taskid;
        
        //Find task in tasks array
        for (i=0; i < tasks.length; i++) {
            if (tasks[i]['task_id'] == taskId) {
                
                //If task is not done
                if (!tasks[i]['completion']) {
                    tasks[i]['completion'] = true;
                    var completionDate = new Date();
                    tasks[i]['completion_date'] = completionDate;
                }
                
                //If task is already done
                else if (tasks[i]['completion']) {
                    tasks[i]['completion'] = false;
                }
            } 
        }
        
        
        
        //Redisplay tasks
        displayTasks(tasks);
    });
    
    //Task titles
    $(".task-title").click(function (e) {
        var taskId = e.target.dataset.taskid;
        displayTaskRight(taskId);
    });
}

/*HANDLE DELETION OF TASKS (MARKING AS DONE)*/
    

    
    //
 

    /*
    $(".task-checkbox").click(function (e) {

        var taskId = e.target.dataset.taskid;
        var taskDivSelector = "#" + taskId + "-task";

        //Remove task from original tasks array
        for (i=0; i < tasks.length; i++) {
            if (tasks[i]['task_id'] == taskId) {
                tasks.splice(i, 1);
            }
        }

        //hide right panel if it was that task being displayed
        if (taskId == currentlyDisplayedTaskId) {
            closeRightPanel();
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
    */

//Function to sort tasks into today, tomorrow, upcoming, and completed

function sortTasks (tasks) {
    var tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate()+1);
    tomorrowDate.setHours(0, 0, 0, 0);
    var afterTomorrowDate = new Date();
    afterTomorrowDate.setDate(afterTomorrowDate.getDate()+2);
    afterTomorrowDate.setHours(0, 0, 0, 0);

    var sortedTasks = {
        today: [],
        tomorrow: [],
        upcoming: [],
        completed: []
    };

    for (var i=0; i < tasks.length; i++) {
        
        //if task is complete
        if (tasks[i]['completion']) {
            sortedTasks['completed'].push(tasks[i]);
        }

        //if ASAP or date is today
        else if (tasks[i]['deadline_type'] == 0 || tasks[i]['deadline_type'] == 1 && tasks[i]['deadline'] < tomorrowDate) {
            sortedTasks['today'].push(tasks[i]);
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
    
    //Sort completed tasks by date
    
    sortedTasks['completed'].sort(function(a, b) {
        //return new Date(b.date) - new Date(a.date);
        return b['completion_date'] - a['completion_date'];
    });
    
    return sortedTasks;
}


//Create function to append html elements
    function appendTasks (tasksList, elementSelector) {

        /*
        ELEMENT STRUCTURE
        <div class="uk-grid-small uk-child-width-auto uk-grid task-title-left-panel" id="00-task" data-taskid="00">
            <input class="uk-checkbox task-checkbox" type="checkbox" data-taskid="00">
            <span class="no-bottom-margin task-title" data-taskid="00">
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
            <span class="uk-margin-auto-left no-bottom-margin task-title" data-taskid="00">
                    Task title
                    <span class="mandatory">
                        *
                    </span>
                </span>
            */

            var titleSpan = document.createElement("span");
            titleSpan.setAttribute("class", "no-bottom-margin task-title");
            titleSpan.setAttribute("data-taskid", taskId);

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
            checkbox.setAttribute("data-taskid", taskId);

            var taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "uk-grid-small uk-child-width-auto uk-grid task-title-left-panel");
            taskDiv.setAttribute("id", taskId + "-task");
            taskDiv.setAttribute("data-taskid", taskId);
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(titleSpan);

            $(elementSelector).append(taskDiv);
        }
    };

//Display tasks in left panel

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
    
    //completed section
    if (sortedTasks['completed'].length !== 0) {
        $('#task-category-completed').css('display', 'block');
        appendTasks(sortedTasks['completed'], "#tasks-completed");
    }
    
    $("#task-category-completed .task-checkbox").attr("checked", "");
    $("#task-category-completed .task-title").addClass("checked-task-title");

    //In case there are no tasks
    if (sortedTasks['today'].length == 0 && sortedTasks['tomorrow'].length == 0 && sortedTasks['upcoming'].length == 0 && sortedTasks['completed'].length == 0) {
        $('#task-category-today').css('display', 'block');
        $('#task-category-today h2').text("You have no tasks yet");
    }
    
    //Set up event listener for tasks
    setEventListenerForTaskTitles();
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

function dateToString (d) {
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var day = d.getDay();
    day = weekDays[day];
    var date = d.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = d.getFullYear();
    var hour = d.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minute = d.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }

    var r = day + " " + date + "." + month + " " + hour + ":" + minute;
    return r;
}

function dateToSqlString (d) {
    
    var date = d.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    
    var year = d.getFullYear();
    
    var hour = d.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    
    var minute = d.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    
    var second = d.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    
    //We want this format 2018-05-16 00:00:00
    var r = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return r;
}

/*FUNCTION TO DISPLAY CORRECT TASK IN RIGHT PANEL AND HIGHLIGHT TASK IN LEFT PANEL*/

function displayTaskRight (taskId) {
    // update currently displayed task global var
    currentlyDisplayedTaskId = taskId;

    //update highlighted task in left panes
    $(".task-title-left-panel").removeClass("selected-task");
    var taskTitleLeftSelector = "#" + taskId + "-task";
    $(taskTitleLeftSelector).addClass("selected-task");

    //extract selected task from tasks array
    var t;
    for (var i=0; i < tasks.length; i++) {
        if (tasks[i]['task_id'] == taskId) {
            t = tasks[i];
        }
    }

    //update top icon

    $('.task-type-icon').css('display', 'none');

    var topIcons = [
        [t['wiki'], '#wiki-icon'],
        [t['slack'], '#slack-icon'],
        [t['calendar'], '#calendar-icon'],
        [t['other'], '#other-icon']
    ];

    for (var i=0; i<topIcons.length; i++) {
        if (topIcons[i][0]) {
            $(topIcons[i][1]).css('display', 'inline-block');
        }
    }

    //update title text
    $('#right-task-title').text(t['title']);

    //update mandatory
    if (t['mandatory']) {
        $('#mandatory-task').text("(required)");
    }
    else {
        $('#mandatory-task').text('(optional)');
    }

    //update weather
    $(".weather-icon").css("display", "none");
    switch(t['weather']) {
        case 0:
            break
        case 1:
            $("#cloudy-icon").css("display", "inline-block");
            break;
        case 2:
            $("#lightning-icon").css("display", "inline-block");
            break;
        case 3:
            $("#rain-icon").css("display", "inline-block");
            break;
        case 4:
            $("#snow-icon").css("display", "inline-block");
            break;
        case 5:
            $("#sun-icon").css("display", "inline-block");
            break;
        case 6:
            $("#wind-icon").css("display", "inline-block");
            break;
        default:
            break;
    }

    //update time
    $('.time-icon').css('display', 'inline-block');

    var taskTime;
    var d = t['deadline']
    var dt = t['deadline_type'];
    if (dt == 0) {
        taskTime = 'ASAP';
    }
    if (dt == 1) {
        taskTime = dateToString(d);
    }
    if (dt == 2) {
        $('.time-icon').css('display', 'none');
    }
    $('.time-icon-text').text(taskTime);

    //update location
    $(".location-icon-text").text(t['location_text']);
    $(".location-icon-link").attr("href", t['location_url']);

    //set taskid attribute on completed checkbox
    $("#right-panel-checkbox").attr("data-taskid", t['task_id']);

    //Display correct icons
    $('.weirdLeafIcon').css('display', 'none');
    $('.task-property-icon').css('display', 'none');

    var propertyIcons = [
        [t['outdoor'], '#outside-icon'],
        [t['formal'], '#formal-icon'],
        [t['swimming'], '#swim-icon'],
        [t['pets'], '#pets-icon'],
        [t['tech'], '#techie-icon']
    ];

    for (var i=0; i<propertyIcons.length; i++) {
        if (propertyIcons[i][0]) {
            $(propertyIcons[i][1]).css('display', 'inline-block');
            $(".weirdLeafIcon").css("display", "inline-block");
        }
    }

    if (t['food'] == 1) {
        $("#veg-icon").css('display', 'inline-block');
        $(".weirdLeafIcon").css("display", "inline-block");
    }

    if (t['food'] == 2) {
        $("#vegan-icon").css('display', 'inline-block');
        $(".weirdLeafIcon").css("display", "inline-block");
    }

    //Description
    $(".task-description").html(t['details']);

    //Make sure the right panel is not hidden
    openRightPanel();
}

$(document).ready(function(){

    /*HIDE RIGHT PANEL*/
    closeRightPanel();

    /*SET USERNAME SPAN*/
    $('.username').text(username);


    /*PROGRESS BAR*/

    setProgress();


    /*DYNAMICALLY ADD HTML ELEMENTS TO SHOW TASKS*/

    displayTasks(tasks);
});

/*
//display correct task on right panel
$(document).ready(function(){

    
});
*/
