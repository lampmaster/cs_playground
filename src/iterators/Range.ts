export class Range<T extends string | number> {
    private startPoint: number
    private endPoint: number
    private currentStartPoint: number
    private currentEndPoint: number

    private isChar: boolean

    constructor(from: T, to: T) {
        this.isChar = typeof from === 'string'
        this.currentStartPoint = this.startPoint = typeof from === 'string' ? from.codePointAt(0) : from
        this.currentEndPoint = this.endPoint = typeof to === 'string' ? to.codePointAt(0) : to
    }

    [Symbol.iterator]() {
        return this
    }

    next() {
        if (this.currentStartPoint > this.endPoint) {
            return {
                value: undefined,
                done: true
            }
        }

        return {
            value: this.isChar ? String.fromCodePoint(this.currentStartPoint++) : this.currentStartPoint++,
            done: false
        }
    }

    reverse() {
        this.next = () => {
            if (this.currentEndPoint < this.startPoint) {
                return {
                    value: undefined,
                    done: true
                }
            }
    
            return {
                value: this.isChar ? String.fromCodePoint(this.currentEndPoint--) : this.currentEndPoint--,
                done: false
            }
        }

        return this
    }
}