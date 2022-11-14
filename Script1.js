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
function Mathrandom(weaponstrength, mainstat) {
    min = Math.ceil(weaponstrength + mainstat * 1);
    max = Math.floor(weaponstrength + mainstat * 3);

    return Math.floor(Math.random() * (max - min + 1) + min);
    console.log(Mathrandom)
}



//view
view1();
function view1() {
    document.getElementById("app").innerHTML = `


<div class="container">Hello
<div><button onclick="teststat(warrior.weaponstr, warrior.str)">damage warrior</button> <button onclick="teststat(mage.weaponstr, mage.mag)">damage mage</button><button onclick="teststat(healer.weaponstr, healer.mag)">healer damage</button></div></div>














`
}





//controller

//test function
function teststat(wep, stat) {
    let damage = Mathrandom(wep, stat) + warrior.weaponstr;
    console.log(damage);
}