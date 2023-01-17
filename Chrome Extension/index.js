let myleads = []
const inputEL = document.getElementById("input-el")
const ulEL = document.getElementById("ul-el")
const inputBTN = document.getElementById("input-btn")
const tabBTN = document.getElementById("tab-btn")
const deleteBTN = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if (leadsFromLocalStorage) {
    myleads = leadsFromLocalStorage
    render(myleads)
}

inputBTN.addEventListener("click", function() {
    if (inputEL.value === "") {
        console.log("empty")
    } else {
        myleads.push(inputEL.value)
        inputEL.value = ''
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)

    }


})

deleteBTN.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    render(myleads)

})

tabBTN.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })


})

function render(leads) {

    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li>" + "<a href='' target='_blank'>" + myleads[i] + "</a>" + "</li>"
        // 
        listItems += `<li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>`
    }
    ulEL.innerHTML = listItems

}