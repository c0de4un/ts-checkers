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

/**
 * System interface
 * @version 1.0
*/
export interface ISystem {
    /**
     * Async check if object is initialized
     * @return {Promise<boolean>}
    */
    isReady(): Promise<boolean>;

    /**
     * Get System Type-ID
     *
     * @return {number}
    */
    getTypeID(): number;

    /**
     * Get System ID
     *
     * @return {Promise<number>}
    */
    getID(): Promise<number>;

    /**
     * Is System started
     * @return {boolean}
    */
    isStarted(): boolean;

    /**
     * Is system paused
     * @return {boolean}
    */
    isPaused(): boolean;

    /**
     * Start or resume system
     * @return {Boolean}
    */
    Start(): Promise<boolean>;

    /**
     * Pause system
    */
    Pause(): Promise<void>;

    /**
     * Stop system
    */
    Stop(): Promise<void>;
}
