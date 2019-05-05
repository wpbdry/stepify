--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: stepify; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA stepify;


ALTER SCHEMA stepify OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: logins; Type: TABLE; Schema: stepify; Owner: postgres
--

CREATE TABLE stepify.logins (
    id integer NOT NULL,
    username text,
    ip text
);


ALTER TABLE stepify.logins OWNER TO postgres;

--
-- Name: logins_id_seq; Type: SEQUENCE; Schema: stepify; Owner: postgres
--

CREATE SEQUENCE stepify.logins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stepify.logins_id_seq OWNER TO postgres;

--
-- Name: logins_id_seq; Type: SEQUENCE OWNED BY; Schema: stepify; Owner: postgres
--

ALTER SEQUENCE stepify.logins_id_seq OWNED BY stepify.logins.id;


--
-- Name: tasks; Type: TABLE; Schema: stepify; Owner: postgres
--

CREATE TABLE stepify.tasks (
    id integer NOT NULL,
    title text NOT NULL,
    details text,
    deadline_type smallint,
    deadline timestamp without time zone,
    location_text text,
    location_url text,
    wiki boolean,
    slack boolean,
    calendar boolean,
    other boolean,
    s_e boolean,
    i_d boolean,
    p_m boolean,
    undecided boolean,
    mandatory boolean,
    outdoor boolean,
    formal boolean,
    swimming boolean,
    pets boolean,
    tech boolean,
    food smallint,
    weather smallint
);


ALTER TABLE stepify.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: stepify; Owner: postgres
--

CREATE SEQUENCE stepify.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stepify.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: stepify; Owner: postgres
--

ALTER SEQUENCE stepify.tasks_id_seq OWNED BY stepify.tasks.id;


--
-- Name: users; Type: TABLE; Schema: stepify; Owner: postgres
--

CREATE TABLE stepify.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    study_program text
);


ALTER TABLE stepify.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: stepify; Owner: postgres
--

CREATE SEQUENCE stepify.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stepify.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: stepify; Owner: postgres
--

ALTER SEQUENCE stepify.users_id_seq OWNED BY stepify.users.id;


--
-- Name: users_tasks; Type: TABLE; Schema: stepify; Owner: postgres
--

CREATE TABLE stepify.users_tasks (
    id integer NOT NULL,
    user_id integer NOT NULL,
    task_id integer NOT NULL,
    completion boolean,
    completion_date timestamp without time zone
);


ALTER TABLE stepify.users_tasks OWNER TO postgres;

--
-- Name: users_tasks_id_seq; Type: SEQUENCE; Schema: stepify; Owner: postgres
--

CREATE SEQUENCE stepify.users_tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stepify.users_tasks_id_seq OWNER TO postgres;

--
-- Name: users_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: stepify; Owner: postgres
--

ALTER SEQUENCE stepify.users_tasks_id_seq OWNED BY stepify.users_tasks.id;


--
-- Name: logins id; Type: DEFAULT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.logins ALTER COLUMN id SET DEFAULT nextval('stepify.logins_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.tasks ALTER COLUMN id SET DEFAULT nextval('stepify.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.users ALTER COLUMN id SET DEFAULT nextval('stepify.users_id_seq'::regclass);


--
-- Name: users_tasks id; Type: DEFAULT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.users_tasks ALTER COLUMN id SET DEFAULT nextval('stepify.users_tasks_id_seq'::regclass);


--
-- Data for Name: logins; Type: TABLE DATA; Schema: stepify; Owner: postgres
--

COPY stepify.logins (id, username, ip) FROM stdin;
9	johannhemman	127.0.0.1
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: stepify; Owner: postgres
--

COPY stepify.tasks (id, title, details, deadline_type, deadline, location_text, location_url, wiki, slack, calendar, other, s_e, i_d, p_m, undecided, mandatory, outdoor, formal, swimming, pets, tech, food, weather) FROM stdin;
1	Attend OS Projects Fair	Check out what your fellow students have been up to for the last month!	1	2018-10-08 09:00:00	Factory Görlitzer Park	https://www.google.com/maps/place/Factory+Berlin+G%C3%B6rlitzer+Park/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0x2d5517bce86bdcdb!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	t	t	t	f	f	f	f	t	t	2	1
2	Check your google calendar to see your schedule for the transition week	The schedules for the transition week activities is out. Make sure you to see not only the CODE Events calendar but also the calendar for your personal guild!	1	2018-10-08 11:00:00	google.com/calendar	https://www.google.com/calendar	f	f	t	f	t	t	t	t	f	f	f	f	f	t	0	1
3	Check OS Teams for 2nd Term!	See what your role will be for the 2nd term of the OS semester and find out what your role will be!	1	2018-10-08 10:00:00	wiki.code.berlin	https://wiki.code.berlin/display/SG/Orientation+Semester+Groups+and+Roles	t	f	f	f	t	t	t	t	f	f	f	f	f	t	0	1
4	Have an Apfelschorle at the Stepify booth!	Come and serve yourself an Apfelschorle, enjoy!	0	2018-05-16 00:00:00	Factory Görlitzer Park	https://www.google.com/maps/place/Factory+Berlin+G%C3%B6rlitzer+Park/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0x2d5517bce86bdcdb!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	t	t	t	f	f	f	f	t	f	2	1
5	Attend 1st ID Guild	Attend your first ID guild and see what Interaction Design is all about!	1	2018-10-10 09:00:00	CODE University	https://www.google.com/maps/place/CODE+University+of+Applied+Sciences/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0xb3e68fc9c3f05cf0!8m2!3d52.4940223!4d13.446336	f	f	f	t	f	t	f	f	t	f	f	f	t	f	0	5
6	Blocker Interpersonal Skills Workshop	Continue developing your interpersonal skills with these workshops by Kathleen and Barb!	1	2018-10-11 09:00:00	CODE University	https://www.google.com/maps/place/CODE+University+of+Applied+Sciences/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0xb3e68fc9c3f05cf0!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	t	t	t	t	f	f	f	t	f	0	5
7	Nextgen Awards	Awards will be given to the best projects of the OS's first term!	1	2018-10-09 09:00:00	Code University	https://www.google.com/maps/place/Factory+Berlin+G%C3%B6rlitzer+Park/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0x2d5517bce86bdcdb!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	t	t	t	t	f	f	f	t	f	2	1
8	Attend 1st PM Guild	Attend your first PM guild and see what Product Management is all about!	1	2018-10-10 09:00:00	CODE University	https://www.google.com/maps/place/CODE+University+of+Applied+Sciences/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0xb3e68fc9c3f05cf0!8m2!3d52.4940223!4d13.446336	f	f	f	t	f	f	t	f	t	f	f	f	t	f	0	5
9	Attend 1st SE Guild	Attend your first SE guild and see what Software Engineering is all about!	1	2018-10-10 13:00:00	CODE University	https://www.google.com/maps/place/CODE+University+of+Applied+Sciences/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0xb3e68fc9c3f05cf0!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	f	f	f	t	f	f	f	t	f	0	5
10	Get better at Slack!	Take a few minutes to watch some videos and start your way to becoming a proficient Slack user. Besides the main resource (ink in location) you can check these videos out: <br><br>\n    <a href='https://www.youtube.com/watch?v=KMHg25-z6yg&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=4'>Learn More About Channels</a><br><br><a href='https://www.youtube.com/watch?v=JsX8V4hzENo&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=5'>Go a bit deeper into Slack I</a><br><br><a href='https://www.youtube.com/watch?v=cfkX8oTalDg&list=PLWlXaxtQ7fUb1WqLJDqJFGQsAXU7CjoGz&index=6'>Go a bit deeper into Slack II</a><br><br>	2	\N	Slack Tutorial	https://www.youtube.com/watch?v=dJmdHowChWk&t=9s	f	t	f	f	t	t	t	t	f	f	f	f	f	t	0	0
11	Visit Stepify Booth	You'll see some cool statistics about our onboarding days! Check out the working web app! We will also discuss the different use cases for the future of Stepify. We will be showing our video as well.	0	2018-05-16 00:00:00	Factory Görlitzer Park	https://www.google.com/maps/place/Factory+Berlin+G%C3%B6rlitzer+Park/@52.4940223,13.4441473,17z/data=!3m1!4b1!4m5!3m4!1s0x47a84facba49b593:0x2d5517bce86bdcdb!8m2!3d52.4940223!4d13.446336	f	f	f	t	t	t	t	t	f	f	f	f	t	t	2	1
12	Vacations!	You'll be visiting your family and friends in your home town! Or... stay in Berlin alongside other CODE students and have a great time! Enjoy!	1	2018-12-21 00:00:00	You tell me!	https://en.wikipedia.org/wiki/Vacation	f	f	f	t	t	t	t	t	t	t	f	t	t	f	0	5
13	Vintage Computing Festival	The Vintage Computing Festival Berlin (VCFB) is an event around historical computer and computing technology with exhibitions , lectures and workshops. The aim of the VCFB is to promote the preservation and maintenance of historical computers and other computing devices.<br><br>Check the website: <a href='https://vcfb.de/2018/index.html'>vcfb.de</a>	1	2018-10-13 10:00:00	German Museum of Technology	https://www.google.com/maps/place/German+Museum+of+Technology/@52.4986982,13.3756959,17z/data=!3m1!4b1!4m5!3m4!1s0x47a85032346a25bb:0x4435919b99126a78!8m2!3d52.4986982!4d13.3778846	f	f	f	t	t	t	t	t	f	f	f	f	f	t	0	5
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: stepify; Owner: postgres
--

COPY stepify.users (id, username, password, study_program) FROM stdin;
1	foo		p_m
2	jkh		s_e
3	Benjamin		s_e
4	k		s_e
5	Alejandro Tulia Camus ducshbag		p_m
6	William		s_e
7	7yh	1	i_d
8	matthias		p_m
9	johannhemman	123	s_e
\.


--
-- Data for Name: users_tasks; Type: TABLE DATA; Schema: stepify; Owner: postgres
--

COPY stepify.users_tasks (id, user_id, task_id, completion, completion_date) FROM stdin;
1	1	1	f	\N
2	1	2	f	\N
3	1	3	f	\N
4	1	4	f	\N
5	1	6	f	\N
6	1	7	f	\N
7	1	8	f	\N
8	1	10	f	\N
9	1	11	f	\N
10	1	12	f	\N
11	1	13	t	2018-11-13 23:29:34
12	2	1	f	\N
13	2	2	f	\N
14	2	3	f	\N
15	2	4	f	\N
16	2	6	f	\N
17	2	7	f	\N
18	2	9	f	\N
19	2	10	f	\N
20	2	11	f	\N
22	2	13	f	\N
21	2	12	t	2018-11-13 23:30:16
23	3	1	t	2018-11-15 20:50:06
29	3	9	t	2018-11-15 20:52:52
31	3	11	t	2018-11-15 20:53:01
25	3	3	t	2018-11-15 20:53:05
24	3	2	t	2018-11-15 20:53:30
26	3	4	t	2018-11-15 20:59:51
27	3	6	t	2018-11-15 20:59:52
28	3	7	t	2018-11-15 20:59:54
33	3	13	t	2018-11-15 20:59:56
32	3	12	t	2018-11-15 21:00:00
30	3	10	t	2018-11-15 21:00:04
34	4	1	f	\N
36	4	3	f	\N
37	4	4	f	\N
38	4	6	f	\N
39	4	7	f	\N
40	4	9	f	\N
41	4	10	f	\N
42	4	11	f	\N
43	4	12	f	\N
44	4	13	f	\N
35	4	2	t	2018-11-19 19:12:02
45	5	1	f	\N
47	5	3	f	\N
49	5	6	f	\N
50	5	7	f	\N
51	5	8	f	\N
52	5	10	f	\N
53	5	11	f	\N
54	5	12	f	\N
55	5	13	f	\N
46	5	2	t	2019-01-15 12:25:26
48	5	4	t	2019-01-15 12:34:17
56	6	1	f	\N
58	6	3	f	\N
59	6	4	f	\N
60	6	6	f	\N
62	6	9	f	\N
63	6	10	f	\N
64	6	11	f	\N
65	6	12	f	\N
66	6	13	f	\N
57	6	2	t	2019-01-15 13:45:43
61	6	7	t	2019-01-15 13:52:51
67	7	1	f	\N
68	7	2	f	\N
69	7	3	f	\N
70	7	4	f	\N
71	7	5	f	\N
73	7	7	f	\N
74	7	10	f	\N
75	7	11	f	\N
76	7	12	f	\N
77	7	13	f	\N
72	7	6	t	2019-01-15 14:02:53
78	8	1	f	\N
79	8	2	f	\N
80	8	3	f	\N
82	8	6	f	\N
83	8	7	f	\N
84	8	8	f	\N
85	8	10	f	\N
86	8	11	f	\N
87	8	12	f	\N
88	8	13	f	\N
81	8	4	t	2019-01-16 10:28:19
89	9	1	f	\N
91	9	3	f	\N
93	9	6	f	\N
94	9	7	f	\N
95	9	9	f	\N
96	9	10	f	\N
98	9	12	f	\N
92	9	4	t	2019-05-05 03:28:12
99	9	13	f	2019-05-05 03:28:24
97	9	11	t	2019-05-05 03:32:52
90	9	2	f	2019-05-05 03:32:54
\.


--
-- Name: logins_id_seq; Type: SEQUENCE SET; Schema: stepify; Owner: postgres
--

SELECT pg_catalog.setval('stepify.logins_id_seq', 9, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: stepify; Owner: postgres
--

SELECT pg_catalog.setval('stepify.tasks_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: stepify; Owner: postgres
--

SELECT pg_catalog.setval('stepify.users_id_seq', 9, true);


--
-- Name: users_tasks_id_seq; Type: SEQUENCE SET; Schema: stepify; Owner: postgres
--

SELECT pg_catalog.setval('stepify.users_tasks_id_seq', 99, true);


--
-- Name: logins logins_pkey; Type: CONSTRAINT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.logins
    ADD CONSTRAINT logins_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_tasks users_tasks_pkey; Type: CONSTRAINT; Schema: stepify; Owner: postgres
--

ALTER TABLE ONLY stepify.users_tasks
    ADD CONSTRAINT users_tasks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

