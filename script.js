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
//-------------------------------------------------------------------
//submits our new task into our task storage array
addFormInput.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Enter':
            const task = listFactory(e.target.value);
            mylist.push(task);
            // newTask(task.name);
            
            addForm.classList.toggle('display-off');
            render()
    }
})
//-----------------------------------------------------------------


function render() {
    while (listContainer.firstChild) {//removes all tasks
        listContainer.removeChild(listContainer.firstChild)
    }
    
    for (let task of mylist) {//puts the tasks back inlcluding the new one added
        newTask(task.name)
    }

    const allCompleteBtns = document.querySelectorAll('.complete-button') //each task complete btn will remove selected dom element object in mylist, then renders it again
    allCompleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            for (let i = 0; i < mylist.length; i++) {
                if (mylist[i].name === e.target.parentElement.firstChild.value) {
                    mylist.splice(i, 1)
                    render();
                }
            }
            
        })
    })

    const editBtns = document.querySelectorAll('.edit-button')
        editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            expandedTask(e.target.nextSibling);
        })
    }) 

}

function expandedTask(taskName) {
    taskName.classList.toggle('display-off')
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
    const config = document.createElement('div');
    const configDesc = document.createElement('textarea');
    configDesc.setAttribute('placeholder', 'Description')
    const datePriorityContainer = document.createElement('div');
    const configDate = document.createElement('input');
    configDate.setAttribute('type', 'date')
    configDate.setAttribute('id', 'date');
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Do by: '
    dateLabel.setAttribute('for', 'date')
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: '
    priorityLabel.setAttribute('for', 'priority')
    const configPriority = document.createElement('select');
    configPriority.setAttribute('id', 'priority')
    const priorityUrgent = document.createElement('option');
    priorityUrgent.textContent = 'Urgent'
    const priorityHigh = document.createElement('option');
    priorityHigh.textContent = 'High'
    const priorityMedium = document.createElement('option');
    priorityMedium.textContent = 'Medium'
    const priorityLow = document.createElement('option');
    priorityLow.textContent = 'Low'


    




    listContainer.append(taskContainer)
    taskContainer.append(taskName, completeBtn, editBtn, config)
    taskContainer.classList.add('task')
    taskName.classList.add('task-name')
    completeBtn.classList.add('complete-button')
    editBtn.classList.add('edit-button')
    config.classList.add('config', 'display-off')
    config.append(configDesc, datePriorityContainer)
    datePriorityContainer.append(dateLabel, priorityLabel)
    datePriorityContainer.classList.add('date-priority-container')
    dateLabel.append(configDate);
    priorityLabel.append(configPriority);
    configPriority.append(priorityLow, priorityMedium, priorityHigh, priorityUrgent)

}

