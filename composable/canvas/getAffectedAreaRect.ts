export default function getAffectedAreaRect(x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number) :{ x: number; y: number }[] {
    const coords = {
        left: x,
        right: x,
        top: y,
        bottom: y,
        affectedPixels: [] as { x: number; y: number }[]   
    }
    const halfWidth = Math.floor(width / 2);
    const halfHeight =  Math.floor(height / 2);

    coords.left = width % 2 === 0 ? Math.max(0, x -( halfWidth - 1)) : Math.max(0, x - halfWidth);
    coords.right = Math.min(canvasWidth - 1, x + halfWidth)
    coords.top = height % 2 === 0 ? Math.max(0, y - (halfHeight - 1)) : Math.max(0, y - halfHeight);
    coords.bottom = Math.min(canvasHeight - 1, y + halfHeight);

 

    for (let x = coords.left; x <= coords.right; x++) {
        for (let y = coords.top; y <= coords.bottom; y++) {
            coords.affectedPixels.push({ x: x, y: y });
        }
    }

    return coords.affectedPixels;
}