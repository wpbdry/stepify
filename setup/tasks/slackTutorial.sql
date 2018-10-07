INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, tech, food, weather)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Get better at Slack!',                        -- Replace text between quotes with task name
    'Take a few minutes to watch some videos and start your way to becoming a proficient Slack user. Besides the main resource (ink in location) you can check these videos out: <br><br>
    <a href=''https://www.youtube.com/watch?v=KMHg25-z6yg&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=4''>Learn More About Channels</a><br><br><a href=''https://www.youtube.com/watch?v=JsX8V4hzENo&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=5''>Go a bit deeper into Slack I</a><br><br><a href=''https://www.youtube.com/watch?v=cfkX8oTalDg&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=6''>Go a bit deeper into Slack II</a><br><br>',                 -- Replace text between quotes with task description

     0,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is a finite time.
    NULL,    -- Replace between quotes with actual date and time (YYYY-MM-DD hh:mm:ss).
                                        -- Delete entire line above and type NULL (without quotes) if it's 0 or 1 on the other line
    'Slack Tutorial',                 -- or name of website, if "location" is online
    'https://www.youtube.com/watch?v=dJmdHowChWk&t=9s',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    TRUE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    FALSE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    FALSE, -- TRUE if task is mandatory, FALSE if task is optional

    FALSE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    FALSE, -- TRUE if it is recommended to bring a swimming suit
    FALSE, -- TRUE if this is a pet friendly activity / event
    TRUE,  -- TRUE is it's a techie event

    0, -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.
    0); -- 0 no weather, 1 cloudy, 2 lightning, 3 rain, 4 snow, 5 sun, 6 windy. Please only choose one option.
