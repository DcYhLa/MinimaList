document.addEventListener('DOMContentLoaded', function (){
  document.getElementById('add-task').addEventListener('click', addTaskFromInput);
  loadTasks();
  
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

const modeDropdown = document.getElementById('mode-dropdown');

const bodyElement = document.body;

let savedMode = localStorage.getItem('mode');

if (savedMode) {
  bodyElement.classList.add(savedMode);
}

modeDropdown.addEventListener('change', () => {
  bodyElement.classList.remove('light-mode', 'dark-mode', 'mango-mode', "midnight-mode", "sakura-mode", "dark-plus-mode", "neon-blue-mode");
  const selectedMode = modeDropdown.value;
  bodyElement.classList.add(selectedMode);
  localStorage.setItem('mode', selectedMode);
});

if (savedMode) {
  modeDropdown.value = Array.from(bodyElement.classList).includes(savedMode) ? savedMode : 'light-mode';
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

const noteTitleInput = document.getElementById('note-title');
const noteDescriptionInput = document.getElementById('note-description');
const createNoteButton = document.getElementById('create-note');
const notesList = document.querySelector('.notes-list');

let notes = localStorage.getItem('notes')? JSON.parse(localStorage.getItem('notes')) : [];
loadNotes();

function createNote() {
    if (noteTitleInput.value && noteDescriptionInput.value) {
        const newNote = {
            id: Date.now(),
            title: noteTitleInput.value,
            description: noteDescriptionInput.value
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        clearInputs();
    }
}

function loadNotes() {
  notesList.innerHTML = notes.map(note => `
      <div class="note-item">
          <h3>${note.title}</h3>
          <p>${note.description}</p>
          <div>
              <button class="delete-btn" data-id="${note.id}">Delete</button>
          </div>
      </div>
  `).join('');
}

function clearInputs() {
    noteTitleInput.value = '';
    noteDescriptionInput.value = '';
}

createNoteButton.addEventListener('click', createNote);
notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteNote(e.target.dataset.id);
    }
});

function deleteNote(id) {
    notes = notes.filter(note => note.id!== parseInt(id));
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}