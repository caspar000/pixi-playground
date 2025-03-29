import { initDevtools } from '@pixi/devtools'
import { Application, Graphics } from 'pixi.js'
import React, { useEffect, useRef } from 'react'

import { IconNorthEast } from '@/assets/IconNorthEast'
import { IconNorthWest } from '@/assets/IconNorthWest'
import { IconSouthEast } from '@/assets/IconSouthEast'
import { IconSouthWest } from '@/assets/IconSouthWest'

import { Button } from './Button'

const PixiCanvas = () => {
  const containerRef = useRef(null)
  const appRef = useRef(null)
  const playerRef = useRef(null)

  const STAGE_WIDHT = 600
  const STAGE_HEIGHT = 600

  const PLAYER_WIDTH = 50
  const PLAYER_HEIGHT = 50

  const PLAYER_SPEED = 20

  const INITIAL_PLAYER_POS_X = STAGE_WIDHT / 2 - PLAYER_WIDTH / 2
  const INITIAL_PLAYER_POS_Y = STAGE_HEIGHT / 2 - PLAYER_HEIGHT / 2

  const [playerPosX, setPlayerPosX] = React.useState(INITIAL_PLAYER_POS_X)
  const [playerPosY, setPlayerPosY] = React.useState(INITIAL_PLAYER_POS_Y)

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
  }, [playerPosX, playerPosY])

  // UPDATE FUNCTION
  useEffect(() => {
    if (!appRef || !playerRef) return
    else {
      // UPDATE PLAYER POSITION
      playerRef.current?.position.set(playerPosX, playerPosY)
    }
  }, [playerPosX, playerPosY])

  // MOVE PLAYER LEFT
  const movePlayerLeft = () => {
    setPlayerPosX((prev) => {
      return prev - PLAYER_SPEED
    })
  }

  // MOVE PLAYER RIGHT
  const movePlayerRight = () => {
    // TODO
  }

  // MOVE PLAYER UP
  const movePlayerUp = () => {
    // TODO
  }

  // MOVE PLAYER DOWN
  const movePlayerDown = () => {
    // TODO
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
        <div className="flex items-center justify-center gap-4">
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
