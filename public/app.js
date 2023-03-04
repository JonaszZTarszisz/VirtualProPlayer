class ControlPanel { 
    constructor() {   
    this.position = document.getElementById("position");
    this.height = document.getElementById("height");
    this.weight = document.getElementById("weight");
    this.overall = document.getElementById("overall");
    this.attributes = document.querySelectorAll(".skillRating");
    this.previousStep = document.querySelectorAll(".stepPrevious");
    this.nextStep = document.querySelectorAll(".stepNext");
    this.buffSkill = document.querySelectorAll(".buffSkill");
    this.skillAreola = document.querySelectorAll(".skillAreola");

    this.positions = ["GK", "CB", "LB", "LWB", "RB", "RWB", "CDM", "CAM",
                         "CM", "LM", "LW", "RM", "RW", "ST", "CF", "LF", "RF"];

    this.frontPanel();
    }

    frontPanel() {
        this.previousStep[0].addEventListener("click", () => {
            const value = position.innerHTML;
            let index = positions.indexOf(value);
            if(index <= 0) index = positions.length;
            position.innerHTML = positions[index-1];
        });

        this.nextStep[0].addEventListener("click", () => {
            const value = position.innerHTML;
            let index = positions.indexOf(value);
            if(index >= positions.length - 1) index = -1;
            position.innerHTML = positions[index+1];
        });

        this.previousStep[1].addEventListener("click", () => {
            let value = height.innerHTML;
            if(value <= 160) value = 201;
            height.innerHTML = value-1
        });

        this.nextStep[1].addEventListener("click", () => {
            let value = height.innerHTML;
            if(value >= 200) value = 159;
            height.innerHTML = +value + 1;
        });

        this.previousStep[2].addEventListener("click", () => {
            let value = weight.innerHTML;
            if(value <= 45) value = 116;
            weight.innerHTML = value-1
        });

        this.nextStep[2].addEventListener("click", () => {
            let value = weight.innerHTML;
            if(value >= 115) value = 44;
            weight.innerHTML = +value + 1;
        });
}
}

const controlapp = new ControlPanel();
