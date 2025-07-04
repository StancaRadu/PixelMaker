export default function drawGrid(canvas: any, width: number, height: number, step: number, color: string, lineWidth : number, clear: boolean){
    const w = canvas.value.width;
    const h = canvas.value.height;

    //draw settings
    const ctx = canvas.value.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    if (clear) return
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    //vertical lines
    for (let x = 0; x < width; x+= step) {
        
        ctx.beginPath();
        ctx.moveTo(x * (w/width) + .5, 0);
        ctx.lineTo(x * (w/width) + .5, h);
        ctx.stroke();
    } // .5 centers the line on the pixel
    // Horizontal lines
    for (let y = 0; y < height; y+= step) {
        ctx.beginPath();
        ctx.moveTo(0, y * (h/height) + .5);
        ctx.lineTo(w, y * (h/height) + .5);
        ctx.stroke();
    }
}