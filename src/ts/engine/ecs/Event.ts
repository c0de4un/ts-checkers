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

import { IEvent } from "./IEvent";
import { Events } from "./Events";

/**
 * Event base class
 * @version 1.0
*/
export class Event implements IEvent {
    protected readonly id: Promise<number>;
    protected readonly typeID: number;
    protected handled: boolean;

    /**
     * @param {Number} typeID
    */
    constructor(typeID: number) {
        this.id = Events.generateId();
        this.typeID = typeID;
        this.handled = false;
    }

    public async isReady(): Promise<boolean> {
        return (await this.id) > 0;
    }

    isHandled(): boolean {
        return this.handled;
    }

    public getTypeID(): number {
        return this.typeID;
    }

    public async getID(): Promise<number> {
        return this.id;
    }

    public async destroy(): Promise<void> {
    return Events.poolId(await this.id);
    }
}
