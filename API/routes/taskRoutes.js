const express = require("express");
const router = express.Router();

let tasks = [];
let currentId = 0;

router.post("/tarefas", (req, res) => {
  const { description, status } = req.body;

  if (!description || !status) {
    return res
      .status(400)
      .json({ message: "Descrição e status são obrigatórios." });
  }

  const newTask = { id: currentId++, description, status };
  tasks.push(newTask);

  res.status(201).json({
    message: "Tarefa adicionada com sucesso!",
    task: newTask,
  });
});

router.get("/tarefas", (req, res) => {
  if (tasks.length === 0) {
    return res.status(404).json({ message: "Nenhuma tarefa encontrada." });
  }
  res.status(200).json(tasks);
});

router.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  if (!description || !status) {
    return res
      .status(400)
      .json({ message: "Descrição e status são obrigatórios." });
  }

  tasks[taskIndex] = { id: parseInt(id), description, status };

  res.status(200).json({
    message: "Tarefa atualizada com sucesso!",
    task: tasks[taskIndex],
  });
});

router.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({
    message: "Tarefa deletada com sucesso.",
  });
});

module.exports = router;
