import { users, emailList } from "./data";
    export class UserController{
        constructor(){
            this.userUI = new UIController();
            this.currentUserId = 1;
        }

        populateUserProfile(){
            this.userUI.setProfileValues(users.get(1))
        }

        addUser(user){
            console.log(users.set(user.id, user));
            console.log(emailList.add(user.email));
        }
        updateUser(user){
            console.log(users.set(user.id, user));
             console.log(emailList.add(user.email));
        }
         viewAllUsers(){
            return users;
        }

        tryeditingProfile({firstName,lastName,age,city,street,zipcode}){

            const user = users.get(this.currentUserId);
            const nestedObject = {
                id : this.currentUserId,
                firstName : firstName || user.firstName,
                lastName : lastName || user.lastName,
                age : age || user.age,
                city : city || user.city,
                address :{
                    street : street || user.street,
                    zipcode : zipcode || user.zipcode
                }
            };

            users.set(this.currentUserId, nestedObject);
            this.userUI.setProfileValues(users.get(this.currentUserId));
        }
        
    }

class UIController{
    constructor(){}
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
}

export class AdditionalFeatures{
    constructor(){
        this.ui = new UIController();
        this.generator = this.imgGenerator(); 
    }
    generateFibo(n) {
        const fibo = [...this.fibonacci(n)]; 
        console.log(fibo);
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
        const { value: user } = await this.generator.next(); 
    
        if (user && user.image) {
            this.ui.setImage(user.image);
        } else {
            console.log("No image found for user");
        }
    }
    

}