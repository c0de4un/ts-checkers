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

import { IMutex } from "./IMutex";

/**
 * Mutex
 * @version 1.0
*/
export class Mutex implements IMutex {
    private locking: boolean;
    private locked: boolean;

    constructor() {
        this.locking = false;
        this.locked = false;
    }

    isLocked(): boolean {
        return this.locked;
    }

    lock(): void {
        while (this.locking);
        this.locking = true;

        while (this.locked);
        this.locked = true;

        this.locking = false;
    }

    try_lock(): boolean {
        if (this.locking) {
            return false;
        }

        this.locking = true;

        if (this.locked) {
            this.locking = false;
            return false;
        }

        this.locked = true;
        this.locking = false;

        return true;
    }

    unlock(): void {
        this.locking = false;
        this.locked = false;
    }
}
