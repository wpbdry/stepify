INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, tech, food, weather)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Vacations!',                        -- Replace text between quotes with task name
    'You''ll be visiting your family and friends in your home town! Or... stay in Berlin alongside other CODE students and have a great time! Enjoy!',                 -- Replace text between quotes with task description. Use <br> for line break and use it twice to start a new paragraph
    -- Other HTML markup is also possible, but single quotes must be properly escaped for postgresql

    0,                                  -- 0 if ASAP, 1 if deadline is finite time, 2 if there is no deadline.
    TIMESTAMP '2018-12-21 00:00:00',    -- Replace between quotes with actual date and time (YYYY-MM-DD hh:mm:ss).
                                        -- Delete entire line above and type NULL (without quotes) if it's 0 or 1 above
    'You tell me!',                 -- or name of website, if "location" is online
    'https://en.wikipedia.org/wiki/Vacation',                  -- Either google maps url, or url to website. Please always include "https://" or "http://"

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE,  -- TRUE if this is a slack activity, else FALSE
    FALSE,  -- TRUE if this is a calendar activity, else FALSE
    TRUE,   -- TRUE if this happens in real life or none of the above

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    TRUE, -- TRUE if task is mandatory, FALSE if task is optional

    TRUE, -- TRUE if this is an outdoor activity
    FALSE, -- TRUE if this is a formal event/activity
    TRUE, -- TRUE if it is recommended to bring a swimming suit
    TRUE, -- TRUE if this is a pet friendly activity / event
    FALSE, -- TRUE if this is a techie activity or event

    0,  -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.
    5); -- 0 no weather, 1 cloudy, 2 lightning, 3 rain, 4 snow, 5 sun, 6 windy. Please only choose one option.