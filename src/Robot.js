'use strict'
const {
  INITIAL_POSITION,
  DIRECTIONS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  MOVE_STEP,
  ROBOT_COLOR,
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
            console.log(`robot reset: ${this.position}`)
        }else{
            this.position = INITIAL_POSITION;
        }
        
       // this.ui.resetReport();
       // this.ui.render();
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
          console.log("ROTATE TO ", this.position.f);
      }
    moveRobot(){
    //Move one step forward based on direction
    console.log("tjis position in move",this.position);
    if(this.is_dead_corner(this.position)){
      console.log("REACH TO DEAD CORNER, TURN LEFT or RIGHT");
      return;
    }
    console.log(`MOVE`);

    // compare wiht deadPositions

     switch(this.position.f){
       
       case DIRECTIONS[0]:
        console.log("X Y",+this.position.x,+this.position.y+MOVE_STEP);
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
    console.log(`position in report after move,x=${this.position.x},y=${this.position.y},f=${this.position.f}`);
    return this.position;
  }
  is_dead_corner(position){
    console.log("position in is_dead corner", position);
    let positionFound = DEAD_CORNERS.filter(corner => 
      +corner[0] === position.x
      && +corner[1] === position.y
      && corner[2] === position.f.toUpperCase());
      
     //return positonFound ? true : false;
     if(positionFound && positionFound.length>0){
      console.log("is dead corner",positionFound.length);
       return true;
     }else{
       console.log("not dead corner");
       return false;
     }
      
  }
}
module.exports = { Robot }