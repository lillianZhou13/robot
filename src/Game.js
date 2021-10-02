const {
  GAME_SPEED,
  INITIAL_POSITION,
  DIRECTIONS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  MOVE_STEP,
  ROBOT_COLOR,
  KEY_MAP,
  DEAD_CORNERS

} = require('./constants');
const { Robot } = require('./Robot');
const readline = require('readline');
const prm = require("prompt-sync")();
const { ui } =  require("./UserInterface");
const keyToListen=["space","escape","m","r","p","a","d"];
readline.emitKeypressEvents(process.stdin);


if(process.stdin.isTTY){
  process.stdin.setRawMode(true);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



/**
 * @class Game
 *
 * The Game class tracks the state of three things:
 *
 * 1. Position(x,y,f)
 * 2.id
 * 
 *MainMethods:
 * start,exit,getReport,faceOnchange,promptNewPosition
 * listKeys()
 */
class Game extends Robot {
  constructor(id,position =INITIAL_POSITION) {
  
    super(id,position);
        this.position =position;
        this.id =id;
        this.ui = ui;
        this.is_dead_corner('55N');
        this.is_dead_corner('23n');

       
   }
    
  
 promptNewPosition = () => {
  console.log("TYPE IN POSITION (x,y,f)");
  rl.write(null, { ctrl: true, name: 'u' });
  rl.on('line', (place) => {
    
    console.log("line---",place);
 
    //check if input is two int between(0-5)
  if(place && place.length === 3) {
    
     
    if(!this.is_dead_corner(place)){
      
      if (place.slice(0,2).match(/^([0-5][0-5]){1}$/)){
        place[2] ==place[2].toUpperCase();
        if(DIRECTIONS.indexOf(place[2])!==-1){
          this.position = {
            x:+place[0],
            y:+place[1],
            f:place[2]
          };
          console.log(`robot position, ${this.position.f}`);
          this.resetRobot(this.position);
          process.stdin.on('keypress', this.keypressHandler);
         
        
        }else{
          console.log("UNVALIDATED INPUT --- NOT VALIDATED FACE");
          this.promptNewPosition();
          
        }
        
       }else{
        console.log("UNVALIDATED INPUT --- FIRST TWO NOT VALIDATED NUMBER");
        this.promptNewPosition();
       }
    }else{
      console.log("UNVALIDATED INPUT --- DEAD CORNER");
      this.promptNewPosition();
    }
  
    } else{
      console.log("UNVALIDATED INPUT --- TOO LONG");
      this.promptNewPosition();
    }
  });
}

faceOnChange(key) {
    
    if ((key.name.toUpperCase() === DIRECTION_LEFT || key.name === 'a')) {
      this.changeFace(DIRECTION_LEFT);
      console.log("changeFace key",DIRECTION_LEFT);
    }
    if ((key.name.toUpperCase() === DIRECTION_RIGHT || key.name === 'd') ) {
      this.changeFace(DIRECTION_RIGHT);
      console.log("changeFace key",DIRECTION_RIGHT);
    }
  }

 
getReport(){
    return this.report;
  }
 

quit(){
    process.exit()
  }
listKeys(){
    KEY_MAP.map(item=>{
        console.log(`${item.key_name} --- ${item.commands}`)
    });
}
 keypressHandler = (chunk,key) => {
  console.log("Keypresshandler on");
 
  if(key && key.name){

    if(!keyToListen.includes(key.name)){

      process.stdout.write(`\n ---Please choose commands from below---- \n`);
      this.listKeys();
      //return;

    }else{
      if(key&&key.name === "space"){
        this.promptNewPosition();
     }else if(key && key.name === "escape"){
       process.exit();
     }else if(key && key.name === "m"){ 
      this.moveRobot();
     }else if(key && key.name === "r"){ 
      this.getReport();
     }else if(key && key.name === "p"){
        rl.on("line",this.promptNewPosition);
        process.stdin.off('keypress', this.keypressHandler);
        this.promptNewPosition();
     }else if(key && (key.name === "a"||key.name === "d")){ 
        this.faceOnChange(key);
     }
    }

  }



  
    
}


}

module.exports = { Game }
