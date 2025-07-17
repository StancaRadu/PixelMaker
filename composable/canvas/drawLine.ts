export default function drawLine( canvas: any, pixel: {x: number, y: number}, color: string, HorizontalPixels = 1, verticalPixels = 1 ) {
    const ctx = canvas.value.getContext('2d')
    ctx.fillStyle = color;

    ctx.fillRect(pixel.x, pixel.y, HorizontalPixels, verticalPixels);
}