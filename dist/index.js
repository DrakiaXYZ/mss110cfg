"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Telnet = require("telnet-client");
const asCallback = require("standard-as-callback");
/**
 * A class for getting status of the Meross MSS110
 *
 * @export
 * @class MSS110Cfg
 */
class MSS110Cfg {
    /**
     *Creates an instance of MSS110Cfg.
     * @param {string} [host] - Host IP of the MSS110
     * @param {number} [port] - Port that telnet is running on
     */
    constructor(host, port) {
        this.debug = false;
        this.connectionParms = {
            host: '127.0.0.1',
            port: 23,
            shellPrompt: /[A-Z]{3}>/,
            loginPrompt: 'Login as:',
            passwordPrompt: 'Password:',
            username: 'admin',
            password: '',
            timeout: 1500,
            echoLines: false
        };
        if (host) {
            this.connectionParms.host = host;
        }
        if (port) {
            this.connectionParms.port = port;
        }
    }
    /**
     * Set the host IP of the MSS110 to connec to
     *
     * @param {string} host - Host IP of the MSS110
     */
    setHost(host) {
        this.connectionParms.host = host;
    }
    /**
     * Set the port that telnet is running on on the MSS110
     *
     * @param {number} port - Port that telnet is running on
     */
    setPort(port) {
        this.connectionParms.port = port;
    }
    /**
     * Set the telnet login username
     *
     * @param {string} username - Username to log in to Telnet as
     */
    setUsername(username) {
        this.connectionParms.username = username;
    }
    /**
     * Set the telnet login password
     *
     * @param {string} password - Password to log in to Telnet with
     */
    setPassword(password) {
        this.connectionParms.password = password;
    }
    /**
     * Enable debug console output
     *
     * @param {boolean} debug - Whether or not to enable debug
     */
    setDebug(debug) {
        this.debug = debug;
    }
    /**
     * Get the current value for the given setting, via either a Callback, or a promise.
     * Will pass NULL as the value if the setting can't be found.
     *
     * @param {string} setting - The setting to look up
     * @param {Callback} [callback] - An optional callback, for use instead of the returned promise
     * @returns {Promise<string>}
     */
    getSettingValue(setting, callback) {
        const promise = new Promise((resolve, reject) => {
            let connection = new Telnet();
            // If debug is on, inject some functions into our connection
            if (this.debug) {
                this.injectDebug(connection);
            }
            // The steps to get a specific value from the MSS110 are:
            //  1. Connect to the server
            //  2. Make sure we're at the CFG menu
            //  3. Execute a 'get' for the setting we want
            //  4. Disconnect and process the returned value
            connection.connect(this.connectionParms)
                .then(() => connection.exec('cd cfg'))
                .then(() => connection.exec('get ' + setting))
                .then((res) => {
                // Make sure we close the connection ASAP, the MSS110 is picky and won't allow multiple connections
                connection.end();
                // Extract just the value requested
                let search = new RegExp(setting + '=(.*)');
                let matches = res.match(search);
                // If we found our value, resolve with it. Otherwise reject with null
                if (matches !== null && matches.length > 0) {
                    resolve(matches[1]);
                }
                else {
                    reject(null);
                }
            }).catch((err) => {
                // If any of our telnet calls failed, clean up the connection and reject the promise
                connection.end();
                reject(null);
            });
        });
        return asCallback(promise, callback);
    }
    /**
     * Inject debug versions of the 'emit' and 'exec' functions into the given connection.
     *
     * @private
     * @param {Telnet} connection - The Telnet connection to inject debug code into
     */
    injectDebug(connection) {
        let _emit = connection.emit;
        connection.emit = function (event, ...args) {
            console.log('[EVENT] ' + event);
            return _emit.apply(connection, arguments);
        };
        let _exec = connection.exec;
        connection.exec = function (command, opts_callback, callback) {
            console.log('[COMMAND] ' + command);
            return _exec.apply(connection, arguments);
        };
    }
}
exports.MSS110Cfg = MSS110Cfg;
//# sourceMappingURL=index.js.map