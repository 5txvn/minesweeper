controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorlocation = cursor.tilemapLocation()
    cursorcolumn = cursorlocation.column
    cursorrow = cursorlocation.row
    if (cursorrow != 0) {
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorcolumn, cursorrow - 1))
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorlocation = cursor.tilemapLocation()
    cursorcolumn = cursorlocation.column
    cursorrow = cursorlocation.row
    evaluateMove(cursorcolumn, cursorrow)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorlocation = cursor.tilemapLocation()
    cursorcolumn = cursorlocation.column
    cursorrow = cursorlocation.row
    if (cursorcolumn != 0) {
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorcolumn - 1, cursorrow))
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorlocation = cursor.tilemapLocation()
    cursorcolumn = cursorlocation.column
    cursorrow = cursorlocation.row
    if (cursorcolumn != 19) {
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorcolumn + 1, cursorrow))
    }
})
function startBlocks () {
    startblocks = [
    [8, 6],
    [9, 6],
    [10, 6],
    [11, 6],
    [8, 7],
    [9, 7],
    [10, 7],
    [11, 7],
    [8, 8],
    [9, 8],
    [10, 8],
    [11, 8]
    ]
    for (let value of startblocks) {
        bombcount = 0
        col = value[0]
        row = value[1]
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row + 0), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row + 0), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 0, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 0, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (bombcount == 1) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile2`)
        } else if (bombcount == 2) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile3`)
        } else if (bombcount == 3) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile4`)
        } else if (bombcount == 4) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile5`)
        } else if (bombcount == 5) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile6`)
        } else if (bombcount == 6) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile7`)
        } else if (bombcount == 7) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile8`)
        } else if (bombcount == 8) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile9`)
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorlocation = cursor.tilemapLocation()
    cursorcolumn = cursorlocation.column
    cursorrow = cursorlocation.row
    if (cursorrow != 14) {
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorcolumn, cursorrow + 1))
    }
})
function evaluateMove (col: number, row: number) {
    bombcount = 0
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), assets.tile`myTile11`)) {
        scores.push(info.score())
        scoresum = 0
        for (let value of scores) {
            scoresum += value
        }
        game.splash("Score: " + info.score() + ("-Average Score: " + scoresum / scores.length))
        info.setScore(0)
        sprites.destroy(cursor)
        tiles.setCurrentTilemap(tilemap`level1`)
        cursor = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Player)
        tiles.placeOnRandomTile(cursor, assets.tile`myTile12`)
        regulartiles = tiles.getTilesByType(assets.tile`myTile12`)
        positions = []
        for (let index = 0; index < 75; index++) {
            tiles.setTileAt(regulartiles.removeAt(randint(0, regulartiles.length - 1)), assets.tile`myTile11`)
        }
        startBlocks()
    } else {
        bombcount = 0
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row + 0), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row + 0), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 1, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 0, row + 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col - 0, row - 1), assets.tile`myTile11`)) {
            bombcount += 1
        }
        if (bombcount == 1) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile2`)
        } else if (bombcount == 2) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile3`)
        } else if (bombcount == 3) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile4`)
        } else if (bombcount == 4) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile5`)
        } else if (bombcount == 5) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile6`)
        } else if (bombcount == 6) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile7`)
        } else if (bombcount == 7) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile8`)
        } else if (bombcount == 8) {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile9`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile1`)
        }
        info.changeScoreBy(1)
    }
}
let scoresum = 0
let row = 0
let col = 0
let bombcount = 0
let startblocks: number[][] = []
let cursorrow = 0
let cursorcolumn = 0
let cursorlocation: tiles.Location = null
let positions: number[] = []
let regulartiles: tiles.Location[] = []
let cursor: Sprite = null
let scores: number[] = []
scores = []
info.setScore(0)
tiles.setCurrentTilemap(tilemap`level1`)
cursor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(cursor, assets.tile`myTile12`)
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
regulartiles = tiles.getTilesByType(assets.tile`myTile12`)
positions = []
for (let index = 0; index < 75; index++) {
    tiles.setTileAt(regulartiles.removeAt(randint(0, regulartiles.length - 1)), assets.tile`myTile11`)
}
startBlocks()
