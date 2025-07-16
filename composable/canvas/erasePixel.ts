export default function erasePixel( canvas: any, pixel: {x: number, y: number}, size = 1) {
    const ctx = canvas.value.getContext('2d')
    
    ctx.clearRect(pixel.x * size, pixel.y * size, size, size);
}