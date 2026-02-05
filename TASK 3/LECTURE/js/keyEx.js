window.onload = function(){
    console.log("keys");

    window.setTimeout(function(e){
        let parent = this.document.querySelector("#parent");
        parent.innerHTML += "New text"
    }, 3000)

    window.setInterval(function(e){
        let parent = this.document.querySelector("#parent");
        parent.innerHTML += "New text for interval"
    }, 3000)
    

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keyup", keyHandlerUp);

    function keyHandlerUp(event){
        if (event.code === "Space")
            document.getElementById("boxB").style.background = "lightblue";
    }

    let speedX = 50;
    function keyHandler(event){

        if (event.key === "ArrowRight") {
      document.getElementById("boxA").style.left =
        parseInt(document.getElementById("boxA").style.left) + speedX + "px";

    }
    
    else if (event.key === "ArrowLeft") {
      document.getElementById("boxA").style.left =
        parseInt(document.getElementById("boxA").style.left) - speedX + "px";
    }

    else if(event.code ==="Space"){
        document.getElementById("boxB").style.background = "orange";

    }

        console.log(event.key)
        document.querySelector("#textContainer").textContent+=` ${event.key} `
    }
}