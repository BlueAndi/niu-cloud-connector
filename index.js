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
 * @private
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
 * @typedef {Object} Error
 * @property {Object}   error
 * @property {string}   [error.message]
 */

/**
 * Build error object.
 * @private
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
 * @typedef {Promise} Token
 * @property {niuCloudConnector.Client} client  - Client
 * @property {string}                   result  - Session token
 */

/**
 * Create a session token, to get access to the cloud API.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.account     - EMail address or mobile phone number or username.
 * @param {string}  options.password    - Account password.
 * @param {string}  options.countryCode - Telephone country count without leading zeros or + sign, e.g. 49 instead of 0049 or +49.
 * 
 * @returns {Token} Session token.
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
 * @private
 * 
 * @param {Object}  options             - Options.
 * @param {Object}  [options.postData]  - If available, a POST request will be executed.
 * 
 * @returns {Promise} Requested data
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
 * @typedef {Promise} Vehicles
 * @property {niuCloudConnector.Client} client  - Client
 * @property {Object}   result
 * @property {string}   result.sn
 * @property {string}   result.specialEdition
 * @property {string}   result.vehicleColorImg
 * @property {string}   result.vehicleLogoImg
 * @property {string}   result.vehicleTypeId
 * @property {string}   result.indexHeaderBg
 * @property {string}   result.scootorImg
 * @property {string}   result.batteryInfoBg
 * @property {string}   result.myPageHeaderBg
 * @property {string}   result.listScooterImg
 * @property {string}   result.name
 * @property {string}   result.frameNo
 * @property {string}   result.engineNo
 * @property {boolean}  result.isSelected
 * @property {boolean}  result.isMaster
 * @property {number}   result.bindNum
 * @property {boolean}  result.renovated
 * @property {number}   result.bindDate
 * @property {boolean}  result.isShow
 * @property {boolean}  result.isLite
 * @property {number}   result.gpsTimestamp
 * @property {number}   result.infoTimestamp
 * @property {string}   result.productType
 * @property {string}   result.process
 * @property {string}   result.brand
 * @property {boolean}  result.isDoubleBattery
 * @property {Object[]} result.features
 * @property {string}   result.features.featureName
 * @property {boolean}  result.features.isSupport
 * @property {string}   result.features.switch_status
 * @property {string}   result.type
 */

/**
 * Get vehicles.
 * 
 * @returns {Vehicles[]} Vehicles.
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
 * @typedef {Promise} BatteryInfo
 * @property {niuCloudConnector.Client} client  - Client
 * @property {Object}   result
 * @property {Object}   result.batteries
 * @property {Object}   result.batteries.compartmentA
 * @property {Object[]} result.batteries.compartmentA.items
 * @property {number}   result.batteries.compartmentA.items.x
 * @property {number}   result.batteries.compartmentA.items.y
 * @property {number}   result.batteries.compartmentA.items.z
 * @property {number}   result.batteries.compartmentA.totalPoint
 * @property {string}   result.batteries.compartmentA.bmsId
 * @property {boolean}  result.batteries.compartmentA.isConnected
 * @property {number}   result.batteries.compartmentA.batteryCharging
 * @property {string}   result.batteries.compartmentA.chargedTimes
 * @property {number}   result.batteries.compartmentA.temperature
 * @property {string}   result.batteries.compartmentA.temperatureDesc
 * @property {number}   result.batteries.compartmentA.energyConsumedTody
 * @property {string}   result.batteries.compartmentA.gradeBattery
 * @property {Object}   result.[batteries.compartmentB]
 * @property {Object[]} result.batteries.compartmentB.items
 * @property {number}   result.batteries.compartmentB.items.x
 * @property {number}   result.batteries.compartmentB.items.y
 * @property {number}   result.batteries.compartmentB.items.z
 * @property {number}   result.batteries.compartmentB.totalPoint
 * @property {string}   result.batteries.compartmentB.bmsId
 * @property {boolean}  result.batteries.compartmentB.isConnected
 * @property {number}   result.batteries.compartmentB.batteryCharging
 * @property {string}   result.batteries.compartmentB.chargedTimes
 * @property {number}   result.batteries.compartmentB.temperature
 * @property {string}   result.batteries.compartmentB.temperatureDesc
 * @property {number}   result.batteries.compartmentB.energyConsumedTody
 * @property {string}   result.batteries.compartmentB.gradeBattery
 * @property {number}   result.isCharging
 * @property {string}   result.centreCtrlBattery
 * @property {boolean}  result.batteryDetail
 * @property {number}   result.estimatedMileage
 */

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
 * @typedef {Promise} BatteryInfoHealth
 * @property {niuCloudConnector.Client} client  - Client
 * @property {Object}   result
 * @property {Object}   result.batteries
 * @property {Object}   result.batteries.compartmentA
 * @property {string}   result.batteries.compartmentA.bmsId
 * @property {boolean}  result.batteries.compartmentA.isConnected
 * @property {string}   result.batteries.compartmentA.gradeBattery
 * @property {Object[]} result.batteries.compartmentA.faults
 * @property {Object[]} result.batteries.compartmentA.healthRecords
 * @property {string}   result.batteries.compartmentA.healthRecords.result
 * @property {string}   result.batteries.compartmentA.healthRecords.chargeCount
 * @property {string}   result.batteries.compartmentA.healthRecords.color
 * @property {number}   result.batteries.compartmentA.healthRecords.time
 * @property {string}   result.batteries.compartmentA.healthRecords.name
 * @property {Object}   result.[batteries.compartmentB]
 * @property {string}   result.batteries.compartmentB.bmsId
 * @property {boolean}  result.batteries.compartmentB.isConnected
 * @property {string}   result.batteries.compartmentB.gradeBattery
 * @property {Object[]} result.batteries.compartmentB.faults
 * @property {Object[]} result.batteries.compartmentB.healthRecords
 * @property {string}   result.batteries.compartmentB.healthRecords.result
 * @property {string}   result.batteries.compartmentB.healthRecords.chargeCount
 * @property {string}   result.batteries.compartmentB.healthRecords.color
 * @property {number}   result.batteries.compartmentB.healthRecords.time
 * @property {string}   result.batteries.compartmentB.healthRecords.name
 * @property {boolean}  result.isDoubleBattery
 */

/**
 * Get battery health of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {Promise} BatteryInfoHealth
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
 * @typedef {Promise} MotorData
 * @property {niuCloudConnector.Client} client  - Client
 * @property {Object}   result
 * @property {number}   result.isCharging
 * @property {number}   result.lockStatus
 * @property {number}   result.isAccOn
 * @property {string}   result.isFortificationOn
 * @property {boolean}  result.isConnected
 * @property {Object}   result.postion
 * @property {number}   result.postion.lat
 * @property {number}   result.postion.lng
 * @property {number}   result.hdop
 * @property {number}   result.time
 * @property {Object}   result.batteries
 * @property {Object}   result.batteries.compartmentA
 * @property {string}   result.batteries.compartmentA.bmsId
 * @property {boolean}  result.batteries.compartmentA.isConnected
 * @property {number}   result.batteries.compartmentA.batteryCharging
 * @property {string}   result.batteries.compartmentA.gradeBattery
 * @property {Object}   result.[batteries.compartmentB]
 * @property {string}   result.batteries.compartmentB.bmsId
 * @property {boolean}  result.batteries.compartmentB.isConnected
 * @property {number}   result.batteries.compartmentB.batteryCharging
 * @property {string}   result.batteries.compartmentB.gradeBattery
 * @property {string}   result.leftTime
 * @property {number}   result.estimatedMileage
 * @property {number}   result.gpsTimestamp
 * @property {number}   result.infoTimestamp
 * @property {number}   result.nowSpeed
 * @property {boolean}  result.batteryDetail
 * @property {number}   result.centreCtrlBattery
 * @property {number}   result.ss_protocol_ver
 * @property {string}   result.ss_online_sta
 * @property {number}   result.gps
 * @property {number}   result.gsm
 * @property {Object}   result.lastTrack
 * @property {number}   result.lastTrack.ridingTime
 * @property {number}   result.lastTrack.distance
 * @property {number}   result.lastTrack.time
 */

/**
 * Get motor info of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {MotorData} Motor data
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
 * @typedef {Promise} OverallTally
 * @property {niuCloudConnector.Client} client  - Client
 * @property {Object}   result
 * @property {number}   result.bindDaysCount    - Number of days the vehicle is at the customer
 * @property {number}   result.totalMileage     - Total mileage in km
 */

/**
 * Get overall tally of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {OverallTally} Overall tally
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
