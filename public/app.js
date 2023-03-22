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
    this.mainPageAttributes = document.getElementById("attributes");
    this.mainPage = document.getElementById("mainPage");
    this.attributes = null;
    this.attributesHeightChanges = null;
    this.attributesWeightChanges = null;
    this.heightLimit = 0;
    this.weightLimit = 0;
    this.positions = ["GK", "CB", "LB", "LWB", "RB", "RWB", "CDM", "CAM",
                         "CM", "LM", "LW", "RM", "RW", "ST", "CF", "LF", "RF"];

    this.frontPanel();
    this.goToupdatePanel();
    this.previousMenu();
    this.nextPanel();
    this.readAttributes();
    this.readHeightJSON();
    this.readWeightJSON();

    }


    frontPanel() {
        
        this.previousStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index <= 0) index = this.positions.length;
            this.position.innerHTML = this.positions[index-1];
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });

        this.nextStep[0].addEventListener("click", () => {
            const value = this.position.innerHTML;
            let index = this.positions.indexOf(value);
            if(index >= this.positions.length - 1) index = -1;
            this.position.innerHTML = this.positions[index+1];
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });

        this.previousStep[1].addEventListener("click", () => {
            let value = this.height.innerHTML;
            if(value <= 160) value = 201;
            this.height.innerHTML = value - 1;
            this.setHeightLimit(this.height.innerHTML);
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });

        this.nextStep[1].addEventListener("click", () => {
            let value = this.height.innerHTML;
            if(value >= 200) value = 159;
            this.height.innerHTML = +value + 1;
            this.setHeightLimit(this.height.innerHTML);
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });

        this.previousStep[2].addEventListener("click", () => {
            let value = this.weight.innerHTML;
            if(value <= 45) value = 116;
            this.weight.innerHTML = value-1;
            this.setWeightLimit(this.weight.innerHTML);
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });

        this.nextStep[2].addEventListener("click", () => {
            let value = this.weight.innerHTML;
            if(value >= 115) value = 44;
            this.weight.innerHTML = +value + 1;
            this.setWeightLimit(this.weight.innerHTML);
            this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit);
        });
    }


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
            let activeLink = document.querySelector(".nav-active");
            let activePanel = document.querySelector(".active-panel");
            let namePanel = e.innerHTML.toLowerCase();
            let focusPanel = skillPanels.filter( e => {
                let idOfFocusOfPanel = e.getAttributeNode("id").value;
                return idOfFocusOfPanel.slice(0, namePanel.length) == namePanel;
            })
        activeLink.classList.remove("nav-active");
        e.classList.add("nav-active");
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
            //console.log("witaj")
            this.mainPage.classList.remove("d-none");
            this.updatePanelPage.classList.add("d-none");
        }))
    }


    readAttributes() {
        fetch("attributes.json")
        .then(result => result.json())
        .then(data => this.basicAttributes(data))
    }

    basicAttributes(attributesFromJson) {
        this.attributes = attributesFromJson;
    }


    readHeightJSON() {
        fetch("heightChanges.json")
        .then(result => result.json())
        .then(data => this.saveAttributesHeightChanges(data))
    }

    saveAttributesHeightChanges(data){
        this.attributesHeightChanges = data;
    }


    readWeightJSON() {
        fetch("weightChanges.json")
        .then(result => result.json())
        .then(data => this.saveAttributesWeightChanges(data))
    }

    saveAttributesWeightChanges(data){
        this.attributesWeightChanges = data;
        this.setAttributes(this.position.innerHTML, this.attributes, this.attributesHeightChanges, this.attributesWeightChanges, this.heightLimit, this.weightLimit)
    }


    setHeightLimit(height) {
        switch(true) {
            case(height >= 160 && height <=162): this.heightLimit = 0; break;
            case(height >= 163 && height <=167): this.heightLimit = 1; break;
            case(height >= 168 && height <=172): this.heightLimit = 2; break;
            case(height >= 173 && height <=177): this.heightLimit = 3; break;
            case(height >= 178 && height <=182): this.heightLimit = 4; break;
            case(height >= 183 && height <=187): this.heightLimit = 5; break;
            case(height >= 188 && height <=192): this.heightLimit = 6; break;
            case(height >= 193 && height <=197): this.heightLimit = 7; break;
            case(height >= 198 && height <=200): this.heightLimit = 8; break;
        }
    }

    setWeightLimit(weight) {
        switch(true) {
            case(weight >= 45 && weight <=54): this.weightLimit = 0; break;
            case(weight >= 55 && weight <=68): this.weightLimit = 1; break;
            case(weight >= 69 && weight <=79): this.weightLimit = 2; break;
            case(weight >= 80 && weight <=90): this.weightLimit = 3; break;
            case(weight >= 91 && weight <=102): this.weightLimit = 4; break;
            case(weight >= 103 && weight <=115): this.weightLimit = 5; break;
        }
    }


    setAttributes(findPosition, attributes, heightChange, weightChange, heightLimit, weightLimit) {
        //console.log(heightChange[findPosition].Physicality.Jumping[heightLimit]);
        document.querySelector("#jumping .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Jumping + heightChange[findPosition].Physicality.Jumping[heightLimit] + weightChange[findPosition].Physicality.Jumping[weightLimit];
        document.querySelector("#stamina .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Stamina + heightChange[findPosition].Physicality.Stamina[heightLimit] + weightChange[findPosition].Physicality.Stamina[weightLimit];
        document.querySelector("#strenght .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Strenght + heightChange[findPosition].Physicality.Strenght[heightLimit] + weightChange[findPosition].Physicality.Strenght[weightLimit];
        document.querySelector("#reactions .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Reactions + heightChange[findPosition].Physicality.Reactions[heightLimit] + weightChange[findPosition].Physicality.Reactions[weightLimit];
        document.querySelector("#agression .buffSkillRating").innerHTML = attributes[findPosition].Physicality.Agression + heightChange[findPosition].Physicality.Agression[heightLimit] + weightChange[findPosition].Physicality.Agression[weightLimit];
        document.querySelector("#interceptions .buffSkillRating").innerHTML = attributes[findPosition].Defence.Interceptions + heightChange[findPosition].Defence.Interceptions[heightLimit] + weightChange[findPosition].Defence.Interceptions[weightLimit];
        document.querySelector("#marking .buffSkillRating").innerHTML = attributes[findPosition].Defence.Marking + heightChange[findPosition].Defence.Marking[heightLimit] + weightChange[findPosition].Defence.Marking[weightLimit];
        document.querySelector("#standingTackle .buffSkillRating").innerHTML = attributes[findPosition].Defence.StandingTackle + heightChange[findPosition].Defence.StandingTackle[heightLimit] + weightChange[findPosition].Defence.StandingTackle[weightLimit];
        document.querySelector("#slidingTackle .buffSkillRating").innerHTML = attributes[findPosition].Defence.SlidingTackle + heightChange[findPosition].Defence.SlidingTackle[heightLimit] + weightChange[findPosition].Defence.SlidingTackle[weightLimit];
        document.querySelector("#agility .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Agility + heightChange[findPosition].Dribbling.Agility[heightLimit] + weightChange[findPosition].Dribbling.Agility[weightLimit];
        document.querySelector("#balance .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Balance + heightChange[findPosition].Dribbling.Balance[heightLimit] + weightChange[findPosition].Dribbling.Balance[weightLimit];
        document.querySelector("#positioning .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Positioning + heightChange[findPosition].Dribbling.Positioning[heightLimit] + weightChange[findPosition].Dribbling.Positioning[weightLimit];
        document.querySelector("#ballControl .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.BallControl + heightChange[findPosition].Dribbling.BallControl[heightLimit] + weightChange[findPosition].Dribbling.BallControl[weightLimit];
        document.querySelector("#dribbling .buffSkillRating").innerHTML = attributes[findPosition].Dribbling.Dribbling + heightChange[findPosition].Dribbling.Dribbling[heightLimit] + weightChange[findPosition].Dribbling.Dribbling[weightLimit];
        document.querySelector("#vision .buffSkillRating").innerHTML = attributes[findPosition].Passing.Vision + heightChange[findPosition].Passing.Vision[heightLimit] + weightChange[findPosition].Passing.Vision[weightLimit];
        document.querySelector("#crossing .buffSkillRating").innerHTML = attributes[findPosition].Passing.Crossing + heightChange[findPosition].Passing.Crossing[heightLimit] + weightChange[findPosition].Passing.Crossing[weightLimit];
        document.querySelector("#longPassing .buffSkillRating").innerHTML = attributes[findPosition].Passing.LongPassing + heightChange[findPosition].Passing.LongPassing[heightLimit] + weightChange[findPosition].Passing.LongPassing[weightLimit];
        document.querySelector("#shortPassing .buffSkillRating").innerHTML = attributes[findPosition].Passing.ShortPassing + heightChange[findPosition].Passing.ShortPassing[heightLimit] + weightChange[findPosition].Passing.ShortPassing[weightLimit];
        document.querySelector("#curve .buffSkillRating").innerHTML = attributes[findPosition].Passing.Curve + heightChange[findPosition].Passing.Curve[heightLimit] + weightChange[findPosition].Passing.Curve[weightLimit];
        document.querySelector("#finishing .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Finishing + heightChange[findPosition].Shotting.Finishing[heightLimit] + weightChange[findPosition].Shotting.Finishing[weightLimit];
        document.querySelector("#fkaccuracy .buffSkillRating").innerHTML = attributes[findPosition].Shotting.FKAccuracy + heightChange[findPosition].Shotting.FKAccuracy[heightLimit] + weightChange[findPosition].Shotting.FKAccuracy[weightLimit];
        document.querySelector("#heading .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Heading + heightChange[findPosition].Shotting.Heading[heightLimit] + weightChange[findPosition].Shotting.Heading[weightLimit];
        document.querySelector("#shotPower .buffSkillRating").innerHTML = attributes[findPosition].Shotting.ShotPower + heightChange[findPosition].Shotting.ShotPower[heightLimit] + weightChange[findPosition].Shotting.ShotPower[weightLimit];
        document.querySelector("#longShots .buffSkillRating").innerHTML = attributes[findPosition].Shotting.LongShots + heightChange[findPosition].Shotting.LongShots[heightLimit] + weightChange[findPosition].Shotting.LongShots[weightLimit];
        document.querySelector("#volleys .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Volleys + heightChange[findPosition].Shotting.Volleys[heightLimit] + weightChange[findPosition].Shotting.Volleys[weightLimit];
        document.querySelector("#penalties .buffSkillRating").innerHTML = attributes[findPosition].Shotting.Penalties + heightChange[findPosition].Shotting.Penalties[heightLimit] + weightChange[findPosition].Shotting.Penalties[weightLimit];
        document.querySelector("#acceleration .buffSkillRating").innerHTML = attributes[findPosition].Pace.Acceleration + heightChange[findPosition].Pace.Acceleration[heightLimit] + weightChange[findPosition].Pace.Acceleration[weightLimit];
        document.querySelector("#sprintSpeed .buffSkillRating").innerHTML = attributes[findPosition].Pace.SprintSpeed + heightChange[findPosition].Pace.SprintSpeed[heightLimit] + weightChange[findPosition].Pace.SprintSpeed[weightLimit];
        document.querySelector("#diving .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Diving + heightChange[findPosition].Goalkeeper.Diving[heightLimit] + weightChange[findPosition].Goalkeeper.Diving[weightLimit];
        document.querySelector("#handling .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Handling + heightChange[findPosition].Goalkeeper.Handling[heightLimit] + weightChange[findPosition].Goalkeeper.Handling[weightLimit];
        document.querySelector("#kicking .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Kicking + heightChange[findPosition].Goalkeeper.Kicking[heightLimit] + weightChange[findPosition].Goalkeeper.Kicking[weightLimit];
        document.querySelector("#reflexes .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Reflexes + heightChange[findPosition].Goalkeeper.Reflexes[heightLimit] + weightChange[findPosition].Goalkeeper.Reflexes[weightLimit];
        document.querySelector("#keeperPositioning .buffSkillRating").innerHTML = attributes[findPosition].Goalkeeper.Positioning + heightChange[findPosition].Goalkeeper.Positioning[heightLimit] + weightChange[findPosition].Goalkeeper.Positioning[weightLimit];

    }
    
}

const controlapp = new ControlPanel();
