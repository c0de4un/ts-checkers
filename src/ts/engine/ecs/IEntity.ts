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

/**
 * Entity interface
 * @version 1.0
*/
export interface IEntity {
    /**
     * Async check if object is initialized
     * @returns {Promise<boolean>}
    */
    isReady(): Promise<boolean>;

    /**
     * Returns Entity Type-ID
     * @return {number}
    */
    getTypeID(): number;

    /**
     * Returns Entity ID
     * @return {Promise<number>}
    */
    getID(): Promise<number>;

    /**
     * Attaches Component
     *
     * @param {IComponent} component
    */
    attachComponent(component: IComponent): Promise<void>;

    /**
     * Detaches Component
     *
     * @param {IComponent} component
    */
    detachComponent(component: IComponent): Promise<void>;

    /**
     * Destroy Entity instance
    */
    destroy(): Promise<void>;
}
