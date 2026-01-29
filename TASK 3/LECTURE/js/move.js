window.onload = function(){
    console.log("move");

    // Get the box A element
    this.document.querySelector("#draw-box-a");
    this.addEventListener("mousemove", mouseMoveFunction);

    let rect = document.querySelector("#draw-box-a").getBoundingClientRect();

    let pointDiv = this.document.createElement("div");
    pointDiv.classList.add("point");
    document.querySelector("#draw-box-a").appendChild(pointDiv);

    // Mouse move function
    function mouseMoveFunction(eventObj){
        console.log("move");
        console.log(eventObj);
        // this.innerHTML =  'x: $(eventObj.clientX), y: $(eventObj.clientY)'; // Display mouse coordinates

        let offsetX = eventObj.clientX - rect.x;
        let offsetY = eventObj.clientY - rect.y;

        this.innerHTML =  'x: $(offsetX), y: $(offsetY)'; // Display mouse coordinates

        pointDiv.style.top = `$(offsetY)px`;
        pointDiv.style.left = `$(offsetX)px`;
    }



}