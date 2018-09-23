SELECT stepify.tasks.id, stepify.tasks.task_name, stepify.tasks.task_details
    FROM stepify.tasks
    JOIN stepify.users_tasks
        ON stepify.users_tasks.task_id = stepify.tasks.id
    WHERE stepify.users_tasks.user_id = %s
        AND stepify.users_tasks.completion = FALSE;
