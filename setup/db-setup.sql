CREATE TABLE stepify.users (
    id SERIAL NOT NULL,
    username VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    study_program VARCHAR(10),
    PRIMARY KEY (id));

CREATE TABLE stepify.logins (
    id SERIAL NOT NULL
    username VARCHAR(500)
    ip VARCHAR(40)
    PRIMARY KEY (id));

CREATE TABLE stepify.tasks (
    id SERIAL NOT NULL,
    title text NOT NULL,    -- Name of the task
    details text,           -- Some text paragraph containing description of task
    deadline_type SMALLINT, -- 0 if there is no deadline, 1 if ASAP, 2 if deadline is finite time.
    deadline TIMESTAMP,     -- If 2 above, This is the deadline or time of event. Will be used to calculate urgency, weather etc.
    location_text text,     -- Name of location, or name of site if online activity
    location_url text,      -- Url to location on maps, or url if online activity
    wiki bool,              -- TRUE if this is a wiki activity, else FALSE
    slack bool,             -- TRUE if this is a slack activity, else FALSE
    calendar bool,          -- TRUE if this is a calendar activity, else FALSE
    other bool,             -- TRUE if this is an activity, neither on wiki, slack, or calendar, else FALSE
    s_e bool,               -- TRUE if applicable to students enrolled in SE, else FALSE
    i_d bool,               -- TRUE if applicable to students enrolled in ID, else FALSE
    p_m bool,               -- TRUE if applicable to students enrolled in PM, else FALSE
    undecided bool,         -- TRUE if applicable to students who have not yet decided, else FALSE
    mandatory bool,         -- TRUE if task is mandatory, FALSE if task is optional
    outdoor bool,           -- TRUE if this is an outdoor activity
    formal bool,            -- TRUE if this is a formal event/activity
    swimming bool,          -- TRUE if it is recommended to bring a swimming suit
    pets bool,              -- TRUE if this is a pet friendly activity / event
    tech bool,              -- TRUE if this is a techie event / activity
    food SMALLINT,          -- 0 if event offeres no vegan or vegetarian options. 1 for vegetarian. 2 for vegan.
    PRIMARY KEY (id));

CREATE TABLE stepify.users_tasks (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion bool,
    PRIMARY KEY (id));

