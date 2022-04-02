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

import { Renderer } from "./engine/webgl/render/Renderer";
import { CheckersGame } from "./game/CheckersGame";
import { StepEngine } from "./engine/core/engine/StepEngine";

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

    // Initialize and Start StepEngine
    StepEngine.init().Start();

    window.onresize = () => {
        const renderer: Renderer|null = Renderer.getInstance();
        renderer?.handleResize();
    };

    console.log('Game is closed');
};
