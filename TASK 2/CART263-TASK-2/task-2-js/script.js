window.onload = setup;

/** function setup */
function setup(){
console.log("we are a go!")
/*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
/*** START PART ONE ACCESS */ 
/* 1: all paragraph elements */
/***CODE */
// let paragraphs = document.getElementsByTagName("p");
// console.log(paragraphs);
 
/***OUTPUT: 
 * HTMLCollection(9) [p#1, p#2.img-descript, p#3.img-descript, p#4.img-descript, p#5.img-descript, p#6.img-descript, p#7.img-descript, p#8.img-descript, p#9.img-descript]
 */


/*************************************** */
/* 2: only the first paragraph element */
/***CODE  */
// let firstParagraph = document.querySelector("p");
// console.log(firstParagraph);

/***OUTPUT: 
 * <p id="1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus officiis non quasi officia sit veniam!.
 * </p>
 */


/*************************************** */
/* 3: all elements with the class inner-container */
// /***CODE 
// let innerContainers = document.getElementsByClassName("inner-container"); 
// console.log(innerContainers);

/***OUTPUT: 
 * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]
 */


/*************************************** */
/* 4: the last image element inside the element that has the class img-container */
/***CODE  */
// let lastImageElement = document.querySelectorAll(".img-container img");
// lastImageElement = lastImageElement[lastImageElement.length - 1];
// console.log(lastImageElement);

/***OUTPUT: 
 * <img class="img-image" src="task-2-images/seventeen.png">
 */


/*************************************** */
/* 5A: all h2 elements */
/* 5B: length of the list in 5A */
/* 5C: the text content of the first element in the list from 5A */
/***CODE  */
// let allH2Elements = document.getElementsByTagName("h2");
// console.log(allH2Elements);
// console.log(allH2Elements.length);
// console.log(allH2Elements[0].textContent);

/***OUTPUT: 
 * HTMLCollection [h2]
 * 1
 * The header of this fancy page
 */


/*************************************** */
/* 6: the element with id name parent */
/***CODE  */
// let parentElement = document.getElementById("parent");
// console.log(parentElement);

/***OUTPUT: 
 * <section id="parent">…</section>
 */


/*************************************** */
/*** END PART ONE ACCESS */ 


/*************************************** */
/*** START PART TWO MODIFY */ 
/*************************************** */
/* 1: Select the first paragraph and replace the text within the paragraph... */
/***CODE  */
// firstParagraph = document.querySelector("p");
// firstParagraph.textContent = "Khuong, Nguyen Huynh Bao - January 27th 2026";
// console.log(firstParagraph);

/***OUTPUT: 
 * <p id="1">Khuong, Nguyen Huynh Bao - January 27th 2026</p>
 */


/*************************************** */
/* 2: Select all elements in the HTML that have the class name content-container
 and change the background color ... of first and second ...*/
/***CODE  */
// let contentContainers = document.getElementsByClassName("content-container");
// contentContainers[0].style.backgroundColor = "orange";
// contentContainers[1].style.backgroundColor = "purple";
// console.log(contentContainers);

/***OUTPUT: 
 * HTMLCollection(8) [div.content-container, div.content-container, div.content-container, div.content-container, div.content-container, div.content-container, div.content-container, div.content-container]
 */


/*************************************** */
/* 3: Change the src element of the first image element on the page to be ...
/***CODE  */
// let firstImage = document.querySelector("img");
// firstImage.src = "task-2-images/seven.png";
// console.log(firstImage);

/***OUTPUT: 
 * <img src="task-2-images/seven.png">
 */


/*************************************** */
/* 4: Select the third paragraph element on the page and 
replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
/***CODE  */
// let thirdParagraph = document.querySelectorAll("p")[2];
// thirdParagraph.innerHTML = "<h2>TEST 123</h2>";
// console.log(thirdParagraph);

/***OUTPUT: 
 * <p id="3" class="img-descript">
 * <h2>TEST 123</h2>
 * </p>
 */


/*************************************** */
/* 5: Select the fourth paragraph element on the page and 
add to the existing content an h2 element containing the text `TEST 123`
/***CODE  */
// let fourthParagraph = document.querySelectorAll("p")[3];
// fourthParagraph.innerHTML += "<h2>TEST 123</h2>";
// console.log(fourthParagraph);

/***OUTPUT: 
 * <p id="4" class="img-descript">
 * Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus officiis non quasi officia sit veniam!
 * <h2>TEST 123</h2>
 * </p>
 */


/*************************************** */
/* 6: Select the fifth paragraph element on the page and add to the existing content 
an img element that holds `one.png`, and add the class newStyle to said paragraph element.
/***CODE  */
// let fifthParagraph = document.querySelectorAll("p")[4];
// fifthParagraph.innerHTML += '<img src="task-2-images/one.png" />';
// fifthParagraph.classList.add("newStyle");
// console.log(fifthParagraph);

/***OUTPUT: 
 * <p id="5" class="img-descript newStyle">
 * Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus officiis non quasi officia sit veniam!
 * <img src="task-2-images/one.png">
 * </p>
 */


/*************************************** */
/* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
then access all elements with class name inner-container and save to a variable called `innerContainers`. 
Next, iterate over the colors array, and for each color: 
assign the element from innerContainers variable with the same index 
(i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
a background using that color.
/***CODE  */
// let colors = ['red','blue','green','orange'];
// let innerContainersColors = document.getElementsByClassName("inner-container");
// for (let i = 0; i < colors.length; i++){
//     innerContainersColors[i].style.backgroundColor = colors[i];
// }
// console.log(innerContainersColors);

/***OUTPUT: 
 * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]
 */


/*************************************** */
/*** END PART TWO MODIFY */ 


/*************************************** */
/*** START PART THREE CREATE */ 
/*************************************** */
/* 1: NEW PARAGRAPHS */
/* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
/* 1B: Create a function:function customCreateElement(parent){ //body } */
/* 1C:  In the body of customCreateElement create a new parargraph element*/
/* 1D:  Set the text of this element to be : `using create Element`*/
/* 1E:  Set the background of this paragraph element to be green */
/* 1F:  Set the color of the text in this paragraph element to be white */
/* 1G: Append this new element to the parent variable within the function. */
/* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
passing the current allPTagsThree element as the parent with each iteration.*/
/***CODE */
// let allPTagsThree = document.getElementsByTagName("p");

// function customCreateElement(parent){
//     //Body
//     let newParagraph = document.createElement("p");
//     newParagraph.textContent = "using create Element";
//     newParagraph.style.background = "green";
//     newParagraph.style.color = "white";
//     parent.appendChild(newParagraph);
// }
// // for (let pTag of allPTagsThree){
// // }
// for (let i = 0; i < allPTagsThree.length; i++){
//     customCreateElement(allPTagsThree[i]);
// }

/***EXPLANATION::
 * 
 * 
 */


/*************************************** */
/* 2: GRID OF BOXES */
/* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
/* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
/* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
/* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

/***CODE */
function customNewBoxCreate(parent){
    //Body
     let newDiv = document.createElement("div")
        newDiv.classList.add("testDiv");
        parent.appendChild(newDiv);

        return newDiv;
}

let newGrid = document.querySelector("#new-grid");

    for (let x = 0; x < 10; x++){
        for (let y = 0; y < 10; y++){
            let returnedDiv = customNewBoxCreate(newGrid);
            if (x % 2 === 0){
                returnedDiv.style.background = "white";
            }
            else {
                returnedDiv.style.background = "purple";
            }
            returnedDiv.style.left = (x * 46.5) + "px";
            returnedDiv.style.top = (y * 46.5) + "px";
        }
    }





/***EXPLANATION::
 * 
 * 
 */

/*************************************** */
/* 3: GRID OF BOXES II */

/* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
/* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
/* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
/*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

/***CODE */
for (let x = 0; x < 10; x++){
    for (let y = 0; y < 10; y++){
        let newGridThree = document.querySelector("#new-grid-three");
        let returnedDiv = customNewBoxCreate(newGridThree);
        let remainder = x % 3;
        if (remainder === 0){
            returnedDiv.style.background = "red";
        }
        else if (remainder === 1){
            returnedDiv.style.background = "orange";
        }
        else {
            returnedDiv.style.background = "yellow";
        }
        returnedDiv.style.left = (x * 46.5) + "px";
        returnedDiv.style.top = (y * 46.5) + "px";
        returnedDiv.textContent = remainder;
    }
}

/***EXPLANATION::
 * 
 * 
 */

/*************************************** */
/*** END PART THREE CREATE */ 
/*************************************** */
    




}