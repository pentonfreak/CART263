window.onload = setup;
function setup(){
    console.log("events!")

    /**
     * Attaching event listeners to DOM elements
     */
    // let introSection = document.querySelector("#intro") // Select the element with id "intro"
    // introSection.addEventListener("click", mouseClickCallback); // Attach the event listener to introSection

    // let s1 = document.querySelector("#s1"); // Select the element with id "s1"
    // s1.addEventListener("click", mouseClickCallback); // Attach the event listener to s1

    // let s2 = document.querySelector("#s2"); // Select the element with id "s2"
    // s2.addEventListener("click", mouseClickCallback); // Attach the event listener to s2

    // let s3 = document.querySelector("#s3"); // Select the element with id "s3"
    // s3.addEventListener("click", mouseClickCallback); // Attach the event listener to s3


    // More efficient way: loop through all sections and attach event listeners
    let allSections = document.querySelectorAll(".mouseclick-active-section"); // Select all elements with class "mouseClick-active-section"
    for (let currentSection of allSections) {
        currentSection.addEventListener("click", mouseClickCallback); // Attach the event listener to each section
    }

    // Event listener callback functions
    function mouseClickCallback(eventObj) { // eventObj is the event object passed to the callback
        console.log(eventObj);
        console.log(this);

        // this.style.background = "lightblue"; // Change the background color of the clicked element to light blue
        
        let idOfThis = this.getAttribute("id"); // Get the id of the clicked element
        // console.log("The id of this element is: " + idOfThis); // Log the id of the clicked element
        // console.log(document.querySelector(`#${idOfThis} p`)); // Select the <p> element inside the clicked element using its id

        if (this.getAttribute("custom-bool") === "inactive") { // Check the value of the custom attribute
            this.setAttribute("custom-bool", "active");
        

        let child = (document.querySelector(`#${idOfThis} p`)); // Select the <p> element inside the clicked element using its id

        let classToAdd = `${idOfThis}-section-active`; // Create a class name based on the id of the clicked element

        this.classList.add(classToAdd); // Add the class to the clicked 

        let classToAddP = `${idOfThis}-section-p-active`; // Create a class name for the <p> element

        child.classList.add(classToAddP); // Add the class to the <p> 
        
        console.log(this.getAttribute("custom-bool"));

        this.setAttribute("custom-bool", "active"); // Set the custom attribute to "active"
    }
    else {
        let child = (document.querySelector(`#${idOfThis} p`)); // Select the <p> element inside the clicked element using its id

        let classToAdd = `${idOfThis}-section-active`; // Create a class name based on the id of the clicked element

        this.classList.remove(classToAdd); // Remove the class from the clicked element

        let classToAddP = `${idOfThis}-section-p-active`; // Create a class name for the <p> element

        child.classList.remove(classToAddP); // Remove the class from the <p> element
        
        console.log(this.getAttribute("custom-bool"));

        this.setAttribute("custom-bool", "inactive"); // Set the custom attribute to "inactive"
    }

    // // Alternative version without eventObj
    // function mouseClickCallback() {
    //     console.log("Clicked");
    //     console.log(this);
    
    //     this.style.background = "lightblue"; // Change the background color of the clicked element to light blue
    // }

    function mouseOverCallback() {
        console.log("s1 clicked");
    }
}
}
