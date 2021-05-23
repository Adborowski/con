// get width and height of #cloud
var cloudWidth = $("#cloud").width();
var cloudHeight = $("#cloud").height();
var sinWrappers = [];

function getSinsArrayFromDatabase(){

   $.ajax({
       url: "api-view-sins.php",
       type: "post",
       data: {},
   }).done(function(jData){
       var parsedData = JSON.parse(jData);
       var sins = parsedData;
       console.log("Fetched sins from database:", parsedData);
       renderSinsFromArray(sins);
       renderAdminPanel(sins);
       
   }); // end of .done
}

// render sins from array of strings
// note - rendering function is called INSIDE the above getSins function
function renderSinsFromArray(sins){

    sins.forEach(function(element){

        addSinToCloud(element.sin);
    });

    sinWrappers = $(".sinWrapper"); // grab all the DOM elements .sinWrapper
    randomizePositionsOfSins(); // first call

}

function addSinToCloud(text){

    // initial position randomizer, later it gets taken over
    // the 0.6 modifier is so that the items wouldn't be thrown too far
    var randomX = Math.random()*cloudWidth*0.6+("px");
    var randomY = Math.random()*cloudHeight*0.6+("px");
  
    $('#cloud').append(`
      <div class="sinWrapper" style="left: ${randomX}; top: ${randomY}"">
          <span class="sinText">${text}</span>
      </div>`
      ); 

}

getSinsArrayFromDatabase(); // first call

function randomizeNegativity(){ // I use this so my position randomizer gets a negative, but only half the time
    var token = Math.random(); // get a random number between 0 and 1
    if (token > 0.5){return 1} else {return -1};
}

var swingModifier = 0.3; // 0 - no movement, 1 - huge swinging movements, elements falling out of the frame
var moveDuration = 3; // 3 - very slow relaxed movement, too slow for W
var moveDelay = 0 // this makes the movement fluid - 1 is good

function randomizePositionsOfSins(){
    $.each(sinWrappers, function(){
        var randomX = Math.random()*randomizeNegativity()*cloudWidth*swingModifier+("px");
        var randomY = Math.random()*randomizeNegativity()*cloudHeight*swingModifier+("px");
        gsap.to(this, {x: randomX, y: randomY, delay: moveDelay, duration: moveDuration});
    })
};
window.setInterval(randomizePositionsOfSins, 3000); // subsequent calls every 3000 milliseconds

// submitting a new sin
$("#btn-submit").on("click", submitNewSin);
function submitNewSin(){

    var newSinContent = $("#txtNewSin").val();

    console.log("Submitting new sin:", newSinContent);

    $.ajax({
        url: "api-add-sin.php",
        data: {
            "newSinContent":newSinContent,
        },
        method: "post"
    }).done(function(sData){
        var parsedData = JSON.parse(sData);
        console.log(parsedData);
        addSinToCloud(newSinContent); // immediately after adding the frontend display is fake, on refresh it gets taken from DB
        sinWrappers = $(".sinWrapper"); // make sure the new sin is in the array
        $("#txtNewSin").val(""); // clear input
    });

} // end of .on

// submitting with ENTER
$("#txtNewSin").on("keyup", function(e){
    if (e.keyCode === 13){
        console.log("enter pressed");
        submitNewSin();
    }
});

// rendering items in the admin panel
function renderAdminPanel(sins){
    console.log("rendering Admin Panel", sins);
    sins.forEach(function(e){
        console.log(e);
        $("#adminPanel").append(`

            <div class="adminItem">
                <div class="id"> ${e.id} </div>
                <div class="content"> ${e.sin} </div>
                <div class="btn-delete" data-id="${e.id}"> delete </div>
            </div>
        
        `);
        
        // power the newly created button
        $(".btn-delete").on("click", function(e){
            deleteSin(parseInt(e.target.dataset.id));
        })
        
    })
}


function deleteSin(sinId){

}