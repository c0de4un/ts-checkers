import { Engine } from "./engine/Engine";

window.onload = () => {
    console.log('Starting game . . .');

    let engine: Engine = new Engine();

    window.onresize = () => {
        engine.onResize();
    };

    engine.Start();

    console.log('Game is closed');
}

/**
 * Start App
 */
export function StartApp() {
}