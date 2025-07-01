import draw from '~/composable/canvas/draw'

export default function drawBackgroundChecker(canvas: any, squareSize: number, colors: string[], clear: boolean){
    const ctx = canvas.value.getContext('2d');
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    
    let swapper = false;
    let swapperAtBeginning = false
    
    if (clear) {
        ctx.clearRect(0, 0, width, height)
        return
    }

    for (let y = 0; y < height; y+= squareSize) { 
        swapper = swapper == swapperAtBeginning ? !swapper : swapper
        swapperAtBeginning = swapper
        for (let x = 0; x < width; x+= squareSize) { swapper = !swapper
            const color = swapper ? colors[0] : colors[1];
            draw(canvas, x, y, color, squareSize, squareSize)
        }
    }
}