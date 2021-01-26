// document.body.addEventListener('click', (e) => console.dir(e.target))

const addBtn = document.querySelector('.add');
const addForm = document.querySelector('.add-form');
const addFormInput = document.querySelector('.add-form-input')
const listContainer = document.querySelector('.list')
const controlsDisplay = document.querySelector('.controls-display')


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
           newTaskCreation(); 
    }
})
//-----------------------------------------------------------------
let select = 'all';
let mylist = []; 

let mylistStorage = []; //my storage for tasks

const cases = ['1', '2', '3', '4']
let num;
controlsDisplay.addEventListener('click', (e) => {
    num = e.target.value
    switch (num) {
        case num:
            mylist = [];
            mylistStorage.filter(task => {if(task.priority == num) mylist.push(task)})
            select = num;  
            render();


            break;
        case 'all':
            select = 'all'
            render();
            break;
    }
})

//-----------------------------------------------------------------


function render() {
    while (listContainer.firstChild) {//refreshes the tasks with the updateTaskd storage array
        listContainer.removeChild(listContainer.firstChild)
    }
    
    if (select === 'all') mylist = mylistStorage;

    for (let task of mylist) {//puts the tasks back inlcluding the new one added
        newTask(task.name, task.description, task.dueDate, task.priority)
    }
    const tasks = document.querySelectorAll('.task')
        tasks.forEach((task, index) => {
            task.dataset.task = index.toString();
    });

    const allCompleteBtns = document.querySelectorAll('.complete-button') //each task complete btn will remove selected dom element object in mylist, then renders it again
    allCompleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
                if (index == (tasks[index].dataset.task)) {
                    mylist.splice(index, 1)
                    render();
                }
        })
    })

    const editBtns = document.querySelectorAll('.edit-button')
        editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            expandedTask(e.target.nextSibling);
        })
    }) 
    const notes = document.querySelectorAll('.notes')
    notes.forEach((txt, index) => {
        updateTask(txt, index, 'description');
    }) 
    const dates = document.querySelectorAll('.dates')
    dates.forEach((date, index) => {
        updateTask(date, index, 'dueDate');
    }) 
    const priority = document.querySelectorAll('.priority')
    priority.forEach((lvl, index) => {
        updateTask(lvl, index, 'priority')
        for (let option of lvl.children) {
            if (option.value === lvl.value) {
                option.setAttribute('selected', 'selected')
            } else {
                option.removeAttribute('selected');
            }
        }
    }) 
    function updateTask(el, index, prop) {
        el.addEventListener('input', (e) => {
                if (index == (tasks[index].dataset.task)) {
                    mylist[index][prop] = e.target.value;  
            }
        })
    }
}

function expandedTask(taskName) {
    taskName.classList.toggle('display-off')
}


function newTaskCreation() {
    for (let task of mylist) {
        if (task.name === addFormInput.value) {
         addFormInput.value = '';
         addForm.classList.toggle('display-off');
         return;
        }
     }
     const task = listFactory(addFormInput.value);
     mylistStorage.push(task);
     addFormInput.value = ''; //resets the new task input value
     
     addForm.classList.toggle('display-off');
     render()
}



const listFactory = (name) => { //new task object creator
    name = name;
    description = '';
    dueDate =  '';
    priority =  1;
    return {name, description, dueDate, priority}
}


function newTask(name, desc, date, priority) {
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
    configDesc.value = desc;
    const datePriorityContainer = document.createElement('div');
    const configDate = document.createElement('input');
    configDate.setAttribute('type', 'date')
    configDate.setAttribute('id', 'date');
    configDate.value = date;
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Do by: '
    dateLabel.setAttribute('for', 'date')
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: '
    priorityLabel.setAttribute('for', 'priority')
    const configPriority = document.createElement('select');
    configPriority.setAttribute('id', 'priority')
    configPriority.value = priority;
    const priorityUrgent = document.createElement('option');
    priorityUrgent.textContent = 'Urgent'
    priorityUrgent.value = 4;
    const priorityHigh = document.createElement('option');
    priorityHigh.textContent = 'High'
    priorityHigh.value = '3';
    const priorityMedium = document.createElement('option');
    priorityMedium.textContent = 'Medium'
    priorityMedium.value = 2;
    const priorityLow = document.createElement('option');
    priorityLow.textContent = 'Low'
    priorityLow.value = 1;
    const priorityList = [priorityUrgent, priorityHigh, priorityMedium, priorityLow]
    for (let lvl of priorityList) {
        if(priority == lvl.value) lvl.setAttribute('selected', 'selected')  
    }
        
    listContainer.append(taskContainer)
    taskContainer.append(taskName, completeBtn, editBtn, config)
    taskContainer.classList.add('task')
    taskName.classList.add('task-name')
    completeBtn.classList.add('complete-button')
    editBtn.classList.add('edit-button')
    config.classList.add('config', 'display-off')
    config.append(configDesc, datePriorityContainer)
    configDesc.classList.add('notes');
    datePriorityContainer.append(dateLabel, priorityLabel)
    datePriorityContainer.classList.add('date-priority-container')
    dateLabel.append(configDate);
    configDate.classList.add('dates')
    priorityLabel.append(configPriority);
    configPriority.classList.add('priority')
    configPriority.append(priorityLow, priorityMedium, priorityHigh, priorityUrgent)

}

