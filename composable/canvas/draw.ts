export default function draw( canvas: any, x: number, y:number, color: string, width = 1, height = 1,) {
    const ctx = canvas.value.getContext('2d')
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}