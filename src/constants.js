
const DIRECTIONS = ["N","E","S","W"];
const INITIAL_POSITION = {x:0,y:0,f:DIRECTIONS[0]};
const ROBOT_COLOR = 'green'
const MOVE_STEP = 1;
const DIRECTION_LEFT = 'LEFT';
const DIRECTION_RIGHT = 'RIGHT';
const KEY_MAP = [
  {"key_name":"space","commands":"start"},
  {"key_name":"escape","commands":"exit"},
  {"key_name":"m","commands":"Move Forward"},
  {"key_name":"r","commands":"Get Report"},
  {"key_name":"p","commands":"Set StartPoint"},
  {"key_name":"a","commands":"Rotate To Left"},
  {"key_name":"a","commands":"Rotate To Left"},
  {"key_name":"d","commands":"Rotate To Right"},
]
const DEAD_CORNERS = ["55E","55N","50E","50S",'00S','00W','05N','05W'];
  

module.exports = {

  INITIAL_POSITION,
  DIRECTIONS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  MOVE_STEP,
  ROBOT_COLOR,
  KEY_MAP,
  DEAD_CORNERS
 
}
