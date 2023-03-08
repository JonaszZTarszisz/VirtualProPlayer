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
    this.physcialPanel = document.getElementById("physcialPanel");
    this.mainPageAttributes = document.getElementById("attributes")
    this.mainPage = document.getElementById("mainPage");
    
    this.positions = ["GK", "CB", "LB", "LWB", "RB", "RWB", "CDM", "CAM",
                         "CM", "LM", "LW", "RM", "RW", "ST", "CF", "LF", "RF"];

    this.frontPanel();
    this.updatePanel();
    this.previousMenu();
    this.nextPanel();
    }

    frontPanel() {
        this.previousStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index <= 0) index = this.positions.length;
            this.position.innerHTML = this.positions[index-1];
        });

        this.nextStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index >= this.positions.length - 1) index = -1;
            this.position.innerHTML = this.positions[index+1];
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

    /*updatePanel() {
        const physcialID = "#" + this.physcialPanel.getAttributeNode("id").value;
        let checkboxes = Array.from(document.querySelectorAll(physcialID+ "> .buffPart > .storey > .buffSkill > .checkbox"));
        console.log(checkboxes);
        checkboxes.forEach(e => e.addEventListener("click", () => {
            if(e.checked) {
                let label = document.querySelector("#" + e.id + "~ label p");
                console.log(label, e)
            }
        }))
    }*/

    updatePanel() {
        this.updatePanelPage = document.getElementById("updatePanel");
        this.mainPageAttributes.addEventListener('click', () => {
            this.mainPage.classList.add("d-none");
            this.updatePanelPage.classList.remove("d-none");
        })
    }

    nextPanel() {
        let navUpdatePanel = document.querySelectorAll("#navbarUpdatePanel > .nav-item > .nav-link");
        let skillPanels = Array.from(document.querySelectorAll(".skillPanel"));
        navUpdatePanel.forEach(e => e.addEventListener("click", () => {
            console.log(skillPanels);
            let activePanel = document.querySelector(".active-panel");
            let namePanel = e.innerHTML.toLowerCase();
            let focusPanel = skillPanels.filter( e => {
                let idOfFocusOfPanel = e.getAttributeNode("id").value;
                return idOfFocusOfPanel.slice(0, namePanel.length) == namePanel;
            })
        activePanel.classList.remove("active-panel");
        activePanel.classList.add("d-none");
        focusPanel[0].classList.remove("d-none");
        focusPanel[0].classList.add("active-panel");
        console.log(activePanel);
        
        }))

    }

    previousMenu () {
        this.backToMainPage = document.querySelectorAll(".backToMainPage");
        this.backToMainPage.forEach( e => e.addEventListener("click", () => {
            console.log("witaj")
            this.mainPage.classList.remove("d-none");
            this.updatePanelPage.classList.add("d-none");
        }))
    }
}

const controlapp = new ControlPanel();
