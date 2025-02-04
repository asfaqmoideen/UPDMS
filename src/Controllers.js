import { users, emailList } from "./data";
    export class UserController{
        constructor(){
            this.userUI = new UIController(this);
            this.userId = 1;
        }

        populateUsersTable(){
            this.userUI.setUsersTable(users);
        }
        addUser(user){
            users.set(user.id, user);
        }

        tryeditingProfile({firstName,lastName,age,city,street,zipcode}){
            const user = users.get(this.userId);
            const nestedObject = {
                id : this.userId,
                firstName : firstName || user.firstName,
                lastName : lastName || user.lastName,
                age : age || user.age,
                city : city || user.city,
                address :{
                    street : street || user.address.street,
                    zipcode : zipcode || user.address.zipcode
                }
            };

            users.set(this.userId, nestedObject);

            this.userUI.showToast(`User ${firstName} Updated Successfully`)
        }
        
        trySettingGreeting(userId){
            this.userUI.setGreeting(users.get(userId));
        }

        tryAddingUser({firstName,lastName,age,city,street,zipcode}){
            this.addUser({id : users.size+1 ,firstName : firstName,
                lastName : lastName,
                age : age,
                city : city,
                address :{
                    street : street ,
                    zipcode : zipcode 
                }})
           this.userUI.resetContextForAddUser();
           this.userUI.setUsersTable();
           this.userUI.showToast("User Added Successfully");
        }

        async tryRemovingUser(userId){
            this.userUI.userConfirm(`delete ${users.get(userId).firstName} ?`)
            .then(result =>{
                if(result){
                    users.delete(userId);
                    this.userUI.updateTableBody();
                    this.userUI.showToast(`User Deleted Successfully`)
                }
            })
            .catch(error =>{
                this.userUI.showToast(error);
            })
        }
    }
    
    class UIController{
        constructor(userCon){
            this.tableHeadings = [{id : "ID"}, {firstName : "First Name"}, {lastName : "Last Name"}, {age : "Age"}, {city : "City"}, {address : "Address"} , {action: "Actions"}]
            this.userCon = userCon
        }


    resetContextForAddUser(){
        document.getElementById("profile-submit").textContent = "Edit Profile";
    }

    setProfileValues(user){
        const { id, firstName, lastName, age, city, address: { street, zipcode } } = user;
        const userArray = [firstName, lastName, age, city, street, zipcode];

        const profile = document.querySelectorAll(".profilegrp span");
        profile.forEach((span, index) => {
            span.textContent = userArray[index];
        });
    }

    setFiboOutput(result){
        const outputdiv = document.getElementById("fibooutput");
        outputdiv.textContent = "";
        outputdiv.textContent = result.toString();  
    }

    setImage(img){
        document.getElementById("imageid").src = img;
    }

    setGreeting(user){
        this.showModal(true, 'greetingcard')
        document.getElementById("greetingmessage").innerHTML = this.generategreetMessage(user)
    }

    generategreetMessage(user){
        return `
        Hello, this is ${user.firstName} ${user.lastName}, <br>
        from ${user.address.street}, ${user.city}.`
    }

    setUsersTable(){
        this.setTableHeadings();
        this.updateTableBody();
    }

    userConfirm(context){
        this.showModal(true, 'confirmmodal');
        document.getElementById("confirmspan").textContent = context;
        return new Promise((resolve, reject) => {
                document.getElementById("yesbtn").addEventListener('click', ()=>{
                this.showModal(false,'confirmmodal');
                resolve(true);
            })
            document.getElementById("nobtn").addEventListener("click",()=>{
                this.showModal(false,'confirmmodal');
                reject("User Cancelled Operation");
            })
        });
    }
    setTableHeadings(){
        const tablehead = document.querySelector("#usersTable thead");
        tablehead.classList.remove("hidden");
        tablehead.textContent = "";
        this.tableHeadings.forEach((heading) => {
            const td = document.createElement("td");
            td.textContent = Object.values(heading);
            tablehead.appendChild(td);
        });
    }

    updateTableBody(){

        const tbody = document.querySelector("#usersTable tbody");

        if(users.size == 0){
            document.querySelector("#usersTable thead").classList.add("hidden");
            tbody.textContent = "No users were added Yet";
            return;
        }

        tbody.textContent = "";
        users.forEach((value, key) =>{
            const row = document.createElement("tr");

            for(let innerKey in value){
                const td = document.createElement('td');
                if(typeof value[innerKey] === "object"){
                    td.textContent = this.getToString(value[innerKey]);
                }
                else{
                td.textContent = value[innerKey];
                }
                row.appendChild(td);
            }

            row.appendChild(this.createActionCell(key));
            tbody.appendChild(row);
        })

    }
    
    getToString(object){
        return Object.values(object).join(", ");
    }

    createActionCell(key){
        const actions = document.createElement("div");
        actions.className = "actioncell";
        actions.appendChild(this.createEditButton(key));
        actions.appendChild(this.createRemoveButton(key));
        actions.appendChild(this.createGreetingButton(key));
        return actions;
    }
    createEditButton(userId){
        const span = document.createElement("span");
        span.classList.add( "btnspan","fa-solid","fa-user-pen"); 
        span.title = "Update this User Profile"
        span.addEventListener('click', ()=>{
            this.showModal(true, 'editmodal');
            this.userCon.userId = userId;
            this.updateTableBody();
        });
        return span;
    }

    createGreetingButton(userId){
        const span = document.createElement("span");
        span.classList.add( "btnspan","fa-solid","fa-handshake");
        span.title = "Get Customised Greeting Message"
        span.addEventListener('click', ()=>{
            this.userCon.trySettingGreeting(userId)
        });
        return span;
    }
    createRemoveButton(userId){
        const span = document.createElement("span");
        span.classList.add( "btnspan","fa-solid","fa-trash");
        span.title = "Remove this User"
        span.addEventListener('click',async ()=>{
            await this.userCon.tryRemovingUser(userId)
        });
        return span;
    }

    showModal(show, id){
        const modal = document.getElementById(id);
        const bg = document.getElementById("bg-modal");
        if(show){
            bg.classList.remove("hidden");
            modal.classList.remove("hidden");
        }
        else{
            modal.classList.add("hidden");
            bg.classList.add("hidden");
        }
    }

    updateEditErrorMessage(message){
        document.getElementById("editerror").textContent = message;
    }

    showToast(message) {

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
    
        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

export class AdditionalFeatures{
    constructor(){
        this.ui = new UIController();
        this.generator = this.imgGenerator(); 
    }

    generateFibo(n) {
        const fibo = [...this.fibonacci(n)]; 
        const x = fibo.join(", ");
    
        this.ui.setFiboOutput(x);
    }
    
    *fibonacci(n) {
        let a = 0, b = 1;
        for (let i = 0; i < n; i++) { 
            yield a;
            [a, b] = [b, a + b]; 
        }
    }
    
    async *imgGenerator() {
        let count = 1;
        while (true) {
            const response = await fetch(`https://dummyjson.com/users/${count}`);
            if (!response.ok) break;
            const data = await response.json();
            count++;
            yield data; 
        }
    }
    
    async getImageFromInternet() {
        const user = (await this.generator.next()).value; 
    
        if (user && user.image) {
            this.ui.setImage(user.image);
        } else {
            console.log("No image found for user");
        }
    }
    

}