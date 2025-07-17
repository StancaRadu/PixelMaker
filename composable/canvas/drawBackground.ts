import drawLine from '~/composable/canvas/drawLine'

export default function drawBackgroundChecker(canvas: any, pixelSize: number, colors: string[], clear: boolean){
    const ctx = canvas.value.getContext('2d');
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    
    let swapper = false;
    let swapperAtBeginning = false
    
    if (clear) {
        ctx.clearRect(0, 0, width, height)
        return
    }
    console.log(height);
    

    for (let y = 0; y < height; y+= pixelSize) { 
        swapper = swapper == swapperAtBeginning ? !swapper : swapper
        swapperAtBeginning = swapper
        for (let x = 0; x < width; x+= pixelSize) { swapper = !swapper
            const color = swapper ? colors[0] : colors[1];
            console.log(color);
            console.log(x, y);
            
            drawLine(canvas,{x:x, y:y}, color, pixelSize, pixelSize);
        }
    }
}