
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