let ideasMode;
let sectionForm;
let btnCloseForm;
let workPriority;
let containerUsername;
let userLogo;
let containerChangeName;
let tasksToDoContainer;
let progressBarToday;
let containerMenuNote;
let iconMenuNote;
let menuNote;
const levelAdvanced = 50;
const levelPro = 280;

function startTaskKeeper() {
    progressBarToday = document.querySelector(".ik__progress__bar__today");
    tasksToDoContainer = document.querySelector(".ik__task__to__do__container");
    containerChangeName = document.querySelector(".container__input__change__name");

    let formChageName = document.querySelector("#form__change__name");
    formChageName.addEventListener("submit", () => {
        const name = document.querySelector("#input__change__name").value;
        localStorage.setItem("username", name);
        deployChangeName();
    });

    const btnkeepnote = document.querySelector("#btn__keepnote");
    btnkeepnote.addEventListener("click", addNoteCloseForm);

    userLogo = document.querySelector(".ik__user__logo");
    userLogo.addEventListener("click", deployChangeName);

    containerUsername = document.querySelector(".ik__user__name__container");

    const btnTasks = document.querySelector("#ik__btn__tasks");
    btnTasks.addEventListener("click", () => {
        lastPrioritySearch = null;
        showNotes();
        console.log(lastPrioritySearch);
    });

    let btnNewNote = document.querySelector("#ik__btn__new__note");
    btnNewNote.addEventListener("click", deployNoteForm);

    ideasMode = document.querySelectorAll(".ik__note__priority");
    sectionForm = document.querySelector("#ik__section__note__form");

    btnCloseForm = document.querySelector("#ik__close__form");
    btnCloseForm.addEventListener("click", deployNoteForm);

    const btnResetTaskKeeper = document.querySelector(".ik__tools");
    btnResetTaskKeeper.addEventListener("click", resetTaskKeeper)

    generateUserName();
    updateUserLevel();
    startDataBase();
    updatePregressBarLevel();

}
window.addEventListener("load", startTaskKeeper);



function generateUserName() {
    if (localStorage.getItem("username")) {
        const userName = localStorage.getItem("username");
        containerUsername.innerHTML = "¡Hola " + userName + "!";
    } else {
        localStorage.setItem("username", "Usuario");
        containerUsername.innerHTML = "¡Hola Usuario!";
    }
}

function ifPriority(element) {
    let search;
    if (element === notePriority[0]) {
        search = "Alta";
    } else if (element === notePriority[1]) {
        search = "Media";
    } else if (element === notePriority[2]) {
        search = "Baja";
    }
    searchPriority(search);
    lastPrioritySearch = search;
    console.log(lastPrioritySearch);
}

function beforeShowNotes() {
    if (lastPrioritySearch === null) {
        showNotes();
    } else {
        lastSearch();
    }
}

function deployNoteForm() {
    if (sectionForm.classList.contains("deploy__form")) {
        sectionForm.classList.remove("deploy__form");
    } else {
        sectionForm.classList.add("deploy__form");
    }
}

function deployChangeName() {
    containerChangeName.classList.toggle("deploy__change__name");
}

function taskDoneCounter() {
    if (localStorage.getItem("taskDoneCounter")) {
        let tasksDone = parseInt(localStorage.getItem("taskDoneCounter"));
        tasksDone = tasksDone + 1;
        localStorage.setItem("taskDoneCounter", tasksDone);
    } else {
        localStorage.setItem("taskDoneCounter", "1");
    }
}

function tasksToDoCounterUp() {
    if (localStorage.getItem("tasksToDo")) {
        let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
        tasksToDo = tasksToDo + 1;
        localStorage.setItem("tasksToDo", tasksToDo);
    } else {
        localStorage.setItem("tasksToDo", "1");
    }
}

function tasksToDoCounterDown() {
    let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
    tasksToDo = tasksToDo - 1;
    localStorage.setItem("tasksToDo", tasksToDo);

    if (tasksToDo === 0) {
        localStorage.removeItem("tasksToDo");
        localStorage.removeItem("tasksToDoToday");
        localStorage.removeItem("Ideas-Key");
    }
}

function tasksToDoTodayCounter() {
    if (localStorage.getItem("tasksToDoToday")) {
        let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
        tasksToDoToday = tasksToDoToday + 1;
        localStorage.setItem("tasksToDoToday", tasksToDoToday);
    } else {
        localStorage.setItem("tasksToDoToday", "1");
    }
}

function tasksToDoTodayCounterDown() {
    let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
    tasksToDoToday = tasksToDoToday - 1;
    localStorage.setItem("tasksToDoToday", tasksToDoToday);
}

function updateProgressBarToday() {
    let progressBarh2 = document.querySelector(".ik__progress__bar__porcent");
    let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
    let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
    let porcentByTaks = 100 / tasksToDoToday;
    let restTasks = tasksToDoToday - tasksToDo;

    if (localStorage.getItem("tasksToDoToday")) {
        progressBarPorcent = Math.round(restTasks * 100 / tasksToDoToday);
    } else {
        progressBarPorcent = 0;
    }

    progressBarh2.innerHTML = progressBarPorcent + "%";
    progressBarToday.style.backgroundImage = `conic-gradient(#0089DC, ${restTasks * 100 / tasksToDoToday * 3.6}deg, var(--background-color-container) 0deg)`;
}

function priorityColors() {
    workPriority = document.querySelectorAll(".ik__p__priority");
    workPriority.forEach(function (element) {
        if (element.innerHTML === "Alta") {
            element.style.backgroundColor = "#f22f7033";
        } else if (element.innerHTML === "Media") {
            element.style.backgroundColor = "rgba(1, 255, 1, 0.3)";
            element.style.color = "rgba(1, 148, 1)";
        } else if (element.innerHTML === "Baja") {
            element.style.backgroundColor = "rgba(230, 255, 3, 0.3)";
            element.style.color = "rgb(250, 171, 0)";
        }
    });
}

function deployMenuNote() {
    menuNote = document.querySelectorAll(".ik__note__menu__container__button__image");
    containerMenuNote = document.querySelectorAll(".ik__note__menu__container");
    iconMenuNote = document.querySelectorAll(".ik__note__menu__image");

    iconMenuNote.forEach(function (element, position) {
        element.addEventListener("click", function () {
            menuNote[position].classList.toggle("deploy__note__menu");
            containerMenuNote[position].classList.toggle("deploy__container__note__menu");

        });
    });

    btnDeleteTask = document.querySelectorAll(".note__btn__delete");
}

function deleteTaskAddPonits(key) {
    deleteTask(key);
    tasksToDoCounterDown();
    updateProgressBarToday();
    taskDoneCounter();
    updateUserLevel();
    updatePregressBarLevel();
}

function beforeDeleteTask(key) {
    tasksToDoTodayCounterDown();
    tasksToDoCounterDown();
    deleteTask(key);
}

function addNoteCloseForm() {
    addNote();
    deployNoteForm();
    tasksToDoCounterUp();
    tasksToDoTodayCounter();
    updateProgressBarToday();
}

function updateUserLevel() {
    const levelContainer = document.querySelector(".ik__level__container");
    if (localStorage.getItem("taskDoneCounter")) {

        const taskDone = parseInt(localStorage.getItem("taskDoneCounter"));

        if (taskDone < levelAdvanced) {
            localStorage.setItem("UserLevel", "Amateur");
            levelContainer.innerHTML = '<img src="images/amateur__crown__image.webp">' +
                localStorage.getItem("UserLevel") +
                '<img src="images/amateur__crown__image.webp">';
        } else if (taskDone >= levelAdvanced && taskDone < levelPro) {
            localStorage.setItem("UserLevel", "Advanced");
            levelContainer.innerHTML = '<img src="images/advanced__crown__image.webp">' +
                localStorage.getItem("UserLevel") +
                '<img src="images/advanced__crown__image.webp">';
        } else if (taskDone >= levelPro) {
            localStorage.setItem("UserLevel", "Pro");
            levelContainer.innerHTML = '<img src="images/pro__crown__image.webp">' +
                localStorage.getItem("UserLevel") +
                '<img src="images/pro__crown__image.webp">';
        }
    } else {
        localStorage.setItem("UserLevel", "Amateur");
        levelContainer.innerHTML = '<img src="images/amateur__crown__image.webp">' +
            localStorage.getItem("UserLevel") +
            '<img src="images/amateur__crown__image.webp">';
    }

}

function updatePregressBarLevel() {
    const nextLevelH2 = document.querySelector(".ik__progress__bar__porcent__next__level");
    const nextLevelTextImage = document.querySelector(".ik__progress__bar__text__next__level");
    const progressBarNextLevel = document.querySelector(".ik__progress__bar__next__level");
    let missingPorcentage;

    if (localStorage.getItem("taskDoneCounter")) {
        const taskDone = parseInt(localStorage.getItem("taskDoneCounter"));
        if (taskDone < levelAdvanced) {
            missingPorcentage = Math.round(taskDone * 100 / levelAdvanced);
            nextLevelTextImage.innerHTML = '<img src="images/advanced__crown__image.webp" alt="">' +
                '<p>' + 'Advanced' + '</p>' +
                '<img src="images/advanced__crown__image.webp" alt="">';
        } else if (taskDone >= levelAdvanced && taskDone < levelPro) {
            missingPorcentage = Math.round(taskDone * 100 / levelPro);
            nextLevelTextImage.innerHTML = '<img src="images/pro__crown__image.webp" alt="">' +
                '<p>' + 'Pro' + '</p>' +
                '<img src="images/pro__crown__image.webp" alt="">';
        } else if (taskDone >= levelPro) {
            missingPorcentage = 100;
            nextLevelTextImage.innerHTML = '<img src="images/pro__crown__image.webp" alt="">' +
                '<p>' + 'Pro' + '</p>' +
                '<img src="images/pro__crown__image.webp" alt="">';
        }

        nextLevelH2.innerHTML = missingPorcentage + "%";
        progressBarNextLevel.style.backgroundImage = `conic-gradient(#0089DC, ${missingPorcentage * 3.6}deg, var(--background-color-container) 0deg)`;
    } else {
        nextLevelH2.innerHTML = 0 + "%";
        progressBarNextLevel.style.backgroundImage = `conic-gradient(#0089DC, 0deg, var(--background-color-container) 0deg)`;
        nextLevelTextImage.innerHTML = '<img src="images/advanced__crown__image.webp" alt="">' +
            '<p>' + 'Advanced' + '</p>' +
            '<img src="images/advanced__crown__image.webp" alt="">';
    }

}

function resetTaskKeeper(){
    if(confirm("¿Estás Seguro que desea reiniciar el programa desde cero?")){
        localStorage.clear();
        location.reload();
    }
}


// Data Base --------------------------------------------------------------



let db;
let boxNotes;
let notePriority;
let lastPrioritySearch = null;

function generateKey() {
    if (localStorage.getItem("Ideas-Key")) {
        let ideasKey = localStorage.getItem("Ideas-Key");
        ideasKey = parseInt(ideasKey) + 1;
        localStorage.setItem("Ideas-Key", ideasKey);
    } else {
        localStorage.setItem("Ideas-Key", 0);
    }
}

function startDataBase() {
    notePriority = document.querySelectorAll(".ik__note__priority");
    notePriority.forEach((element) => {
        element.addEventListener("click", () => { ifPriority(element); });
    });

    boxNotes = document.querySelector(".ik__section__notes__container__notes");
    const request = indexedDB.open("DataBase__Ideas__keeper");

    request.addEventListener("error", showError);
    request.addEventListener("success", start);
    request.addEventListener("upgradeneeded", createStorage);
}

function showError(event) {
    alert("Tenemos un ERROR: " + event.code + " / " + event.message);
}

function start(event) {
    db = event.target.result;
    showNotes();
    updateProgressBarToday();
    updatePregressBarLevel();
}

function createStorage(event) {
    const dataBase = event.target.result;
    const storageTask = dataBase.createObjectStore("Ideas-Keeper", { keyPath: "key" });

    storageTask.createIndex("LookForPriority", "priority", { unique: false });
}

function addNote() {
    generateKey();
    ideasKey = localStorage.getItem("Ideas-Key");
    const noteTitle = document.querySelector("#ik__input__title").value;
    const note = document.querySelector("#ik__note__area").value;
    const priority = document.querySelector("#ik__select__priority").value;

    const dbTransaction = db.transaction(["Ideas-Keeper"], "readwrite");
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");
    dbTransaction.addEventListener("complete", beforeShowNotes);

    const request = dbStorage.add({
        key: ideasKey,
        notetitle: noteTitle,
        note: note,
        priority: priority
    });

    document.querySelector("#ik__input__title").value = "";
    document.querySelector("#ik__note__area").value = "";
}



function showNotes() {

    boxNotes.innerHTML = "";
    const dbTransaction = db.transaction(["Ideas-Keeper"]);
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");
    const pointer = dbStorage.openCursor();
    pointer.addEventListener("success", (event) => {
        const pointer = event.target.result;
        if (pointer) {
            boxNotes.innerHTML += '<div class="ik__note__container">' +
                '<div class="ik__note__menu__container">' +
                '<div class="ik__note__menu__image">' +
                '<img src="images/note__menu__close__image.webp" alt="">' +
                '</div>' +

                '<div class="ik__note__menu__container__button__image">' +

                '<button class="note__btn__edit" onclick="selectTask(\'' + pointer.value.key + '\')">' + 'Editar' + '</button>' +
                '<button class="note__btn__delete" onclick="beforeDeleteTask(\'' + pointer.value.key + '\')">' + 'Eliminar' + '</button>' +
                '</div>' +
                '</div>' +

                '<div class="ik__container__title">' +
                pointer.value.notetitle +
                '</div>' +
                '<div class="ik__container__note">' +
                pointer.value.note +
                '</div>' +
                '<div class="ik__note__pririty__done__container">' +
                '<p class="ik__p__priority">' +
                pointer.value.priority +
                '</p>' +
                '<button class="ik__work__done" onclick="deleteTaskAddPonits(\'' + pointer.value.key + '\')">' + 'Terminado' + '</button>' +
                '</div>' +
                '</div>';
            pointer.continue();
            deployMenuNote();
        }
        priorityColors();
    });
}

function selectTask(key) {
    const dbTransaction = db.transaction(["Ideas-Keeper"], "readwrite");
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");
    const request = dbStorage.get(key);

    request.addEventListener("success", () => {
        deployNoteForm();
        document.querySelector("#ik__input__title").value = request.result.notetitle;
        document.querySelector("#ik__note__area").value = request.result.note;
    });

    const btnkeepnote = document.querySelector("#btn__keepnote");
    btnkeepnote.outerHTML = '<input type="button" id="btn__updatenote" value="Actualizar" class="ik__btn" onclick="updateTask(\'' + key + '\')">';
}

function updateTask(key) {
    ideasKey = key;
    const noteTitle = document.querySelector("#ik__input__title").value;
    const note = document.querySelector("#ik__note__area").value;
    const priority = document.querySelector("#ik__select__priority").value;

    const dbTransaction = db.transaction(["Ideas-Keeper"], "readwrite");
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");
    dbTransaction.addEventListener("complete", beforeShowNotes);
    const request = dbStorage.put({
        key: ideasKey,
        notetitle: noteTitle,
        note: note,
        priority: priority
    });

    document.querySelector("#ik__input__title").value = "";
    document.querySelector("#ik__note__area").value = "";

    const btnUpdatenote = document.querySelector("#btn__updatenote");
    btnUpdatenote.outerHTML = '<input type="button" id="btn__keepnote" value="Guardar" class="ik__btn" onclick="addNoteCloseForm()">';

    deployNoteForm();
}

function deleteTask(key) {
    const dbTransaction = db.transaction(["Ideas-Keeper"], "readwrite");
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");
    dbTransaction.addEventListener("complete", beforeShowNotes);

    const request = dbStorage.delete(key);
}

function searchPriority(search) {
    boxNotes.innerHTML = "";
    const dbTransaction = db.transaction(["Ideas-Keeper"]);
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");

    const dbIndex = dbStorage.index("LookForPriority");
    const dbRange = IDBKeyRange.only(search);
    const pointer = dbIndex.openCursor(dbRange);

    pointer.addEventListener("success", showSearch);
}

function lastSearch() {
    boxNotes.innerHTML = "";
    const dbTransaction = db.transaction(["Ideas-Keeper"]);
    const dbStorage = dbTransaction.objectStore("Ideas-Keeper");

    const dbIndex = dbStorage.index("LookForPriority");
    const dbRange = IDBKeyRange.only(lastPrioritySearch);
    const pointer = dbIndex.openCursor(dbRange);

    pointer.addEventListener("success", showSearch);
}

function showSearch(e) {
    const pointer = e.target.result;
    if (pointer) {
        boxNotes.innerHTML += '<div class="ik__note__container">' +
            '<div class="ik__note__menu__container">' +
            '<div class="ik__note__menu__image">' +
            '<img src="images/note__menu__close__image.webp" alt="">' +
            '</div>' +

            '<div class="ik__note__menu__container__button__image">' +

            '<button class="note__btn__edit" onclick="selectTask(\'' + pointer.value.key + '\')">' + 'Editar' + '</button>' +
            '<button class="note__btn__delete" onclick="beforeDeleteTask(\'' + pointer.value.key + '\')">' + 'Eliminar' + '</button>' +
            '</div>' +
            '</div>' +

            '<div class="ik__container__title">' +
            pointer.value.notetitle +
            '</div>' +
            '<div class="ik__container__note">' +
            pointer.value.note +
            '</div>' +
            '<div class="ik__note__pririty__done__container">' +
            '<p class="ik__p__priority">' +
            pointer.value.priority +
            '</p>' +
            '<button class="ik__work__done" onclick="deleteTaskAddPonits(\'' + pointer.value.key + '\')">' + 'Terminado' + '</button>' +
            '</div>' +
            '</div>';
        pointer.continue();
        deployMenuNote();
    }
    priorityColors();
}



