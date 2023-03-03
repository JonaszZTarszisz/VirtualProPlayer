window.onload = function() {
    const position = document.getElementById("position");
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const overall = document.getElementById("overall");
    const attributes = document.querySelectorAll(".skillRating");
    const previousStep = document.querySelectorAll(".stepPrevious");
    const nextStep = document.querySelectorAll(".stepNext");
    const buffSkill = document.querySelectorAll(".buffSkill");
    const skillAreola = document.querySelectorAll(".skillAreola");

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
    });

    nextStep[1].addEventListener("click", () => {
        let value = height.innerHTML;
        if(value >= 200) value = 159;
        height.innerHTML = +value + 1;
    });

    previousStep[2].addEventListener("click", () => {
        let value = weight.innerHTML;
        if(value <= 45) value = 116;
        weight.innerHTML = value-1
    });

    nextStep[2].addEventListener("click", () => {
        let value = weight.innerHTML;
        if(value >= 115) value = 44;
        weight.innerHTML = +value + 1;
    });

    /*for( let i=0; i<buffSkill.length; i++) {
        buffSkill[i].addEventListener("mousemove", () => {
            buffSkill[i].style.color = "#006eff";
            skillAreola[i].style.border = "4px solid #006eff";
            const child = Array.from(buffSkill[i].children);
            console.log(child);
            const elementFound = child.find(e => e.classList.contains("lineTop"));
            if(elementFound) elementFound.style.backgroundColor= "red";
            
        })
        buffSkill[i].addEventListener("mouseout", () => {
            buffSkill[i].style.color = "#66686b";
            skillAreola[i].style.border = "4px solid #66686b";
        })};
    */    
    /*mouseClick = (btn) => {
        const elements = btn.split(",");
        const conditions = elements.filter( e => e.includes("="));
        if(conditions) {
            let tabChoices = conditions.map( e => e.split("="));
            console.log(tabChoices);
            if(tabChoices.length>1){
                tabChoices = tabChoices.shift();
                
            }
        };
        console.log(elements);
        console.log(conditions);
    };*/
    
    mouseClick = (btn) => {
        validateString(btn);
        console.log(button.focusDiv, button.point, button.unblockDivs);
        let checkboxEl = document.querySelector("#" + button.focusDiv + ">.checkbox");
        if(checkboxEl.hasAttribute("disabled")) return;
        if(!checkboxEl.checked) {
            button.unblockDivs.forEach(e => document.querySelector("#" + e + ">.checkbox").removeAttribute('disabled'));
        }

        else {
            button.unblockDivs.forEach(e => document.querySelector("#" + e + ">.checkbox").addAttribute('disabled'));
        }
    }

    validateString = (string) => {
        let tab = string.split(",");
        let unblockDivsString = tab.pop();
        let unblockDivs = unblockDivsString.split("/");
        let focusDivAndPointStr = tab.pop();
        let focusDivAndPointTab = focusDivAndPointStr.split("-");
        let point = focusDivAndPointTab.pop();
        let focusDiv = focusDivAndPointTab.pop();
        return button = {focusDiv, point, unblockDivs}
    }
        

        
}
