export class PseudoEmitter {
    allEvents;

    constructor() {
        this.allEvents = {};
    }

    emit(emitName, argument = null) {
        if (!this.allEvents[emitName]) {
            this.allEvents[emitName] = {
                functions: [],
                argument
            }
        }
        if (argument) {
            this.allEvents[emitName]["argument"] = argument;
        }
        if (this.allEvents[emitName]["functions"].length) {
            this.allEvents[emitName]["functions"].forEach((fn) => {
                fn(this.allEvents[emitName]["argument"]);
            })
        }
    }

    on(emitName, fn) {
        if (!this.allEvents[emitName]) {
            this.allEvents[emitName] = {
                functions: []
            }
        }
        this.allEvents[emitName]["functions"].push(fn);
    }
}