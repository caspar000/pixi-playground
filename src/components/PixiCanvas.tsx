import { initDevtools } from '@pixi/devtools'
import { Application, Graphics } from 'pixi.js'
import React, { useEffect, useRef } from 'react'

import { IconNorthEast } from '@/assets/IconNorthEast'
import { IconNorthWest } from '@/assets/IconNorthWest'
import { IconSouthEast } from '@/assets/IconSouthEast'
import { IconSouthWest } from '@/assets/IconSouthWest'

import { Button } from './Button'

const PixiCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const playerRef = useRef<Graphics | null>(null)

  const STAGE_WIDHT = 600
  const STAGE_HEIGHT = 600

  const PLAYER_WIDTH = 50
  const PLAYER_HEIGHT = 50

  const PLAYER_SPEED = 0.02

  const INITIAL_PLAYER_POS_X = STAGE_WIDHT / 2 - PLAYER_WIDTH / 2
  const INITIAL_PLAYER_POS_Y = STAGE_HEIGHT / 2 - PLAYER_HEIGHT / 2

  const [playerPosX, setPlayerPosX] = React.useState(INITIAL_PLAYER_POS_X)
  const [playerPosY, setPlayerPosY] = React.useState(INITIAL_PLAYER_POS_Y)

  const [pressedKeys, setPressedKeys] = React.useState<Set<string>>(new Set())

  // INITIALIZATION
  useEffect(() => {
    if (!appRef.current) {
      ;(async () => {
        const app = new Application()

        appRef.current = app

        await app.init({
          width: 600,
          height: 600
        })

        initDevtools({ app })

        const player = new Graphics()
        playerRef.current = player

        player.rect(0, 0, 50, 50).fill({ color: 0xffffff })

        app.stage.addChild(player)

        player.position.set(playerPosX, playerPosY)

        containerRef.current?.appendChild(app.canvas)
      })()
    }
  }, [])

  // UPDATE FUNCTION
  useEffect(() => {
    if (!appRef || !playerRef) return
    else {
      // UPDATE PLAYER POSITION
      playerRef.current?.position.set(playerPosX, playerPosY)

      if (pressedKeys.has('a')) {
        movePlayerLeft()
      }
      if (pressedKeys.has('d')) {
        movePlayerRight()
      }
      if (pressedKeys.has('s')) {
        movePlayerDown()
      }
      if (pressedKeys.has('w')) {
        movePlayerUp()
      }
    }
  }, [playerPosX, playerPosY, pressedKeys])

  // Function which keeps track of what keys are currently pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a') {
        setPressedKeys((prev) => new Set([...prev, event.key]))
      }
      if (event.key === 'd') {
        setPressedKeys((prev) => new Set([...prev, event.key]))
      }
      if (event.key === 's') {
        setPressedKeys((prev) => new Set([...prev, event.key]))
      }
      if (event.key === 'w') {
        setPressedKeys((prev) => new Set([...prev, event.key]))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'a')
        setPressedKeys(
          (prev) => new Set([...prev].filter((key) => key !== 'a'))
        )
      if (event.key === 'd')
        setPressedKeys(
          (prev) => new Set([...prev].filter((key) => key !== 'd'))
        )
      if (event.key === 's')
        setPressedKeys(
          (prev) => new Set([...prev].filter((key) => key !== 's'))
        )
      if (event.key === 'w')
        setPressedKeys(
          (prev) => new Set([...prev].filter((key) => key !== 'w'))
        )
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // MOVE PLAYER LEFT
  const movePlayerLeft = () => {
    setPlayerPosX((prev) => {
      return prev - PLAYER_SPEED
    })
  }

  // MOVE PLAYER RIGHT
  const movePlayerRight = () => {
    // TODO
    setPlayerPosX((prev) => {
      return prev + PLAYER_SPEED
    })
  }

  // MOVE PLAYER UP
  const movePlayerUp = () => {
    // TODO
    setPlayerPosY((prev) => {
      return prev - PLAYER_SPEED
    })
  }

  // MOVE PLAYER DOWN
  const movePlayerDown = () => {
    // TODO
    setPlayerPosY((prev) => {
      return prev + PLAYER_SPEED
    })
  }

  // MOVE PLAYER NORTH WEST
  const movePlayerNorthWest = () => {
    // TODO
  }

  // MOVE PLAYER NORTH EAST
  const movePlayerNorthEast = () => {
    // TODO
  }

  // MOVE PLAYER SOUTH WEST
  const movePlayerSouthWest = () => {
    // TODO
  }

  // MOVE PLAYER SOUTH EAST
  const movePlayerSouthEast = () => {
    // TODO
  }

  return (
    <div className="flex flex-col gap-1">
      <div ref={containerRef}></div>
      {/* Joystick Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={movePlayerNorthWest}
            className="flex w-[40px] items-center justify-center"
          >
            <IconNorthWest />
          </Button>
          <Button onClick={movePlayerUp}>Move Up</Button>
          <Button
            onClick={movePlayerNorthEast}
            className="flex w-[40px] items-center justify-center"
          >
            <IconNorthEast />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-12">
          <Button onClick={movePlayerLeft}>Move Left</Button>
          <Button onClick={movePlayerRight}>Move Right</Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={movePlayerSouthWest}
            className="flex w-[40px] items-center justify-center"
          >
            <IconSouthWest />
          </Button>
          <Button onClick={movePlayerDown}>Move Down</Button>
          <Button
            onClick={movePlayerSouthEast}
            className="flex w-[40px] items-center justify-center"
          >
            <IconSouthEast />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PixiCanvas
