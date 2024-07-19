const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
};

const addTask = () => {
    if (taskInput.value === "") return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");

    const isEditMode = listItem.classList.contains("editMode");
    if (isEditMode) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
};

const deleteTask = function () {
    const listItem = this.parentNode;
    listItem.remove();
};

const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

[...incompleteTaskHolder.children].forEach(item => bindTaskEvents(item, taskCompleted));
[...completedTasksHolder.children].forEach(item => bindTaskEvents(item, taskIncomplete));
