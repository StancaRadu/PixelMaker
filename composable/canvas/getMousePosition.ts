export default function getMousePosition(canvas: any, e: MouseEvent, drawingWidth: 1, drawingHeight: 1) : {drawX: number, drawY: number, mouseX: number, mouseY: number} {
    const rect   = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const drawX      = Math.floor(mouseX/(rect.width/drawingWidth)); //real pixels / drawing pixels
    const drawY      = Math.floor(mouseY/(rect.height/drawingHeight));

    return { drawX, drawY, mouseX, mouseY};
}