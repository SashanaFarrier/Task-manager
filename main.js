const getStartedBtn = document.querySelector(".get-started-btn");
const goBackBtn = document.querySelector(".go-back-btn ");
const dropdownMenu = document.querySelector(".dropdown-menu");
const hero = document.querySelector(".hero");

getStartedBtn.addEventListener("click", function () {
  dropdownMenu.classList.remove("hidden");
  dropdownMenu.classList.toggle("translateX");
  dropdownMenu.style.height = "100%";
  getStartedBtn.classList.add("hidden");
  goBackBtn.classList.remove("hidden");
  hero.classList.add("hidden");
});

goBackBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("translateX");
  dropdownMenu.style.height = "0px";
  getStartedBtn.classList.remove("hidden");
  goBackBtn.classList.add("hidden");
  hero.classList.remove("hidden");
});

const addTaskBtn = document.querySelector(".add-task-btn");

const saveBtn = document.querySelector(".save-btn");
const tasksContainer = document.querySelectorAll(".task");

const importantFlag = document.querySelector(".important");

const dueSoonFlag = document.querySelector(".due");

let isImportant = false;
let isDueSoon = false;
let isCompleted = false;

let generalTaskContainer =
  JSON.parse(localStorage.getItem("general-tasks")) || [];

let importantTaskContainer =
  JSON.parse(localStorage.getItem("important-tasks")) || [];

let dueTaskContainer = JSON.parse(localStorage.getItem("due-tasks")) || [];

let completedTaskContainer =
  JSON.parse(localStorage.getItem("completed-tasks")) || [];

addTask();
flaggedAsImportant();
flaggedAsDueSoon();
generalTasks();
importantTasks();
completedTasks();
dueTasks();

deleteItem();
completed();

function generalTasks() {
  if (generalTaskContainer.length > 0) {
    const taskItemsContainer = document.querySelector(".task-list-general");
    const taskListDiv = taskItemsContainer.querySelector(".task-list-div");

    generalTaskContainer.map((item) => {
      const { task, id } = item;
      const content = document.createElement("div");
      content.classList.add("content");
      content.setAttribute("id", id);
      const taskInputBtn = document.createElement("input");
      taskInputBtn.setAttribute("type", "text");
      taskInputBtn.setAttribute("readonly", "readonly");
      taskInputBtn.value = task;

      const btnsDiv = document.createElement("div");
      btnsDiv.className = "btns";
      btnsDiv.innerHTML = `<button class="check-btn">&#10003;</button>
      <button class="delete-btn">&#10005;</button>`;
      content.append(taskInputBtn, btnsDiv);
      taskListDiv.append(content);
    });
  }
}

function importantTasks() {
  if (importantTaskContainer.length > 0) {
    console.log(importantTaskContainer);
    const taskItemsContainer = document.querySelector(".task-list-important");
    const taskListDiv = taskItemsContainer.querySelector(".task-list-div");

    importantTaskContainer.map((item) => {
      const { task, id } = item;

      const content = document.createElement("div");
      content.classList.add("content");

      content.setAttribute("id", id);
      const taskInputBtn = document.createElement("input");
      taskInputBtn.setAttribute("type", "text");
      taskInputBtn.setAttribute("readonly", "readonly");
      taskInputBtn.value = task;

      const btnsDiv = document.createElement("div");
      btnsDiv.className = "btns";
      btnsDiv.innerHTML = `<button class="check-btn">&#10003;</button>
      <button class="delete-btn">&#10005;</button>`;
      content.append(taskInputBtn, btnsDiv);
      taskListDiv.append(content);
    });
  }
}

function dueTasks() {
  if (dueTaskContainer.length > 0) {
    const taskItemsContainer = document.querySelector(".task-list-due");
    const taskListDiv = taskItemsContainer.querySelector(".task-list-div");

    dueTaskContainer.map((item) => {
      const { task, id } = item;
      const content = document.createElement("div");
      content.classList.add("content");
      content.setAttribute("id", id);
      const taskInputBtn = document.createElement("input");
      taskInputBtn.setAttribute("type", "text");
      taskInputBtn.setAttribute("readonly", "readonly");
      taskInputBtn.value = task;

      const btnsDiv = document.createElement("div");
      btnsDiv.className = "btns";
      btnsDiv.innerHTML = `<button class="check-btn">&#10003;</button>
      <button class="delete-btn">&#10005;</button>`;
      content.append(taskInputBtn, btnsDiv);
      taskListDiv.append(content);
    });
  }
}

function completedTasks() {
  if (completedTaskContainer.length > 0) {
    const taskItemsContainer = document.querySelector(".task-list-completed");
    const taskListDiv = taskItemsContainer.querySelector(".task-list-div");

    completedTaskContainer.map((item) => {
      const { task, id } = item;
      const content = document.createElement("div");
      content.classList.add("content");
      content.setAttribute("id", id);
      const taskInputBtn = document.createElement("input");
      taskInputBtn.setAttribute("type", "text");
      taskInputBtn.setAttribute("readonly", "readonly");
      taskInputBtn.value = task;

      const btn = document.createElement("button");

      btn.innerHTML = `
      <button class="delete-btn">&#10005;</button>`;
      content.append(taskInputBtn, btn);
      taskListDiv.append(content);
    });
  }
}

function addTask() {
  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    importantFlag.style.backgroundColor = "rgb(9, 61, 91)";
    dueSoonFlag.style.backgroundColor = "rgb(9, 61, 91)";
    importantFlag.classList.remove("disabled");
    dueSoonFlag.classList.remove("disabled");
    if (addTaskBtn.value !== "") {
      if (isDueSoon) {
        HTML(".task-list-due");
        const dueTasksContainer = document.querySelector(".task-list-due");
        const htmlEl =
          dueTasksContainer.querySelector(".task-list-div").lastElementChild;

        const task = htmlEl.querySelector("input").value;
        const id = htmlEl.getAttribute("id");
        dueTaskContainer.push({ task, id });

        localStorage.setItem("due-tasks", JSON.stringify(dueTaskContainer));
      } else if (isImportant) {
        HTML(".task-list-important");
        const importantTasksContainer = document.querySelector(
          ".task-list-important"
        );
        const htmlEl =
          importantTasksContainer.querySelector(
            ".task-list-div"
          ).lastElementChild;

        const task = htmlEl.querySelector("input").value;

        const id = htmlEl.getAttribute("id");

        importantTaskContainer.push({ task, id });

        localStorage.setItem(
          "important-tasks",
          JSON.stringify(importantTaskContainer)
        );
      } else {
        HTML(".task-list-general");
        const generalTasksContainer =
          document.querySelector(".task-list-general");
        const htmlEl =
          generalTasksContainer.querySelector(
            ".task-list-div"
          ).lastElementChild;

        const task = htmlEl.querySelector("input").value;
        const id = htmlEl.getAttribute("id");
        generalTaskContainer.push({ task, id });

        localStorage.setItem(
          "general-tasks",
          JSON.stringify(generalTaskContainer)
        );
      }
    }

    addTaskBtn.value = "";
    isImportant = false;
    isDueSoon = false;
  });
}

function HTML(item) {
  const taskItemsContainer = document.querySelector(item);
  const taskListDiv = taskItemsContainer.querySelector(".task-list-div");
  const content = document.createElement("div");
  content.classList.add("content");
  content.setAttribute("id", crypto.randomUUID());
  const taskInputBtn = document.createElement("input");
  taskInputBtn.setAttribute("type", "text");
  taskInputBtn.setAttribute("readonly", "readonly");
  taskInputBtn.value = addTaskBtn.value;

  const btnsDiv = document.createElement("div");
  btnsDiv.className = "btns";
  btnsDiv.innerHTML = `<button class="check-btn">&#10003;</button>
      <button class="delete-btn">&#10005;</button>`;
  content.append(taskInputBtn, btnsDiv);
  taskListDiv.append(content);

  // console.log(taskItemsContainer);
}

function flaggedAsImportant() {
  importantFlag.addEventListener("click", () => {
    isImportant = !isImportant;

    if (isImportant) {
      importantFlag.style.backgroundColor = "green";
      dueSoonFlag.classList.add("disabled");
    } else {
      importantFlag.style.backgroundColor = "rgb(9, 61, 91)";
      dueSoonFlag.classList.remove("disabled");
    }
  });

  // isImportant = false;
}

function flaggedAsDueSoon() {
  dueSoonFlag.addEventListener("click", () => {
    isDueSoon = !isDueSoon;
    if (isDueSoon) {
      dueSoonFlag.style.backgroundColor = "green";
      importantFlag.classList.add("disabled");
    } else {
      dueSoonFlag.style.backgroundColor = "rgb(9, 61, 91)";
      importantFlag.classList.remove("disabled");
    }
  });
}

function deleteItem() {
  tasksContainer.forEach((container) => {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const deleteBtn = e.target;

        if (
          deleteBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-general")
        ) {
          const id = deleteBtn.closest(".content").getAttribute("id");
          deleteBtn.closest(".content").remove();
          const updatedGeneralTaskContainer = generalTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "general-tasks",
            JSON.stringify(updatedGeneralTaskContainer)
          );
          generalTaskContainer =
            JSON.parse(localStorage.getItem("general-tasks")) || [];
        } else if (
          deleteBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-important")
        ) {
          const id = deleteBtn.closest(".content").getAttribute("id");
          console.log(id);
          deleteBtn.closest(".content").remove();
          const updatedImportantTaskContainer = importantTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "important-tasks",
            JSON.stringify(updatedImportantTaskContainer)
          );
          importantTaskContainer =
            JSON.parse(localStorage.getItem("important-tasks")) || [];
        } else if (
          deleteBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-due")
        ) {
          const id = deleteBtn.closest(".content").getAttribute("id");

          deleteBtn.closest(".content").remove();
          const updatedDueTaskContainer = dueTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "due-tasks",
            JSON.stringify(updatedDueTaskContainer)
          );
          dueTaskContainer =
            JSON.parse(localStorage.getItem("due-tasks")) || [];
        } else if (
          deleteBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-completed")
        ) {
          const id = deleteBtn.closest(".content").getAttribute("id");
          deleteBtn.closest(".content").remove();
          const updatedCompletedTaskContainer = completedTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "completed-tasks",
            JSON.stringify(updatedCompletedTaskContainer)
          );
          completedTaskContainer =
            JSON.parse(localStorage.getItem("completed-tasks")) || [];
        }
      }
    });
  });
}

function completed() {
  tasksContainer.forEach((container) => {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("check-btn")) {
        const checkBtn = e.target;
        console.log(checkBtn.closest(".content"));
        const htmlEl = checkBtn.closest(".content");
        console.log(
          checkBtn.parentElement.parentElement.closest(".task-list-div")
        );
        const taskCompletedContainer = document.querySelector(
          ".task-list-completed"
        );
        const task = htmlEl.querySelector("input").value;
        const id = htmlEl.getAttribute("id");
        completedTaskContainer.push({ task, id });

        localStorage.setItem(
          "completed-tasks",
          JSON.stringify(completedTaskContainer)
        );

        if (
          checkBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-general")
        ) {
          const taskListDiv =
            taskCompletedContainer.querySelector(".task-list-div");
          taskListDiv.append(htmlEl);
          const checkBtn = taskCompletedContainer.querySelector(".check-btn");
          // const editBtn = taskCompletedContainer.querySelector(".edit-btn");
          checkBtn.classList.add("hidden");
          // editBtn.classList.add("hidden");

          const updatedGeneralTaskContainer = generalTaskContainer.filter(
            (item) => item.id !== id
          );
          console.log(updatedGeneralTaskContainer, id);
          localStorage.setItem(
            "general-tasks",
            JSON.stringify(updatedGeneralTaskContainer)
          );
          generalTaskContainer =
            JSON.parse(localStorage.getItem("general-tasks")) || [];
        } else if (
          checkBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-important")
        ) {
          const taskListDiv =
            taskCompletedContainer.querySelector(".task-list-div");
          taskListDiv.append(htmlEl);
          const checkBtn = taskCompletedContainer.querySelector(".check-btn");
          checkBtn.classList.add("hidden");

          const updatedImportantTaskContainer = importantTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "important-tasks",
            JSON.stringify(updatedImportantTaskContainer)
          );
          importantTaskContainer =
            JSON.parse(localStorage.getItem("important-tasks")) || [];
        } else if (
          checkBtn.parentElement.parentElement
            .closest(".task-list-div")
            .parentElement.classList.contains("task-list-due")
        ) {
          const taskListDiv =
            taskCompletedContainer.querySelector(".task-list-div");
          taskListDiv.append(htmlEl);
          const checkBtn = taskCompletedContainer.querySelector(".check-btn");
          checkBtn.classList.add("hidden");

          const updatedDueTaskContainer = dueTaskContainer.filter(
            (item) => item.id !== id
          );
          localStorage.setItem(
            "due-tasks",
            JSON.stringify(updatedDueTaskContainer)
          );
          dueTaskContainer =
            JSON.parse(localStorage.getItem("due-tasks")) || [];
        }
      }
    });
  });
}
