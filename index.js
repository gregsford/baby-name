import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://baby-name-6d2a2-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const namesListInDB = ref(database, "names")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const namesListEl = document.getElementById("names")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(namesListInDB, inputValue)

    clearInputFieldEl()
})

onValue(namesListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearNamesListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToNamesListEl(currentItem)
        }
    } else {
        namesListEl.innerHTML = "No names yet."
    }
})

function clearNamesListEl() {
    namesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToNamesListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    // newEl.addEventListener("click", function () {
    //     let exactLocationOfItemInDB = ref(database, `namesList/${itemID}`)

    //     remove(exactLocationOfItemInDB)
    // })

    namesListEl.append(newEl)
}