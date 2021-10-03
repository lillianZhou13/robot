'use strict'
const {
  INITIAL_POSITION,
  DIRECTIONS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  MOVE_STEP,
  DEAD_CORNERS
  } = require('./constants');
  /*
  * Properties:
  * 1. Position(x,y,f)
  * 2. id(for Multi player)
  * 3. report
  *MainMethods:
  * resetRobot, move,changeFace
  * 
  */
class Robot {
    constructor(id,position=INITIAL_POSITION){
        this.position =position;
        this.id =id;
    } 
  
   
  resetRobot(newPosition){
        if(newPosition){
            this.position = [];
            this.position = newPosition;
            
        }else{
            this.position = INITIAL_POSITION;
        }
      
  }
      
  changeFace(direction){
      let currentFace = DIRECTIONS.indexOf(this.position.f);
          if(currentFace !== -1 && direction === DIRECTION_LEFT){
            this.position.f = currentFace === 0 ? DIRECTIONS[3] : DIRECTIONS[currentFace-1];
            
          }else if(currentFace !== -1&&direction === DIRECTION_RIGHT){
            this.position.f = currentFace === 3 ? DIRECTIONS[0] : DIRECTIONS[currentFace+1]; 
           
          }else{
              this.position.f = currentFace;
          }
          console.log("\nROTATE TO ", this.position.f);
  }

  //Move one step forward based on direction
  moveRobot(){
      if(this.is_dead_corner(this.position)){
        console.log("\nREACH TO DEAD CORNERS, TURN LEFT OR RIGHT");
      return;
    }
     console.log(`\nMOVE`);

    // compare wiht deadPositions

     switch(this.position.f){
       
       case DIRECTIONS[0]:
        this.position.y = this.position.y + MOVE_STEP;
        break;
       case DIRECTIONS[1]:
        this.position.x = this.position.x + MOVE_STEP
        break;
       case DIRECTIONS[2]:
        this.position.y = this.position.y - MOVE_STEP;
        break;
       case DIRECTIONS[3]:
        this.position.x = this.position.x - MOVE_STEP
        break;
      default:
          return this.position;
     }
   
  }

  getReport(){
    console.log(`\nREPORT x:${this.position.x},y:${this.position.y},f:${this.position.f}`);
  }

  is_dead_corner(position){
    
    let positionFound = DEAD_CORNERS.filter(corner => 
      +corner[0] === position.x
      && +corner[1] === position.y
      && corner[2] === position.f.toUpperCase());
      
     //return positonFound ? true : false;
     if(positionFound && positionFound.length>0){
      
       return true;
     }else{
       
       return false;
     }
      
  }
}


module.exports = { Robot }