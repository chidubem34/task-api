const express = require('express');
const uuid = require('uuid');
const server = express();
const port = 3000;
const morgan = require("morgan")
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(morgan("dev"))

let tasks = [];

server.get("/tasks", (req, res)=> {
    res.send(tasks)
})

server.post("/task", (req, res) => {
    const taskDetails = req.body
    const id  = uuid.v4()

    tasks.push({
        id,
        title: taskDetails.title,
        body: taskDetails.body,
        status: taskDetails.status
    })

    res.send("Task successfully added")
})

server.get("/task/:id", (req, res) => {
        const taskId = req.params.id;
        const taskDetails = tasks.find(task => taskId == taskId);
        res.send(taskDetails)
})

server.put("/task/:id", (req, res) => {
    const updatedTaskDetails = req.body;
    const taskId = req.params.id;
    for(let i = 0; i < tasks.length; i++ ){
        if(tasks[i].id == taskId){
            tasks[i].title = updatedTaskDetails.title
            tasks[i].body = updatedTaskDetails.body
            tasks[i].status = updatedTaskDetails.status
        }

        res.send("Task updated successfully");
    }
})


server.delete("/task/:id", (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id != taskId)
    res.send("Task deleted successfully")
})




server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
