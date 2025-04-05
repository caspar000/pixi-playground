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

  // Function which keeps track of what keys are currently pressed
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

  // CHANGE PLAYER DIRECTION
  // UP | DOWN | LEFT | RIGHT
  const changePlayerDirection = (direction) => {
    // TODO
    // You cannot change direction to be opposite of current direction
    console.log(`direction: ${direction}, playerDirection: ${playerDirection}`)
    switch (direction) {
      case DIRECTION_UP:
        if (playerDirection !== DIRECTION_DOWN) {
          setPlayerDirection(DIRECTION_UP)
        }
        break
      case DIRECTION_DOWN:
        if (playerDirection !== DIRECTION_UP) {
          setPlayerDirection(DIRECTION_DOWN)
        }
        break
      case DIRECTION_LEFT:
        if (playerDirection !== DIRECTION_RIGHT) {
          setPlayerDirection(DIRECTION_LEFT)
        }
        break
      case DIRECTION_RIGHT:
        if (playerDirection !== DIRECTION_LEFT) {
          setPlayerDirection(DIRECTION_RIGHT)
        }
        break
    }
  }

  // MOVE PLAYER LEFT
  const movePlayerLeft = (player) => {
    // TODO
    if (player.x > 0) {
      player.x -= PLAYER_SPEED
    }
  }

  // MOVE PLAYER RIGHT
  const movePlayerRight = (player) => {
    // TODO
    if (player.x < STAGE_WIDHT - PLAYER_WIDTH) {
      player.x += PLAYER_SPEED
    }
  }

  // MOVE PLAYER UP
  const movePlayerUp = (player) => {
    // TODO
    if (player.y > 0) {
      player.y -= PLAYER_SPEED
    }
  }

  // MOVE PLAYER DOWN
  const movePlayerDown = (player) => {
    // TODO
    if (player.y < STAGE_HEIGHT - PLAYER_HEIGHT) {
      player.y += PLAYER_SPEED
    }
  }

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
