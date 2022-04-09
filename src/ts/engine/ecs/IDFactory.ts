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
import { SpinLock } from "../core/async/SpinLock";

/**
 * ID Factory to generate and store IDs
 * @version 1.0
*/
export class IDFactory {
    private reserved: Array<number>;
    private available: Array<number>;
    private mutex: Mutex;

    constructor() {
        this.reserved = new Array<number>();
        this.available = new Array<number>();
        this.mutex = new Mutex();
    }

    /**
     * Get id
     * @return {Promise<Number>}
    */
    public async get(): Promise<number> {
        return SpinLock.runExclusive(this.mutex, async () => {
            let id = this.available.pop();
            if (id === undefined) {
                id = this.reserved.length + 1;
                this.reserved.push(id);
            }

            if (id === undefined) {
                throw new Error("IDFactory::get: bad logic, failed to generate identificator");
            }

            return id;
        });
    }

    /**
     * Return id to pool
     * @param {Number} id
     */
    public async pool(id: number): Promise<void> {
        return SpinLock.runExclusive(this.mutex, async () => {
            this.available.push(id);
            this.reserved = this.reserved.filter((item) => {return item !== id;});
        });
    }
}
