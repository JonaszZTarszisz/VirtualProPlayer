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
    this.attributes = null;
    
    this.positions = ["GK", "CB", "LB", "LWB", "RB", "RWB", "CDM", "CAM",
                         "CM", "LM", "LW", "RM", "RW", "ST", "CF", "LF", "RF"];

    this.frontPanel();
    this.goToupdatePanel();
    this.previousMenu();
    this.nextPanel();
    this.readAttributes();
    }

    frontPanel() {
        this.previousStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index <= 0) index = this.positions.length;
            this.position.innerHTML = this.positions[index-1];
            this.setPosition(this.position.innerHTML, this.attributes);
        });

        this.nextStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index >= this.positions.length - 1) index = -1;
            this.position.innerHTML = this.positions[index+1];
            this.setPosition(this.position.innerHTML, this.attributes);
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

    goToupdatePanel() {
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
            //console.log(skillPanels);
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
        //console.log(activePanel);
        
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

    readAttributes() {
        fetch("attributes.json")
        .then(result => result.json())
        .then(data => this.setAttributes(data))
    }

    setAttributes(attributesFromJson) {
        this.attributes = attributesFromJson;
        let position = this.position.innerHTML;
        const attibutesKeys = Object.keys(this.attributes);
        let findPosition = attibutesKeys.find(e => e == position);
        this.setPosition(findPosition, this.attributes);
    }

    setPosition(findPosition, attributes) {
        console.log(attributes[findPosition]);
        document.querySelector("#jumping .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Jumping;
        document.querySelector("#stamina .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Stamina;
        document.querySelector("#strenght .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Strenght;
        document.querySelector("#reactions .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Reactions;
        document.querySelector("#agression .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Agression;
        document.querySelector("#interceptions .buffSkillRating").innerHTML = attributes[findPosition].Defence.Interceptions;
        document.querySelector("#marking .buffSkillRating").innerHTML = attributes[findPosition].Defence.Marking;
        document.querySelector("#standingTackle .buffSkillRating").innerHTML = attributes[findPosition].Defence.StandingTackle;
        document.querySelector("#slidingTackle .buffSkillRating").innerHTML = attributes[findPosition].Defence.SlidingTackle;
        document.querySelector("#agility .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Agility;
        document.querySelector("#balance .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Balance;
        document.querySelector("#positioning .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Positioning;
        document.querySelector("#ballControl .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.BallControl;
        document.querySelector("#dribbling .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Dribbling;
        document.querySelector("#vision .buffSkillRating").innerHTML = attributes[findPosition].Passing.Vision;
        document.querySelector("#crossing .buffSkillRating").innerHTML = attributes[findPosition].Passing.Crossing;
        document.querySelector("#longPassing .buffSkillRating").innerHTML = attributes[findPosition].Passing.LongPassing;
        document.querySelector("#shortPassing .buffSkillRating").innerHTML = attributes[findPosition].Passing.ShortPassing;
        document.querySelector("#curve .buffSkillRating").innerHTML = attributes[findPosition].Passing.Curve;
        document.querySelector("#finishing .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Finishing;
        document.querySelector("#fkaccuracy .buffSkillRating").innerHTML = attributes[findPosition].Shotting.FKAccuracy;
        document.querySelector("#heading .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Heading;
        document.querySelector("#shotPower .buffSkillRating").innerHTML = attributes[findPosition].Shotting.ShotPower;
        document.querySelector("#longShots .buffSkillRating").innerHTML = attributes[findPosition].Shotting.LongShots;
        document.querySelector("#volleys .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Volleys;
        document.querySelector("#penalties .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Penalties;
        document.querySelector("#acceleration .buffSkillRating").innerHTML = attributes[findPosition].Pace.Acceleration;
        document.querySelector("#sprintSpeed .buffSkillRating").innerHTML = attributes[findPosition].Pace.SprintSpeed;
        document.querySelector("#diving .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Diving;
        document.querySelector("#handling .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Handling;
        document.querySelector("#kicking .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Kicking;
        document.querySelector("#reflexes .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Reflexes;
        document.querySelector("#keeperPositioning .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Positioning;

    }
    
}

const controlapp = new ControlPanel();
