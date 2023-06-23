# Task Manager API Documentation

The Task Manager API allows you to manage tasks by performing various operations such as retrieving, creating, updating, and deleting tasks.

## Endpoints

### GET /tasks

Retrieve all tasks.

This endpoint retrieves a list of all tasks in the system.

#### Query Parameters

- `sortBy` (optional): Use the `sortBy` query parameter to sort the tasks based on their creation time. You can provide the value as either "ASC" (ascending order) or "DESC" (descending order).
- `completion` (optional): Use the `completion` query parameter to filter the tasks based on their completion status. You can provide the value as either "true" or "false" to retrieve completed or incomplete tasks, respectively.

### GET /tasks/:id

Retrieve a single task by its ID.

This endpoint retrieves a specific task by its unique ID.

#### Path Parameters

- `id`: The ID of the task to retrieve.

### POST /tasks

Create a new task.

This endpoint allows you to create a new task.

#### Request Body

- `title`: The title or name of the task (required).
- `description`: The description or details of the task (optional).
- `completion`: The completion status of the task (optional).

### PUT /tasks/:id

Update an existing task by its ID.

This endpoint allows you to update an existing task.

#### Path Parameters

- `id`: The ID of the task to update.

#### Request Body

- `title` (optional): The updated title or name of the task.
- `description` (optional): The updated description or details of the task.
- `completion` (optional): The updated completion status of the task.

### DELETE /tasks/:id

Delete a task by its ID.

This endpoint allows you to delete a specific task by its ID.

#### Path Parameters

- `id`: The ID of the task to delete.

---

Feel free to reach out if you have any further questions or need additional assistance with the Task Manager API.
