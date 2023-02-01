import { IEmitterData } from "./emitter.interface";

export class Emitter {
    private _allEvents: Record<string, IEmitterData>;

    constructor() {
        this._allEvents = {};
        console.log("Запущен Emitter");
    }

    public emit(emitName, argument = null): void {
        if (!this._allEvents[emitName]) {
            this._allEvents[emitName] = {
                functions: [],
                argument
            }
        }
        if (argument) {
            this._allEvents[emitName]["argument"] = [argument];
        } else {
            this._allEvents[emitName]["argument"] = [];
        }
        if (this._allEvents[emitName]["functions"].length) {
            this._allEvents[emitName]["functions"].forEach((fn) => {
                fn(...this._allEvents[emitName]["argument"]);
            })
        }
    }

    public on(emitName, fn): void {
        if (!this._allEvents[emitName]) {
            this._allEvents[emitName] = {
                functions: []
            }
        }
        this._allEvents[emitName]["functions"].push(fn);
    }

    public off(emitName, fn): void {
        if (this._allEvents[emitName]) {
            const fnIndex = this._allEvents[emitName].functions.findIndex(fn);
            if (fnIndex >= 0) {
                this._allEvents[emitName].functions.splice(fnIndex, 1);
            }
        }
    }
}