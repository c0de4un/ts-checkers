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
import { ESystems } from "../../ecs/ESystems";

/**
 * Update thread implementation
 * @version 1.0
*/
export class UpdateThread extends System {
    private static readonly TIME_PER_FRAME: number = 16;
    private static instance: UpdateThread|null = null;
    private timerId: ReturnType<typeof setInterval>|undefined;

    constructor() {
        super(ESystems.UPDATER);
    }

    /**
     * Initialize update
     * @return {UpdateThread}
    */
    public static init(): UpdateThread {
        UpdateThread.instance = new UpdateThread();

        return UpdateThread.instance;
    }

     protected async onStart(): Promise<boolean> {
        this.timerId = setInterval(() => {
            if (this.isPaused()) { return; }

            UpdateThread?.instance?.onUpdate();
        }, UpdateThread.TIME_PER_FRAME);

        return true;
    }

    protected async onStop(): Promise<void> {
        if (!this.timerId) { return; }

        clearInterval(this.timerId);
    }

    /**
     * Called every tick
     */
    protected onUpdate(): void {
        return;
    }
}
