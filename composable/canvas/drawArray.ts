import drawLine from '~/composable/canvas/drawLine';

export default function drawArray(canvas: any, pixels: { x: number; y: number }[], color: string, HorizontalPixels = 1, verticalPixels = HorizontalPixels) {
    for (const pixel of pixels) drawLine(canvas, pixel, color, HorizontalPixels, verticalPixels);
}
