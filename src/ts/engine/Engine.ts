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

        this.renderer = new GLRenderer(canvas);

        return new Promise<void>(res => {
            this.loop();
            res();
        });
    }

    public onResize() {
        this.renderer?.onResize();
    }

    private loop(): void {
        if (!this.renderer) {
            return;
        }

        this.renderer.Draw();
        requestAnimationFrame(this.loop.bind(this));
    }
}