const suspectsFR = [
    "Colonel Moutarde",
    "Professeur Violet",
    "Révérend Olive",
    "Mme Pervenche",
    "Mme Rose",
    "Mme Leblanc"
]

const weaponsFR = [
    "Poignard",
    "Chandelier",
    "Revolver",
    "Corde",
    "Matraque",
    "Clé anglaise"
]

const roomsFR = [
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

let id = 0;
var players = [{name:"1"}, {name:"2"}, {name:"3"}];
var suspects = []; id = 0; suspectsFR.forEach(v => suspects.push({id: id++, name: v}));
var weapons = []; id = 0; weaponsFR.forEach(v => weapons.push({id: id++, name: v}));
var rooms = []; id= 0; roomsFR.forEach(v => rooms.push({id: id++, name: v}));
var suggestions = [];
var summary = {};



function computeSummary() {
    let playerIx = 0;
    players.forEach(function (player) {
        player.cards = {suspects:[], weapons:[], rooms:[]};
        suspects.forEach(s => player.cards.suspects.push("?"));
        weapons.forEach(s => player.cards.weapons.push("?"));
        rooms.forEach(s => player.cards.rooms.push("?"));
        player.ix = playerIx++;
    });
    suggestions.forEach(suggestion => {
        // mark cards that players have)
        if (suggestion.answer == "suspect") suggestion.playerAnswered.cards.suspects[suggestion.suspect.id] = "yes";
        else if (suggestion.answer == "weapon") suggestion.playerAnswered.cards.weapons[suggestion.weapon.id] = "yes";
        else if (suggestion.answer == "room") suggestion.playerAnswered.cards.rooms[suggestion.room.id] = "yes";
        // mark cards that players don't have
        let playerStop = suggestion.playerAnswered == null ? suggestion.playerAsked : suggestion.playerAnswered;
        playersBetween(suggestion.playerAsked, playerStop).forEach(player => {
            player.cards.suspects[suggestion.suspect.id] = "no";
            player.cards.weapons[suggestion.weapon.id] = "no";
            player.cards.rooms[suggestion.room.id] = "no";
        })
    });
}

computeSummary();

var vm = new Vue({
    el:"#app",
    data: {
        players: players,
        suspects: suspects,
        weapons: weapons,
        rooms: rooms,
        suggestions: suggestions,
        summary: summary
    },
    methods: {
        addPlayer: function (event) {
            this.players.push({name: ""});
            computeSummary();
        },
        moveInArray: function (input, from, to) {
            const elm = input.splice(from, 1)[0];
            input.splice(to, 0, elm);
        },
        addSuggestion: function (index) {
            suggestions.splice(index, 0, {id: suggestions.length, playerAsked: "", suspect:"", weapon: "", room:"", playerAnswered:""});
        },
        computeSummary: computeSummary
    }
});

function playersBetween(player1, player2) {
    if (player2.ix <= player1.ix) {
        return players.slice(0, player2.ix).concat(players.slice(player1.ix + 1));
    }
    else return players.slice(player1.ix + 1, player2.ix);
}

