class Engine { // 1
  gameLoop = () => { // 7
    if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime() // 8
    let timeDiff = (new Date).getTime() - this.lastFrame // 8
    this.lastFrame = (new Date).getTime() // 8

    this.enemies.forEach(enemy => { // 9
      //enemy.speedUp() // 9
    }) // 9

    this.enemies.forEach(enemy => { // 9
      enemy.update(timeDiff) // 9
    }) // 9
    this.enemies = this.enemies.filter(enemy => { // 10
      return !enemy.destroyed // 10
    }) // 10

    while (this.enemies.length < MAX_ENEMIES) { // 11
      let spot = nextEnemySpot(this.enemies) // 12
      this.enemies.push(new Enemy(this.root, spot)) // 12
    } // 11

    this.playerDead = this.enemies.some(enemy => {
      if(   ( 
                ( (this.player.x + PLAYER_WIDTH) > enemy.x          &&   (this.player.x + PLAYER_WIDTH)  <= (enemy.x + ENEMY_WIDTH) )
                ||  ( (enemy.x + ENEMY_WIDTH)    > this.player.x    &&   (enemy.x + ENEMY_WIDTH)         <= (this.player.x + PLAYER_WIDTH) ) 
            )
         && (
                ( (this.player.y + PLAYER_HEIGHT) > enemy.y         &&   (this.player.y + PLAYER_HEIGHT) <= (enemy.y + ENEMY_HEIGHT)) 
                || ( (enemy.y + ENEMY_HEIGHT)     > this.player.y   &&   (enemy.y + ENEMY_HEIGHT)        <= (this.player.y + PLAYER_HEIGHT)) 
            )         
        ){
        return true;
      }
    }) 

    setTimeout(this.updateScore, this.timeIntervalScore);
    if (this.isPlayerDead()) { // 13
      //window.alert("Game over") // 13
      this.text.update("Game over")
      return // 13
    } // 13

    setTimeout(this.setRandomNumEnemies(1,5), 10000) //Question 3 Increase the maximum number of enemies every 10 seconds (to a maximum of 5)
    setTimeout(this.gameLoop, this.timeIntervalLoop) // 14
  } // 7
  setRandomNumEnemies = (min, max) => {
    MAX_ENEMIES = Math.floor((Math.random() * max - min +1 ) + min);
  }

  updateScore = () =>{
    /*Question 4(slide 79)
    Add text at the top right to show what your score is. Use the Text class provided in Text.js . 
    The score should increase as the game progresses.*/
    if(!this.playerDead){
      this.score ++
      this.text.update("" + this.score)
    }
  }

  isPlayerDead = () => { // 15
    //return false // 15
    return this.playerDead
  } // 15
  constructor(theRoot) { // 2
    this.root = theRoot // 3
    this.player = new Player(this.root) // 4
    this.enemies = [] // 5
    addBackground(this.root) // 6

    this.score = 0
    this.text = new Text(this.root,10,10) //(root, xPos, yPos)
    this.timeIntervalLoop = 1000
    this.timeIntervalScore = 2000

    this.playerDead = false
  } // 2
} // 1

/* meta
({
  text: {
    1: `The engine class will only be instantiated once. It contains all the logic
    of the game relating to the interactions between the player and the
    enemy and also relating to how our enemies are created and evolve over time  `,
    2: `The constructor has one parameter. It will refer to the DOM node that we will be adding everything to. You
    need to provide the DOM node when you create an instance of the class
    
    Here is an example of how you could create an instance of this class

\`\`\`javascript
    document.getElementById("app") // assuming you have a DOM element with an id of "app"
\`\`\`
    `,

    3: `We need the DOM element every time we create a new enemy so we store a reference to it in a 
    property of the instance`,
    4: `We create our hamburger. Please refer to Player.js for more information about what happens when
    you create a player`,
    5: `Initially, we have no enemies in the game. The \`enemies\` property refers to an array
    that contains instances of the Enemy class `,
    6: `We add the background image to the game `,


    7: `The gameLoop will run every few milliseconds. It does several things
- Updates the enemy positions 
- Detects a collision between the player and any enemy
- Removes enemies that are too low from the \`enemies\` array`,
    8: `This code is to see how much time, in milliseconds, has elapsed since the last
    time this method was called.

    The code 
\`\`\`javascript
    (new Date).getTime()
\`\`\`
    evaluates to the number of milliseconds since January 1st, 1970 at midnight.

    If the method was never called then \`this.lastFrame\` is undefined and 
    we set \`this.lastFrame\` to the current time. This only happens once.

    We take the difference between the current time and \`this.lastFrame\`. Unless
    this is the first time we're calling this method, \`this.lastFrame\` was updated
    the last time the \`gameLoop\` method was called.
    `,
    9: `We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)  `,
    10: `We remove all the destroyed enemies from the array referred to by \`this.enemies\`. 
    We use filter to accomplish
    this. Remember: \`this.enemies\` only contains instances of the Enemy class. 
    filter takes a function as an argument. The function
    must returns either true or false. We chose enemy as the parameter name (will another name also work?). 
    
    For every element of the array, the function will be called and the parameter \`enemy\` will refer to 
    that instance
    of the Enemy class. If the return value is true, then the element is included
    in the array that filter returns. Otherwise it is omitted.
    In other words, if \`enemy.destroyed\` is true, then \`!enemy.destroyed\` is false and the array
    created by filter will not contain that particular instance of the Enemy class. 
    
    For example, if 
\`\`\`javascript
    this.enemies = [{destroyed: true, y: 200}, {destroyed: false, y: 100}, {destroyed: true, y: 150}]
\`\`\`

    then, after these lines are evaluated, we will have

\`\`\`javascript
    this.enemies = [{destroyed: false, y: 100}]
\`\`\`
    
    `,
    11: `We need to perform the addition of enemies until we have enough enemies.
    
    For example, if \`enemies = []\` and \`MAX_ENEMIES = 3\`, then the loop will run 3 times since, 
    as we will see, every time the loop is run, we push a new element into \`enemies\`  `,
    12: `We find the next available spot and, using this spot, we create an enemy. We add this enemy
    to the \`enemies\` array `,
    13: `We check if the player is dead. If he is, we alert the user and return from the method (Why is the
      return statement important?)`,
    14: `If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds`,
    15: `This method is not implemented correctly, which is why the burger never dies. In your exercises
    you will fix this method.  `
  }
})
*/