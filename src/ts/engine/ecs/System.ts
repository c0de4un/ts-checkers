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

import { ISystem } from "./ISystem";
import { Mutex } from "../core/async/Mutex";
import { SpinLock } from "../core/async/SpinLock";
import { ESystemStates } from "./ESystemStates";
import { Systems } from "./Systems";

/**
 * System class
 * @version 1.0
*/
export class System implements ISystem {
    protected readonly typeID: number;
    protected readonly id: number;

    protected state: number;
    protected mutex: Mutex;

    constructor(typeID: number) {
        this.typeID = typeID;
        this.id = Systems.generateId();
        this.state = ESystemStates.STOPPED;
        this.mutex = new Mutex();
    }

    public getTypeID(): number {
        return this.typeID;
    }

    public getID(): number {
        return this.id;
    }

    public isStarted(): boolean {
        return this.state !== ESystemStates.STOPPED;
    }

    public isPaused(): boolean {
        return this.state === ESystemStates.PAUSING || this.state === ESystemStates.PAUSED;
    }

    public async Start(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const lock: SpinLock = new SpinLock(this.mutex);
            if (this.isStarted()) {
                resolve(true);
                return;
            }

            this.state = ESystemStates.STARTING;

            let result = false;
            try {
                result = this.onStart();

                this.state = ESystemStates.RUNNING;
            } catch(error) {
                reject(error);
            } finally {
                lock.unlock();
            }

            resolve(result);
        });
    }

    public async Pause(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const lock: SpinLock = new SpinLock(this.mutex);

            if (!this.isStarted() || this.isPaused()) {
                resolve();
                return;
            }

            this.state = ESystemStates.PAUSING;

            try {
                this.onPause();

                this.state = ESystemStates.PAUSED;
            } catch(error) {
                reject(error);
            } finally {
                lock.unlock();
            }

            resolve();
        });
    }

    public async Stop(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const lock: SpinLock = new SpinLock(this.mutex);

            if (!this.isStarted() || this.isPaused()) {
                resolve();
                return;
            }

            this.state = ESystemStates.PAUSING;

            try {
                this.onStop();

                this.state = ESystemStates.PAUSED;
            } catch(error) {
                reject(error);
            } finally {
                lock.unlock();
            }

            resolve();
        });
    }

    /**
     * Called when System is starting
     * @return {Boolean} - "true" on success, "false" if failed
    */
    protected onStart(): boolean {
        return true;
    }

    /**
     * Called when System is paused
    */
    protected onPause(): void {
        return;
    }

    /**
     * Called when System is stopped
    */
    protected onStop(): void {
        return;
    }
}
