export function on(emitter: HTMLElement, eventType: keyof HTMLElementEventMap) {
    return {
        [Symbol.asyncIterator]() {
            return this
        },

        next() {
            return new Promise(resolve => {
                emitter.addEventListener(eventType, (event) => {
                    resolve({done: false, value: event})
                }, {once: true})
            })
        },

        return() {
            return new Promise(resolve => {
                emitter.removeEventListener(eventType, (event) => {
                    resolve({done: true, value: undefined})
                })
            }) 
        }
    }
}
