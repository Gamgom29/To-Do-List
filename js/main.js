/// <reference types="../@types/jquery" />
let tasksBox = document.querySelector('.tasks');
let taskInput = document.querySelector('#taskInput');
let addBtn = document.querySelector('.task-btn');
let tasks = [];
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
getFromStorage();
let anchor = document.querySelectorAll('a');
class Task {
    title ;
    id;
    completed = false;
    constructor(t , i ){
        this.title=t;
        this.id = i;
    }
};
for(let i = 0 ; i < anchor.length ; i++){
    anchor[0].addEventListener('click' , (e)=>{
        e.preventDefault();
    });
}

addBtn.onclick=function(){
    if(taskInput.value != ""){
        addTasks(taskInput.value);
        taskInput.value = '';
    }
};
function addTasks(taskName){
    let task =new Task(taskName , Date.now());
    tasks.push(task);
    console.log(tasks);
    displayTasks(tasks);
}
function displayTasks(tasks){
    tasksBox.innerHTML = ""
    let cartona = ``;
    for (let i = 0; i < tasks.length; i++) {
        cartona+= `
        <div class="task d-flex justify-content-between align-items-center">
                    <div id = "task-title${i}" task-id = "${tasks[i].id}" class="text-center tsk-t">${tasks[i].title}</div>
                    <div class="task-icons">
                        <a><i class="fa-solid fa-check check-icon me-3"></i></a> 
                        <a><i class="fa-solid fa-delete-left del-icon ms-1"></i></a>
                    </div>
                    
                </div>
        `;
        
    }
    tasksBox.innerHTML = cartona;
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].completed){
            document.querySelector(`#task-title${i}`).classList.add('completed');
        }
    }
    $('.check-icon').on('click' , function(e){
        taskStateToggle($(e.target).parentsUntil('.tasks').eq(2).children('.tsk-t').attr('task-id'));
    });
    $('.del-icon').on('click',function(e){
        delTask($(e.target).parentsUntil('.tasks').eq(2).children('.tsk-t').attr('task-id'))
    })
    addToStorage(tasks);
};
function addToStorage(tasks){
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}
function getFromStorage (){
    let data = localStorage.getItem('tasks' );
    if(data){
        tasks = JSON.parse(data);
        displayTasks(tasks);
    }
}
function delTask(taskId){
    tasks=tasks.filter((task) =>task.id != taskId);
    displayTasks(tasks);
    addToStorage(tasks);
}
function taskStateToggle (taskId){
    for(let i = 0 ; i<tasks.length ; i++){
        if(tasks[i].id == taskId){
            tasks[i].completed == false ? tasks[i].completed = true : tasks[i].completed = false;
        }
    }
    displayTasks(tasks);
    addToStorage(tasks);
}