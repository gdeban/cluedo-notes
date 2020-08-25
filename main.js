const suspectListFR = [
    "Colonel Moutarde",
    "Professeur Violet",
    "Révérend Olive",
    "Mme Pervenche",
    "Mme Rose",
    "Mme Leblanc"
]

const weaponListFR = [
    "Poignard",
    "Chandelier",
    "Revolver",
    "Corde",
    "Matraque",
    "Clé anglaise"
]

const roomListFR = [
    "Hall",
    "Salon",
    "Salle à manger",
    "Cuisine",
    "Salle de bal",
    "Véranda",
    "Salle de billard",
    "Bibliothèque",
    "Bureau"
]

var playerList = [{name:"1"}, {name:"2"}, {name:"3"}];
var suspectList = suspectListFR;
var weaponList = weaponListFR;
var roomList = roomListFR;
var gameLog = []

var vm = new Vue({
    el:"#app",
    data: {
        playerList: playerList,
        suspectList: suspectList,
        weaponList: weaponList,
        roomList: roomList,
        gameLog: gameLog,
    }
})

function build() {

}

function buildSelectPlayer() {
    let selectPlayer = document.createElement("select");
    selectPlayer.name = "selectPlayer";
    {
        let option = document.createElement("option");
        option.innerHTML = "";
        selectPlayer.append(option);
    }
    playerList.forEach(playerName => {
        let option = document.createElement("option");
        option.innerHTML = playerName;
        selectPlayer.append(option);
    })
    return selectPlayer;
}

function buildSelectSuspect() {
    let selectSuspect = document.createElement("select");
    selectSuspect.name = "selectSuspect";
    suspectList.forEach(suspectName => {
        let option = document.createElement("option");
        option.innerHTML = suspectName;
        selectSuspect.append(option);
    })
    return selectSuspect;
}

function buildSelectWeapon() {
    let selectWeapon = document.createElement("select");
    selectWeapon.name = "selectWeapon";
    weaponList.forEach(weaponName => {
        let option = document.createElement("option");
        option.innerHTML = weaponName;
        selectWeapon.append(option);
    })
    return selectWeapon;
}

function buildSelectRoom() {
    let selectRoom = document.createElement("select");
    selectRoom.name = "selectRoom";
    roomList.forEach(roomName => {
        let option = document.createElement("option");
        option.innerHTML = roomName;
        selectRoom.append(option);
    })
    return selectRoom;
}

function addLogItem(elementBefore) {
    let ol = document.getElementById("olLogReversed");
    let li = document.createElement("li");

    if (elementBefore == undefined) {
        ol.prepend(li);
    }
    else {
        elementBefore.after(li);
    }

    li.append(buildSelectPlayer());
    li.append(buildSelectSuspect());
    li.append(buildSelectWeapon());
    li.append(buildSelectRoom());
    li.append(buildSelectPlayer());

    let buttonDelete = document.createElement("button");
    li.append(buttonDelete);
    buttonDelete.onclick = () => li.remove();
    buttonDelete.innerHTML = "🗑️";

    let buttonAddAfter = document.createElement("button");
    li.append(buttonAddAfter);
    buttonAddAfter.onclick = () => addLogItem(li);
    buttonAddAfter.innerHTML = "➕⬇";
}