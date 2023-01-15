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
    y: 122
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
  imageSrc:'./img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 150,
    y: 126
  },
  sprites: {
    idle: {

      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    idlel: {
      imageSrc: './img/samuraiMack/Idlel.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    runl: {
  imageSrc: './img/samuraiMack/Run1.png',
  framesMax: 8
    },

    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },

    jumpl: {
      imageSrc: './img/samuraiMack/Jumpl.png',
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
    attack1l: {
      imageSrc: './img/samuraiMack/Attack1l.png',
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
      x: 150,
      y: 50
    },
    width: 160,
    height: 50
  }
})


const enemy = new Fighter({
  position: {
    x: 800,
    y: 000
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
    y: 141
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    idler: {
      imageSrc: './img/kenji/Idler.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },

    runr: {
      imageSrc: './img/kenji/Runr.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    jumpr: {
      imageSrc: './img/kenji/Jumpr.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    fallr: {
      imageSrc: './img/kenji/Fallr.png',
      framesMax: 2
    },
    falll: {
      imageSrc: './img/kenji/Falll.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    attacklr: {
      imageSrc: './img/kenji/Attack1r.png',
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
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}



decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('runl')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else { if(player.lastKey === 'a'){
   player.switchSprite('idlel')
  }else{player.switchSprite('idle')
}
  }

  // jumping
  if (player.velocity.y < 0) {
    if(player.lastKey === 'a'){
           player.switchSprite('jumpl')
    }
    else{  player.switchSprite('jump')
  }

  } else if (player.velocity.y > 0) {
    if (player.lastKey === 'a') {
           player.switchSprite('falll')
    }else{
    player.switchSprite('fall')}
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('runr')

}else { if(enemy.lastKey =='ArrowRight'){
          enemy.switchSprite('idler')
}else{

    enemy.switchSprite('idle')}
  }

  // jumping
  if (enemy.velocity.y < 0) {
    if(enemy.lastKey === 'ArrowRight'){
           enemy.switchSprite('jumpr')
    }else{
    enemy.switchSprite('jump')}
  } else if (enemy.velocity.y > 0) {
    if(enemy.lastKey === 'ArrowRight'){
      enemy.switchSprite('fallr')
    }else{
    enemy.switchSprite('fall') }
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
      if(player.position.y>40){
          player.velocity.y = -15
        break
      }else{
        break
      }
      case ' ':

        player.attack()
      break

    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
      if(enemy.position.y>40){
          enemy.velocity.y = -15
        break}else{
          break
        }

      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false

      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
