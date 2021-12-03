
// localStorage.clear();

var cartItems;
var cartArray = [];

$(document).ready(function() {
    $("#cart-container").hide();
    if (localStorage.getItem("currentUser") == "Manager") {
        setUpManagerPages();
        $("#sign-out-btn").css("display", "flex");
        $("#sign-in-btn").css("display", "none");
    }
    else {

        setUpCustomerPages();

        if (localStorage.getItem("cartItems") == null) {
            localStorage.setItem("cartItems", "");
        }
        cartItems = localStorage.getItem("cartItems");
        buildCart();

        if (localStorage.getItem("currentUser") == "" || localStorage.getItem("currentUser") == null) {
            $("#sign-out-btn").css("display", "none");
            $("#sign-in-btn").css("display", "flex");
        }
        else {
            $("#sign-out-btn").css("display", "flex");
            $("#sign-in-btn").css("display", "none");
        }
    }

    $(".add-cart").click(function () {
        var children = $(this).parent().children(".cart-info").clone();
        cartItems = cartItems + children[0].innerHTML + ":" + children[1].innerHTML + ",";
        localStorage.setItem("cartItems", localStorage.getItem("cartItems")+cartItems);
        buildCart();
    })

})

function openCategory(id, items) {
    if($(items).css('display') === 'block') {
        $(id).css("overflow", "hidden");
        $(items).slideUp(500);
    }
    else {
        $(id).css("overflow", "initial");
        $(items).slideDown(500);
    }
}

// sticky nav bar color change 

window.onscroll = function() {
    var top = window.scrollY;
    if(top >= 1){
    let nav = document.querySelector('.topnav')
    nav.style['padding'] = '.5rem'
    nav.style['background-color'] = '#292929'

    var links = document.getElementsByClassName('active')
    for (let i=1; i < links.length; i++){
        links[i].style['color'] = 'white'
        links[i].style ['padding'] = '.5rem'
    }
        links[0].style ['padding'] = '.5rem'
        links[0].style ['active:hover'] = 'blue'

        let stated = document.querySelector('.cart-icon')
        stated.style['color'] = 'white'
    }

    else if(top == 0){
        let nav = document.querySelector('.topnav')
        nav.style['padding'] = '.5rem'
        nav.style['background-color'] = 'rgba(0,0,0,0.3)'

        var links = document.getElementsByClassName('active')
        for (let i=1; i < links.length; i++){
        links[i].style['color'] = 'white'
    }
        links[0].style ['color'] = 'white'

        let stated = document.querySelector('.cart-icon')
        stated.style['color'] = 'white'
    }
}
// tablinks

function openLoginPage(evt, loginPage) {
    
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(loginPage).style.display = "block";
    evt.currentTarget.className += " active";
}

function signUp() {
    let username = $("#username").val() + "";
    let password = $("#pass").val() + "";
    let confirm = $("#confirm-pass").val() + "";
    if (password != confirm) {
        alert("Passwords do not match.");
    }
    else if (localStorage.getItem(username) != null) {
        alert("Username is taken.");
    }
    else {
        localStorage.setItem(username, password);
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    }
}

function logIn() {
    let username = $("#login-username").val() + "";
    let password = $("#login-pass").val() + "";
    if (username == "Manager" && password == "password") {
        localStorage.setItem("currentUser", "Manager");
        window.location.href = "index.html";
    }
    else if (localStorage.getItem(username) == password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    }
    else {
        alert("Incorrect username or password");
    }
}

function signOut() {
    localStorage.setItem("currentUser", "");
    window.location.href = "index.html";
}

function setUpManagerPages() {
    $(".editor-btn").each(function() {
        $(this).css("display", "block");
    });
}

function openMenu() {
    window.open('menu.html', '_self');
    setUpManagerPages();
}

function setUpCustomerPages() {
    $(".editor-btn").each(function() {
        $(this).css("display", "none");
    });
}

function openCart() {
    if ($("#cart-container").css("display") == "block") {
        $("#cart-container").hide();
    }
    else {
        $("#cart-container").show();
    }
}

function buildCart() {
    let i = 0;
    while (cartItems != "," && i < cartItems.length) {
        if (cartItems[i] == ":" && i != 0) {
            var itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            let name = document.createElement("h2");
            name.innerHTML = cartItems.substring(0,i);
            itemDiv.append(name);
            cartArray.push(name.innerHTML);
            console.log(cartArray);
            cartItems = cartItems.substring(i+1);
            i = 0;
        }

        else if (cartItems[i] == "," && i != 0) {
            let price = document.createElement("p");
            price.innerHTML = cartItems.substring(0,i);
            itemDiv.append(price);
            cartItems = cartItems.substring(i+1);
            let removeBtn = document.createElement("div");
            removeBtn.classList.add("remove-btn");
            removeBtn.onclick = function () {
                let itemName = $(this).parent().children()[0].innerHTML;
                cartItems = localStorage.getItem("cartItems");
                let arrayIndex = cartArray.indexOf(itemName);
                let stringIndex = cartItems.indexOf(itemName);
                console.log(itemName);
                console.log(stringIndex);
                cartItems = cartItems.substring(0,stringIndex) + cartItems.substring(cartItems.indexOf(",",stringIndex)+1);
                localStorage.setItem("cartItems", cartItems);
                cartArray.splice(arrayIndex, 1);
                $(this).parent().remove();
                
            };
            itemDiv.append(removeBtn);


            var quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.classList.add("item-quantity");
            quantityInput.value = "1";
            quantityInput.min = "1";
            quantityInput.onchange = function () {
                let itemPrice = Number($(this).parent().children()[1].innerHTML.substring(1));
                let totalItemPrice = itemPrice * $(this).val();
                console.log(totalItemPrice);
            }
            itemDiv.append(quantityInput);
            $("#cart-div").append(itemDiv);
            i = 0;
        }

        else {
            i++;
        }
    }
}
