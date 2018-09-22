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
    task_name text NOT NULL,
    task_details text,
    task_category SMALLINT,
    task_date TIMESTAMP,
    task_place VARCHAR(500),
    task_url VARCHAR(500),
    s_e bool,
    i_d bool,
    p_m bool,
    undecided bool,
    PRIMARY KEY (id));

CREATE TABLE stepify.users_tasks (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion bool,
    PRIMARY KEY (id));

