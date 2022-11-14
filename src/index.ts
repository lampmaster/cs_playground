import { on } from "./asyncIterators/on"

(async () => {
    const iter = {
        // итератор может быть и синхронным и асинхронным одновременно
        [Symbol.iterator]() {
            return [1,2].values()
        },

        [Symbol.asyncIterator]() {
            let i = 0

            console.log('iter');
            
            return {
                next() {
                    if (i++ > 2) {
                        return Promise.resolve({done: true, value: undefined})
                    } 

                    return Promise.resolve({done: false, value: i})
                }
            }
        }
    }
    

    for await (const el of on(document.body, 'click')) {
        console.log(el);
    }
})()