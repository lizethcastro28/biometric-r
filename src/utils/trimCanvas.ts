export function trimCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
        throw new Error('Could not get 2D context');
    }
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let top = null;
    let left = null;
    let right = null;
    let bottom = null;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const alpha = data[index + 3];

            if (alpha !== 0) {
                if (top === null) top = y;
                if (left === null || x < left) left = x;
                if (right === null || x > right) right = x;
                if (bottom === null || y > bottom) bottom = y;
            }
        }
    }

    if (top === null || left === null || right === null || bottom === null) {
        return canvas; // No contenido, devolver el mismo canvas
    }

    const trimmedWidth = right - left + 1;
    const trimmedHeight = bottom - top + 1;

    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;
    const trimmedCtx = trimmedCanvas.getContext('2d', { willReadFrequently: true });

    if (!trimmedCtx) {
        throw new Error('Could not get 2D context for trimmed canvas');
    }

    trimmedCtx.drawImage(canvas, left, top, trimmedWidth, trimmedHeight, 0, 0, trimmedWidth, trimmedHeight);

    return trimmedCanvas;
}
