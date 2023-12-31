const containerMain = document.getElementById("decisions-container")
let editableId;
let editableIndex
//Fetching Data
async function fetchData() {
    try {
        const response = await fetch('https://658fb508cbf74b575eca100a.mockapi.io/simpencil/comments');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data)
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
    }
}
fetchData();
//Displayin data
const displayData = (data) => {
    const tickContianer = document.getElementById("tickContianer")
    let innerData = data.map((x, index) => (
        ` <div class="w-100 ms-2  mb-3 p-1 bg-light-dark d-flex rounded selected" id="apiData">
    <div class="d-flex ps-2 align-items-center w-75">
        <img src="Assets/menu.png"   class="" style="width: 40px;" alt="">
        <div class="ms-4 pt-2">
            <div style="font-size: 12px;width :max-content " class="text-dark fw-bold mt-1 px-2 editableName " contenteditable="true" id="editedName" onclick="setId(${x.id},${index})">${x.name}</div>
            <p style="font-size: 11px;" class="mt-auto px-2 editableText" contenteditable="true" id="editedText" onclick="setId(${x.id},${index})">${x.description}</p>
        </div>
    </div>
    <div class="d-flex ps-5 align-items-center w-50">
        <button type="button" class="btn btn-primary hovering  rounded-5 ms-4 me-2 buttonsToChange " style="margin-left: 15px;width: 170px;" id="decisionBtn" onclick="addButtonChangeId(${index})">Take Decision</button>
        <img src="Assets/delete.png" class="ms-auto me-3" onclick="deleteData(${x.id})"   alt="">
    </div>
</div>
    `
    )).join(" ")

    let innerTick = data.map(x => (
        `<div class="childContainer bg-darker p-1 mb-3 rounded-circle mt-3">
    <img src="Assets/done.png" alt="" style="color:white"></div>`
    )).join(" ")
    containerMain.innerHTML = innerData
    tickContianer.innerHTML = innerTick
}


// Function to open the model box
function openFormInAlert() {
    document.getElementById('overlay1').style.display = 'flex';
}

// Function to close the model box
function closeFormInAlert() {
    document.getElementById('overlay1').style.display = 'none';
}
async function submitData() {
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    if (name !== "" && description !== "") {
        const formData = { name, description }
        const response = await fetch('https://658fb508cbf74b575eca100a.mockapi.io/simpencil/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
    }
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    fetchData();
}
//To delete a data
function deleteData(id) {
    fetch(`https://658fb508cbf74b575eca100a.mockapi.io/simpencil/comments/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fetchData();
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// for updating data
function setId(id,index) {
    editableId = id
    editableIndex= index
 }
async function updateDate() {
    const name = document.getElementsByClassName("editableName")[editableIndex].innerText
    const description = document.getElementsByClassName("editableText")[editableIndex].innerText
    if (name === "" & description === "") return
    const formData = { name, description }
    try {
        const response = await fetch(`https://658fb508cbf74b575eca100a.mockapi.io/simpencil/comments/${editableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        fetchData()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//////////////Buttons to change
const parentDiv = document.getElementById("parentDiv")
const childrenElements = parentDiv.children
let textELement = document.getElementById("textChange")
textELement.addEventListener('input', () => {

    for (let element of childrenElements) {
        if (textELement.value == "") {
            element.innerText = "Download"
        } else {
            element.innerText = `${textELement.value}`
        }
    }
})
const fontStyle = document.getElementById("font-style")
fontStyle.addEventListener('change', () => {
    for (let element of childrenElements) {
        element.style.fontFamily = `${fontStyle.value}`
    }
})
const fontSize = document.getElementById("font-size")
fontSize.addEventListener('input', changeFontSize)
fontSize.addEventListener('change', changeFontSize)
function changeFontSize() {
    for (let element of childrenElements) {
        if (fontSize.value == "") {
            element.style.fontSize = '15px'
        } else if (fontSize.value < 20 && fontSize.value > 8) {
            element.style.fontSize = `${fontSize.value}px`
        }
    }

}

const buttoncolor = document.getElementById("btnColor")
buttoncolor.addEventListener('change', () => {

    if (buttoncolor.value == "") {
        childrenElements[0].style.backgroundColor = 'rgb(242, 118, 47)'
        childrenElements[2].style.backgroundColor = 'rgb(242, 118, 47)'
        childrenElements[1].style.border = ' 2px solid rgb(242, 118, 47)'
        childrenElements[3].style.border = ' 2px solid rgb(242, 118, 47)'
        childrenElements[4].style.color = ' rgb(242, 118, 47)'
        childrenElements[5].style.color = '  rgb(242, 118, 47)'
    } else {
        childrenElements[0].style.backgroundColor = `${buttoncolor.value}`
        childrenElements[2].style.backgroundColor = `${buttoncolor.value}`
        childrenElements[4].style.color = `${buttoncolor.value}`
        childrenElements[5].style.color = `${buttoncolor.value}`
        childrenElements[1].style.border = `2px solid ${buttoncolor.value}`
        childrenElements[3].style.border = `2px solid ${buttoncolor.value}`
        childrenElements[1].style.color = `${buttoncolor.value}`
        childrenElements[3].style.color = `${buttoncolor.value}`
    }
})
const hovercolor = document.getElementById("hoverColor")
let boxshodowColor
hovercolor.addEventListener('change', () => {
    for (let element of childrenElements) {
        if (hovercolor.value != "") {
            element.addEventListener('mouseover', () => {
                element.style.boxShadow = `2px 2px 2px   ${hovercolor.value}`
                boxshodowColor = `2px 2px 2px   ${hovercolor.value}`
            })
            element.addEventListener('mouseout', () => {
                element.style.boxShadow = ``
            })
        }
    }
})
let buttonChangeId = null
function addButtonChangeId(id) {
    if (buttonChangeId === id) {
        buttonChangeId = null
    }
    else buttonChangeId = id
}
let buttonToChange = document.getElementsByClassName("buttonsToChange")

for (let element of childrenElements) {
    element.addEventListener('click', () => {
        if (buttonChangeId === null) return
        else {
            let styles = window.getComputedStyle(element);
            buttonToChange[buttonChangeId].innerText = `${element.innerText}`
            buttonToChange[buttonChangeId].style.backgroundColor = `${styles.backgroundColor}`
            buttonToChange[buttonChangeId].style.border = `${styles.border}`
            buttonToChange[buttonChangeId].style.color = `${styles.color}`
            buttonToChange[buttonChangeId].style.borderRadius = `${styles.borderRadius}`
            buttonToChange[buttonChangeId].style.fontSize = `${styles.fontSize}`
            buttonToChange[buttonChangeId].addEventListener('mouseover', () => {
                buttonToChange[buttonChangeId].style.boxShadow = boxshodowColor

            })
            buttonToChange[buttonChangeId].addEventListener('mouseout', () => {
                buttonToChange[buttonChangeId].style.boxShadow = ``
            })

        }

    })
}