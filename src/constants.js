
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
const DEAD_CORNERS = [
  {"x":5,"y":5,"f":"E"},
  {"x":5,"y":5,"f":"N"},
  {"x":5,"y":0,"f":"E"},
  {"x":5,"y":0,"f":"S"},
  {"x":0,"y":0,"f":"S"},
  {"x":0,"y":0,"f":"W"},
  {"x":0,"y":5,"f":"w"},
  {"x":0,"y":5,"f":"N"}
];

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
