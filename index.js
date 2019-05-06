/* MIT License
 *
 * Copyright (c) 2019 Andreas Merkle <web@blue-andi.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** Simplified http client */
var request = require("request");

/**
 * NIU cloud connector
 * @namespace
 */
var niuCloudConnector = {};

module.exports = niuCloudConnector;

/**
 * URL to NIU login, used for retrieving an access token.
 */
niuCloudConnector.AccountBaseUrl    = "https://account.niu.com";

/**
 * URL to the NIU app API.
 */
niuCloudConnector.AppApiBaseUrl     = "https://app-api.niu.com";

/**
 * NIU cloud connector client.
 * @class
 */
niuCloudConnector.Client = function() {  
    
    /** Session token */
    this._token = "";
};

/**
 * Utility function which returns the current time in the format hh:mm:ss.us.
 *
 * @returns {string} Current time in the format hh:mm:ss.us.
 */
niuCloudConnector.Client.prototype._getTime = function() {

    var now = new Date();

    var paddingHead = function(num, size) {
        var str = num + "";

        while (str.length < size) {
            str = "0" + str;
        }

        return str;
    };

    var paddingTail = function(num, size) {
        var str = num + "";

        while (str.length < size) {
            str = str + "0";
        }

        return str;
    };

    return "" + paddingHead(now.getHours(), 2) + ":" +
        paddingHead(now.getMinutes(), 2) + ":" +
        paddingHead(now.getSeconds(), 2) + "." +
        paddingTail(now.getMilliseconds(), 3);
};

/**
 * Build error object.
 * 
 * @param {string | Object} errorInfo   - Error information.
 * @param {string}          funcName    - Name of the function, in which the error happened.
 * 
 * @returns {Object} Error object.
 */
niuCloudConnector.Client.prototype._error = function(errorInfo, funcName) {
    var error = {
        client: this,
        debug: {
            date: this._getTime(),
            funcName: funcName
        }
    };

    if ("string" === typeof errorInfo) {
        error.error = {
            message: errorInfo
        };
    } else if ("object" === typeof errorInfo) {
        error.error = errorInfo;
    } else {
        error.error = {
            message: "Invalid error info."
        };
    }

    return error;
};

/**
 * Create a session token, to get access to the cloud API.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.account     - EMail address or mobile phone number or username.
 * @param {string}  options.password    - Account password.
 * @param {string}  options.countryCode - Telephone country count without leading zeros or + sign, e.g. 49 instead of 0049 or +49.
 * 
 * @returns {Promise} Session token.
 */
niuCloudConnector.Client.prototype.createSessionToken = function(options) {
    var funcName    = "createSessionToken()";
    var _this       = this;

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.account) {
        return Promise.reject(this._error("Account is missing.", funcName));
    }

    if ("string" !== typeof options.password) {
        return Promise.reject(this._error("Password is missing.", funcName));
    }

    if ("string" !== typeof options.countryCode) {
        return Promise.reject(this._error("Country code is missing.", funcName));
    }

    return new Promise(function(resolve, reject) {

        request({
            method: "POST",
            url: niuCloudConnector.AccountBaseUrl + "/appv2/login",
            form: options,
            json: true
        }, function(error, response, body) {

            /* Check for any error */
            if (null !== error) {
                reject(_this._error(error, funcName));
            } else if ("object" !== typeof response) {
                reject(_this._error("Invalid response.", funcName));
            } else if ("number" !== typeof response.statusCode) {
                reject(_this._error("Status code is missing.", funcName));
            } else if (200 != response.statusCode) {
                reject(_this._error("Bad request.", funcName));
            } else {

                /* Response successful received.
                 * Check body now.
                 */

                if ("object" !== typeof body) {
                    reject(_this._error("No body received.", funcName));
                } else if (("number" === typeof body.status) &&
                           (0 !== body.status)) {
                    reject(_this._error("Invalid login data.", funcName));
                } else if ("object" !== typeof body.data) {
                    reject(_this._error("Data is missing in response.", funcName));
                } else if ("string" !== typeof body.data.token) {
                    reject(_this._error("Token is missing in response.", funcName));
                } else if (0 === body.data.token.length) {
                    reject(_this._error("Token is empty in response.", funcName));
                } else {
                    /* Successful response with valid content received. */

                    _this._token = body.data.token;

                    resolve({
                        client: _this,
                        result: body.data.token
                    });
                }
            }

            return;
        });

    });
};

/**
 * Set a previous created session token, to get access to the cloud API.
 * 
 * @param {Object}  options         - Options.
 * @param {string}  options.token   - Session token.
 * 
 * @returns {Promise} Nothing.
 */
niuCloudConnector.Client.prototype.setSessionToken = function(options) {
    var funcName    = "setSessionToken()";

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.token) {
        return Promise.reject(this._error("Token is missing.", funcName));
    }

    this._token = options.token;

    return Promise.resolve({
        client: this,
        result: null
    });
};

/**
 * Make specific http/https request. Default is a GET request.
 * For a POST request, add postData to the options.
 * 
 * @param {Object}  options             - Options.
 * @param {Object}  [options.postData]  - If available, a POST request will be executed.
 * 
 * @returns {Promise} Result object.
 */
niuCloudConnector.Client.prototype._makeRequest = function(options) {
    var funcName    = "_makeRequest()";
    var _this       = this;
    var reqData     = null;
    
    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.path) {
        return Promise.reject(this._error("Path is missing.", funcName));
    }

    reqData = {
        method: "GET",
        url: niuCloudConnector.AppApiBaseUrl + options.path,
        headers: {
            "accept-language": "en-US",
            "token": _this._token
        },
        json: true
    };

    if ("object" === typeof options.postData) {
        reqData.method  = "POST";
        reqData.form    = options.postData;
    }

    return new Promise(function(resolve, reject) {

        request(reqData, function(error, response, body) {

            /* Check for any error */
            if (null !== error) {
                reject(_this._error(error, funcName));
            } else if ("object" !== typeof response) {
                reject(_this._error("Unknown error.", funcName));
            } else if ("number" !== typeof response.statusCode) {
                reject(_this._error("Status code is missing.", funcName));
            } else if (200 != response.statusCode) {
                reject(_this._error("Bad request.", funcName));
            } else {

                /* Response successful received.
                 * Check body now.
                 */

                if ("object" !== typeof body) {
                    reject(_this._error("No body received.", funcName));
                } else if (("number" === typeof body.status) &&
                           (0 !== body.status)) {
                    reject(_this._error(body, funcName));
                } else {
                    resolve({
                        client: _this,
                        result: body
                    });
                }
            }

            return;
        });

    });
};

/**
 * Get vehicles.
 * 
 * @returns {Promise} Data object.
 */
niuCloudConnector.Client.prototype.getVehicles = function() {
    var funcName = "getVehicles()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    return this._makeRequest({
        path: "/motoinfo/list",
        postData: {}
    });
};

/**
 * Get battery info of vehicle.
 *
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {Promise} Data object.
 */
niuCloudConnector.Client.prototype.getBatteryInfo = function(options) {
    var funcName = "getBatteryInfo()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    return this._makeRequest({
        path: "/v3/motor_data/battery_info?sn=" + options.sn
    });
};

/**
 * Get battery health of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {Promise} Data object.
 */
niuCloudConnector.Client.prototype.getBatteryHealth = function(options) {
    var funcName = "getBatteryInfo()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    return this._makeRequest({
        path: "/v3/motor_data/battery_info/health?sn=" + options.sn
    });
};

/**
 * Get motor info of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {Promise} Data object.
 */
niuCloudConnector.Client.prototype.getMotorInfo = function(options) {
    var funcName = "getMotorInfo()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    return this._makeRequest({
        path: "/v3/motor_data/index_info?sn=" + options.sn
    });
};

/**
 * Get overall tally of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {Promise} Data object.
 */
niuCloudConnector.Client.prototype.getOverallTally = function(options) {
    var funcName = "getOverallTally()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    return this._makeRequest({
        path: "/motoinfo/overallTally",
        postData: {
            sn: options.sn
        }
    });
};
