import { initDevtools } from '@pixi/devtools'
import { Application, Graphics } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

import { Button } from './Button'

const DIRECTION_UP = 'up'
const DIRECTION_DOWN = 'down'
const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

const PixiCanvas = () => {
  const containerRef = useRef(null)
  const appRef = useRef(null)
  const playerRef = useRef(null)

  const STAGE_WIDHT = 500
  const STAGE_HEIGHT = 500

  const PLAYER_WIDTH = 50
  const PLAYER_HEIGHT = 50

  // const PLAYER_SPEED = 25
  const PLAYER_SPEED = 1

  const INITIAL_PLAYER_POS_X = STAGE_WIDHT / 2 - PLAYER_WIDTH / 2
  const INITIAL_PLAYER_POS_Y = STAGE_HEIGHT / 2 - PLAYER_HEIGHT / 2

  const [playerDirection, setPlayerDirection] = useState(DIRECTION_UP)

  // INITIALIZATION
  useEffect(() => {
    if (!appRef.current) {
      ;(async () => {
        const app = new Application()

        appRef.current = app

        await app.init({
          width: STAGE_WIDHT,
          height: STAGE_HEIGHT
        })

        initDevtools({ app })

        // app.ticker.minFPS = 5
        // app.ticker.maxFPS = 5

        const player = new Graphics()
        playerRef.current = player

        player.rect(0, 0, 50, 50).fill({ color: 0xffffff })

        app.stage.addChild(player)

        player.position.set(INITIAL_PLAYER_POS_X, INITIAL_PLAYER_POS_Y)

        containerRef.current?.appendChild(app.canvas)
      })()
    }
  }, [INITIAL_PLAYER_POS_X, INITIAL_PLAYER_POS_Y])

  // UPDATE FUNCTION
  // This is an update function which will be called
  // every "tick". A "tick" is a frame of the animation
  // loop which can be controlled depending on our needs.
  // Currently, the tick is set to 60 FPS, but it can be
  // changed it to any value you want in the initialize
  // function
  useEffect(() => {
    const app = appRef.current
    const player = playerRef.current
    if (!app || !player) return

    const onTick = (delta) => {
      switch (playerDirection) {
        case DIRECTION_UP:
          movePlayerUp(player)
          break
        case DIRECTION_DOWN:
          movePlayerDown(player)
          break
        case DIRECTION_LEFT:
          movePlayerLeft(player)
          break
        case DIRECTION_RIGHT:
          movePlayerRight(player)
          break
      }
    }

    app.ticker.add(onTick)
    return () => {
      app.ticker.remove(onTick)
    }
  }, [playerDirection])

  // This function is "listening" for a keyboard event
  // and changes the player direction according to the
  // pressed key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'a') {
        changePlayerDirection(DIRECTION_LEFT)
      }
      if (event.key === 'd') {
        changePlayerDirection(DIRECTION_RIGHT)
      }
      if (event.key === 's') {
        changePlayerDirection(DIRECTION_DOWN)
      }
      if (event.key === 'w') {
        changePlayerDirection(DIRECTION_UP)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [playerDirection])

  // =====================
  // YOUR CODE STARTS HERE
  // =====================

  // This functions changes the direction of the player. It takes
  // the following arguments:
  // DIRECTION_UP | DIRECTION_DOWN | DIRECTION_LEFT | DIRECTION_RIGHT
  const changePlayerDirection = (direction) => {
    // TODO
    // You have to modify this function in a way that makes
    // the player character change direction ONLY when it is
    // not opposite to the current direction. For example:
    // if the player is moving up, it should not be able to
    // change direction to down.
    setPlayerDirection(direction)
  }

  // MOVE PLAYER LEFT
  const movePlayerLeft = (player) => {
    // TODO
    // You have to modify this function to restrict the player
    // movement to the LEFT side of the screen so that it does
    // not go out of bounds
    player.x -= PLAYER_SPEED
  }

  // MOVE PLAYER RIGHT
  const movePlayerRight = (player) => {
    // TODO
    // You have to modify this function to restrict the player
    // movement to the RIGHT side of the screen so that it does
    // not go out of bounds
    player.x += PLAYER_SPEED
  }

  // MOVE PLAYER UP
  const movePlayerUp = (player) => {
    // TODO
    // You have to modify this function to restrict the player
    // movement to the UP side of the screen so that it does
    // not go out of bounds
    player.y -= PLAYER_SPEED
  }

  // MOVE PLAYER DOWN
  const movePlayerDown = (player) => {
    // TODO
    // You have to modify this function to restrict the player
    // movement to the DOWN side of the screen so that it does
    // not go out of bounds
    player.y += PLAYER_SPEED
  }

  // =====================
  // YOUR CODE ENDS HERE
  // =====================

  return (
    <div className="flex flex-col gap-1">
      <div ref={containerRef}></div>
      {/* Joystick Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => changePlayerDirection(DIRECTION_UP)}>
            Move Up
          </Button>
        </div>
        <div className="flex items-center justify-center gap-12">
          <Button onClick={() => changePlayerDirection(DIRECTION_LEFT)}>
            Move Left
          </Button>
          <Button onClick={() => changePlayerDirection(DIRECTION_RIGHT)}>
            Move Right
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => changePlayerDirection(DIRECTION_DOWN)}>
            Move Down
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PixiCanvas
