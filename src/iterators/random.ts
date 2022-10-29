export function random(min: number, max: number): IterableIterator<number> {
    if (max < min) {
        random(max, min)
    }

    const generateRandom = () => Math.round(min + Math.random() * (max - min))

    return {
        [Symbol.iterator]() {            
            return this
        },

        next() {
            return {
                value: generateRandom(),
                done: false
            }
        }
    }
}