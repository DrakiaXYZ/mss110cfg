declare type Callback = (err: Error, obj: any) => any;
/**
 * A class for getting status of the Meross MSS110
 *
 * @export
 * @class MSS110Cfg
 */
export declare class MSS110Cfg {
    private debug;
    private connectionParms;
    /**
     *Creates an instance of MSS110Cfg.
     * @param {string} [host] - Host IP of the MSS110
     * @param {number} [port] - Port that telnet is running on
     */
    constructor(host?: string, port?: number);
    /**
     * Set the host IP of the MSS110 to connec to
     *
     * @param {string} host - Host IP of the MSS110
     */
    setHost(host: string): void;
    /**
     * Set the port that telnet is running on on the MSS110
     *
     * @param {number} port - Port that telnet is running on
     */
    setPort(port: number): void;
    /**
     * Set the telnet login username
     *
     * @param {string} username - Username to log in to Telnet as
     */
    setUsername(username: string): void;
    /**
     * Set the telnet login password
     *
     * @param {string} password - Password to log in to Telnet with
     */
    setPassword(password: string): void;
    /**
     * Enable debug console output
     *
     * @param {boolean} debug - Whether or not to enable debug
     */
    setDebug(debug: boolean): void;
    /**
     * Get the current value for the given setting, via either a Callback, or a promise.
     * Will pass NULL as the value if the setting can't be found.
     *
     * @param {string} setting - The setting to look up
     * @param {Callback} [callback] - An optional callback, for use instead of the returned promise
     * @returns {Promise<string>}
     */
    getSettingValue(setting: string, callback?: Callback): Promise<string>;
    /**
     * Inject debug versions of the 'emit' and 'exec' functions into the given connection.
     *
     * @private
     * @param {Telnet} connection - The Telnet connection to inject debug code into
     */
    private injectDebug;
}
export {};
