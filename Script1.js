// JavaScript source code





//model

//warrior stats
let warrior = {
    str: 60,
    mag: 10,
    spd: 35,
    def: 60,
    weaponstr: 40,

}
//mage stats
let mage = {
    str: 15,
    mag: 65,
    spd: 10,
    def: 15,
    weaponstr: 70,
}
//healer stats
let healer = {
    str: 25,
    mag: 30,
    spd: 20,
    def: 30,
    weaponstr: 20,
}
// ?first? boss stats
let boss1 = {
    str: 60,
    mag: 65,
    spd: 15,
    def: 60,
    weaponstr:80,
}
// everyones health calculated through multiplication of their strength stat
let healthvalues = {
    warriormaxhealth: warrior.str * 10,
    warriorhealth: warrior.str * 10,
    magemaxhealth: mage.str * 10,
    magehealth: mage.str * 10,
    healermaxhealth: healer.str * 10,
    healerhealth: healer.str * 10,
    boss1maxhealth: boss1.str * 20,
    boss1health: boss1.str * 20,
}
// everyones mana values calculated through multiplication of their magic stat
let manavalues = {
    warriormaxmana: warrior.mag * 4,
    warriormana: warrior.mag * 4,
    magemaxmana: mage.mag * 4,
    magemana: mage.mag * 4,
    healermaxmana: healer.mag * 4,
    healermana: healer.mag * 4,
    boss1maxmana: boss1.mag * 10,
    boss1mana: boss1.mag * 10,
}
let intervalthing; //to clear health bar interval
let damageresult = 0; //result not initially intended however, helps calculate damage into progres bars. Pro tip don't use progress bars not enjoyable :(
function Mathrandom(weaponstrength, mainstat) {
    min = Math.ceil(weaponstrength + mainstat * 1);
    max = Math.floor(weaponstrength + mainstat * 3);

    return Math.floor(Math.random() * (max - min + 1) + min);
    console.log(Mathrandom)
} //not technically general math random. More like damage math random hoho, but calculates damage value by combining weaponstrength with mainstat, str for warrior mag for mage eks
// which then multiplies the mainstat by none for min and by 3 for max. meaning the damage output will be random between two numbers, aka min damage and max damage.



//view
commandBoxInner = `


<div class="commandbox"><button class="commandbuttons" id="fight"onclick="menuChange(this.innerHTML)">Fight</button><button class="commandbuttons">Bag</button><button class="commandbuttons">Placeholder</button><button class="commandbuttons">Run,coward.</button>
</div>`

view1();
function view1() {
    
    document.getElementById("app").innerHTML = `


<div class="container">
<div class="valuebox"><image class="head" src="img/healerhead.png"></image><div><progress id="healthbar" class="health" value="${healthvalues.healerhealth}" max="${healthvalues.healermaxhealth}"></progress><br>
<progress id="healthbar" class="mana" value="${manavalues.healermana}" max="${manavalues.healermaxmana}"></progress></div>

<image class="head" src="img/magehead.png"></image><div><progress id="healthbar" class="health" value="${healthvalues.magehealth}" max="${healthvalues.magemaxhealth}"></progress><br>
<progress id="healthbar" class="mana" value="${manavalues.magemana}" max="${manavalues.magemaxmana}"></progress></div>


<image class="head" src="img/warriorhead.png"></image><div><progress id="healthbar" class="health" value="${healthvalues.warriorhealth}" max="${healthvalues.warriormaxhealth}"></progress><br>
<progress id="healthbar" class="mana" value="${manavalues.warriormana}" max="${manavalues.warriormaxmana}"></progress></div></div>

<div class="characterbox"><image class="characterimage warrior" src="img/warrior1.png"></image><image class="characterimage mage" src="img/mage1.png"></image><image class="characterimage healer" src="img/healer1.png"></image></div>


<div><image src="img/boss1.png" class="boss"></div>
<div class="bossmetersbox"><image class="characterimageboss head" src="img/bosshead.png"></image><div><progress id="healthbar" class="health bossbarhealth" style="width:200px" value="${healthvalues.boss1health}" max="${healthvalues.boss1maxhealth}"></progress><br>
<progress id="healthbar" class="bossbarmana mana" style="width:200px" value="${manavalues.boss1mana}" max="${manavalues.boss1maxmana}"></progress></div></div>


</div>





<div class="commandcontainer">

<div>Warrior<br>Health:<span class="red">${healthvalues.warriorhealth}</span>/<span class="red">${healthvalues.warriormaxhealth}</span><br>Mana:<span class="blue">${manavalues.warriormana}</span>/<span class="blue">${manavalues.warriormaxmana}</span></div>

<div>Mage<br>Health:<span class="red">${healthvalues.magehealth}</span>/<span class="red">${healthvalues.magemaxhealth}</span><br>Mana:<span class="blue">${manavalues.magemana}</span>/<span class="blue">${manavalues.magemaxmana}</span></div>

<div>Healer<br>Health:<span class="red">${healthvalues.healerhealth}</span>/<span class="red">${healthvalues.healermaxhealth}</span><br>Mana:<span class="blue">${manavalues.healermana}</span>/<span class="blue">${manavalues.healermaxmana}</span></div>

${commandBoxInner}</div >










`
}
fightMenu = `
<button onclick="teststat(warrior.weaponstr, warrior.str)">damage warrior</button> 
<button onclick="teststat(mage.weaponstr, mage.mag)">damage mage</button>
<button onclick="teststat(healer.weaponstr, healer.mag)">healer damage</button>
<button onclick="bossstrike('warrior')">boss damage</button>
<button onclick="bossstrike('healer')">boss damage</button>
<button onclick="bossstrike('mage')">boss damage</button>
</div></div>`





//controller

//test function
function teststat(wep, stat) { //technically redundant, may have some use in the future.
    return Mathrandom(wep, stat);
}
function bossstrike(target) {
    damage = teststat(boss1.weaponstr, boss1.str); //sends weaponstr and bossstr to be calculated in the mathrandom function through teststat(redundant really) then sets the damage to that value
    takedamage(target, damage); //variable target gets sent through onclick. depending on who it strikes the next function will apply differently.
}


function takedamage(target, damage) {
    if (target === "warrior") {
        damage -= warrior.def; //if the warrior is targeted it will deduct his defence from the damage. Reducing the damage done. 
        damageresult = damage; //changing the empty variable damageresult to store current damage, if I send it as a parameter the defence deduction does not apply.
        intervalthing = setInterval(damageanimation, 10, target); //sets the animation for the damage, this function also filters out which bar needs to be reduced.
        console.log(damageresult);
    }
    else if (target === "mage") {
        damage -= mage.def;
        damageresult = damage;
        intervalthing = setInterval(damageanimation, 10, target)
        console.log(damage);
    }
    else if (target === "healer") {
        damage -= healer.def
        damageresult = damage;
        intervalthing = setInterval(damageanimation, 10, target)
        console.log(damage);
    }
}
function setvalues() {
    healthvalues.warriorhealth = healthvalues.warriormaxhealth;
}
function damageanimation(charClass){
    if (charClass === "warrior") {
        if (damageresult === 0) {
            clearInterval(intervalthing);
            view1();
            console.log(intervalthing);
        }
        else {
            healthvalues.warriorhealth--;
            damageresult--;
            view1();
            console.log(damageresult);
            //if (healthvalues.warriorhealth === 0;) {
            //clearInterval(intervalthing)
            //alert (gameover)
        //}
        }
    }
    else if (charClass === "healer") {
        if (damage === 0) {
            clearInterval(intervalthing)
            view1();
        }
        else {
            healthvalues.healerhealth--;
            damage--;
            view1();
            console.log(damage);
            
        }


    }
    else if (charClass === "mage") {
        if (damage === 0) {
            clearInterval(intervalthing)
            view1();
        }
        else {
            healthvalues.magehealth--;
            damage--;
            view1();
            console.log(damage);
        }

    }
    else {
        clearInterval(intervalthing)
        view1();
    }
}
function stopinterval() {
    clearInterval(intervalthing)
}
function menuChange(button) {
    if (button === "Fight")
        commandBoxInner = fightMenu;
    view1();
}