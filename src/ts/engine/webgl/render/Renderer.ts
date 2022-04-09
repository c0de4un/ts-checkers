/**
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS ``AS
 * IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDERS OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
**/

import { System } from "../../ecs/System";
import { IRenderer } from "../../core/render/IRenderer";
import { ESystems } from "../../ecs/ESystems";

/**
 * Render manger for WebGL API
 * @version 1.0
*/
export class Renderer extends System implements IRenderer {
    private static instance: Renderer|null = null;

    private canvas: HTMLCanvasElement;
    private glContext: WebGLRenderingContext;

    /**
     * @param {HTMLCanvasElement} canvas
    */
    constructor(canvas: HTMLCanvasElement) {
        super(ESystems.RENDERER);
        this.canvas = canvas;

        const glContext: WebGLRenderingContext|null = canvas.getContext("webgl");
        if (!glContext) {
            throw new Error("webgl context not found");
        }
        this.glContext = glContext;
    }

    /**
     * Initialize WebGL Renderer
     * @param {HTMLCanvasElement} canvas
     * @return {Renderer}
    */
    public static init(canvas: HTMLCanvasElement): Renderer {
        Renderer.instance = new Renderer(canvas);

        return Renderer.instance;
    }

    /**
     * Returns Renderer instance
     * @return {Renderer}
    */
    public static getInstance(): Renderer|null {
        return Renderer.instance;
    }

    /**
     * Handles Windows resize event
     */
    public handleResize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Draw
    */
    public Draw(): void {
        if (!this.isStarted()) { return; }

        requestAnimationFrame(this.Draw.bind(this));

        // Render Frame
        this.clearSurface();
        if (this.isPaused()) { return; }
    }

    public setSurfaceColor(r: number, g: number, b: number, a: number|1.0): void {
        this.glContext.clearColor(r, g, b, a);
    }

    public clearSurface(): void {
        this.glContext.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
    }

    protected async onStart(): Promise<boolean> {
        requestAnimationFrame(this.Draw.bind(this));
        return true;
    }
}
