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

import { IEntity } from "./IEntity";
import { Entities } from "./Entities";
import { IComponent } from "./IComponent";
import { Mutex } from "async-mutex";
import { SpinLock } from "../core/async/SpinLock";

/**
 * Entity base class
 * @version 1.0
*/
export class Entity implements IEntity {
    protected readonly id: Promise<number>;
    protected readonly typeId: number;
    protected components: IComponent[];
    protected componentsMutex: Mutex;

    constructor(typeId: number) {
        this.typeId = typeId;
        this.id = Entities.generateId(typeId);
        this.components = [];
        this.componentsMutex = new Mutex();
    }

    public async isReady(): Promise<boolean> {
        return (await this.id) > 0;
    }

    getTypeID(): number {
        return this.typeId;
    }

    getID(): Promise<number> {
        return this.id;
    }

    public async attachComponent(component: IComponent): Promise<void> {
        await SpinLock.runExclusive(this.componentsMutex, async () => {
            this.components.push(component);
        });

        component.onAttached(this);
    }

    public async detachComponent(component: IComponent): Promise<void> {
        return SpinLock.runExclusive(this.componentsMutex, async () => {
            this.components = this.components.filter((item) => {
                return item.getID() !== component.getID() && item.getTypeID() !== component.getTypeID();
            });
        });
    }

    async destroy(): Promise<void> {
        return Entities.poolId(this.typeId, await this.id);
    }
}
