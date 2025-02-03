import { users, emailList } from "./data";
    export class UserController{
        constructor(){
            this.userUI = new UIController(this);
            this.userId = 1;
        }

        populateUserProfile(){
            this.userUI.setProfileValues(users.get(1))
        }

        populateUsersTable(){
            this.userUI.setUsersTable(users);
        }
        addUser(user){
            console.log(users.set(user.id, user));
        }
         viewAllUsers(){
            return users;
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
                    street : street || user.street,
                    zipcode : zipcode || user.zipcode
                }
            };

            users.set(this.userId, nestedObject);
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
           this.userUI.updateTableBody();
           this.userUI.showFormModal(false);
        }
        tryRemovingUser(userId){
            users.delete(userId);
            this.userUI.updateTableBody();
        }
    }
    
    class UIController{
        constructor(userCon){
            this.tableHeadings = [{id : "ID"}, {firstName : "First Name"}, {lastName : "Last Name"}, {age : "Age"}, {city : "City"}, {address : "Address"} , {action: "Action"}]
            this.userCon = userCon
        }
        showFormModal(show){
            const modal = document.getElementById("editmodal");
            show ? modal.classList.remove("hidden") : modal.classList.add("hidden");
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
        document.getElementById("greetingcard").classList.remove("hidden");
        document.getElementById("greetingmessage").innerHTML = this.generategreetMessage(user)
    }

    generategreetMessage(user){
        return `
        Hello, this is ${user.firstName} ${user.lastName},
        from ${user.city}.`
    }

    setUsersTable(){
        this.setTableHeadings();
        this.updateTableBody();
    }

    setTableHeadings(){
        const tablehead = document.querySelector("#usersTable thead");
        tablehead.textContent = "";
        this.tableHeadings.forEach((heading) => {
            const td = document.createElement("td");
            td.textContent = Object.values(heading);
            tablehead.appendChild(td);
        })
    }

    updateTableBody(){
        const tbody = document.querySelector("#usersTable tbody");
        tbody.textContent = "";
        users.forEach((value, key) =>{
            const row = document.createElement("tr");

            for(let x in value){
                const td = document.createElement('td');
                if(typeof value[x] === "object"){
                    td.textContent = this.getToString(value[x]);
                }
                else{
                td.textContent = value[x];
                }
                row.appendChild(td);
            }

            row.appendChild(this.createActionCell(key));
            tbody.appendChild(row);
        })

    }
    
    getToString(object){
        return Object.values(object).join(",");
    }

    createActionCell(key){
        const actions = document.createElement("div");
        actions.className = "actioncell";
        actions.appendChild(this.createEditCell(key));
        actions.appendChild(this.createRemoveCell(key));
        actions.appendChild(this.createGreetingCell(key));
        return actions;
    }
    createEditCell(userId){
        const span = document.createElement("span");
        span.textContent = "Edit";
        span.className = "btnspan"
        span.addEventListener('click', ()=>{
            this.showFormModal(true);
            this.userCon.userId = userId;
            this.updateTableBody();
        });
        return span;
    }

    createGreetingCell(userId){
        const span = document.createElement("span");
        span.textContent = "Greeting";
        span.className = "btnspan"
        span.addEventListener('click', ()=>{
            this.userCon.trySettingGreeting(userId)
        });
        return span;
    }
    createRemoveCell(userId){
        const span = document.createElement("span");
        span.textContent = "Remove";
        span.className = "btnspan"
        span.addEventListener('click', ()=>{
            this.userCon.tryRemovingUser(userId)
        });
        return span;
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