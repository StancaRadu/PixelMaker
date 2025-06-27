import draw from '~/composable/canvas/draw'

export default function drawBackgroundChecker(canvas: any, squareSize: number, width: number, height: number, colors: string[]){
    const ctx = canvas.value.getContext('2d');
    let swapper = true;

    for (let x = 0; x < width; x+= squareSize) { swapper = !swapper
        for (let y = 0; y < height; y+= squareSize) { swapper = !swapper
            const color = swapper ? colors[0] : colors[1];
            draw(canvas, x, y, color, squareSize, squareSize)
        }
    }
}