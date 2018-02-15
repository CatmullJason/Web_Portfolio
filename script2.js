
function requestJSON() {
    var data = "myJSON.json";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //parse our JSON object
            var obj = JSON.parse(this.responseText);
            var favorite = "insturments: <br>";
            for (i in obj.favorites) {
                for (j in obj.favorites[i].instruments) {
                    favorite += "<b>" +
                            obj.favorites[i].instruments[j] + "</b><br>";
                }
            }
            var story = "My name is " + obj.name + "<br>" +
                    "I am " + obj.age + " years old" + "<br>" +
                    "I enjoy these " + favorite;

            document.getElementById("jason").innerHTML = story;
        }
    };

    xhttp.open("GET", data, true);
    xhttp.send();
}

function slideOpen(item) {

    //grab our element that we want to change
    var elem = document.getElementById(item);

    //allows us to see an animation
    elem.style.transition = "height 0.2s linear 0s";
    elem.style.height = "200px";
}

function slideClosed(item) {

    //grab our element that we want to change
    var elem = document.getElementById(item);

    //allows us to see an animation
    elem.style.transition = "height 0.2s linear 0s";
    elem.style.height = "0px";
}

var shoppingCart = {
    items: [],
    total: []
};

function addToCart(value, item) {
    shoppingCart.items.push(item);
    shoppingCart.total.push(value);

    //Add items to cart and display
    addToAndDisplay();

    //Store the cart in case the user clears it and wants to reload it
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("storedCart", JSON.stringify(shoppingCart));
    } else {
        document.getElementById("total").innerHTML = "Your browser doesn't support local storage";
    }
}

function clearOut() {
    shoppingCart.items.length = 0;
    shoppingCart.total.length = 0;
    document.getElementById("total").innerHTML = "";
    document.getElementById("totalPrice").innerHTML = "";

}

function load() {
    if (typeof (Storage) !== "undefined") {

        //Parse our stored shopping cart and set it to our old cart
        shoppingCart = JSON.parse(localStorage.getItem("storedCart"));
        addToAndDisplay();
    } else {
        document.getElementById("result").innerHTML = "Your browser doesn't support local storage";
    }
}

function addToAndDisplay() {
    //Create a readable array to print all the items purchased
    var final = [];
    for (item in shoppingCart.items) {
        final[item] = "<br>" + shoppingCart.items[item];
    }

    //Create a new total of all the prices contained within our shoppingCart
    var total = 0;
    for (var i in shoppingCart.total) {
        total += Number(shoppingCart.total[i]);
    }

    //Print our shopping cart
    document.getElementById("total").innerHTML = final;
    document.getElementById("totalPrice").innerHTML = "<b>TOTAL AMOUNT: $" + total.toFixed(2) + "</b>";
}

function insertMessage() {
    //Append a child element to our  element to display a message
    //There is 
    var para = document.createElement("p");
    var node = document.createTextNode("Thank you for your business!");
    para.appendChild(node);
    var element = document.getElementById("tip");
    element.appendChild(para);
}

function clearMessage() {
    var parent = document.getElementById("example2");
    var child = document.getElementById("tip");
    parent.removeChild(child);
}