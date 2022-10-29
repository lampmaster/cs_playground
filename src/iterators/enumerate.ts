export function enumerate<T>(iterable: Iterable<T>) {
    let counter = 0
    const iterator = iterable[Symbol.iterator]()

    return {
        [Symbol.iterator]() {
            return this
        },

        next() {
            counter++

            return {
                value: [counter, iterator.next().value],
                done: false
            }
        }
    }
}