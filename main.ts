function doSomething (num: number, num2: number) {
    if (x == num && y == num2) {
        x = randint(0, 19)
        y = randint(0, 14)
        doSomething(x, y)
    }
}
let yparameter = 0
let xparameter = 0
let y = 0
let x = 0
tiles.setCurrentTilemap(tilemap`level1`)
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
let positions: number[][] = []
for (let index = 0; index < 25; index++) {
    x = randint(0, 19)
    y = randint(0, 14)
    if (positions.length == 0) {
        positions.push([x, y])
    } else {
        for (let value of positions) {
            xparameter = value[0]
            yparameter = value[0]
            doSomething(xparameter, yparameter)
            positions.push([x, y])
        }
    }
}
