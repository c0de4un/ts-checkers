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

import { IEntity } from "../../ecs/IEntity";
import { Entity } from "../../ecs/Entity";
import { IMovable } from "../logic/IMovable";
import { IVector4f } from "../math/IVector4f";
import { MathAdapter } from "../math/MathAdapter";
import { SpinLock } from "../async/SpinLock";
import { Mutex } from "../async/Mutex";

/**
 * GameObject class
 * @version 1.0
*/
export class GameObject extends Entity implements IMovable {
    protected children: Array<GameObject>;
    protected childreMutex: Mutex;
    protected parent: GameObject|null;

    constructor(typeId: number) {
        super(typeId);

        this.children = new Array<GameObject>();
        this.childreMutex = new Mutex();
        this.parent = null;
    }

    /**
     * Check if this Object is already attached
     * @return {boolean}
    */
    isAttached(): boolean {
        return this.parent !== null;
    }

    /**
     * Attache child
     * @param {GameObject} child
     * @return {Boolean} - "true" if attached or already attached, "false" otherwise
    */
    attach(child: GameObject): boolean { // @TODO: GameObject::attach()
        if (child.isAttached()) {
            return false;
        }

        const lock: SpinLock = new SpinLock(this.childreMutex);
        this.children.push(child);
        lock.unlock();

        child.onAttached(this);

        return false;
    }

    /**
     * Detach child
     * @param {GameObject} child
    */
    detach(child: GameObject): void { // @TODO: GameObject::detach()
        const lock: SpinLock = new SpinLock(this.childreMutex);

        this.children = this.children.filter((item) => {
            return item.getID() !== child.getID() && item.getTypeID() !== child.getTypeID();
        });

        lock.unlock();
    }

    getLocation(): IVector4f {// @TODO: @TODO: GameObject::getLocation()
        return MathAdapter.vec(0, 0, 0, 1);
    }

    setLocation(vec: IVector4f, attached: boolean): void { // @TODO: GameObject::setLocation()
    }

    move(vec: IVector4f, attached: boolean): void { // @TODO: GameObject::move()
    }

    /**
     * Called when this Object is attached to Parent
     * @param {GameObject} parent
    */
    onAttached(parent: GameObject): void {
        return;
    }

    /**
     * Called when this Object is detached from Parent
     * @param {GameObject} parent
    */
    onDetached(parent: GameObject): void {
        return;
    }
}
