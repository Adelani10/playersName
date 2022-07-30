const alert = document.querySelector(".alert")
const cont = document.querySelector(".cont")
const contList = document.querySelector(".cont-list")
const clearBtn = document.querySelector(".clear-btn")
const input = document.querySelector(".input")
const form = document.querySelector(".form")
const submitBtn = document.querySelector(".submit-btn")

let editElement;
let editID = ""
let editflag = false

form.addEventListener("submit", mainFunction)
clearBtn.addEventListener("click", clearItems)
window.addEventListener("click", restoreItems)

function mainFunction(e){
    e.preventDefault()
    const id = new Date().getTime().toString()
    const value = input.value

    if(value && !editflag){
        const element = document.createElement("div")
        element.classList.add("item", "flex", "justify-between", "text-2xl", "pb-1")
        const attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="value text-whitesmoke">${value}</p>
                        <div class="btn-container space-x-3">
                            <button class="text-white inline-block edit-btn hover:text-sky-600">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete-btn inline-block text-red-500 hover:text-red-800">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>`
        const editBtn = element.querySelector(".edit-btn")
        const deleteBtn = element.querySelector(".delete-btn")
        editBtn.addEventListener("click", editItem)
        deleteBtn.addEventListener("click", deleteItem)


        contList.appendChild(element)
        cont.classList.add("show-container")
        displayAlert("Player added to list", "success")
        addToLocalStorage(id, value)
        setBackToDefault()

    }
    else if (value && editflag) {
        editElement.innerHTML = value
        displayAlert("Player name edited", "success")
        editLocalStorage(editID, value)
        setBackToDefault()

    }
    else{
        displayAlert('Please add a player', 'danger')
    }
}
function displayAlert (text, action){
    alert.textContent = text
    alert.classList.add(action)

    setTimeout(function displayAlert (){
    alert.textContent = ''
    alert.classList.remove(action)
}, 1000)
}

function setBackToDefault(){
    input.value = ''
    submitBtn.textContent = "Submit"
    editflag = false
    editID = ''
}

function clearItems(){
    if (contList.children.length > 0){
         document.querySelectorAll(".item").forEach(function(item){
            contList.removeChild(item)
        })
    }
    cont.classList.remove("show-container")
    displayAlert("Player list cleared", "danger")

    setBackToDefault()
    localStorage.removeItem('article')
}

function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement
    let dataID = item.dataset.id
    contList.removeChild(item)
    if(contList.children.length === 0){
        cont.classList.remove('show-container')
    }
    displayAlert("Player removed", "danger")
    setBackToDefault()
    removeFromLocalStorage(dataID)
}


function editItem(e){
    const item = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    submitBtn.textContent = 'Edit'

    editflag = true
    input.value = editElement.innerHTML
    editID = item.dataset.id
    
}

function addToLocalStorage(a, b){
    const stuff = {initial: a, final: b}
    let box = getBox()
    console.log(box)
    box.push(stuff)
    localStorage.setItem("article", JSON.stringify(box))
}

function editLocalStorage(a, b){
    let box = getBox()
    // console.log(box)
    box = box.map(function(item){
        if(item.initial === a){
            item.final = b
        }
        return item
    })
    localStorage.setItem("article", JSON.stringify(box))
}


function removeFromLocalStorage(a){
    let box = getBox()
    box = box.filter(function(item){
        if(item.initial !== a){
            return item
        }
    })
    localStorage.setItem("article", JSON.stringify(box))
}


function getBox(){
    return localStorage.getItem("article") ? JSON.parse(localStorage.getItem("article")) : []
}

function restoreItems(){
    let box = getBox()
    if (box.length > 0){
    box.forEach(function(item){
        ifValueEditFlag(item.initial, item.final)
    })
    }
}


function ifValueEditFlag(id, value){
    const element = document.createElement("div")
        element.classList.add("item", "flex", "justify-between", "text-2xl", "pb-1")
        const attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="value text-whitesmoke">${value}</p>
                        <div class="btn-container space-x-3">
                            <button class="text-white inline-block edit-btn hover:text-sky-600">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete-btn inline-block text-red-500 hover:text-red-800">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>`
        const editBtn = element.querySelector(".edit-btn")
        const deleteBtn = element.querySelector(".delete-btn")
        editBtn.addEventListener("click", editItem)
        deleteBtn.addEventListener("click", deleteItem)


        contList.appendChild(element)
}