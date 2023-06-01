

// Color Options
const contestantColors = ["Green", "Red", "Blue", "Orange", "Pink", "Black", "Periwinkle"];
const contestantComponents = ["CPU", "GPU", "Motherboard", "RAM", "SSD", "HDD", "PowerSupply"];


function randInArray(array){
    return array[Math.floor(Math.random() * array.length)];
}


function contestantName(){
    const cColor = randInArray(contestantColors);
    const cComponent = randInArray(contestantComponents);

    return `${cColor} ${cComponent}`;
}
let lat = 5;
let long = 10;

(function () {


    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          //You're logged in!
          playerId = user.uid;
          playerRef = firebase.database().ref(`players/${playerId}`);
    
          const name = createName();
          playerNameInput.value = name;
          playerRef.set({
            id: playerId,
            name,
            lat,
            long
          })
          //Remove contestant from Firebase when I disconnect
        playerRef.onDisconnect().remove();

        //Begin the game now that we are signed in
        initGame();
        } else {
      //You're logged out.
        }   
    })
    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // send error message to console
        console.log(errorCode, errorMessage);
      });
})();