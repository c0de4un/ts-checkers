// @ts-check
import { GLRenderer } from "../render/GLRenderer"

export class Engine {
    renderer: GLRenderer|null;

    public constructor() {
        this.renderer = null;
    }

    public async Start(): Promise<void> {
        /** */
        const canvas: HTMLCanvasElement|null = document.getElementById('canvas') as HTMLCanvasElement|null;
        if (!canvas) {
            throw new Error("canvas not found");
        }

        const glContext: WebGLRenderingContext|null = canvas.getContext('webgl'); // ES 2.0
        if (!glContext) {
            throw new Error("webgl context not found");
        }
        this.renderer = new GLRenderer(glContext);

        return new Promise<void>(res => {
            res();
        });
    }

    private loop(): void {
        if (!this.renderer) {
            return;
        }

        this.renderer.Draw();
        requestAnimationFrame(this.loop.bind(this));
    }
}