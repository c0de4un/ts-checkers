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

import { IDFactory } from "./IDFactory";

/**
 * Systems manager
 * @version 1.0
*/
export class Systems {
    private static instance: Systems|null = null;
    private ids: IDFactory;

    constructor() {
        this.ids = new IDFactory();
    }

    /**
     * Get Systems
     * @return {Systems}
    */
    public static getInstance(): Systems {
        if (!Systems.instance) {
            Systems.instance = new Systems();
        }

        return Systems.instance;
    }

    /**
     * Generate System id
     * @return {Promise<number>}
    */
    public static generateId(): Promise<number> {
        const instance: Systems = Systems.getInstance();
        return instance.ids.get();
    }

    /**
     * Pool id
     * @param {Number} id
    */
    public static poolId(id: number): void {
        const instance: Systems = Systems.getInstance();
        instance.ids.pool(id);
    }
}
