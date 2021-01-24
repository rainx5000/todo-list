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

mylist = [] //my storage for tasks
//OPEN AND CLOSE FORM
addBtn.addEventListener('click', (e) => {
    addForm.classList.toggle('display-off')
    
})
addForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-form')) {
        addForm.classList.toggle('display-off')
    }
})
//OPEN AND CLOSE FORM

addFormInput.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Enter':
            console.log(e.target.value)
            addForm.classList.toggle('display-off')
    }
})

const listFactory = (name) => {
    name = name;
    description = '';
    dueDate =  '';
    priority =  1;
    return {name, description, dueDate, priority}
}

const test = listFactory('tommy')