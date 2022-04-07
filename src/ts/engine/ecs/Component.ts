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

import { IComponent } from "./IComponent";
import { IEntity } from "./IEntity";

/**
 * Component base class
 * @version 1.0
*/
export abstract class Component implements IComponent {
    protected readonly id: number;
    protected readonly typeId: number;
    protected entity: IEntity|null;

    constructor(typeId: number) {
        this.id = 0;
        this.typeId = typeId;
        this.entity = null;
    }

    getTypeID(): number {
        return this.typeId;
    }

    getID(): number {
        return this.id;
    }

    onAttached(entity: IEntity): void {
        this.entity = entity;
    }

    onDetached(entity: IEntity): void {
        if (!this.entity) { return; }

        if (this.entity.getID() !== entity.getID() || this.entity.getTypeID() !== entity.getTypeID()) {
            return;
        }

        this.entity = null;
    }
}
