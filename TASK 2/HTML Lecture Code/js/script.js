window.onload = setup
function setup(){
    console.log("running setup");

    // let two = document.getElementById("two");
    // let second_element = document.getElementById("sabine");
    // let second_again = document.querySelector("#two");
    // console.log(two);
    // console.log(second_element);
    // console.log(second_again);

    // let elements = document.getElementsByTagName("div");
    // console.log(elements[elements.length - 1]);
    // console.log(elements[0]);
    // console.log(elements[1]);
    // console.log(elements[2]);

    // for (let i = 0; i < elements.length; i++){
    //     console.log(elements[i]);
    // }

    // let firstDiv = document.querySelector("div");
    // let allDivs = document.querySelectorAll("div");
    // console.log(firstDiv);
    // console.log(allDivs);

    // let elementsWithClass = document.getElementsByClassName("square_shape");
    // let allElementsWithClass = document.getElementsByClassName(".square_shape");
    // console.log(elementsWithClass);
    // console.log(allElementsWithClass);

    // document.querySelector(".square_shape");

    // let firstEL = document.querySelector(".square_shape");
    // let htmlEL = firstEL.innerHTML;
    // let textEL = firstEL.textContent;

    // console.log(textEL);
    // console.log(htmlEL);
    // console.log(firstEL);

//     let idOfFive = document.querySelector(".square_shape").style;
//     console.log(idOfFive);

//     let el = document.querySelector("#two").getAttribute("sabines_attribute");
//     console.log(el);

// let childrenOfFlex = document.querySelector(".wrapper_flex_box").children;
// console.log(childrenOfFlex);

// for (let i = 0; i < childrenOfFlex.length; i++){
//     console.log(childrenOfFlex[i]);

//     for (let j = 0; j < childrenOfFlex[i].children.length; j++){
//         console.log("   " + childrenOfFlex[i].children[j]);
//     }
// }

// document.querySelector("#four").innerHTML = "<h3>This text has been changed by JavaScript!</h3>";

// console.log(document.querySelectorAll("p span"));

// document.querySelector(".square_shape").style.background = "rgba(100, 150, 250, 0.7)";
// document.querySelectorAll(".another_class")[0].setAtrtribute( "id", "newTest");

//new element
let newDiv = document.createElement("div");
newDiv.classList.add("square_shape");
newDiv.innerHTML = " NEW ELEMENT ";
newDiv.style.backgroundColor = "purple";

// access parent element
let parentElement = document.querySelector(".wrapper_flex_box")
parentElement.appendChild(newDiv)

}