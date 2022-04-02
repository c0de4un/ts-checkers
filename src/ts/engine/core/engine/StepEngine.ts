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

import { Renderer } from "../../webgl/render/Renderer";
import { Game } from "../game/Game";
import { UpdateThread } from "../logic/UpdateThread";
import { Engine } from "./Engine";

/**
 * Step Engine simple implementation
 * @version 1.0
*/
export class StepEngine extends Engine {
    constructor() {
        super();
    }

    /**
     * Initialize StepEngine instance
     * @return {Engine}
    */
    public static init(): Engine {
        Engine.instance = new StepEngine();

        return Engine.instance;
    }

    /**
     * Called when System is starting
     * @return {Boolean} - "true" on success, "false" if failed
    */
    protected onStart(): boolean {
        // Start/Resume Game
        const game: Game|null = Game.getInstance();
        if (!game) {
            throw new Error("game must be initialized before engine starts !");
        }
        game.Start();

        // Start/Resume logic loop
        const updater: UpdateThread|null = UpdateThread.init();
        updater.Start();

        // Start/Resume Renderer
        const renderer: Renderer|null = Renderer.getInstance();
        if (!renderer) {
            throw new Error("renderer must be initialized before engine starts !");
        }
        renderer.Start();

        return true;
    }

    protected onResume(): boolean {
        return this.onStart();
    }

    /**
     * Called when System is paused
    */
    protected onPause(): void {
        console.log('StepEngine.onPause');

        // Pause Game
        const game: Game|null = Game.getInstance();
        game?.Pause();

        // Pause Updater
        const updater: UpdateThread|null = UpdateThread.init();
        updater?.Pause();

        // Pause Renderer
        const renderer: Renderer|null = Renderer.getInstance();
        renderer?.Pause();
    }

    /**
     * Called when System is stopped
    */
    protected onStop(): void {
        console.log('StepEngine.onStop');

        // Stop Game
        const game: Game|null = Game.getInstance();
        game?.Stop();

        // Stop Updater
        const updater: UpdateThread|null = UpdateThread.init();
        updater?.Stop();

        // Stop Renderer
        const renderer: Renderer|null = Renderer.getInstance();
        renderer?.Stop();
    }
}
