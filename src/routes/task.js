const taskRoutes = require("express").Router();
const { v4: uuid } = require("uuid");
const taskInfo = require("../data/taskInfo");
const bodyParser = require("body-parser");
const Validator = require("../helper/validation");
const path = require("path");
const fs = require("fs");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  const { completion, sortBy } = req.query;
  let dataToDisplay = taskInfo.tasks;

  // filter based on completion status
  if ((completion && completion === "true") || completion === "false") {
    dataToDisplay = dataToDisplay.filter(
      (t) => t.completion.toString() === completion
    );
  }
  // sort based on creation date
  if (sortBy) {
    dataToDisplay.sort((a, b) => {
      if (sortBy === "ASC")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else if (sortBy === "DESC")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else return 0;
    });
  }
  res.status(200);
  res.send(
    dataToDisplay.length
      ? dataToDisplay
      : "<h3>No task found please add a task</h3>"
  );
});

taskRoutes.get("/:id", (req, res) => {
  res.status(200);
  res.send(
    task.length ? task : "<h3>No task with id " + req.params.id + " found</h3>"
  );
});

taskRoutes.post("/", (req, res) => {
  const taskDetails = req.body;
  // validate title, description and completion
  if (Validator.validTaskInfo(taskDetails)) {
    const writePath = path.join(__dirname, "../data", "taskInfo.json");
    const newTasks = [...taskInfo.tasks];
    const { title, description, completion } = taskDetails;
    newTasks.push({
      id: uuid(),
      title,
      description,
      completion,
      createdAt: new Date(),
    });
    fs.writeFileSync(writePath, JSON.stringify({ tasks: newTasks }), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("<h3>Task created successfully</h3>");
  } else {
    res
      .status(404)
      .send(
        "<h3>title(string), description(string) && completion(boolean) is required</h3>"
      );
  }
});

taskRoutes.put("/:id", (req, res) => {
  const taskDetails = req.body;
  const { id } = req.params;
  // validate title, description and completion
  if (Validator.validTaskInfo(taskDetails)) {
    const writePath = path.join(__dirname, "../data", "taskInfo.json");
    const newTasks = [...taskInfo.tasks];
    const taskIndex = newTasks.findIndex((task) => task.id === id);

    // return 404 for invalid task id
    if (taskIndex === -1) {
      res.status(404).send("<h3>Invalid task Id</h3>");
      return;
    }
    const { title, description, completion } = taskDetails;
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      title,
      description,
      completion,
    };

    fs.writeFileSync(writePath, JSON.stringify({ tasks: newTasks }), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("<h3>Task updated successfully</h3>");
  } else {
    res
      .status(404)
      .send(
        "<h3>title(string), description(string) && completion(boolean) is required</h3>"
      );
  }
});

taskRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = taskInfo.tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    const writePath = path.join(__dirname, "../data", "taskInfo.json");
    const newTasks = taskInfo.tasks.filter((task) => task.id !== id);
    fs.writeFileSync(writePath, JSON.stringify({ tasks: newTasks }), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("<h3>Task deleted successfully</h3>");
  } else {
    // return 404 for invalid task id
    res.status(404).send("<h3>Invalid task Id</h3>");
  }
});

module.exports = taskRoutes;
