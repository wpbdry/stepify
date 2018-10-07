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
        var taskDateCompletion = new Date(ob[i]['completion_date']);
        ob[i]['completion_date'] = taskDateCompletion;
    }
    return(ob);
}

/*Convert tasks string to object*/
var tasks = objectFromString(tasksString);

$("#secondpanel").addClass("animated");
$("#firstpanel-image").addClass("animated");

var taskSelected = false;

$( window ).resize(function() {
    if(taskSelected) {
      openRightPanel();
    } else {
      closeRightPanel();
    }
});

//Open right panel
var x = Number
function openRightPanel () {

        taskSelected = true;
        if (Foundation.MediaQuery.current == 'large' || Foundation.MediaQuery.current == 'xlarge' || Foundation.MediaQuery.current == 'xxlarge') {
            $("#secondpanel").css('width', `45vw`);
            if (x==0){
                $("#secondpanel").addClass("fadeInRight");               
                $("#secondpanel").css("display", "");
                setTimeout(() => {
                    $("#secondpanel").removeClass("fadeInRight");
                }, 701);
                x=1     
            } else if (x==1){
                $("#firstpanel-image").css("visibility", "hidden");
                $("#secondpanel").addClass("fadeIn");
                $("#secondpanel").css("display", "");    
                setTimeout(() => {
                    $("#secondpanel").removeClass("fadeIn");
                }, 701);
            }
        } else if (Foundation.MediaQuery.current == 'medium'){    
            w = window.innerWidth
            thisW = w-73
            $("#secondpanel").attr('style','display: block !important');
            $("#secondpanel").css('width', `${thisW}px`);
            $("#firstpanel").hide();
            $("#secondpanel").addClass("fadeInRight");  
            
            setTimeout(() => {
            $("#secondpanel").addClass("fadeInRight");  
            }, 701);
        } else if (Foundation.MediaQuery.current == 'small'){    
            $("#secondpanel").attr('style','display: block !important');
            $("#secondpanel").css('width', `100vw`);
            $("#firstpanel").hide();
            $("#secondpanel").addClass("fadeInRight");  
            
            setTimeout(() => {
            $("#secondpanel").addClass("fadeInRight");  
            }, 701);
        }
    } 

// //Function to close right panel

function closeRightPanel () {
    taskSelected = false;
    
    if (Foundation.MediaQuery.current == 'large' || Foundation.MediaQuery.current == 'xlarge' || Foundation.MediaQuery.current == 'xxlarge') {
        $("#firstpanel-image").css("visibility", "visible");
        $("#secondpanel").addClass("fadeOutRight");
        setTimeout(() => {       
            $('#secondpanel').hide();
            $('#firstpanel-image').show();
            $("#secondpanel").removeClass("fadeOutRight");
        }, 401);
    } else if (Foundation.MediaQuery.current == 'medium' || Foundation.MediaQuery.current == 'small'){    
        $("#secondpanel").addClass("fadeOutRight");
        setTimeout(() => {       
            $('#firstpanel-image').show();
            $('#secondpanel').hide();
            $("#firstpanel").show();
            $("#secondpanel").removeClass("fadeOutRight");
        }, 401);
    }
    x =0    
    //remove highlighting from task in left panel
    $(".task-title-left-panel").removeClass("selected-task");
}

//Show next task
var lastTaskOnLeftPanelId; //Used in display task right function
function showNextTask() {
    
    //Create new variable of task ids in the order that they are displayed in left panel
    var categorizedTasks = sortTasks(tasks);
    var taskIdsInOrder = [];
    
    for (var i=0; i<categorizedTasks['today'].length; i++) {
        taskIdsInOrder.push(categorizedTasks['today'][i]['task_id']);
    }
    for (var i=0; i<categorizedTasks['tomorrow'].length; i++) {
        taskIdsInOrder.push(categorizedTasks['tomorrow'][i]['task_id']);
    }
    for (var i=0; i<categorizedTasks['upcoming'].length; i++) {
        taskIdsInOrder.push(categorizedTasks['upcoming'][i]['task_id']);
    }
    for (var i=0; i<categorizedTasks['completed'].length; i++) {
        taskIdsInOrder.push(categorizedTasks['completed'][i]['task_id']);
    }
    lastTaskOnLeftPanelId = taskIdsInOrder[taskIdsInOrder.length - 1];
    
    //Get currently displayed task
    var curTaskId = $("#right-panel-checkbox")[0].dataset.taskid;
    
    //Get next task to display
    for (var i=0; i<taskIdsInOrder.length; i++) {
        if (taskIdsInOrder[i] == curTaskId) {
            var nextTaskId = taskIdsInOrder[i + 1];
            displayTaskRight(nextTaskId);
            break;
        }
    }
}

//Function to set event listener on checkboxes and set task title right line through and update progress var doneTasks and send info to backend
function setEventListenerCheckboxes (elSelector) {
    $(elSelector).click(function (e) {
        var taskId = e.target.dataset.taskid;
        
        //Find task in tasks array
        for (i=0; i < tasks.length; i++) {
            if (tasks[i]['task_id'] == taskId) {
                
                //If task is being marked as done
                if (!tasks[i]['completion']) {
                    $("#" + taskId + "-task").addClass('animated');
                    $("#" + taskId + "-task").addClass('fadeOut');
                    $("#" + taskId + "-task").css('position', 'absolute');
                    
                    doneTasks ++;
                    tasks[i]['completion'] = true;
                    var completionDate = new Date();
                    tasks[i]['completion_date'] = completionDate;
                    
                    //tell server to mark it as done on the db as well
                    //copied from https://stackoverflow.com/questions/14908864/how-can-i-use-data-posted-from-ajax-in-flask
                    var taskData = {
                        "taskid": taskId,
                        "compdate": dateToSqlString(completionDate)
                    };
                    $.ajax({
                        type : "POST",
                        url : "/task-done",
                        data: JSON.stringify(taskData, null, '\t'),
                        contentType: 'application/json;charset=UTF-8',
                        success: function(result) {

                        }
                    });
                    //Redisplay tasks
                    setTimeout(() => {
                        displayTasks(tasks);
                     }, 701);
                }
                
                //If task is being marked as not done
                else if (tasks[i]['completion']) {
                    doneTasks -= 1;
                    tasks[i]['completion'] = false;
                    
                    //tell server to mark it as not done on the db as well
                    //copied from https://stackoverflow.com/questions/14908864/how-can-i-use-data-posted-from-ajax-in-flask
                    $.ajax({
                        type : "POST",
                        url : "/task-undone",
                        data: JSON.stringify(taskId, null, '\t'),
                        contentType: 'application/json;charset=UTF-8',
                        success: function(result) {

                        }
                    }); 
                    //Redisplay tasks
                    displayTasks(tasks);
                }
                
                //if this is the task that's currently displayed in right panel
                var currentlyDisplayedTaskId = $("#right-panel-checkbox")[0].dataset.taskid;
                if (taskId == currentlyDisplayedTaskId && $("#secondpanel")[0].style.display !== "none") {
                    displayTaskRight(taskId);
                }
            } 
        }
        
        //Redisplay tasks
        // setTimeout(() => {
        //    displayTasks(tasks);
        // }, 701);
        
    });
}


// Set event listeners on titles and checkboxes left when they are dynamically created
function setEventListenerForTaskTitles() {
    
    //Task checkboxes left and task title right
    setEventListenerCheckboxes(".task-checkbox");
    
    
    //Task titles
    $(".task-title").click(function (e) {
        var taskId = e.target.dataset.taskid;
        displayTaskRight(taskId);
    });
}

/*HANDLE DELETION OF TASKS (MARKING AS DONE) TO DO

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
    
    //Update progress bar
    setProgress();
    
    //Update highlighted title on the left
    
    //if a task is currently displayed in right panel
    if ($("#secondpanel")[0].style.display !== "none") {
        var currentlyDisplayedTaskId = $("#right-panel-checkbox")[0].dataset.taskid;
        var divSelector = "#" + currentlyDisplayedTaskId + "-task";
        $(divSelector).addClass("selected-task");
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
    
    //We want this format 2018-5-16 00:00:00
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
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
    
    //update title line-through
    if (t['completion']) {
        $("#right-task-title").css("text-decoration", "line-through");
    }
    else {
        $("#right-task-title").css("text-decoration", "initial");
    }
    
    
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
    
    //Check box
    $("#right-panel-checkbox").attr("data-taskid", taskId);
    if (t['completion']) {
        $("#right-panel-checkbox").prop("checked", true);
    }
    else {
        $("#right-panel-checkbox").prop("checked", false);
    }

    //Description
    $(".task-description").html(t['details']);
    
    //Explore next task button
    if (taskId == lastTaskOnLeftPanelId) {
        $("#next-task-button").css("display", "none");
    }
    else {
        $("#next-task-button").css("display", "");
    }

    //Make sure the right panel is not hidden
    openRightPanel();
}

$(document).ready(function(){

    /*HIDE RIGHT PANEL*/
    closeRightPanel();

    /*SET USERNAME SPAN*/
    $('.username').text(username);


    /*DYNAMICALLY ADD HTML ELEMENTS TO SHOW TASKS*/

    displayTasks(tasks);
    
    //Set event listener on checkbox in right panel
    setEventListenerCheckboxes("#right-panel-checkbox");
});

/*
//display correct task on right panel
$(document).ready(function(){

    
});
*/
