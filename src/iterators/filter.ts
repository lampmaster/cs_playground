export function filter<T>(iterable: Iterable<T>, isPass: (el: unknown) => boolean): IterableIterator<T> {
    const iterator = iterable[Symbol.iterator]()

    return {
        [Symbol.iterator]() {
            return this
        },
        
        next() {
            let iterResult: IteratorResult<T> = {value: undefined, done: false}
            let passed = false
            
            while (!passed) {
                iterResult = iterator.next()

                passed = isPass(iterResult.value)
            }

            return iterResult
        }
    }
}