import { Engine } from "./engine/Engine";

/**
 * Start App
 */
function StartApp() {
    console.log('Starting game . . .');

    let engine: Engine = new Engine();
    engine.Start();

    console.log('Game is closed');
}