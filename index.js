const canvas = document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7


const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
    imageSrc: './img/background.png'

})


const shop = new Sprite({
  position: {
    x: 650,
    y: 192
  },
    imageSrc: './img/shop_anim.png',
    scale: 3,
    framesMax: 6

})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 150,
    y: 60
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})


const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 76
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})


console.log(player)


const keys = {
  a:{
    pressed: false
  },

  d:{
    pressed: false
  },

  w:{
    pressed: false
  },

  //ENEMY CONTROLS

  ArrowLeft:{
    pressed: false
  },

  ArrowRight:{
    pressed: false
  }
}


decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
  c.clearRect(0,0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  enemy.update()


player.velocity.x = 0
enemy.velocity.x = 0

 //player movement
 if (keys.a.pressed && player.lastKey === 'a') {
   player.velocity.x = -5
   player.switchSprite('run')
 } else if (keys.d.pressed && player.lastKey === 'd') {
   player.velocity.x = 5
   player.switchSprite('run')
 } else {
   player.switchSprite('idle')
 }

 // jumping
 if (player.velocity.y < 0) {
   player.switchSprite('jump')
 } else if (player.velocity.y > 0) {
   player.switchSprite('fall')
 }


    //enemy movement
  if(keys.ArrowLeft.pressed && enemy.lastKey =='ArrowLeft'){
    enemy.velocity.x = -5
  } else if(keys.ArrowRight.pressed && enemy.lastKey =='ArrowRight'){
    enemy.velocity.x = 5
  }

  //detect for collision
  if(
  rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
     player.isAttacking
   ){
     player.isAttacking = false
     enemy.health -= 20
    document.querySelector('#enemyHealth').style.width= enemy.health+'%'

  }

  if(
  rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
     enemy.isAttacking
   ){
     enemy.isAttacking = false
     player.health -= 20
     document.querySelector('#playerHealth').style.width= player.health+'%'
  }

  //end game based on health
  if(enemy.health<=0 || player.health<= 0) {
    determineWinner({player, enemy, timerId})

  }

}

animate()

window.addEventListener('keydown', (event) =>{

  console.log(event.key);

  switch(event.key){
    //TO GO RIGHT
    case 'd':

      keys.d.pressed = true
      player.lastKey = 'd'

    break
   //TO GO LEFT
    case 'a':

      keys.a.pressed = true
      player.lastKey = 'a'
    break

   // JUMP
    case 'w':

      player.velocity.y= -15
    break
  case' ':
  player.attack()
  break


    //ENEMY KEYS

    //TO GO RIGHT
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey='ArrowRight'

    break
   //TO GO LEFT
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
    break

   // JUMP
    case 'ArrowUp':
      enemy.velocity.y= -15
    break

    case'ArrowDown':
    enemy.attack()
    break
  }



console.log(event.key)
})

window.addEventListener('keyup', (event) =>{
  switch(event.key){
    case 'd':

      keys.d.pressed = false
    break

    case 'a':

      keys.a.pressed = false

    break

    case 'w':

      keys.w.pressed = false

    break

    //ENEMY KEYS

    case 'ArrowRight':

      keys.ArrowRight.pressed = false
    break

    case 'ArrowLeft':

      keys.ArrowLeft.pressed = false

    break

    case 'ArrowUp':

      keys.ArrowUp.pressed = false

    break

  case 'ArrowDown':
  keys.ArrowDown.pressed= false
  break
}

console.log(event.key)
})
