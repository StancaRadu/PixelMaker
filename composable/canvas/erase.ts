import erasePixel from '~/composable/canvas/erasePixel';

export default function erase(canvas: any, pixels: { x: number; y: number }[], width: number = 1) {
    const ctx = canvas.value.getContext('2d')
    for (const pixel of pixels) erasePixel(canvas, pixel, width);
}