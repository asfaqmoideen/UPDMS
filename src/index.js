import { UserController, AdditionalFeatures } from "./Controllers";

document.addEventListener("DOMContentLoaded", () => {
    const userCon = new UserController();
    const addfeat = new AdditionalFeatures();
    userCon.populateUsersTable();
    addfeat.getImageFromInternet();

    document.getElementById("fiboform").addEventListener("submit", (e) => {
        e.preventDefault();
        addfeat.generateFibo(document.getElementById("fiboinput").value);
    })

    document.getElementById("imgnew").addEventListener("click",() => {
        addfeat.getImageFromInternet();
    })

    document.getElementById('editbtn').addEventListener("click", ()=> {
        userCon.userUI.showModal(true, 'editmodal')
    })

    document.getElementById('closebtn').addEventListener("click", ()=>{
        userCon.userUI.showModal(false, 'editmodal')
    });
    document.getElementById('addclosebtn').addEventListener("click", ()=>{
        userCon.userUI.showModal(false, 'addmodal')
    });

    document.getElementById("greetbtn").addEventListener("click", ()=>{
        userCon.trySettingGreeting()
    })
    document.getElementById('greetclose').addEventListener("click", ()=>{
        userCon.userUI.showModal(false, 'greetingcard');
    })
    
    document.getElementById('addbtn').addEventListener('click', ()=>{
        userCon.userUI.showModal(true, 'addmodal');        
    })

    const eform = document.getElementById('editform');
    eform.addEventListener('submit', (event)=> {
        event.preventDefault();
        const formData = new FormData(eform);
        const data = Object.fromEntries(formData.entries());
        const hasValue = Object.values(data).some(value => value.trim() !== "");

        if (!hasValue) { 
            userCon.userUI.updateEditErrorMessage('Please enter at least one value');
            return;
        }
        userCon.tryeditingProfile(data);
        userCon.populateUsersTable();
        userCon.userUI.showModal(false, 'editmodal')
    })

    const addform = document.getElementById("addform");
    addform.addEventListener("submit", (event)=>{
        event.preventDefault();
        const formData = new FormData(addform);
        const enteredData = Object.fromEntries(formData.entries());
        userCon.tryAddingUser(enteredData);
        userCon.populateUsersTable();
        userCon.userUI.showModal(false, 'addmodal')
    })

})
// 