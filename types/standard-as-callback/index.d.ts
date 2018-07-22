// Type definitions for standard-as-callback 1.0.1
// Project: https://github.com/luin/asCallback
// Definitions by: Steven Scott <https://github.com/TheDgtl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


type Callback = (err: Error, obj: any) => any;
declare function asCallback(promise: Promise<any>, callback?: Callback, options?: any): Promise<any>;

export = asCallback;
