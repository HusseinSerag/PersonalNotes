import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://realtime-database-a358d-default-rtdb.europe-west1.firebasedatabase.app/"

}
const app = initializeApp(appSettings)
const database  = getDatabase(app)
const myRef = ref(database , "Items")
const addBtn = document.getElementById('add-button')
const inpEl = document.getElementById('input-field')
const ulEl = document.getElementById('ul')

addBtn.addEventListener('click',function(){
   let inputValue = inpEl.value
   push(myRef , inputValue)
   inpEl.value = ""

})
onValue(myRef , function(snapshot){
    ulEl.innerHTML = ""
    if(snapshot.exists())
    {
        let liArr = Object.entries(snapshot.val())
        
        for(let i = 0 ; i < liArr.length ; i++)
        {
            append(liArr[i])
        }

    }
    else
    {
        ulEl.textContent = "Nothing here ... yet"
    }
})

function append(liArr){
    let itemID = liArr[0]
            let  itemVal = liArr[1]
            let liEl = document.createElement('li')
            liEl.addEventListener('click',function(){
                let loc = ref(database , `Items/${itemID}`)
                remove(loc)
            })
            liEl.textContent = itemVal
            ulEl.append(liEl)
}


