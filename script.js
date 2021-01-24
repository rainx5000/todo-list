//importance levels Urgent(4), High(3), Medium(2), Low(1)
//importance from highest to lowest
//important from lowest to highest
//display: all, urgent, high, medium, low 
document.body.addEventListener('click', (e) => console.dir(e.target))

//When I add a new todo list -- I only write in the name of the task
//take the name of the new task, and run it through a factory function
//the factory function gives the new todolist an option to change it's date/priority/disc
//and other stuff

//the new object will be stored into an array,

//we will use the array to create our list, based on its order (hl - priority levels 
//can be sorted)
const addBtn = document.querySelector('.add');
const addForm = document.querySelector('.add-form');
const addFormInput = document.querySelector('.add-form-input')
const listContainer = document.querySelector('.list')

mylist = [] //my storage for tasks
//OPEN AND CLOSE FORM
addBtn.addEventListener('click', (e) => {
    addForm.classList.toggle('display-off')
    
})
addForm.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('add-form')) {
        addForm.classList.toggle('display-off')
    }
})
//OPEN AND CLOSE FORM
//submits our new task into our task storage array
addFormInput.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Enter':
            const task = listFactory(e.target.value);
            mylist.push(task);
            render();
            addForm.classList.toggle('display-off');
    }
})
//---------------------------------------------------------
function render() {
    mylist.filter(task => {
        let match = [];
        const allTasks = listContainer.children
        for (let i = 0; i < allTasks.length; i++) {
            if (task.name === allTasks[i].firstElementChild.value) {
                match.push(task.name)
            }
        }
        if (match.length === 0) {
            newTask(task.name);
        } 
    })
}


const listFactory = (name) => { //new task object creator
    name = name;
    description = '';
    dueDate =  '';
    priority =  1;
    return {name, description, dueDate, priority}
}


function newTask(name) {
    const taskContainer = document.createElement('div');
    const taskName = document.createElement('input');
    taskName.value = name;
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '&#9745'
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit'


    listContainer.append(taskContainer)
    taskContainer.append(taskName, completeBtn, editBtn)
    taskContainer.classList.add('task')
    completeBtn.classList.add('complete-button')

}

