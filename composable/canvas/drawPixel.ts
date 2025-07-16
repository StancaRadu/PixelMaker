export default function draw( canvas: any, pixel: {x: number, y: number}, color: string, size = 1) {
    const ctx = canvas.value.getContext('2d')
    ctx.fillStyle = color;
    ctx.fillRect(pixel.x * size, pixel.y * size, size, size);
}