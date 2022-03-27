export class GLRenderer {
    /** @type {HTMLCanvasElement} */
    canvas: HTMLCanvasElement;

    /** @type {WebGLRenderingContext} */
    glContext: WebGLRenderingContext;

    /**
     * @param {WebGLRenderingContext} glCOntext
     */
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        const glContext: WebGLRenderingContext|null = canvas.getContext("webgl");
        if (!glContext) {
            throw new Error("webgl context not found");
        }
        this.glContext = glContext;

        this.glContext.clearColor(0, 0, 0, 1);
    }

    /**
     * Called when canvas is resized
     */
    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Draw frame
     *
     * @return void
     */
    public Draw(): void {
        this.glContext.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
    }
}