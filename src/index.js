import { UserController, AdditionalFeatures } from "./Controllers";

document.addEventListener("DOMContentLoaded", () => {
    const userCon = new UserController();
    const addfeat = new AdditionalFeatures();
    userCon.populateUserProfile();
    addfeat.getImageFromInternet();
    
    document.getElementById("fibobtn").addEventListener("click", () => {
        addfeat.generateFibo(document.getElementById("fiboinput").value);
    })

    document.getElementById("imgnew").addEventListener("click",() => {
        addfeat.getImageFromInternet();
    })

    document.getElementById('editbtn').addEventListener("click", ()=> {
        document.getElementById("editmodal").classList.remove("hidden");
    })

    document.getElementById('closebtn').addEventListener("click", ()=>{
        document.getElementById("editmodal").classList.add("hidden")
    });

    document.getElementById("greetbtn").addEventListener("click", ()=>{
        userCon.trySettingGreeting()
    })
    document.getElementById('greetclose').addEventListener("click", ()=>{
        document.getElementById('greetingcard').classList.add("hidden");
    })

    const form = document.getElementById('editform');
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        userCon.tryeditingProfile(data);
    })
})