import { Renderer } from "./engine/webgl/render/Renderer";
import { CheckersGame } from "./game/CheckersGame";

window.onload = () => {
    console.log('Starting game . . .');

    const canvas: HTMLCanvasElement|null = document.getElementById('canvas') as HTMLCanvasElement|null;
    if (!canvas) {
        throw new Error("canvas not found");
    }

    // Initialize WebGL Renderer
    Renderer.init(canvas);

    // Initialize Game
    CheckersGame.init();

    // Initialize Engine

    window.onresize = () => {
        const renderer: Renderer|null = Renderer.getInstance();
        renderer?.handleResize();
    };

    console.log('Game is closed');
};
