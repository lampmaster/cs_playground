export async function* on(emitter: HTMLElement, eventType: keyof HTMLElementEventMap) {
    while(true) {
        const event = await new Promise(resolve => {
            emitter.addEventListener(eventType, (event) => {                
                resolve(event)
            }, {once: true})
        })
    
        yield event
    }
}