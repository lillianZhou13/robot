const { UserInterface } = require('./src/UserInterface');
const { Game } = require('./src/Game');
//const game = new Game(new UserInterface());
const game = new Game();

process.stdin.on('keypress', game.keypressHandler);
