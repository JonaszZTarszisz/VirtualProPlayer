window.onload = function() {
    const position = document.getElementById("position");
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const overall = document.getElementById("overall");
    const attributes = document.querySelectorAll(".skillRating");
    const previousStep = document.querySelectorAll(".stepPrevious");
    const nextStep = document.querySelectorAll(".stepNext");

    const positions = ["GK", "CB", "LB", "LWB", "RB", "RWB", "CDM", "CAM",
                         "CM", "LM", "LW", "RM", "RW", "ST", "CF", "LF", "RF"];
    
    previousStep[0].addEventListener("click", () => {
        const value = position.innerHTML;
        let index = positions.indexOf(value);
        if(index <= 0) index = positions.length;
        position.innerHTML = positions[index-1];
    });

    nextStep[0].addEventListener("click", () => {
        const value = position.innerHTML;
        let index = positions.indexOf(value);
        if(index >= positions.length - 1) index = -1;
        position.innerHTML = positions[index+1];
    });

    previousStep[1].addEventListener("click", () => {
        let value = height.innerHTML;
        if(value <= 160) value = 201;
        height.innerHTML = value-1
    })

    nextStep[1].addEventListener("click", () => {
        let value = height.innerHTML;
        if(value >= 200) value = 159;
        height.innerHTML = +value + 1;
    })

    previousStep[2].addEventListener("click", () => {
        let value = weight.innerHTML;
        if(value <= 45) value = 116;
        weight.innerHTML = value-1
    })

    nextStep[2].addEventListener("click", () => {
        let value = weight.innerHTML;
        if(value >= 115) value = 44;
        weight.innerHTML = +value + 1;
    })


                         

}