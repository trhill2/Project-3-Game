/***********************************************************************************
  MoodyMaze
  by Scott Kildall

  Uses the p5.2DAdventure.js class 
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

//--- TEMPLATE STUFF: Don't change

// adventure manager global  
var adventureManager;

// p5.play
var playerAvatar;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;

//---

//-- MODIFY THIS for different speeds
var speed = 5;

//--- Your globals would go here


// Allocate Adventure Manager with states table and interaction tables
function preload() {
  //--- TEMPLATE STUFF: Don't change
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
  //---
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  //--- TEMPLATE STUFF: Don't change
  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();
  //---

  // MODIFY THIS: change to initial position
  playerAvatar = new Avatar("Player", 640, 400);
   
  // MODIFY THIS: to make your avatar go faster or slower
  playerAvatar.setMaxSpeed(20);

  // MODIFY THIS: add your filenames here, right now our moving animation and standing animation are the same
  playerAvatar.addMovingAnimation( 'assets/avatarrun1.png', 'assets/avatarrun2.png');
  playerAvatar.addStandingAnimation('assets/avatarstand1.png', 'assets/avatarstand2.png');

  //--- TEMPLATE STUFF: Don't change
  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerAvatar.sprite);

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
  //--

  // for testing
  // if( overlap && all items are true ) {
  //  adventureManager.changeState("NextRoom");
  //}
  adventureManager.changeState("Determined");
}

// Adventure manager handles it all!
function draw() {
  //--- TEMPLATE STUFF: Don't change
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
  //---

  //--- MODIFY THESE CONDITONALS
  // No avatar for Splash screen or Instructions screen
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    //--- TEMPLATE STUFF: Don't change    
    // responds to keydowns
    checkMovement();

    // this is a function of p5.play, not of this sketch
    drawSprite(playerAvatar.sprite);
    //--
  } 
}

//--- TEMPLATE STUFF: Don't change 
// respond to W-A-S-D or the arrow keys
function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = -speed;
  }

  playerAvatar.setSpeed(xSpeed,ySpeed);
}
//--

//-- MODIFY THIS: this is an example of how I structured my code. You may
// want to do it differently
function mouseReleased() {
  if( adventureManager.getStateName() === "Splash") {
    adventureManager.changeState("Instructions");
  }
}


//-------------- CLICKABLE CODE  ---------------//

//--- TEMPLATE STUFF: Don't change 
function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    // clickables[i].onHover = clickableButtonHover;
    // clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
//bantu 
  clickables[0].onHover = clickableButtonHover;
  clickables[0].onOutside = clickableButtonOnOutside;
  clickables[0].onPress = clickableButtonPressed;
  clickables[0].transparent = false;
  clickables[1].strokeWeight = 0;
  clickables[2].strokeWeight = 0;
  clickables[3].strokeWeight = 0;
  clickables[4].strokeWeight = 0;

}
//--

//-- MODIFY THIS:
// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

//-- MODIFY THIS:
// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}

//--- TEMPLATE STUFF: Don't change 
clickableButtonPressed = function() {
  // these clickables are ones that change your state
  // so they route to the adventure manager to do this
  adventureManager.clickablePressed(this.name); 
  if (this.name === "Bantu"){
    console.log("Bantu Pressed");
    playerAvatar.addMovingAnimation( 'assets/avatarbanturun1.png', 'assets/avatarbanturun2.png');
  playerAvatar.addStandingAnimation('assets/avatarbantustand1.png', 'assets/avatarbantustand2.png');
  }
  if (this.name === "Flow"){
    console.log("Flow Pressed");
    playerAvatar.addMovingAnimation( 'assets/avatarflowrun1.png', 'assets/avatarflowrun2.png');
  playerAvatar.addStandingAnimation('assets/avatarflowstand1.png', 'assets/avatarflowstand2.png');
  }
  if (this.name === "Braids"){
    console.log("Braids Pressed");
    playerAvatar.addMovingAnimation( 'assets/avatarbraidsrun1.png', 'assets/avatarbraidsrun2.png');
  playerAvatar.addStandingAnimation('assets/avatarbraidsstand1.png', 'assets/avatarbraidsstand2.png');
  }

  if (this.name === "Buns"){
    console.log("Buns Pressed");
    playerAvatar.addMovingAnimation( 'assets/avatarrun1.png', 'assets/avatarrun2.png');
    playerAvatar.addStandingAnimation('assets/avatarstand1.png', 'assets/avatarstand2.png');}


}
//



//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

//-- MODIFY THIS:
// Change for your own instructions screen

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class InstructionsScreen extends PNGRoom {
  // preload is where we define OUR variables
  // Best not to use constructor() functions for sublcasses of PNGRoom
  // AdventureManager calls preload() one time, during startup
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 

    // hard-coded, but this could be loaded from a file if we wanted to be more elegant
    // this.instructionsText = "You are navigating through the interior space of your moods. There is no goal to this game, but just a chance to explore various things that might be going on in your head. Use the ARROW keys to navigate your avatar around.";
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
  draw() {
    // tint down background image so text is more readable
    // tint(128);
      
    // this calls PNGRoom.draw()
    super.draw();
      
    // text draw settings
    fill(255);
    textAlign(CENTER);
    textSize(30);

    // Draw text in a box
    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}

//-- MODIFY THIS: for your own classes
// (1) copy this code block below
// (2) paste after //-- done copy
// (3) Change name of TemplateScreen to something more descriptive, e.g. "PuzzleRoom"
// (4) Add that name to the adventureStates.csv file for the classname for that appropriate room
class TemplateScreen extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // this calls PNGRoom.draw()
    super.draw();

    // Add your code here
  }
}
class HairRoom extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // this calls PNGRoom.draw()
    super.draw();

    // Add your code here
  }
}
class DocRoom extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    
    // an array of static sprites
    this.painLevels = [];
    
    // make an array of randomly-positioned static sprite
    this.painLevels.push(new StaticSprite("painlevel", random(0,width),random(0,height), 'assets/painlevel.png'));
    this.painLevels.push(new StaticSprite("painlevel", random(0,width),random(0,height), 'assets/painlevel.png'));
    this.painLevels.push(new StaticSprite("painlevel", random(0,width),random(0,height), 'assets/painlevel.png'));
    this.painLevels.push(new StaticSprite("painlevel", random(0,width),random(0,height), 'assets/painlevel.png'));

    // set intersect array elements to be false
    this.painLevelsCollected = [];
    for( let i = 0; i < this.painLevels.length; i++ ) {
      this.painLevelsCollected[i] = false;
    }

    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.hasSetup === false ) {
      for( let i = 0; i < this.painLevels.length; i++ ) {
        this.painLevels[i].setup();
      }

      this.hasSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();

    for( let i = 0; i < this.painLevels.length; i++ ) {
      // only draw the ones that weren't collected
      if( this.painLevelsCollected[i] === false ) {
        drawSprite(this.painLevels[i].sprite);
      }
    }

    // go through the pain levels and search for overlaps
    for( let i = 0; i < this.painLevels.length; i++ ) {
      if( playerAvatar.sprite.overlap(this.painLevels[i].sprite) ) {
        this.painLevelsCollected[i] = true;
      }
    }

    // Add your code here
  }

  // to add: get a count of how many were collected!
}

class NPCRoom extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Security", 900, 260, 'assets/npcavatarwalk1.png');
    this.npc1.addSingleInteraction("HEY! PUT THAT BACK! NO STEALING!");

    
    //this.npc2.addSingleInteraction("If you wouldn\'t mind...I could really use a star right now!");
    //this.npc2.setupQuest("Star", "Thanks! This is just what I needed", "I didn't ask for that!");

    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      // setup NPC 2
      //this.npc2.setup();
      // this.npc2.setPromptLocation(0,-100);

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    // drawSprite(this.npc2.sprite);

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    // this.npc2.displayInteractPrompt(playerAvatar);
  }

  // custom code here to do stuff upon exiting room
  // unload() {
  //   // reset NPC interaction to beginning when entering room
  //   this.npc2.resetInteraction();
  // }

  // custom code here to do stuff upon entering room
  load() {
    // pass to PNGRoom to load image
    super.load();
    
    // Add custom code here for unloading
  }

  // keyPressed() {
  //   if(key === ' ') {
  //     if(this.npc2.isInteracting(playerAvatar)) {
  //       this.npc2.continueInteraction();
  //     }
  //   }
  // }

}
//-- done copy

