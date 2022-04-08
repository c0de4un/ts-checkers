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

/**
 * Entity base class
 * @version 1.0
*/
export class Entity implements IEntity {
    protected readonly id: number;
    protected readonly typeId: number;
    protected components: IComponent[];

    constructor(typeId: number) {
        this.typeId = typeId;
        this.id = Entities.generateId(typeId);
        this.components = [];
    }

    getTypeID(): number {
        return this.typeId;
    }

    getID(): number {
        return this.id;
    }

    attachComponent(component: IComponent): void {
        this.components.push(component);
    }

    detachComponent(component: IComponent): void {// @TODO:
        this.components = this.components.filter((item) => {
            return item.getID() !== component.getID() && item.getTypeID() !== component.getTypeID();
        });
    }

    destroy(): void {
        Entities.poolId(this.typeId, this.id);
    }
}
