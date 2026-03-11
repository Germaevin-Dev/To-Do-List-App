document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()


    if(text){
        tasks.push({text:text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text

    tasks.splice(index,1)
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () =>{
    const completeTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = totalTasks ? (completeTasks/totalTasks)*100 : 0
    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks) {
        blaskConfetti();
    }
};

const updateTaskList = ()=> {
  const taskList = document.getElementById("task-list"); 
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="taskItem">
         <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
            <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="editTask(${index})" />
                <img src="./img/bin.png" onclick="deleteTask(${index})"/>
            </div>
    </div>
    `;

    listItem.addEventListener("change", ()=> toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});

const blaskConfetti = ()=> {
    confetti("tsparticles", {
  /**
   * @deprecated use count property instead
   */
  particleCount: 50,
  /**
   * @deprecated use position property instead
   */
  origin: {
    x: 0.5,
    y: 0.5,
  },
  //------------------------------------------
  angle: 90,
  count: 50,
  position: {
    x: 50,
    y: 50,
  },
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ["#ffffff", "#ff0000"],
  shapes: ["square", "circle"],
  scalar: 1,
  zIndex: 100,
  disableForReducedMotion: true,
});
};