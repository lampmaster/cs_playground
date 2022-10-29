export function take<T>(iterable: Iterable<T>, elementCount: number): IterableIterator<any> {
    let counter = 0

    return {
        [Symbol.iterator]() {
            return this
        },

        next() {
            counter++
            
            if(counter > elementCount) {
                return {value: undefined, done: true}
            }

            return iterable[Symbol.iterator]().next()
        }
    }
}