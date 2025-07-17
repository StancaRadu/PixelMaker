export default function computePixels(pixels: { x: number; y: number }[], pxielSize: number) {
    const computedPixels = [];
    for (const pixel of pixels) {
        computedPixels.push({ x: pixel.x * pxielSize, y: pixel.y * pxielSize });
    }
    return computedPixels;
}