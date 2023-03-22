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

        let basicJumping = attributes[findPosition].Physicality.Jumping + heightChange[findPosition].Physicality.Jumping[heightLimit] + weightChange[findPosition].Physicality.Jumping[weightLimit];
        let basicStamina = attributes[findPosition].Physicality.Stamina + heightChange[findPosition].Physicality.Stamina[heightLimit] + weightChange[findPosition].Physicality.Stamina[weightLimit];
        let basicStrenght = attributes[findPosition].Physicality.Strenght + heightChange[findPosition].Physicality.Strenght[heightLimit] + weightChange[findPosition].Physicality.Strenght[weightLimit];
        let basicReactions = attributes[findPosition].Physicality.Reactions + heightChange[findPosition].Physicality.Reactions[heightLimit] + weightChange[findPosition].Physicality.Reactions[weightLimit];
        let basicAgression = attributes[findPosition].Physicality.Agression + heightChange[findPosition].Physicality.Agression[heightLimit] + weightChange[findPosition].Physicality.Agression[weightLimit];
        let basicInterceptions = attributes[findPosition].Defence.Interceptions + heightChange[findPosition].Defence.Interceptions[heightLimit] + weightChange[findPosition].Defence.Interceptions[weightLimit];
        let basicMarking = attributes[findPosition].Defence.Marking + heightChange[findPosition].Defence.Marking[heightLimit] + weightChange[findPosition].Defence.Marking[weightLimit];
        let basicStandingTackle = attributes[findPosition].Defence.StandingTackle + heightChange[findPosition].Defence.StandingTackle[heightLimit] + weightChange[findPosition].Defence.StandingTackle[weightLimit];
        let basicSlidingTackle = attributes[findPosition].Defence.SlidingTackle + heightChange[findPosition].Defence.SlidingTackle[heightLimit] + weightChange[findPosition].Defence.SlidingTackle[weightLimit];
        let basicAgility = attributes[findPosition].Dribbling.Agility + heightChange[findPosition].Dribbling.Agility[heightLimit] + weightChange[findPosition].Dribbling.Agility[weightLimit];
        let basicBalance = attributes[findPosition].Dribbling.Balance + heightChange[findPosition].Dribbling.Balance[heightLimit] + weightChange[findPosition].Dribbling.Balance[weightLimit];
        let basicPositioning = attributes[findPosition].Dribbling.Positioning + heightChange[findPosition].Dribbling.Positioning[heightLimit] + weightChange[findPosition].Dribbling.Positioning[weightLimit];
        let basicBallControl = attributes[findPosition].Dribbling.BallControl + heightChange[findPosition].Dribbling.BallControl[heightLimit] + weightChange[findPosition].Dribbling.BallControl[weightLimit];
        let basicDribbling = attributes[findPosition].Dribbling.Dribbling + heightChange[findPosition].Dribbling.Dribbling[heightLimit] + weightChange[findPosition].Dribbling.Dribbling[weightLimit];
        let basicVision = attributes[findPosition].Passing.Vision + heightChange[findPosition].Passing.Vision[heightLimit] + weightChange[findPosition].Passing.Vision[weightLimit];
        let basicCrossing = attributes[findPosition].Passing.Crossing + heightChange[findPosition].Passing.Crossing[heightLimit] + weightChange[findPosition].Passing.Crossing[weightLimit];
        let basicLongPassing = attributes[findPosition].Passing.LongPassing + heightChange[findPosition].Passing.LongPassing[heightLimit] + weightChange[findPosition].Passing.LongPassing[weightLimit];
        let basicShortPassing = attributes[findPosition].Passing.ShortPassing + heightChange[findPosition].Passing.ShortPassing[heightLimit] + weightChange[findPosition].Passing.ShortPassing[weightLimit];
        let basicCurve = attributes[findPosition].Passing.Curve + heightChange[findPosition].Passing.Curve[heightLimit] + weightChange[findPosition].Passing.Curve[weightLimit];
        let basicFinishing = attributes[findPosition].Shotting.Finishing + heightChange[findPosition].Shotting.Finishing[heightLimit] + weightChange[findPosition].Shotting.Finishing[weightLimit];
        let basicFkaccuracy = attributes[findPosition].Shotting.FKAccuracy + heightChange[findPosition].Shotting.FKAccuracy[heightLimit] + weightChange[findPosition].Shotting.FKAccuracy[weightLimit];
        let basicHeading = attributes[findPosition].Shotting.Heading + heightChange[findPosition].Shotting.Heading[heightLimit] + weightChange[findPosition].Shotting.Heading[weightLimit];
        let basicShotPower = attributes[findPosition].Shotting.ShotPower + heightChange[findPosition].Shotting.ShotPower[heightLimit] + weightChange[findPosition].Shotting.ShotPower[weightLimit];
        let basicLongShots = attributes[findPosition].Shotting.LongShots + heightChange[findPosition].Shotting.LongShots[heightLimit] + weightChange[findPosition].Shotting.LongShots[weightLimit];
        let basicVolleys = attributes[findPosition].Shotting.Volleys + heightChange[findPosition].Shotting.Volleys[heightLimit] + weightChange[findPosition].Shotting.Volleys[weightLimit];
        let basicPenalties = attributes[findPosition].Shotting.Penalties + heightChange[findPosition].Shotting.Penalties[heightLimit] + weightChange[findPosition].Shotting.Penalties[weightLimit];
        let basicAcceleration = attributes[findPosition].Pace.Acceleration + heightChange[findPosition].Pace.Acceleration[heightLimit] + weightChange[findPosition].Pace.Acceleration[weightLimit];
        let basicSprintSpeed = attributes[findPosition].Pace.SprintSpeed + heightChange[findPosition].Pace.SprintSpeed[heightLimit] + weightChange[findPosition].Pace.SprintSpeed[weightLimit];
        let basicDiving = attributes[findPosition].Goalkeeper.Diving + heightChange[findPosition].Goalkeeper.Diving[heightLimit] + weightChange[findPosition].Goalkeeper.Diving[weightLimit];
        let basicHandling = attributes[findPosition].Goalkeeper.Handling + heightChange[findPosition].Goalkeeper.Handling[heightLimit] + weightChange[findPosition].Goalkeeper.Handling[weightLimit];
        let basicKicking = attributes[findPosition].Goalkeeper.Kicking + heightChange[findPosition].Goalkeeper.Kicking[heightLimit] + weightChange[findPosition].Goalkeeper.Kicking[weightLimit];
        let basicReflexes = attributes[findPosition].Goalkeeper.Reflexes + heightChange[findPosition].Goalkeeper.Reflexes[heightLimit] + weightChange[findPosition].Goalkeeper.Reflexes[weightLimit];
        let basicKeeperPositioning = attributes[findPosition].Goalkeeper.Positioning + heightChange[findPosition].Goalkeeper.Positioning[heightLimit] + weightChange[findPosition].Goalkeeper.Positioning[weightLimit];

        document.querySelector("#jumping .buffSkillRating").innerHTML = basicJumping;
        document.querySelector("#stamina .buffSkillRating").innerHTML = basicStamina;
        document.querySelector("#strenght .buffSkillRating").innerHTML = basicStrenght;
        document.querySelector("#reactions .buffSkillRating").innerHTML = basicReactions;
        document.querySelector("#agression .buffSkillRating").innerHTML = basicAgression;
        document.querySelector("#interceptions .buffSkillRating").innerHTML = basicInterceptions;
        document.querySelector("#marking .buffSkillRating").innerHTML = basicMarking;
        document.querySelector("#standingTackle .buffSkillRating").innerHTML = basicStandingTackle;
        document.querySelector("#slidingTackle .buffSkillRating").innerHTML = basicSlidingTackle;
        document.querySelector("#agility .buffSkillRating").innerHTML = basicAgility;
        document.querySelector("#balance .buffSkillRating").innerHTML = basicBalance;
        document.querySelector("#positioning .buffSkillRating").innerHTML = basicPositioning;
        document.querySelector("#ballControl .buffSkillRating").innerHTML = basicBallControl;
        document.querySelector("#dribbling .buffSkillRating").innerHTML = basicDribbling;
        document.querySelector("#vision .buffSkillRating").innerHTML = basicVision;
        document.querySelector("#crossing .buffSkillRating").innerHTML = basicCrossing;
        document.querySelector("#longPassing .buffSkillRating").innerHTML = basicLongPassing;
        document.querySelector("#shortPassing .buffSkillRating").innerHTML = basicShortPassing;
        document.querySelector("#curve .buffSkillRating").innerHTML = basicCurve;
        document.querySelector("#finishing .buffSkillRating").innerHTML = basicFinishing;
        document.querySelector("#fkaccuracy .buffSkillRating").innerHTML = basicFkaccuracy;
        document.querySelector("#heading .buffSkillRating").innerHTML = basicHeading;
        document.querySelector("#shotPower .buffSkillRating").innerHTML = basicShotPower;
        document.querySelector("#longShots .buffSkillRating").innerHTML = basicLongShots;
        document.querySelector("#volleys .buffSkillRating").innerHTML = basicVolleys;
        document.querySelector("#penalties .buffSkillRating").innerHTML = basicPenalties;
        document.querySelector("#acceleration .buffSkillRating").innerHTML = basicAcceleration;
        document.querySelector("#sprintSpeed .buffSkillRating").innerHTML = basicSprintSpeed;
        document.querySelector("#diving .buffSkillRating").innerHTML = basicDiving;
        document.querySelector("#handling .buffSkillRating").innerHTML = basicHandling;
        document.querySelector("#kicking .buffSkillRating").innerHTML = basicKicking;
        document.querySelector("#reflexes .buffSkillRating").innerHTML = basicReflexes;
        document.querySelector("#keeperPositioning .buffSkillRating").innerHTML = basicKeeperPositioning;

    }
    
}

const controlapp = new ControlPanel();
