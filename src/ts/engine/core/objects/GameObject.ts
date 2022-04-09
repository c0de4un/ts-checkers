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

import { Entity } from "../../ecs/Entity";
import { IMovable } from "../logic/IMovable";
import { IVector4f } from "../math/IVector4f";
import { MathAdapter } from "../math/MathAdapter";
import { SpinLock } from "../async/SpinLock";
import { Mutex } from "async-mutex";

/**
 * GameObject class
 * @version 1.0
*/
export class GameObject extends Entity implements IMovable {
    protected children: Array<GameObject>;
    protected childreMutex: Mutex;
    protected parent: GameObject|null;
    protected location: IVector4f;

    constructor(typeId: number) {
        super(typeId);

        this.children = new Array<GameObject>();
        this.childreMutex = new Mutex();
        this.parent = null;
        this.location = MathAdapter.vec(0.0, 0.0, 0.0, 1.0);
    }

    /**
     * Check if this Object is already attached
     * @return {Promise<GameObject|null>}
    */
    public getParent(): GameObject|null {
        return this.parent;
    }

    /**
     * Attache child
     * @param {GameObject} child
     * @return {Promise<boolean>} - "true" if attached or already attached, "false" otherwise
    */
    public async attach(child: GameObject): Promise<boolean> {
        if (child.getParent()) {
            return false;
        }

        await SpinLock.runExclusive(this.childreMutex, async () => {
            this.children.push(child);
        });
        child.onAttached(this);

        return true;
    }

    /**
     * Detach child
     * @param {GameObject} child
    */
    public async detach(child: GameObject): Promise<void> {
        await SpinLock.runExclusive(this.childreMutex, async () => {
            this.children = this.children.filter((item) => {
                return item.getID() !== child.getID() && item.getTypeID() !== child.getTypeID();
            });
        });

        child.onDetached(this);
    }

    getLocation(): IVector4f {
        return Object.assign({}, this.location);
    }

    public async setLocation(vec: IVector4f, attached: boolean): Promise<void> {
        SpinLock.runExclusive(this.childreMutex, async () => {
            const prevLocation: IVector4f = this.location;
            this.location = Object.assign({}, vec);

            if (!attached) {
                return;
            }

            const diff: IVector4f = this.location.sub(prevLocation);
            this.children.forEach((child: GameObject) => {
                child.move(diff, true);
            });
        });
    }

    public async move(vec: IVector4f, attached: boolean): Promise<void> {
        SpinLock.runExclusive(this.childreMutex, async () => {
            this.location = this.location.add(vec);

            if (!attached) {
                return;
            }

            this.children.forEach((child: GameObject) => {
                child.move(vec, true);
            });
        });
    }

    /**
     * Called when this Object is attached to Parent
     * @param {GameObject} parent
    */
    protected async onAttached(parent: GameObject): Promise<void> {
        if (this.parent) {
            throw new Error(`Entity::onAttached: #'${this.getID()}:${this.getTypeID()}' is already attached !`);
        }

        this.parent = parent;
    }

    /**
     * Called when this Object is detached from Parent
     * @param {GameObject} parent
    */
    protected async onDetached(parent: GameObject): Promise<void> {
        if (!this.parent) {
            throw new Error(`Entity::onDetached: #'${this.getID()}:${this.getTypeID()}' is not detached !`);
        }

        if (parent.getID() !== this.parent.getID() && parent.getTypeID() !== this.parent.getTypeID()) {
            throw new Error(`Entity::onDetached: #'${this.getID()}:${this.getTypeID()}' has different parent !`);
        }

        this.parent = null;
    }
}
