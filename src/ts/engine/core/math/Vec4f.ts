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

import { IVector4f } from "./IVector4f";

/**
 * 3D Vector implementation
 * @version 1.0
*/
export class Vec4f implements IVector4f {
    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(x: number|0.0, y: number|0.0, z: number|0.0, w: number|1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getZ(): number {
        return this.z;
    }

    getW(): number {
        return this.w;
    }

    setX(x: number): IVector4f {
        this.x = x;
        return this;
    }

    setY(y: number): IVector4f {
        this.y = y;
        return this;
    }

    setZ(z: number): IVector4f {
        this.z = z;
        return this;
    }

    setW(w: number): IVector4f {
        this.w = w;
        return this;
    }

    add(vec: IVector4f): IVector4f {
        return new Vec4f(
            this.x += vec.getX(),
            this.y += vec.getY(),
            this.z += vec.getZ(),
            this.w += vec.getW()
        );
    }

    sub(vec: IVector4f): IVector4f {
        return new Vec4f(
            this.x -= vec.getX(),
            this.y -= vec.getY(),
            this.z -= vec.getZ(),
            this.w -= vec.getW()
        );
    }

    mul(vec: IVector4f): IVector4f {
        return new Vec4f(
            this.x *= vec.getX(),
            this.y *= vec.getY(),
            this.z *= vec.getZ(),
            this.w *= vec.getW()
        );
    }

    div(vec: IVector4f): IVector4f {
        return new Vec4f(
            this.x /= vec.getX(),
            this.y /= vec.getY(),
            this.z /= vec.getZ(),
            this.w /= vec.getW()
        );
    }
}
