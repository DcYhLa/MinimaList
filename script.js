document.addEventListener('DOMContentLoaded', function (){
  document.getElementById('add-task').addEventListener('click', addTaskFromInput);
  loadTasks();
  loadMode();
  
  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetTabId = this.id.replace('tab-', 'tab-content-')
      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('active')
      })
      document.getElementById(targetTabId).classList.add('active')
      document.querySelectorAll('.tab').forEach(function (tab) {
        tab.classList.remove('active')
        this.classList.add('active')
      })
    })
  })

  generateGreeting();
})

function addTaskFromInput() {
  const taskValue = document.getElementById('new-task').value;
  if (taskValue) {
    addTask(taskValue);
    document.getElementById('new-task').value = ''
    saveTasks();
  }
}

function addTask(taskValue, isCompleted = false) {
  const ul = document.getElementById('task-list')
  const li = document.createElement('li')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = isCompleted
  checkbox.addEventListener('change', toggleTask)

  const text = document.createElement('span')
  text.textContent = taskValue
  text.style.textDecoration = isCompleted ? 'line-through' : 'none'

  const editButton = document.createElement('button')
  editButton.textContent = 'Edit'
  editButton.addEventListener('click', editTask)

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', deleteTask)

  li.appendChild(checkbox)
  li.appendChild(text)
  li.appendChild(editButton)
  li.appendChild(deleteButton)

  ul.appendChild(li)

  const task = {
    text: taskValue,
    isCompleted: false,
  }
}

function saveTasks() {
  const tasks = []
  document.querySelectorAll('#task-list li').forEach(function (taskLi) {
    const text = taskLi.querySelector('span').textContent
    const isCompleted = taskLi.querySelector('input').checked
    tasks.push({ text, isCompleted})
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach(function (task) {
    addTask(task.text, task.isCompleted)
  })
}

let sortOrder = 'asc';

function sortTasksAlphabetically() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(function (taskLi) {
    const text = taskLi.querySelector('span').textContent
    const isCompleted = taskLi.querySelector('input').checked
    tasks.push({ text, isCompleted, element: taskLi })
  })

  tasks.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.text.localeCompare(b.text)
    } else {
      return b.text.localeCompare(a.text)
    }
  })

  const taskList = document.getElementById('task-list')
  taskList.innerHTML = ''
  tasks.forEach(function (task) {
    taskList.appendChild(task.element)
  })

  saveTasks()
}

function toggleTask(event) {
  const text = event.target.nextElementSibling
  text.style.textDecoration = event.target.checked ? 'line-through' : 'none'
  saveTasks()
}

function deleteTask(event) {
  const li = event.target.parentNode
  li.parentNode.removeChild(li)
  saveTasks()
}

function editTask(event) {
  const textSpan = event.target.previousElementSibling
  const newText = prompt("Edit Your Task", textSpan.textContent)
  if (newText !== null) {
    textSpan.textContent = newText
    saveTasks()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadMode()
  
  const toggleButton = document.getElementById('dark-mode-toggle')
  
  toggleButton.addEventListener('click', function () {
    const bodyElement = document.body
    bodyElement.classList.toggle('dark-mode')
    const mode = bodyElement.classList.contains('dark-mode')
    saveMode(mode)
  })
})

function loadMode() {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}

function saveMode(mode) {
  localStorage.setItem('darkMode', mode)
}

const tabs = document.querySelectorAll(".tab_btn")
const all_content = document.querySelectorAll(".content")

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(tab => { tab.classList.remove("active") })
    tab.classList.add('active')

    const line = document.querySelector('.line')
    line.style.width = e.target.offsetWidth + "px"
    line.style.left = e.target.offsetLeft + "px"

    all_content.forEach(content => { content.classList.remove('active') })
    all_content[index].classList.add('active')
  })
})

let inputTextArea = document.getElementById("input-textarea");
let characCount = document.getElementById("charac-count");
let wordCount = document.getElementById("word-count");

inputTextArea.addEventListener("input", () => {
  characCount.textContent = inputTextArea.value.length;
  let txt = inputTextArea.value.trim();
  wordCount.textContent = txt.split(/\s+/).filter((item) => item).length;
});

function generateGreeting() {
  const now = moment();

  const amOrPm = now.hour() < 12 ? "Morning" : "Afternoon";

  const greeting = `Good ${amOrPm}!`;

  document.getElementById("greeting").textContent = greeting;
}
