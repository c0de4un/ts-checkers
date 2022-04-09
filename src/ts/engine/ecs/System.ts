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

import { Mutex } from 'async-mutex';
import { ISystem } from "./ISystem";
import { SpinLock } from "../core/async/SpinLock";
import { ESystemStates } from "./ESystemStates";
import { Systems } from "./Systems";

/**
 * System class
 * @version 1.0
*/
export class System implements ISystem {
    protected readonly typeID: number;
    protected readonly id: Promise<number>;

    protected state: number;
    protected mutex: Mutex;

    constructor(typeID: number) {
        this.typeID = typeID;
        this.id = Systems.generateId();
        this.state = ESystemStates.STOPPED;
        this.mutex = new Mutex();
    }

    public async isReady(): Promise<boolean> {
        return (await this.id) > 0;
    }

    public getTypeID(): number {
        return this.typeID;
    }

    public async getID(): Promise<number> {
        return this.id;
    }

    public isStarted(): boolean {
        return this.state !== ESystemStates.STOPPED;
    }

    public isPaused(): boolean {
        return this.state === ESystemStates.PAUSING || this.state === ESystemStates.PAUSED;
    }

    public async Start(): Promise<boolean> {
        return SpinLock.runExclusive(this.mutex, async () => {
            // Resume
            if (this.isPaused()) {
                if (await this.onResume()) {
                    this.state = ESystemStates.RUNNING;
                    return true;
                }

                return false;
            }

            if (this.isStarted()) {
                return true;
            }

            this.state = ESystemStates.STARTING;
            const result = await this.onStart();
            this.state = ESystemStates.RUNNING;

            return result;
        });
    }

    public async Pause(): Promise<void> {
        return SpinLock.runExclusive(this.mutex, async () => {
            if (!this.isStarted() || this.isPaused()) {
                return;
            }

            this.state = ESystemStates.PAUSING;
            this.onPause();
            this.state = ESystemStates.PAUSED;
        });
    }

    public async Stop(): Promise<void> {
        return SpinLock.runExclusive(this.mutex, async () => {
            if (!this.isStarted() || this.isPaused()) {
                return;
            }

            this.state = ESystemStates.PAUSING;
            this.onStop();
            this.state = ESystemStates.PAUSED;
        });
    }

    /**
     * Called when System is starting
     * @return {Promise<boolean>} - "true" on success, "false" if failed
    */
    protected async onStart(): Promise<boolean> {
        return new Promise<boolean>(() => {
            return true;
        });
    }

    /**
     * Called when System is resumed
     * @return {Promise<boolean>} - "true" on sucess
    */
    protected async onResume(): Promise<boolean> {
        return new Promise<boolean>(() => {
            return true;
        });
    }

    /**
     * Called when System is paused
    */
    protected async onPause(): Promise<void> {
        return new Promise<void>(() => {
            return;
        });
    }

    /**
     * Called when System is stopped
    */
    protected async onStop(): Promise<void> {
        return new Promise<void>(() => {
            return;
        });
    }
}
