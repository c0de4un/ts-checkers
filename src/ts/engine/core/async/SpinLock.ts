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

import { Mutex, MutexInterface } from 'async-mutex';

/**
 * SpinLock implementation
 * @version 1.0
*/
export class SpinLock {
    private static readonly MAX_SPINS = 48;

    /**
     * Run worker within exclusive lock
     *
     * @param {Mutex} mutex
     * @param {MutexInterface.Worker<T>} callback
     * @return {Promise<T>}
    */
    public static async runExclusive<T>(mutex: Mutex, callback: MutexInterface.Worker<T>): Promise<T> {
        let spins = 0;
        while (mutex.isLocked() && spins < SpinLock.MAX_SPINS) {
            spins++;
        }

        return mutex.runExclusive(callback);
    }
}
