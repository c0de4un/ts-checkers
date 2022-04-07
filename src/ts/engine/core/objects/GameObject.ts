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

import { IMovable } from "../logic/IMovable";
import { IGameObject } from "./IGameObject";
import { IVector4f } from "../math/IVector4f";
import { MathAdapter } from "../math/MathAdapter";

/**
 * GameObject class
 * @version 1.0
*/
export class GameObject implements IMovable, IGameObject {

    attach(child: IGameObject): boolean { // @TODO: GameObject::attach()
        return false;
    }

    detach(child: IGameObject): void { // @TODO: GameObject::detach()
        return;
    }

    getLocation(): IVector4f {// @TODO: @TODO: GameObject::getLocation()
        return MathAdapter.vec(0, 0, 0, 1);
    }

    setLocation(vec: IVector4f, attached: boolean): void { // @TODO: GameObject::setLocation()
    }

    move(vec: IVector4f, attached: boolean): void { // @TODO: GameObject::move()
    }
}
