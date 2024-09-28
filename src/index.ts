const formTask = document.querySelector('.form') as HTMLFormElement
const btn = document.querySelector('.btn') as HTMLButtonElement
const textInput = document.querySelector('.task') as HTMLInputElement
const tasksList = document.querySelector('.list') as HTMLUListElement
const clearBtn = document.querySelector('.clear-btn') as HTMLButtonElement

type Task = {
  id: number
  text: string
  isCompleted: boolean
}
textInput.addEventListener('change', () => {
  textInput.textContent = textInput.value
})
let tasks: Task[] = getItemFromLocalStorage()
function getItemFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem('tasks')

  return tasks ? JSON.parse(tasks) : []
}
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('tasks')
  tasksList.innerHTML = ''
  clearBtn.classList.remove('show')
})
btn.addEventListener('click', (event) => {
  event.preventDefault()
  if (!textInput.value) {
    alert('please enter some value')
    return
  }
  const task: Task = {
    text: textInput.value,
    isCompleted: false,
    id: new Date().getTime(),
  }
  tasks.push(task)
  textInput.value = ''
  addTasks(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
})
const addTasks = (task: Task): void => {
  clearBtn?.classList.add('show')
  const taskContainer = document.createElement('li')
  const textElement = document.createElement('h3')
  textElement.textContent = task.text
  if (task.isCompleted) {
    textElement.style.textDecoration = 'line-through'
  }
  const container = document.createElement('article')

  const isCompletedElement = document.createElement('input')
  const deleteBtn = document.createElement('button')
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
  deleteBtn.type = 'button'
  isCompletedElement.type = 'checkbox'
  isCompletedElement.checked = task.isCompleted
  tasksList.appendChild(taskContainer)
  taskContainer.appendChild(textElement)
  taskContainer.appendChild(container)
  container.appendChild(isCompletedElement)
  container.appendChild(deleteBtn)
  isCompletedElement.addEventListener('click', () => {
    setCompleted(task)
  })
  deleteBtn.addEventListener('click', () => deleteTask(task))
}
function renderTask(tasks: Task[]) {
  tasks.map((task) => {
    addTasks(task)
  })
}
function setCompleted(completedTask: Task) {
  const getCompletedTask: Task[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') as string)
    : []
  const updatedTasks = getCompletedTask.map((task) => {
    if (task.id === completedTask.id) task.isCompleted = !task.isCompleted
    return task
  })

  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  tasksList.innerHTML = ''
  renderTask(updatedTasks)
}
function deleteTask(deletedTask: Task) {
  const getTasks: Task[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') as string)
    : []
  const updatedTasks = getTasks.filter((task) => task.id !== deletedTask.id)
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  tasks = updatedTasks
  tasksList.innerHTML = ''
  renderTask(updatedTasks)
  if (tasks.length === 0) {
    clearBtn?.classList.remove('show')
  }
}

renderTask(tasks)
