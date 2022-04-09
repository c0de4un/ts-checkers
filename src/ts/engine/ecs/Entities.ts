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

import { Mutex } from "async-mutex";
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

    /**
     * Returns Entities instance
     * @return {Entities}
    */
    public static getInstance(): Entities {
        if (!Entities.instance) {
            throw new Error("Entities manager is not initialized !");
        }

        return Entities.instance;
    }

    /**
     * Generates Entity id
     * @param {number} typeId
     * @return {Promise<number>}
    */
    public static async generateId(typeId: number): Promise<number> {
        const ids = await Entities.getInstance().getIDPool(typeId);
        return ids.get();
    }

    /**
     * Pool Entity id
     * @param {number} typeId
     * @param {number} id
     * @return {Promise<void>}
    */
    public static async poolId(typeId: number, id: number): Promise<void> {
        const ids = await Entities.getInstance().getIDPool(typeId)
        return ids.pool(id);
    }

    /**
     * Retrieve ID pool
     * @param {number} typeId
     * @return {Promise<IDFactory>}
    */
    private async getIDPool(typeId: number): Promise<IDFactory> {
        return SpinLock.runExclusive(this.mutex, async () => {
            let output: IDFactory|undefined = this.ids.get(typeId);

            if (!output) {
                output = new IDFactory();
                this.ids.set(typeId, output);
            }

            return output;
        });
    }
}
