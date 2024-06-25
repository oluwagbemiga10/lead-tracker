let myLeads = []
const inputLead = document.getElementById("input")
const saveBtn = document.getElementById("save")
const listShow = document.getElementById("list")
const delBtn = document.getElementById("del")
const tabBtn = document.getElementById("tab")


saveBtn.addEventListener( "click", function(){
    myLeads.push(inputLead.value)
    render(myLeads)
    inputLead.value = ""

    localStorage.setItem("myLead", JSON.stringify(myLeads))

})


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("tabLead",JSON.stringify(myLeads))
    render(myLeads)
})
})

delBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLead"))
if (leadsFromlocalStorage){
    myLeads = leadsFromlocalStorage
    render(myLeads)
}


function render(leads){ 
let listItems = ""
for (let i=0; i<leads.length; i++){
    listItems += `
                <li>
                    <a href='${leads[i]}' target='_blank'> 
                    ${leads[i]} 
                    </a>
                </li>
                `
}
listShow.innerHTML = listItems
}
