// JavaScript source code





//model

//warrior stats
let warrior = {
    str: 60,
    mag: 10,
    spd: 35,
    def: 60,
    weaponstr: 40,
    level: 1,
    enchantUntilTurn: 0,
    enchanted: false,
    unnerved: false,
}
//mage stats
let mage = {
    str: 15,
    mag: 65,
    spd: 10,
    def: 15,
    weaponstr: 70,
    level: 1,
    mute: false,
    unnerveCounter: 0,
    unnerveTimer: 0,
    barrierTimer: 0,
    barrierActive: false,
}
//healer stats
let healer = {
    str: 25,
    mag: 30,
    spd: 20,
    def: 30,
    weaponstr: 20,
    level: 1,
    unnerved: false,
    poisonStack: 0,
    prayed: false,
}
// ?first? boss stats
let boss1 = {
    str: 60,
    mag: 65,
    spd: 15,
    def: 60,
    weaponstr: 80,
    unnerved: false,
    bossTarget: ``,
    cankillwar: false,
    cankillhealer: false,
    cankillmage: false,
    deadlyStrikePrepared: false,
    megaFlameBreathPrepared: false,
}
let bossUsed = {
    deadlyStrike: 1,
    flameBreath: 1,
    clobber: 1,
    bossStrike: 1,
}
let bossWeight =
    [
        { weight: 0, name: "deadlyStrike" },
        { weight: 0, name: "flameBreath" },
        { weight: 0, name: "clobber"},
        { weight: 0, name: "bossStrike"}
]
let targetWeight = [

    { name: "warrior", weight: 0 },

    { name: "mage", weight: 0 },

    { name: "healer", weight: 0 }
]
/*weightDeadlystrike: 0,
    weightFlameBreath: 0,
        weightClobber: 0,
            weightBossstrike: 0,*/
let hadturn = {
    warrior: false,
    mage: false,
    healer: false,
    boss1: false,
    }
let currentTurn = 0;
let guardUntilTurn = 0;
// everyones health calculated through multiplication of their strength stat
let healthvalues = {
    warriormaxhealth: warrior.str * 20,
    warriorhealth: warrior.str * 20,
    magemaxhealth: mage.str * 20,
    magehealth: mage.str * 20,
    healermaxhealth: healer.str * 20,
    healerhealth: healer.str * 20,
    boss1maxhealth: boss1.str * 50,
    boss1health: boss1.str * 50,
}
let healthpercentage = {
    warrior: Math.round(100 * healthvalues.warriorhealth / healthvalues.warriormaxhealth),
    mage: Math.round(100 * healthvalues.magehealth / healthvalues.magemaxhealth),
    healer: Math.round(100 * healthvalues.healerhealth / healthvalues.healermaxhealth),
    boss1: Math.round(100 * healthvalues.boss1health / healthvalues.boss1maxhealth)
}
function updateHealth() {
    healthpercentage.warrior = Math.round(100 * healthvalues.warriorhealth / healthvalues.warriormaxhealth);
    healthpercentage.mage = Math.round(100 * healthvalues.magehealth / healthvalues.magemaxhealth);
    healthpercentage.healer = Math.round(100 * healthvalues.healerhealth / healthvalues.healermaxhealth);
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
let abilityVars = {
    guardArmor: warrior.def, 
    enchantBlade: 30 + warrior.level * 10,
    barrierArmor: Math.round(mage.mag / 3),
    }
let currentchar = "Warrior";
let randomstrikes = 0;
let multimove;
let onlytargetwar = false;
let animationVars = {
    px: "Px",
    warriorRight: 0,
    start: true,
    spellHeight: 200,
    spellWidth: 100,
    spellOpacity: 0,
    boss1Right: -40,
    fireBreathHeight: 100,
    fireBreathWidth: 100,
    fireBreathOpacity: 0,
}
let playing = false;
let animationInterval;
let intervalthing; //to clear health bar interval
let damageresult = 0; //result not initially intended however, helps calculate damage into progres bars. Pro tip don't use progress bars not enjoyable :(
function Mathrandom(weaponstrength, mainstat) {
    min = Math.ceil(weaponstrength + mainstat * 1);
    max = Math.floor(weaponstrength + mainstat * 3);

    return Math.floor(Math.random() * (max - min + 1) + min);
    console.log(Mathrandom)
} //not technically general math random. More like damage math random hoho, but calculates damage value by combining weaponstrength with mainstat, str for warrior mag for mage eks
// which then multiplies the mainstat by none for min and by 3 for max. meaning the damage output will be random between two numbers, aka min damage and max damage.
function critcalc(critchance) {
    chance = Math.floor(critchance) + 1;
    return Math.floor(Math.random() * chance);
}


//view

let stats =  `<div class="Stats"> Strength:${warrior.str} &nbsp;&nbsp;&nbsp;&nbsp; Strength:${mage.str}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Strength:${healer.str} <br>
              Magic:${warrior.mag} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magic:${mage.mag}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Magic:${healer.mag}<br>
              Speed:${warrior.spd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Speed:${mage.spd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Speed:${healer.spd} <br>
              Defence:${warrior.def} &nbsp;&nbsp;&nbsp;&nbsp;Defence:${mage.def} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Defence:${healer.def}</div>`

let otherStuff = `${stats}`

let currentcharmenu = `<button class="commandbuttons" id="fight" onclick="menuChange(this.innerHTML), music();">Fight</button>` //placeholder, just warrior for now. later on make a function that cycle between them.

commandBoxInner = `


<div class="commandbox">${currentcharmenu}<button class="commandbuttons">Bag</button><button class="commandbuttons">Placeholder</button><button class="commandbuttons">Run,coward.</button>
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

<div class="characterbox"><span class="fireBreath"style="height:${animationVars.fireBreathHeight}px; width:${animationVars.fireBreathWidth}px;opacity:${animationVars.fireBreathOpacity}% "></span><image id="warrior" class="characterimage warrior" style="right:${animationVars.warriorRight}px" src="img/warrior1.png"></image><image class="characterimage mage" src="img/mage1.png"></image><image class="characterimage healer" src="img/healer1.png"></image></div>


<div><image src="img/boss1.png" class="boss" style="right:${animationVars.boss1Right}px"><span class="spell" style="height:${animationVars.spellHeight}px;width:${animationVars.spellWidth}px;opacity:${animationVars.spellOpacity}%"></span></div>
<div class="bossmetersbox"><image class="characterimageboss head" src="img/bosshead.png"></image><div><progress id="healthbar" class="health bossbarhealth" style="width:200px" value="${healthvalues.boss1health}" max="${healthvalues.boss1maxhealth}"></progress><br>
<progress id="healthbar" class="bossbarmana mana" style="width:200px" value="${manavalues.boss1mana}" max="${manavalues.boss1maxmana}"></progress></div></div>


</div>





<div class="commandcontainer">

<div class="statdivs">Warrior<br>Health:<span class="red">${healthvalues.warriorhealth}</span>/<span class="red">${healthvalues.warriormaxhealth}</span><br>Mana:<span class="blue">${manavalues.warriormana}</span>/<span class="blue">${manavalues.warriormaxmana}</span></div>


<div class="statdivs">Mage<br>Health:<span class="red">${healthvalues.magehealth}</span>/<span class="red">${healthvalues.magemaxhealth}</span><br>Mana:<span class="blue">${manavalues.magemana}</span>/<span class="blue">${manavalues.magemaxmana}</span></div>

<div class="statdivs">Healer<br>Health:<span class="red">${healthvalues.healerhealth}</span>/<span class="red">${healthvalues.healermaxhealth}</span><br>Mana:<span class="blue">${manavalues.healermana}</span>/<span class="blue">${manavalues.healermaxmana}</span></div>

${otherStuff}



${commandBoxInner}</div >










`
}
//Function for otherview parts that arent in main view to update, what a hassle.
function otherview(){
    tooltipsWarrior.regularStrike = `The warrior performs a singular strike with his blade doing <span class="red">${warrior.weaponstr + warrior.str * 1}</span> - <span class="red">${warrior.weaponstr + warrior.str * 3}</span> in <span class="red">damage</span>.`;
    tooltipsWarrior.multiStrike = `Perform 2-3 regular strikes, each doing 25% less <span class="red">damage</span>. <span class="red">${Math.round(warrior.weaponstr + warrior.str * 1 / 1.25)}</span> - <span class="red">${Math.round(warrior.weaponstr + warrior.str * 3 / 1.25)}</span>.`,
    tooltipsWarrior.guard = `Defend your team and yourself for 3 rounds, during this time you will be unable to take any other actions, you taunt the target. And prepare yourself for impact, increasing your armor by ${abilityVars.guardArmor}.`
    tooltipsWarrior.enchantBlade = `You whisper a small incantation to your blade, it fills you with magical energies improving your physical prowess, improving your Strength by ${abilityVars.enchantBlade}`

    warriorMenu = `<div class=Stats><button class="smallercommandbuttons" onclick="regularStrike()"><span class="tooltip">${tooltipsWarrior.regularStrike}</span>Regular Strike</button>
                <button class="smallercommandbuttons" onclick="multiStrike()"><span class="tooltip">${tooltipsWarrior.multiStrike}</span>Multi strike</button><br>
                <button class="smallercommandbuttons" onclick="guard()"><span class="tooltip">${tooltipsWarrior.guard}</span> Guard</button >
                <button class="smallercommandbuttons" onclick="enchantBlade()"><span class="tooltip">${tooltipsWarrior.enchantBlade}</span>Enchant Blade</button></div>
`
    stats = `<div class="Stats"> Strength:${warrior.str} &nbsp;&nbsp;&nbsp;&nbsp; Strength:${mage.str}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Strength:${healer.str} <br>
              Magic:${warrior.mag} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magic:${mage.mag}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Magic:${healer.mag}<br>
              Speed:${warrior.spd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Speed:${mage.spd} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Speed:${healer.spd} <br>
              Defence:${warrior.def} &nbsp;&nbsp;&nbsp;&nbsp;Defence:${mage.def} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Defence:${healer.def}</div>`
    healerMenu = `<div class=Stats ><button class="smallercommandbuttons" onclick="heal('warrior')"><span class="tooltip">${tooltipsHealer.heal}</span>Heal</button>
                <button class="smallercommandbuttons" onclick="multiHeal('multi')"><span class="tooltip">${tooltipsHealer.multiHeal}</span>Multi Heal</button><br>
                <button class="smallercommandbuttons" onclick="poisonedSupplies()"><span class="tooltip">${tooltipsHealer.poisonedSupplies}</span>Poisoned Supplies</button>
                <button class="smallercommandbuttons"  onclick="empathsPrayer()"><span class="tooltip">${tooltipsHealer.empathsPrayer}</span>Empaths Prayer</button></div>`
    mageMenu = `<div class=Stats><button class="smallercommandbuttons" onclick="magicBolt()"><span class="tooltip">${tooltipsMage.magicBolt}</span>Magic Bolt</button>
                <button class="smallercommandbuttons" onclick="endlessTorrent()"><span class="tooltip">${tooltipsMage.endlessTorrent}</span>Endless Torrent</button><br>
                <button class="smallercommandbuttons" onclick="barrier()"><span class="tooltip">${tooltipsMage.barrier}</span>Barrier</button>
                <button class="smallercommandbuttons" onclick="lastWord()"><span class="tooltip">${tooltipsMage.lastword}</span>Last Word</button></div>`

    mageMenu2 = `<div class=Stats><button class="mutecommandbutton" onclick="unnerve()"><span class="tooltip">${tooltipsMage.unnerved}</span>Unnerve</button></div>`

}
//tooltips warrior
let tooltipsWarrior = {
    regularStrike: `The warrior performs a singular strike with his blade doing <span class="red">${warrior.weaponstr + warrior.str * 1}</span> - <span class="red">${warrior.weaponstr + warrior.str * 3}</span> in <span class="red">damage</span>.`,
    multiStrike: `Perform 2-3 regular strikes, each doing 25% less <span class="red">damage</span>. <span class="red">${Math.round(warrior.weaponstr + warrior.str * 1 / 1.25)}</span> - <span class="red">${Math.round(warrior.weaponstr + warrior.str * 3 / 1.25)}</span>.`,
    guard: `Defend your team and yourself for 3 rounds, during this time you will be unable to take any other actions, you taunt the target. And prepare yourself for impact, increasing your armor by ${abilityVars.guardArmor}.`,
    enchantBlade: `You whisper a small incantation to your blade, it fills you with magical energies improving your physical prowess, improving your Strength by ${abilityVars.enchantBlade}`,
}
//tooltips healer
let tooltipsHealer = {
    heal: `Heal your target for <span class="green">${healer.weaponstr + healer.mag} - ${healer.weaponstr + healer.mag * 3}</span> increased healing based on missing health of target. Up to 2x at <span class="red">25% health</span>.`,
    multiHeal: `Heal everyone in your party for <span class="green">${Math.round(healer.weaponstr + healer.mag / 1.5)} - ${Math.round(healer.weaponstr + healer.mag * 3 / 1.5)}</span>`,
    poisonedSupplies: `You attempt to poison the enemy, applying a stack of poison between <span class="green">1 - 3</span> at <span class="green">5</span> stacks, the target is stunned unable to act for a turn. This move does neglible damage if any.`,
    empathsPrayer: `Sacrifice your own life force, to heal your party to max health. this move leaves you at <span class="red">1 health</span> This move also permanently weakens all you abilities, can only be performed when at <span class="red">50% health</span> or above and only once.`,


}
//tooltips mage
let tooltipsMage = {
    magicBolt: `Deal between <span class="red">${mage.weaponstr + mage.mag} - ${mage.weaponstr + mage.mag * 3}</span> has a <span class="yellow">35%</span> to <span class="yellow">crit</span> for double damage`,
    endlessTorrent: `Unleash your endless pool of magic, casting a multitude of smaller magic bolts between 5 - 15 bolts. Each dealing <span class="red">${Math.round(mage.weaponstr + mage.mag / 2)} - ${Math.round(mage.weaponstr + mage.mag * 3 / 2)}</span> in damage. `,
    barrier: `Increase parties defence by ${abilityVars.barrierArmor} for 3 turns.`,
    lastword: `Utter your LAST word, you will never be the same again. Doing <span class="red">${mage.weaponstr + mage.mag * 4} - ${mage.weaponstr + mage.mag * 3 * 4}</span> in damage.`,
    unnerved: `You are no longer able of speech or thought. You are a mindless creature, however your latent magic has transformed you, you unnerve everyone around you reducing their defence by 20 (This Stacks infinitely and refreshes everytime you perform this move), and leech health from your target <span class="red">${mage.weaponstr + mage.mag} - ${mage.weaponstr + mage.mag * 3}</span>.`,
    }
let warriorMenu = `<div class=Stats><button class="smallercommandbuttons" onclick="regularStrike()"><span class="tooltip">${tooltipsWarrior.regularStrike}</span>Regular Strike</button>
                <button class="smallercommandbuttons" onclick="multiStrike()"><span class="tooltip">${tooltipsWarrior.multiStrike}</span>Multi strike</button><br>
                <button class="smallercommandbuttons" onclick="guard()"><span class="tooltip">${tooltipsWarrior.guard}</span> Guard</button>
                <button class="smallercommandbuttons" onclick="enchantBlade()"><span class="tooltip">${tooltipsWarrior.enchantBlade}</span>Enchant Blade</button></div>
`




let mageMenu = `<div class=Stats><button class="smallercommandbuttons" onclick="magicBolt()"><span class="tooltip">${tooltipsMage.magicBolt}</span>Magic Bolt</button>
                <button class="smallercommandbuttons"><span class="tooltip">${tooltipsMage.endlessTorrent}</span>Endless Torrent</button><br>
                <button class="smallercommandbuttons"><span class="tooltip">${tooltipsMage.barrier}</span>Barrier</button>
                <button class="smallercommandbuttons" onclick="lastWord()"><span class="tooltip">${tooltipsMage.lastword}</span>Last Word</button></div>`

let mageMenu2 = `<div class=Stats><button class="mutecommandbutton" onclick="unnerve()"><span class="tooltip">${tooltipsMage.unnerved}</span>Unnerve</button></div>`


let healerMenu = `<div class=Stats ><button class="smallercommandbuttons" onclick="heal('warrior')"><span class="tooltip">${tooltipsHealer.heal}</span>Heal</button>
                <button class="smallercommandbuttons" onclick="multiHeal('multi')"><span class="tooltip">${tooltipsHealer.multiHeal}</span>Multi Heal</button><br>
                <button class="smallercommandbuttons" onclick="poisonedSupplies()"><span class="tooltip">${tooltipsHealer.poisonedSupplies}</span>Poisoned Supplies</button>
                <button class="smallercommandbuttons" onclick="empathsPrayer()"><span class="tooltip">${tooltipsHealer.empathsPrayer}</span>Empaths Prayer</button></div>`

let fightMenu = `
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

function takedamage(target, damage, user) {
    if (user === "warrior") {
        samuraiStrike()
        animationInterval = setInterval(combatAnimation, 10, "warrior")

    }
    else if (user === "healer") {
    }
    else if (user === "mage") {
        magicSpell();
        animationInterval = setInterval(combatAnimation, 10, "mage")
    }
    else if (user === "boss1") {

    }
    if (target === "warrior") {
        damage -= warrior.def; //if the warrior is targeted it will deduct his defence from the damage. Reducing the damage done. 
        damageresult = damage; //changing the empty variable damageresult to store current damage, if I send it as a parameter the defence deduction does not apply.
        intervalthing = setInterval(damageanimation, 10, target, "damage"); //sets the animation for the damage, this function also filters out which bar needs to be reduced.
        console.log(damageresult);
    }
    else if (target === "mage") {
        damage -= mage.def;
        damageresult = damage;
        intervalthing = setInterval(damageanimation, 10, target, "damage");
        console.log(damageresult);
    }
    else if (target === "healer") {
        damage -= healer.def
        damageresult = damage;
        intervalthing = setInterval(damageanimation, 10, target, "damage");
        console.log(damageresult);
    }
    else if (target === "Boss1") {
        damage -= boss1.def;
        damageresult = damage;
        intervalthing = setInterval(damageanimation, 10, target, "damage");
        console.log(damageresult);
    }
    else if (target === "multi") {
        intervalthing = setInterval(damageanimation, 10, target, "damage");
    }
}
function becomeHealed(target) {
    if (target === "warrior") {
        
        intervalthing = setInterval(damageanimation, 10, target, "heal"); //sets the animation for the damage, this function also filters out which bar needs to be reduced.
        console.log(damageresult);
    }
    else if (target === "mage") {
        
        intervalthing = setInterval(damageanimation, 10, target, "heal");
        console.log(damageresult);
    }
    else if (target === "healer") {
        
        intervalthing = setInterval(damageanimation, 10, target, "heal");
        console.log(damageresult);
    }
    else if (target === "Boss1") {
        
        intervalthing = setInterval(damageanimation, 10, target, "heal");
        console.log(damageresult);
    }
    else if (target === "multi") {
        
        intervalthing = setInterval(damageanimation, 10, target, "heal");
        console.log(damageresult);
    }
}




function setvalues() { //dead code remove later, maybe turn it into a reset function later
    healthvalues.warriorhealth = healthvalues.warriormaxhealth;
}
function damageanimation(charClass, type) {
    if (type === "damage") {
        if (damageresult !== 0) {
            otherStuff = stats;
        }
        if (charClass === "chicken") {
            if (damageresult === 0) {
                clearInterval(intervalthing);
                view1();
                console.log(intervalthing);
            }
            else {
                healthvalues.warriorhealth--;
                healthvalues.healerhealth--;
                healthvalues.magehealth--;
                damageresult--;
                updateHealth();
            }
        }
        else if (charClass === "warrior") {
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
                updateHealth();
            }
        }
        else if (charClass === "healer") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.healerhealth--;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();

            }
        }
        else if (charClass === "mage") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.magehealth--;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();
            }

        }
        else if (charClass === "Boss1") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.boss1health--;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();
            }
        }
        else if (charClass === "multi") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
                
            }
            damageresult--;
            console.log(damageresult)
            if (damageresult - warrior.def <= 0) {

            }
            else {
                healthvalues.warriorhealth--;
            }
            if (damageresult - mage.def <= 0) {

            }
            else {
                healthvalues.magehealth--;
            }
            if (damageresult - healer.def <= 0) {

            }
            else {
                healthvalues.healerhealth--;
            }
            view1();

        }
        if (damageresult === 0) {
            menuChange("Fight");
        }
    }
    else if (type === "heal") {
        if (charClass === "multi") {
            if (damageresult === 0) {
                clearInterval(intervalthing);
                view1();
                console.log(intervalthing);
            }
            else {
                healthvalues.warriorhealth++;
                healthvalues.healerhealth++;
                healthvalues.magehealth++;
                damageresult--;
                view1();
                updateHealth();
            }
        }
        else if (charClass === "warrior") {
            if (damageresult === 0) {
                clearInterval(intervalthing);
                view1();
                console.log(intervalthing);
            }
            else {
                healthvalues.warriorhealth++;
                damageresult--;
                view1();
                console.log(damageresult);
                //if (healthvalues.warriorhealth === 0;) {
                //clearInterval(intervalthing)
                //alert (gameover)
                //}
                updateHealth();
            }
        }
        else if (charClass === "healer") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.healerhealth++;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();
            }


        }
        else if (charClass === "mage") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.magehealth++;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();
            }

        }
        else if (charClass === "Boss1") {
            if (damageresult === 0) {
                clearInterval(intervalthing)
                view1();
            }
            else {
                healthvalues.boss1health++;
                damageresult--;
                view1();
                console.log(damageresult);
                updateHealth();
            }


        }
        if (damageresult === 0) {
           menuChange("Fight");
        }
    }
}
function magespecial() {
    if (damageresult === 0) {
        clearInterval(intervalthing)
        menuChange("Fight");
    }
    else {
        healthvalues.magehealth++;
        healthvalues.boss1health--;
        damageresult--;
        console.log(damageresult);
        view1();
        updateHealth();
    }
}
function stopinterval() {
    clearInterval(intervalthing)
}
function menuChange(button) {
    otherview();
    charselect();
    char = currentchar;
    if (button === "Fight") {
        if (char === "Warrior") {
            otherStuff = warriorMenu;
        }
        else if (char === "Mage" && mage.mute === true) {
            otherStuff = mageMenu2;
        }
        else if (char === "Mage") {
            otherStuff = mageMenu;
        }
        else if (char === "Healer")
            otherStuff = healerMenu;
        }
    view1();
}
function charselect() {
    if (hadturn.warrior === false) {
        currentchar = "Warrior"
    }
    else if (hadturn.healer === false) {
        currentchar = "Healer"
    }
    else if (hadturn.boss1 === false) {
        setTimeout(bossBigBrain, 250);
        hadturn.boss1 = true;
    }
    else if (hadturn.mage === false) {
        currentchar = "Mage"
    }
    if (hadturn.mage === true && hadturn.boss1 === true && hadturn.warrior === true && hadturn.healer === true) {
        hadturn.mage = false;
        hadturn.healer = false;
        hadturn.boss1 = false;
        currentTurn++;
        if (onlytargetwar === true && guardUntilTurn <= currentTurn) {
            onlytargetwar = false;
            hadturn.warrior = false;
            warrior.def = warrior.def - abilityVars.guardArmor;
        }
        if (warrior.enchanted === true && warrior.enchantUntilTurn <= currentTurn) {
            warrior.str = warrior.str - abilityVars.enchantBlade;
            warrior.enchanted = false;
            console.log(warrior.enchanted)
            console.log(warrior.enchantUntilTurn)
            console.log(currentTurn)
        }
        if (boss1.unnerved && mage.unnerveTimer <= currentTurn) {
            warrior.def += mage.unnerveCounter;
            healer.def += mage.unnerveCounter;
            boss1.def += mage.unnerveCounter;
            mage.unnerveCounter = 0;
        }
        if (mage.barrierActive && mage.barrierTimer <= currentTurn) {
            barrierActive = false;
            warrior.def -= abilityVars.barrierArmor;
            healer.def -= abilityVars.barrierArmor;
            mage.def -= abilityVars.barrierArmor;
            }
        if (onlytargetwar === false) {
            hadturn.warrior = false;
        }
        else {
            hadturn.war = true;
        }
        menuChange();
    }
    
}
function regularStrike() {
    damage = teststat(warrior.weaponstr, warrior.str);
    takedamage("Boss1", damage,"warrior");
    hadturn.warrior = true;

    
}
function multiStrike() {
    randomstrikes = Math.floor(Math.random() * 2) + 2;
    duration = teststat(warrior.weaponstr, warrior.str) * 10;
    multimove = setInterval(multiStrikeExecution, duration)
    hadturn.warrior = true;


/*        if (damageresult === 0) {
            multiStrikeExecution();
        }
        else if (damageresult > 100) {
            setTimeout(multiStrikeExecution, 7000);
        }
        else if (damageresult > 50) {
            setTimeout(multiStrikeExecution, 5000);
        }
        else if (damageresult > 25) {
            setTimeout(multiStrikeExecution, 2500);
        }
        else if (damageresult < 15) {
            setTimeout(multiStrikeExecution, 1000);
        }
    */
} 
function guard() {
    onlytargetwar = true;
    guardUntilTurn = currentTurn + 3;
    hadturn.warrior = true;
    warrior.def = warrior.def + abilityVars.guardArmor;
    menuChange("Fight");

}
function enchantBlade() {
    warrior.str = warrior.str + abilityVars.enchantBlade;
    warrior.enchantUntilTurn = currentTurn + 2;
    regularStrike();
    hadturn.warrior = true;
    tooltipsWarrior;
    warrior.enchanted = true;
    menuChange("Fight");
}
function multiStrikeExecution() {
    if (randomstrikes !== 0) {
        randomstrikes--;
        damage = teststat(warrior.weaponstr, warrior.str)
        damage /= 1.25;
        damage = Math.round(damage);
        damageresult = damage;
        takedamage("Boss1", damageresult,"warrior");
        console.log(multiStrike);
    }
    else {
        clearInterval(multimove)

    }
}

//placeholder warrior moves

    /*let warriorMenu = `<div class=Stats><button class="smallercommandbuttons" onclick="regularStrike()">Regular Strike</button>
                <button class="smallercommandbuttons">Triple strike</button><br>
                <button class="smallercommandbuttons">Guard</button>
                <button class="smallercommandbuttons">Enchant Blade</button></div>`*/




//placeholder Healer moves
function heal(target) {
    damage = teststat(healer.weaponstr, healer.mag);
    if (target === "warrior") {
        health = healthpercentage.warrior;
    }
    else if (target === "healer") {
        health = healthpercentage.healer;
    }
    else if (target === "mage") {
        health = healthpercentage.mage;
    }
    if (health > 50 && health <= 75) {
        damageresult = Math.round(damage * 1.2);
    }
    else if (health > 25 && health <= 50) {
        damageresult = Math.round(damage * 1.5);
    }
    else if (health >= 1 && health <= 25) {
        damageresult = Math.round(damage * 2);
    }
    else {
        damageresult = damage
    }
    becomeHealed(target);
    hadturn.healer = true;
}
function multiHeal(target) {
    let heal = teststat(healer.weaponstr, healer.mag);
    damageresult = heal;
    damageresult /= 1.5;
    damageresult = Math.round(damageresult)
    becomeHealed(target);
    hadturn.healer = true;


}
//make it stun the boss when stacks hits 5 or something bruv, pretty cringe innit.
function poisonedSupplies() {
    healer.poisonStack += Math.floor(Math.random() * 3) + 1;
    hadturn.healer = true;
    if (healer.poisonStack >= 5) {
        healer.poisonStack = 0;
        hadturn.boss1 = true;
    }
    damage = teststat(healer.weaponstr, healer.mag);
    damageresult = damage;
    if ((damageresult -= boss1.def) <= 0) {
        menuChange("Fight");
        return;
    }
    damageresult += boss1.def;
    takedamage("Boss1", damageresult);
}
function empathsPrayer() {
    updateHealth();
    if (healer.prayed === true) {
        return
    }
    if (healthpercentage.healer <= 49) {
        return
    }
    healthvalues.healerhealth = 1;
    healthvalues.warriorhealth = healthvalues.warriormaxhealth;
    healthvalues.magehealth = healthvalues.magemaxhealth;
    healer.prayed = true;
    hadturn.healer = true;
    healer.weaponstr -= 20;
    menuChange("Fight");
    view1();
    

}






//placeholder Mage moves

function magicBolt() {
    damage = teststat(mage.weaponstr, mage.mag)
    if (critcalc(100) <= 35) {
        damageresult = damage * 2;
    }
    else {
        damageresult = damage
    }
    takedamage("Boss1", damageresult,"mage");
    hadturn.mage = true;
}
function endlessTorrent() {
    randomstrikes = Math.floor(Math.random() * 11) + 5;
    duration = teststat(mage.weaponstr, mage.mag) / 2 * 10;
    multimove = setInterval(endlessTorrentExecution, duration)
    hadturn.mage = true
}
function endlessTorrentExecution() {
    if (randomstrikes !== 0) {
        randomstrikes--;
        damage = teststat(mage.weaponstr, mage.mag)
        damage /= 2;
        damage = Math.round(damage);
        damageresult = damage;
        takedamage("Boss1", damageresult,"mage");
        console.log(multiStrike);
    }
    else {
        clearInterval(multimove)

    }
}
function barrier() {
    mage.barrierTimer = currentTurn + 3;
    warrior.def += abilityVars.barrierArmor;
    healer.def += abilityVars.barrierArmor;
    mage.def += abilityVars.barrierArmor;
    mage.barrierActive = true;
    hadturn.mage = true;
    menuChange("Fight");
}
function lastWord() {
    damage = teststat(mage.weaponstr, mage.mag);
    damageresult = damage * 4;
    takedamage("Boss1", damageresult,"mage");
    hadturn.mage = true;
       mage.mute = true;
}
function unnerve() {
    warrior.unnerved = true;
    healer.unnerved = true;
    boss1.unnerved = true;
    mage.unnerveCounter += 20;
    mage.unnerveTimer = currentTurn + 2;
    warrior.def -= 20;
    healer.def -= 20;
    boss1.def -= 20;
    damage = Math.round(teststat(mage.weaponstr, mage.mag) / 2)
    damageresult = damage -= boss1.def;
    hadturn.mage = true
    intervalthing = setInterval(magespecial, 10);
   
}



//placeholder Boss moves and logic

function bossstrike(target) {
    damage = teststat(boss1.weaponstr, boss1.str); //sends weaponstr and bossstr to be calculated in the mathrandom function through teststat(redundant really) then sets the damage to that value
    takedamage(target, damage); //variable target gets sent through onclick. depending on who it strikes the next function will apply differently.
    animationInterval = setInterval(bossAnimations, 10 , "bossStrike");
    samuraiStrike();
}
function clobber() {
    damage = Math.round(testat(boss1.weaponstre, boss1.str) * 1.5)
    if (healthpercentage.warrior > 0) {
        boss1.bossTarget = "warrior"
    }
    else if (healthpercentage.mage > 0) {
        boss1.bossTarget = "mage"
    }
    else if (healthpercentage.healer > 0) {
        boss1.bossTarget = "healer"
    }
}
function prepareDeadlyStrike() {
    boss1.deadlyStrikePrepared = true;
    hadturn.boss1 = true;
}
function deadlyStrike() {

    boss1.bossTarget = findBossTarget();

    damage = teststat(boss1.weaponstr, boss1.str) * 2;



    if (boss1.bossTarget === "warrior" && onlytargetwar === true || mage.barrierActive === true) {
        damageresult = Math.round(damage / 3);
    }
    else {
        damageresult = damage;
    }

    takedamage(boss1.bossTarget, damageresult);
    animationInterval = setInterval(bossAnimations, 10 ,"deadlyStrike")
    samuraiStrike();
}
function flameBreath() {
    damage = teststat(boss1.weaponstr, boss1.str)
    damageresult = Math.round(damage / 2)
    takedamage('multi', damageresult)
    animationInterval = setInterval(bossAnimations,10,"fireBreath");
    fireBreathSound();

}
function prepareMegaFlameBreath() {
    hadturn.boss1 = true
    megaFlameBreathPrepared = true
}
function megaFlameBreath() {
    damage = teststat(boss1.weaponstr, boss1.str)

    if (mage.barrierActive === true) {
        damageresult = damage / 4;
    }

    else {
        damageresult = damage * 4;
    } 
    hadturn.boss1 = true
    takedamage("multi", damageresult)
    animationInterval = setInterval(bossAnimations,10,"megaFireBreath")
    fireBreathSound();

}
function bossBigBrain() {
    newWeight();
    if (boss1.deadlyStrikePrepared == true) {
        deadlyStrike();
    }
    else if (boss1.megaFlameBreathPrepared == true) {
        megaFlameBreath(findBossTarget());
    }
    else if (onlytargetwar == true) {
        bossstrike('warrior')
    }
    else {
        cankill();
        if (boss1.cankillwar == true && boss1.cankillhealer == true && boss1.cankillmage == true) {
            prepareMegaFlameBreath(findBossTarget());
        }
        else if (boss1.cankillwar == true && healthpercentage.warrior > 0) {
            bossstrike('warrior')
        }
        else if (boss1.cankillmage == true && healthpercentage.mage > 0) {
            bossstrike("mage");
        }
        else if (boss1.cankillhealer == true && healthpercentage.healer > 0) {
            bossstrike("healer");
        }
        else {
            let move = bossWeighting();
            console.log(move)
            if (move === "deadlyStrike") {
                prepareDeadlyStrike();
                bossUsed.deadlyStrike++;

            }
            else if (move === "flameBreath") {
                flameBreath('multi');
                bossUsed.flameBreath++;

            }
            else if (move ==="clobber") {
                clobber(findBossTarget());
                bossUsed.clobber++;
            }
            else if (move === "bossStrike") {
                bossstrike(findBossTarget());
                bossUsed.bossStrike++;
            }
        }
    }
}
function newWeight() {
    bossWeight[0].weight = 0 //deadlyStrike
    bossWeight[1].weight = 0 //flameBreath
    bossWeight[2].weight = 0 //clobber
    bossWeight[3].weight = 0 //bossStrike
    targetWeight[0].weight = 40 //warrior
    targetWeight[1].weight = 20 //healer
    if (mage.mute === true) {
        targetWeight[2].weight = 60
    }
    else {
        targetWeight[2].weight = 15
    }
    if (currentTurn <= 2) {
        bossWeight[0].weight += 0
        bossWeight[1].weight += 0
        bossWeight[2].weight += 0
        bossWeight[3].weight += 100
        targetWeight[0].weight += 100
    }
    if (healthpercentage.warrior >= 70) {
        bossWeight[0].weight += 5
        bossWeight[1].weight += 15
        bossWeight[2].weight += 20
        bossWeight[3].weight += 30
    }
    if (healthpercentage.healer >= 70) {
        bossWeight[0].weight += 10
        bossWeight[1].weight += 15
        bossWeight[2].weight += 5
        bossWeight[3].weight += 10
    }
    if (healthpercentage.mage >= 70) {
        bossWeight[0].weight += 10
        bossWeight[1].weight += 20
        bossWeight[2].weight += 10
        bossWeight[3].weight += 5
    }
    if (healthpercentage.warrior >= 40 && healthpercentage.warrior <= 69) {
        bossWeight[0].weight += 10
        bossWeight[1].weight += 15
        bossWeight[2].weight += 20
        bossWeight[3].weight += 20
    }
    if (healthpercentage.mage >= 40 && healthpercentage.mage <= 69) {
        bossWeight[0].weight += 15
        bossWeight[1].weight += 30
        bossWeight[2].weight += 15
        bossWeight[3].weight += 5
    }
    if (healthpercentage.healer >= 40 && healthpercentage.healer <= 69) {
        bossWeight[0].weight += 10
        bossWeight[1].weight += 35
        bossWeight[2].weight += 20
        bossWeight[3].weight += 15
    }
    if (healthpercentage.warrior >= 1 && healthpercentage.warrior <= 39) {
        bossWeight[0].weight += 50
        bossWeight[1].weight += 15
        bossWeight[2].weight += 30
        bossWeight[3].weight += 15
    }
    if (healthpercentage.mage >= 1 && healthpercentage.mage <= 39) {
        bossWeight[0].weight += 30
        bossWeight[1].weight += 30
        bossWeight[2].weight += 30
        bossWeight[3].weight += 15
    }
    if (healthpercentage.healer >= 1 && healthpercentage.healer <= 39) {
        bossWeight[0].weight += 20
        bossWeight[1].weight += 35
        bossWeight[2].weight += 20
        bossWeight[3].weight += 5
    }
    if (healthpercentage.warrior <= 0) {
        bossWeight[0].weight += 0
        bossWeight[1].weight -= 1000
        bossWeight[2].weight += 0
        bossWeight[3].weight += 0
    }
    if (healthpercentage.mage <= 0) {
        bossWeight[0].weight += 0
        bossWeight[1].weight -= 30
        bossWeight[2].weight += 0
        bossWeight[3].weight += 0
    }
    if (healthpercentage.healer <= 0) {
        bossWeight[0].weight += 40
        bossWeight[1].weight -= 20
        bossWeight[2].weight += 0
        bossWeight[3].weight += 0
    }
    if (healthpercentage.boss1 <= 70) {
        bossWeight[0].weight += 0
        bossWeight[1].weight += 30
        bossWeight[2].weight += 0
        bossWeight[3].weight += 30
    }
    if (healthpercentage.boss1 >= 40 && healthpercentage.boss1 <= 69) {
        bossWeight[0].weight += 25
        bossWeight[1].weight += 40
        bossWeight[2].weight += 40
        bossWeight[3].weight += 25
    }
    if (healthpercentage.boss1 >= 1 && healthpercentage.boss1 <= 39) {
        bossWeight[0].weight += 60
        bossWeight[1].weight += 80
        bossWeight[2].weight += 60
        bossWeight[3].weight += 0
    }
    if (currentTurn >= 1) {
        for (i = currentTurn; i <= 0; i--) {
            bossWeight[0].weight += 5
            bossWeight[1].weight += 5
            bossWeight[2].weight += 4
            bossWeight[3].weight += 0
        }
    }
    if (healthpercentage.warrior <= 0) { 
        if (healthpercentage.warrior <= 99) {
            for (i = healthpercentage.warrior; i >= 100; i++) {
                targetWeight[0].weight += 1

            }
        }
    }
    if (healthpercentage.healer <= 0) { 
        if (healthpercentage.healer <= 99) {
            for (i = healthpercentage.healer; i >= 100; i++) {
                targetWeight[2].weight += 4
            }
        }
    }
    if (healthpercentage.mage <= 0) { 
        if (healthpercentage.mage <= 99) {
            for (i = healthpercentage.mage; i >= 100; i++) {
                if (mage.mute === true) {
                    targetWeight[1].weight += 10
                }
                else {
                    targetWeight[1].weight += 4
                }
            }
        }
    }
    if (healthpercentage.healer <= 0) {
        if (healer.poisonStack >= 1) {
            for (i = healer.poisonStack; i <= 0; i--) {
                targetWeight[2].weight += 10
            }
        }
    }
    for (i = bossUsed.deadlyStrike; i <= 0; i--) {
        bossWeight[0].weight -= 10;
    }
    for (i = bossUsed.flameBreath; i <= 0; i--) {
        bossWeight[1].weight -= 10;
    }
    for (i = bossUsed.clobber; i <= 0; i--) {
        bossWeight[2].weight -= 10;
    }
    for (i = bossUsed.bossStrike; i <= 0; i--) {
        bossWeight[3].weight -= 10;
    }
    console.log(bossWeight[0].weight, bossWeight[1].weight,targetWeight[1].weight)
}
function findBossTarget() {
    let mostweight = 0;
    let targetToKill = ("");
    let secondcycle = [];
    for (i = 0; i < targetWeight.length; i++) {
        if (targetWeight[i].weight >= mostweight) {
            secondcycle.push(targetWeight[i]);
            mostweight = targetWeight[i].weight
        }
    }
    targetToKill = secondcycle[Math.floor(Math.random() * secondcycle.length)].name
    return targetToKill;
}
// cycle through weight values, find which is highest, depending on which is highest send function name. Could have just sent the functions directly,- 
//but that prevents me from adding any other variables I might wanna use for the move.
function bossWeighting() {
    let mostweight = 0;
    let movetouse = ("");
    let secondcycle = [];
    let result = [];

    for (let i = 0; i < bossWeight.length; i++) {
        if (bossWeight[i].weight >= mostweight) {
            secondcycle.push(bossWeight[i]);
            mostweight = bossWeight[i].weight;
        }
    }
    for (let j = 0; j < secondcycle.length; j++) {
        if (secondcycle[j].weight >= mostweight) {
            result.push(secondcycle[j]);
            mostweight = secondcycle[j].weight;
            }
    }
    movetouse = result[Math.floor(Math.random() * result.length)].name //if there is a tie random move from tie is used.
    return movetouse;
}

function cankill() {
    maxhit = boss1.weaponstr + boss1.str * 3;
    warriorkill = maxhit - warrior.def
    healerkill = maxhit - healer.def
    magekill = maxhit - mage.def
    if (healthvalues.warriorhealth <= warriorkill) {
        boss1.cankillwar = true;
    }
    else {
        boss1.cankillwar = false;
    }
    if (healthvalues.healerhealth <= healerkill) {
        boss1.cankillhealer = true;
    }
    else {
        boss1.cankillhealer = false;
    }
    if (healthvalues.magehealth <= magekill) {
        boss1.cankillmage = true;
    }
    else {
        boss1.cankillmage = false;
    }
}

function combatAnimation(user,move) {
    if (user === "warrior" && animationVars.start === false) {
        animationVars.warriorRight += 20;
        view1();


        if (animationVars.warriorRight === 0) {
            animationVars.start = true;
            clearInterval(animationInterval);
        }
    }
    else if (user === "warrior" && animationVars.start === true) {
        animationVars.warriorRight -= 20;
        view1();
        if (animationVars.warriorRight === -400) {
            animationVars.start = false;
        }

    }
    else if (user === "mage" && animationVars.start === true) {
        animationVars.spellHeight += 10;
        animationVars.spellWidth += 20;
        animationVars.spellOpacity += 10;
        view1();
        if (animationVars.spellHeight === 260) {
            animationVars.start = false;
        }
    }
    else if (user === "mage" && animationVars.start === false) {
        animationVars.spellHeight -= 10;
        animationVars.spellWidth -= 20;
        animationVars.spellOpacity -= 10;
        view1();
        if (animationVars.spellHeight === 200) {
            animationVars.start = true;
            clearInterval(animationInterval);
        }
    }
}
function samuraiStrike() {
    let audio = document.createElement('audio');
        audio.setAttribute('src', 'sound/samurai-slash-6845.mp3');
    audio.volume = 0.2;
    audio.play();
}
function magicSpell() {
    let audio = document.createElement('audio');
    audio.setAttribute('src', 'sound/protego-105518.mp3');
    audio.volume = 0.2;
    audio.play();
}
function fireBreathSound() {
    let audio = document.createElement('audio');
    audio.setAttribute('src', 'sound/short-fireball-woosh-6146.mp3');
    audio.volume = 0.2;
    audio.play();
}
function music() {
    if (playing === true) {
        return
    }
    else {
        let audio = document.createElement('audio');
        audio.setAttribute('src', 'sound/alexander-nakarada-behind-the-sword.mp3');
        audio.volume = 0.1;
        audio.play();
        playing = true;
    }
}
function bossAnimations(move) {
    if (move === "bossStrike" && animationVars.start === true || move === "deadlyStrike" && animationVars.start === true) {
        animationVars.boss1Right += 10;
        view1();
        if (animationVars.boss1Right === 350) {
            animationVars.start = false
        }
    }
    else if (move === "bossStrike" && animationVars.start === false || move === "deadlyStrike" && animationsVars.start === false) {
        animationVars.boss1Right -= 10;
        view1();
        if (animationVars.boss1Right === -40) {
            clearInterval(animationInterval)
            animationVars.start = true;
        }
    }
    else if (move === "fireBreath" && animationVars.start === true || move === "megaFireBreath" && animationVars.start === true) {
        animationVars.fireBreathHeight += 5;
        animationVars.fireBreathWidth += 20;
        animationVars.fireBreathOpacity += 10;
        view1();
        if (animationVars.fireBreathWidth === 300) {
            animationVars.start = false;
        }
    }
    else if (move === "fireBreath" && animationVars.start === false || move === "megaFireBreath" && animationVars.start === false) {
        animationVars.fireBreathHeight -= 5;
        animationVars.fireBreathWidth -= 20;
        animationVars.fireBreathOpacity -= 10;
        view1();
        if (animationVars.fireBreathWidth === 100) {
            animationVars.start = true
            clearInterval(animationInterval);
        }
    }

}