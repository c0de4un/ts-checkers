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

import { Mutex } from "../core/async/Mutex";
import { SpinLock } from "../core/async/SpinLock";
import { IDFactory } from "./IDFactory";

/**
 * Entities manager
 * @version 1.0
*/
export class Entities {
    private static instance: Entities|null = null;
    private mutex: Mutex;
    private ids: Map<number, IDFactory>;

    constructor() {
        this.mutex = new Mutex();
        this.ids = new Map<number, IDFactory>();
    }

    public static init(): void {
        Entities.instance = new Entities();
    }

    public static getInstance(): Entities|null {
        return Entities.instance;
    }

    /**
     * Generates Entity id
     * @param {number} typeId
     * @return {Number}
    */
    public static generateId(typeId: number): number {
        const instance: Entities|null = Entities.getInstance();
        if (!instance) {
            throw new Error("Entities::generateId: is not initialized !");
        }

        const pool: IDFactory = instance.getIDPool(typeId);

        return pool.get();
    }

    /**
     * Pool Entity id
     * @param {number} typeId
     * @param {Number} id
    */
    public static poolId(typeId: number, id: number): void {
        const instance: Entities|null = Entities.getInstance();
        if (!instance) {
            throw new Error("Entities::poolId: is not initialized !");
        }

        const pool: IDFactory = instance.getIDPool(typeId);
        pool.pool(id);
    }

    /**
     * Retrieve ID pool
     * @param {number} typeId
     * @return {IDFactory}
    */
    private getIDPool(typeId: number): IDFactory {
        const lock: SpinLock = new SpinLock(this.mutex);

        let output: IDFactory|undefined = this.ids.get(typeId);
        if (!output) {
            output = new IDFactory();
            this.ids.set(typeId, output);
        }

        lock.unlock();

        return output;
    }
}
