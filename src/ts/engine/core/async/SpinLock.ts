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
import { ILock } from "./ILock";

export class SpinLock implements ILock {
    private static readonly MAX_SPINS = 24;
    private mutex: IMutex;

    /**
     * @param {IMutex} mutex
    */
    constructor(mutex: IMutex) {
        this.mutex = mutex;
    }

    isLocked(): boolean {
        return this.mutex.isLocked();
    }

    lock(): void {
        let spins = 0;
        do {
            if (this.mutex.try_lock()) {
                return;
            }

            spins++;
        } while (spins < SpinLock.MAX_SPINS);

        this.mutex.lock();
    }

    unlock(): void {
        this.mutex.unlock();
    }
}
