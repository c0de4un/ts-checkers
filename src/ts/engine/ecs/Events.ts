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

import { Mutex } from "async-mutex";
import { IEvent } from "./IEvent";
import { SpinLock } from "../core/async/SpinLock";
import { IDFactory } from "./IDFactory";
import { IEventListener } from "./IEventListener";

/**
 * Events manager class
 * @version 1.0
*/
export class Events {
    private static instance: Events|null = null;

    private ids: IDFactory;
    private queue: Map<number, Array<IEvent>>;
    private eventsMutex: Mutex;

    private listeners: Map<number, Array<IEventListener>>;
    private listenersIDs: IDFactory;
    private listenersMutex: Mutex;

    constructor() {
        this.ids = new IDFactory();
        this.queue = new Map<number, Array<IEvent>>();
        this.eventsMutex = new Mutex();

        this.listeners = new Map<number, Array<IEventListener>>();
        this.listenersIDs = new IDFactory();
        this.listenersMutex = new Mutex();
    }

    /**
     * Get Events manager instance
     * @return {Events}
    */
    public static getInstance(): Events {
        if (!Events.instance) {
            Events.instance = new Events();
        }

        return Events.instance;
    }

    /**
     * Register Event lsitener
     * @param {Number}         eventType
     * @param {IEventListener} listener
     * @return {Number}        listener id
    */
    public static async registerListener(eventType: number, listener: IEventListener): Promise<number> {
        const instance: Events = Events.getInstance();

        return SpinLock.runExclusive(instance.listenersMutex, async () => {
            if (!instance.listeners.has(eventType)) {
                instance.listeners.set(eventType, new Array<IEventListener>());
            }

            const listeners: Array<IEventListener>|undefined = instance.listeners.get(eventType);
            listeners?.push(listener);

            return await instance.listenersIDs.get();
        });
    }

    /**
     * Unregister Event listener
     * @param {Number}         eventType
     * @param {IEventListener} listener
    */
    public static async unregisterListener(eventType: number, listener: IEventListener): Promise<void> {
        const instance: Events = Events.getInstance();
        const listenerId = listener.getListenerID();

        SpinLock.runExclusive(instance.listenersMutex, async () => {
            if (!instance.listeners.has(eventType)) {
                return;
            }

            const listeners: Array<IEventListener>|undefined = instance.listeners.get(eventType);
            listeners?.filter((item) => {return item.getListenerID() !== listenerId;});
        });
    }

    /**
     * Generates Event id
     * @return {Number}
    */
    public static async generateId(): Promise<number> {
        const instance: Events = Events.getInstance();
        return instance.ids.get();
    }

    /**
     * Pool Event id
     * @param {Number} id
    */
    public static async poolId(id: number): Promise<void> {
        const instance: Events = Events.getInstance();
        return instance.ids.pool(id);
    }

    /**
     * Add Event to queue
     * @param {IEvent} event
     * @return {Promise<boolean>}
    */
    public static async queue(event: IEvent): Promise<boolean> {
        const instance: Events = Events.getInstance();
        const eventType = event.getTypeID();

        return SpinLock.runExclusive(instance.eventsMutex, async () => {
            if (!instance.queue.has(eventType)) {
                instance.queue.set(eventType, new Array<IEvent>());
            }

            const events: Array<IEvent>|undefined = instance.queue.get(eventType);
            events?.push(event);

            return true;
        });
    }

    /**
     * Send Event now
     * @param {IEvent} event
     * @return {Promise<boolean>}
    */
    public static async send(event: IEvent): Promise<boolean> {
        const instance: Events = Events.getInstance();

        return instance.onSend(event);
    }

    /**
     * Send Event
     * @param {IEvent} event
     * @return {Promise<boolean>}
    */
    private async onSend(event: IEvent): Promise<boolean> {
        const result = await SpinLock.runExclusive(this.listenersMutex, async () => {
            let listeners: Array<IEventListener>|undefined = this.listeners.get(0);
            const handled = this.notifyListeners(event, listeners);

            if (!handled) {
                listeners = this.listeners.get(event.getTypeID());
                this.notifyListeners(event, listeners);
            }

            return true;
        });
        event.destroy();

        return result;
    }

    /**
     * Notify Event listeners
     * @param {IEvent}                          event
     * @param {Array<IEventListener>|undefined} listeners
     * @return {boolean}                        "true" to stop search, "false" to let other listeners to handle Event
    */
    private notifyListeners(event: IEvent, listeners: Array<IEventListener>|undefined): boolean {
        if (!listeners) {
            return false;
        }

        let handled = false;
        listeners.forEach((listener) => {
            if (handled) {
                return true;
            }

            handled = listener.onEvent(event);
            return false;
        });

        return handled;
    }
}
