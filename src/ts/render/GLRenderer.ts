export class GLRenderer {
    /** @type {WebGLRenderingContext} */
    context: WebGLRenderingContext;

    /**
     * @param {WebGLRenderingContext} glCOntext
     */
    public constructor(glCOntext: WebGLRenderingContext) {
        this.context = glCOntext;
        glCOntext.clearColor(0, 0, 0, 1);
    }

    /**
     * Draw frame
     *
     * @return void
     */
    public Draw(): void {
        this.context.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
    }
}