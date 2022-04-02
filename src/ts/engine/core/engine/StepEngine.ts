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
        console.log('StepEngine.onStart');
        return true;
    }

    /**
     * Called when System is paused
    */
    protected onPause(): void {
        console.log('StepEngine.onPause');
    }

    /**
     * Called when System is stopped
    */
    protected onStop(): void {
        console.log('StepEngine.onStop');
    }
}
