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

import { IVector4f } from "../math/IVector4f";

/**
 * Movable interface
 * @version 1.0
*/
export interface IMovable {
    /**
     * Returns current location
     * @return {IVector4f}
    */
    getLocation(): IVector4f;

    /**
     * Sets new location
     * @param {IVector4f} vec
     * @param {boolean}   attached - "true" to move attached objects
    */
    setLocation(vec: IVector4f, attached: boolean): Promise<void>;

    /**
     * Translate by given offset
     * @param {IVector4f} vec
     * @param {boolean}   attached
    */
    move(vec: IVector4f, attached: boolean): Promise<void>;
}
