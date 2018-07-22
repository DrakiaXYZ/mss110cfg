// Type definitions for telnet-client 0.15.8
// Project: https://github.com/mkozjak/node-telnet-client
// Definitions by: Steven Scott <https://github.com/TheDgtl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


/// <reference types="node" />

import { EventEmitter } from "events";
import { Socket } from "net";

type Callback = (err: Error, obj: any) => any;

declare class Telnet extends EventEmitter {
    constructor();
    connect(opts: any): Promise<any>;
    shell(callback: Callback): Promise<any>;
    exec(command: String, opts_callback?: Object | Callback, callback?: Callback): Promise<any>;
    send(data: String, opts_callback?: Object | Callback, callback?: Callback): Promise<any>;
    getSocket(): Socket;
    end(): Promise<any>;
    destroy(): Promise<any>;
}

export = Telnet;