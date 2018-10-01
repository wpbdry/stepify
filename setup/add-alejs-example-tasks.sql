
INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, food)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Meet outside of the Factory to go on a trip to a secret place',                        -- Replace text between quotes with task name
    'We will all meet just outside of the Factory main entrance. Nextgen C<>DE t-shirts and wristbands will be handed out. We will board 3 buses that will take us to a secret destination were we will spend the next couple of days. We will be back by Thursday at 6pm',                 -- Replace text between quotes with task description

    2,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    TIMESTAMP '2018-08-27 08:00:00',    -- 27.08.18, 8:00am Replace between quotes with actual date and time (in this format)
    'Outside of Factory Görlitzer Park',                 -- or name of website, if "location" is online
    'https://goo.gl/maps/oo52ytHLfnq',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    TRUE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    TRUE, -- TRUE if task is mandatory, FALSE if task is optional

    TRUE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    TRUE, -- TRUE if it is recommended to bring a swimming suit
    TRUE, -- TRUE if this is a pet friendly activity / event

    2); -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.




INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, food)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Meet at the main hall for breakfast',                        -- Replace text between quotes with task name
    'We will all meet at the main hall to have breakfast and then Jonathan will be sharing some thoughts about what it means to study at C<>DE.',                 -- Replace text between quotes with task description

    2,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    TIMESTAMP '2018-08-18 09:00:00',    -- 28.08.18, 9:00am Replace between quotes with actual date and time (in this format)
    'Resort Lobby',                 -- or name of website, if "location" is online
    'https://goo.gl/maps/crvq9okpiCv',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    TRUE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    FALSE, -- TRUE if task is mandatory, FALSE if task is optional

    FALSE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    FALSE, -- TRUE if it is recommended to bring a swimming suit
    TRUE, -- TRUE if this is a pet friendly activity / event

    2); -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.




INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, food)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Pay for the student ID',                        -- Replace text between quotes with task name
    'This student ID will give you access to all the public transportation in Berlin (Potsdam included). Of course it will also give you access to all student discounts <br><br> Once you have paid for it, please pick it up with Ina. <br><br> Prices semester ticket: <br> 6 months is 193.80 Euro. <br> for enrollment on August 1: 161.50 Euro <br> for enrollment on September 1: 129.20 Euro <br><br> Bank transfer: <br> CODE Education GmbH, IBAN DE43 1005 0000 0190 5692 63, BIC BELADEBEXXX <br><br> PayPal transfer: <br> billing@code.berlin (please identify the payment as “friends or family” to avoid fees)',                 -- Replace text between quotes with task description

    1,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    NULL,    -- Replace between quotes with actual date and time (in this format)
    'PayPal or bank transfer',                 -- or name of website, if "location" is online
    'www.paypal.com',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    TRUE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    TRUE, -- TRUE if task is mandatory, FALSE if task is optional

    FALSE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    FALSE, -- TRUE if it is recommended to bring a swimming suit
    FALSE, -- TRUE if this is a pet friendly activity / event

    0); -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.




INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, food)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Attend Factory on-boarding',                        -- Replace text between quotes with task name
    'Factory staff will give us an intro about what Factory is all about and give us a tour. We will be having croisants and pretzels!',                 -- Replace text between quotes with task description

    2,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    TIMESTAMP '2011-08-31 10:00:00',    -- 31.08.18, 10:00am Replace between quotes with actual date and time (in this format)
    'Factory Görlitzer Park',                 -- or name of website, if "location" is online
    'https://goo.gl/maps/WMjXshcAnCN2',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    TRUE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    TRUE, -- TRUE if task is mandatory, FALSE if task is optional

    FALSE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    FALSE, -- TRUE if it is recommended to bring a swimming suit
    FALSE, -- TRUE if this is a pet friendly activity / event

    0); -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.




INSERT INTO stepify.tasks (title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other,
    s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, food)

    /* EDIT THE THE FOLLOWING LINES FOR EACH TASK. DO NOT CHANGE THE ORDER OF THE LINES */
VALUES (
    'Make a password for your brand new email @code.berlin!',                        -- Replace text between quotes with task name
    'You will be using this email for everything C<>DE related. It will also come in handy when you need to use it at any institution that requires you to be a student.',                 -- Replace text between quotes with task description

    1,                                  -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    NULL,    -- Replace between quotes with actual date and time (YYYY-MM-DD hh:mm:ss)
    'code.berlin',                 -- or name of website, if "location" is online
    'www.google.com/code.berlin/',                  -- Either google maps url, or url to website

    /* Do not use quotes in the following lines */
    FALSE,  -- TRUE if this is a wiki activity, else FALSE
    FALSE, -- TRUE if this is a slack activity, else FALSE
    FALSE, -- TRUE if this is a calendar activity, else FALSE
    TRUE, -- TRUE if this activity, is related to neither wiki, slack, nor calendar, else FALSE

    TRUE,  -- TRUE if applicable to students enrolled in SE, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in ID, else FALSE
    TRUE,  -- TRUE if applicable to students enrolled in PM, else FALSE
    TRUE,  -- TRUE if applicable to students who have not yet decided, else FALSE

    TRUE, -- TRUE if task is mandatory, FALSE if task is optional

    FALSE, -- TRUE if this is an outdoor activity
    FALSE,  -- TRUE if this is a formal event/activity
    FALSE, -- TRUE if it is recommended to bring a swimming suit
    FALSE, -- TRUE if this is a pet friendly activity / event

    0); -- 0 if event offers no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.



