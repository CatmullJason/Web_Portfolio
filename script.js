//global fruit variable
var fruit = [];

// This function demonstrates how to call other functions
function function1(userInput) {
    if (userInput == 'up' || userInput == 'down')
    {
        elseIfStatement(userInput);
    }
    else {
        switchStatement(userInput);
    }
}

function elseIfStatement (userInput) {
    
    // Simply showcasing Else and If conditional statments
    if (userInput == 'up')
        {
        document.getElementById("picture").src = 'thumbsUp.png';
    }
    else if (userInput == 'down')
    {
        document.getElementById("picture").src = 'thumbsDown.png';
    }
}

function switchStatement (userInput) {
    
        // Simply showcasing a switch statment here with user's input
    switch (userInput) {
        case '1':
            document.getElementById("picture").src = 'one.png';
            break;
        case '2':
            document.getElementById("picture").src = 'two.png';
            break;
        case '3':
            document.getElementById("picture").src = 'three.png';
            break;
        case '4':
            document.getElementById("picture").src = 'four.png';
            break;
        default:
            document.getElementById("picture").src = 'null.png';
            break;
    }
}

function function2(item) {
    
    fruit.push(item);     //add to array
    fruit.sort();         //sort the array in alphabetical order
    
    //fill div with the fruit array
    document.getElementById("array").innerHTML = fruit;
}


/*This next section is dealing with JSON parse and stringify methods.
 *Both will be utilized in these example functions.*/
function function3() {
    
    var myExample, myJSON, temp, newObject;
    
    //store our JSON object to local storage for use in a moment
    myExample = { "red":"#f00", "white":"#fff", "blue":"#00f" };
    myJSON = JSON.stringify(myExample);
    localStorage.setItem("testJSON", myJSON);
    
    //retrieve our data now for use in changing the background.
    temp = localStorage.getItem("testJSON");
    newObject = JSON.parse(temp);
    
    //set the random object property's value to newBackgroundColor
    var newBackgroundColor = newObject[function3Random(newObject)];
    
    //change the background
    document.body.style.background = newBackgroundColor;
}

function function3Random(object) {
    
    //this code will randomly select one of the properties in the object
    var result;
    var i = 0;
    for (var prop in object)
        if(Math.random() < 1/++i)
            result = prop;
    return result;
}

function function4(usersFirstName, usersLastName, usersAge) {
    
    //Instantiate a person object
    var myPerson = new person(usersFirstName, usersLastName, usersAge);
    
    //myPerson is displaying inheritance as it has inherited the properties 
    //of the prototype "person". We can extend those properties to include
    //a new property called college.
    myPerson.college = 'BYU-Idaho';
    
    //Use the object's properties to form a variable string
    var newPerson = myPerson.name() + ' is ' + myPerson.age + 
                    ' years old, and they love ' + myPerson.college;
    document.getElementById("object").innerHTML = newPerson;
    
}

function person(fname, lname, age) {
    
    //Person Constructor Function ^
    this.firstName = fname;
    this.lastName = lname;
    this.age = age;
    
    //Demonstrating the ability to include methods as part of the prototype.
    this.name = function() {return this.firstName + " " + this.lastName;};
}