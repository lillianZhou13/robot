const blessed = require('blessed')

/**
 * @class UserInterface
 *
 * Interact with the input (keyboard directions) and output (creating screen and
 * drawing pixels to the screen). Currently this class is one hard-coded
 * interface, but could be made into an abstract and extended for multiple
 * interfaces - web, terminal, etc.
 */
class UserInterface {
  constructor() {
    // Blessed is the terminal library API that provides a screen, elements, and
    // event handling
    this.blessed = blessed
    this.screen = blessed.screen()

    // Game title
    this.screen.title = 'Robot-move.js'

    // Create the boxes
    this.gameBox = this.createGameBox();
    this.reportBox = this.createReportBox();
    this.gameOverBox = this.createGameOverBox();

    this.gameContainer = this.blessed.box(this.gameBox);
    this.reportContainer = this.blessed.box(this.reportBox);
    
  }

  createGameBox() {
    return {
      parent: this.screen,
      top: 1,
      left: 0,
      width: '50em',
      height: '50em',
      border: {
        type: 'line',
      },
      style: {
        fg: 'black',
        bg: 'black',
        border: {
          fg: '#ffffff',
        },
      },
    }
  }

  createReportBox() {
    return {
      parent: this.screen,
      top: 0,
      left: 'left',
      width: '100%',
      content: `{center}Message\n\n{/center}`,
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'blue',
        
      },
    }
  }

  createGameOverBox() {
    return {
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 20,
      height: 6,
      tags: true,
      valign: 'middle',
      content: `{center}Game Over!\n\nPress enter to try again{/center}`,
      border: {
        type: 'line',
      },
      style: {
        fg: 'black',
        bg: 'magenta',
        border: {
          fg: '#ffffff',
        },
      },
    }
  }

  bindHandlers(keyPressHandler, quitHandler, enterHandler) {
    // Event to handle keypress i/o
    this.screen.on('keypress', keyPressHandler)
    this.screen.key(['escape', 'q', 'C-c'], quitHandler)
    this.screen.key(['enter'], enterHandler)
  }

  // Draw a pixel
  draw(coord, color) {
    this.blessed.box({
      parent: this.gameContainer,
      top: coord.y,
      left: coord.x,
      width: 1,
      height: 1,
      style: {
        fg: color,
        bg: color,
      },
    })
  }

  // Keep track of how many dots have been consumed and write to the score box
  updateReport(report) {
    this.reportContainer.setLine(0, `{bold}Report:{/bold}  x:${report.x},y:${report.x},f:${report.f}`)
  }

  // BSOD on game over
  gameOverScreen() {
    this.gameContainer = this.blessed.box(this.gameOverBox)
  }

  // Set to initial screen
  clearScreen() {
    this.gameContainer.detach()
    this.gameContainer = this.blessed.box(this.gameBox)
  }

  // Creating a new score box to prevent old snake segments from appearing on it
  resetReport() {
    this.reportContainer.detach()
    this.reportContainer = this.blessed.box(this.reportBox)
    this.updateReport({x:0,y:0,f:"east"});
  }

  render() {
    this.screen.render()
  }
}

module.exports = { UserInterface }
