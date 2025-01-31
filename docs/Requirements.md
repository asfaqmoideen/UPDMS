## **Project: User Profile and Data Management System**

### **Overview** :

Create an application that simulates a user profile and data management system. The system will allow you to:

1. Manage user profile data.
2. Track inventory using arrays and objects.
3. Fetch and process data asynchronously in chunks.
4. Merge and update data with spread/rest operators.
5. Display information dynamically using template literals.

### **Requirements** :						

### **1. Destructuring and Object Manipulation**

* Create a `user` object with properties `name`, `age`, `city`, and `address` (which itself has `street` and `zip`).
* Use destructuring to extract the properties and log them to the console.
* Write a function `updateUserProfile` to update the `user` object using destructuring. This function should accept an object with partial user data and update the main user object, providing default values where necessary.

### **2. Spread and Rest Operators**

* Create two arrays, one with some initial data and another with new data. Merge these arrays using the spread operator.
* Create two objects representing user data. Use the spread operator to merge them into a single object.
* Use the rest operator to write a function `sumAll` that takes any number of arguments and returns their sum.

### **3. Template Literals**

* Use template literals to dynamically generate a greeting message and a user’s full address.
* Create a utility to format a given number (e.g., a price) into a currency string.

### **4. Maps and Sets**

* Use a `Map` to store user profiles, where the keys are user IDs and the values are the user data.
* Use a `Set` to store unique email addresses and ensure no duplicates are added.

### **5. Generators and Asynchronous Data Fetching**

* Write a generator function that yields Fibonacci numbers.
* Write an async generator that simulates fetching chunks of user data from an API.
