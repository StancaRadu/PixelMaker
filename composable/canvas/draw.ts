import drawPixel from '~/composable/canvas/drawPixel';

export default function draw(canvas: any, pixels: { x: number; y: number }[], color: string, width: number = 1) {
    const ctx = canvas.value.getContext('2d');
    ctx.fillStyle = color;
    
    for (const pixel of pixels) drawPixel(canvas, pixel, color, width);
}
