export function on(target: HTMLElement, eventType: string): AsyncIterableIterator<Event> {
    let internalResolve = null
    const eventStack = []

    const eventHandler = (event: any) => {
        const result: IteratorResult<any> = {done: false, value: event}

        if (internalResolve !== null) {
            internalResolve(result)
            internalResolve = null
        } else {
            eventStack.push(result)
        }
    }

    target.addEventListener(eventType, eventHandler)

    return {
        [Symbol.asyncIterator]() {
            return this
        },

        next() {
            return new Promise(resolve => {
                if (eventStack.length !== 0) {
                    resolve(eventStack.pop())
                } else {
                    internalResolve = resolve
                }
            })
        },
        
        return() {
            return new Promise(resolve => {
                target.removeEventListener(eventType, eventHandler)
                resolve({done: true, value: undefined})
            })
        }
    }
}

