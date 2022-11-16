type Callback<T> = (el?: T, i?: number, iterable?: Iterable<T>) => void 

export function forEach<T>(iterable: Iterable<T>, cb: Callback<T>): Promise<void> {
    const MAX_TIME = 50
    const DELAY = 50
    
    return new Promise((resolve, reject) => {
        let time = Date.now()
        let i = 0

        function* iter() {
            for (const el of iterable) {
                try {
                    cb(el, i++, iterable)
                } catch(err) {
                    reject(err)
                    return
                }

                if (Date.now() - time > MAX_TIME) {
                    setTimeout(() => {
                        time = Date.now()
                        worker.next()
                    }, DELAY)

                    yield
                }
            }

            resolve()
        }

        const worker = iter()
        worker.next()
    })
}