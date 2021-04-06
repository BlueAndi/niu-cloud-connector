/* MIT License
 *
 * Copyright (c) 2019-2021 Andreas Merkle <web@blue-andi.de>
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
var got = require("got");

/**
 * NIU cloud connector
 * @namespace
 */
var niuCloudConnector = {};

module.exports = niuCloudConnector;

/**
 * URL to NIU login, used for retrieving an access token.
 */
niuCloudConnector.AccountBaseUrl    = "https://account-fk.niu.com";

/**
 * URL to the NIU app API.
 */
niuCloudConnector.AppApiBaseUrl     = "https://app-api-fk.niu.com";

/**
 * NIU cloud connector client.
 * 
 * @class
 */
niuCloudConnector.Client = function() {

    /** Enable/Disable debug output */
    this._isDebugMode = false;
    
    /** Session token */
    this._token = "";

    /** Accept language, used in HTTP request header. */
    this._acceptLanguage = "en-US";

    /** The NIU app version, which the niu-cloud-connector is derrived from. */
    this._niuAppVersion = "4.6.2";

    /** User agent, used in HTTP request header. */
    this._userAgent = "manager/" + this._niuAppVersion + " (android; Unknown);brand=Unknown;model=Unknown;clientIdentifier=Overseas;lang=" + this._acceptLanguage;
};

/**
 * Utility function which returns the current time in the format hh:mm:ss.us.
 * 
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
 * 
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
 * Enable/Disable the debug mode.
 * In the debug mode the whole HTTP response is printed to console.
 * 
 * @param {boolean} enableDebugMode - Enable/Disable debug mode.
 * 
 */
niuCloudConnector.Client.prototype.enableDebugMode = function(enableDebugMode) {
    this._isDebugMode = enableDebugMode;
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

    return got(niuCloudConnector.AccountBaseUrl + "/appv2/login", {
        method: "POST",
        json: options,
        responseType: "json"
    }).then(function(result) {

        if (200 !== result.statusCode) {
            return Promise.reject(_this._error("Bad request.", funcName));
        }

        if (("number" === typeof result.body.status) &&
            (0 !== result.body.status)) {
            return Promise.reject(_this._error("Invalid login data.", funcName));
        }

        if (0 === result.body.data.token.length) {
            return Promise.reject(_this._error("Token is empty in response.", funcName));
        }
        
        _this._token = result.body.data.token;

        return Promise.resolve({
            client: _this,
            result: result.body.data.token
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
 * Make a HTTP request.
 * Note, the response will always be in JSON format.
 * 
 * @private
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.method      - HTTP method ("GET", "POST", etc.).
 * @param {string}  options.path        - The path is the relative request URI, which will be appended to the base URI.
 * @param {Object}  [options.headers]   - HTTP request headers.
 * @param {Object}  [options.data]      - HTTP body data.
 * 
 * @returns {Promise} Requested data.
 */
niuCloudConnector.Client.prototype._makeRequest = function(options) {
    var funcName    = "_makeRequest()";
    var _this       = this;
    var reqOptions  = {
        method: "",
        headers: null,
        responseType: "json"
    };
    
    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.method) {
        return Promise.reject(this._error("HTTP method is missing.", funcName));
    }

    if ("string" !== typeof options.path) {
        return Promise.reject(this._error("Path is missing.", funcName));
    }

    reqOptions.method   = options.method;
    reqOptions.path     = options.path;

    if ("object" === typeof options.headers) {
        reqOptions.headers = options.headers;
    }

    if ("object" === typeof options.data) {
        reqOptions.json    = options.data;
    }

    return got(niuCloudConnector.AppApiBaseUrl + options.path, reqOptions).then(function(result) {
        var description = "";

        if (true === _this._isDebugMode) {
            console.log(result);
            console.log("----------");
            console.log(JSON.stringify(result.body, null, 2));
        }

        if (200 !== result.statusCode) {
            return Promise.reject(_this._error("Bad request.", funcName));
        }

        /* Any error?
         * See com.niu.cloud.o.w.j.a()
         */
        if ((   0 !== result.body.status) &&
            ( 200 !== result.body.status) &&
            (1325 !== result.body.status) &&
            (1327 !== result.body.status)) {

            if ("string" === typeof result.body.desc) {

                if (0 === description.length) {
    
                    if ("string" === typeof result.body.message) {
    
                        description = result.body.message;
                    }
                } else {
                    
                    description = result.body.desc;
                }
            }
    
            if (0 === description.length) {
    
                if ("string" === typeof result.body.trace) {
    
                    description = result.body.trace;
                } else if ("object" === typeof result.body.trace) {
    
                    if ("string" === typeof result.body.trace.message) {
    
                        description = result.body.trace.message;
                    }
                }
            }

            return Promise.reject(_this._error(description, funcName));
        }

        return Promise.resolve({
            client: _this,
            result: result.body.data
        });
    });
};

/* ------------------------------- */
/* ---------- Motor Info --------- */
/* ---------- /motoinfo  --------- */
/* ------------------------------- */

/**
 * @typedef {Promise} Vehicles
 * @property {niuCloudConnector.Client} client              - Client
 * @property {Object}   result                              - Received response
 * @property {Object[]} result.data                         - Response data
 * @property {string}   result.data.sn                      - Vehicle serial number
 * @property {string}   result.data.specialEdition          - ?
 * @property {string}   result.data.vehicleColorImg         - URL to vehicle color image
 * @property {string}   result.data.vehicleLogoImg          - URL to vehicle logo image
 * @property {string}   result.data.vehicleTypeId           - Vehicle type id
 * @property {string}   result.data.indexHeaderBg           - URL to background image
 * @property {string}   result.data.scootorImg              - URL to vehicle image
 * @property {string}   result.data.batteryInfoBg           - URL to battery info background image
 * @property {string}   result.data.myPageHeaderBg          - URL to my page header background
 * @property {string}   result.data.listScooterImg          - URL to scooter list background image
 * @property {string}   result.data.name                    - Vehicle name, given by the user
 * @property {string}   result.data.frameNo                 - Vehicle identification number (VIN)
 * @property {string}   result.data.engineNo                - Engine identification number
 * @property {boolean}  result.data.isSelected              - ?
 * @property {boolean}  result.data.isMaster                - ?
 * @property {number}   result.data.bindNum                 - ?
 * @property {boolean}  result.data.renovated               - ?
 * @property {number}   result.data.bindDate                - ? timestamp in epoch unix timestamp format (13 digits)
 * @property {boolean}  result.data.isShow                  - ?
 * @property {boolean}  result.data.isLite                  - ?
 * @property {number}   result.data.gpsTimestamp            - GPS timestamp in epoch unix timestamp format (13 digits)
 * @property {number}   result.data.infoTimestamp           - Info timestamp in epoch unix timestamp format (13 digits)
 * @property {string}   result.data.productType             - Product type, e.g. "native"
 * @property {string}   result.data.process                 - ?
 * @property {string}   result.data.brand                   - ?
 * @property {boolean}  result.data.isDoubleBattery         - Vehicle has one or two batteries
 * @property {Object[]} result.data.features                - List of features
 * @property {string}   result.data.features.featureName    - Feature name
 * @property {boolean}  result.data.features.isSupport      - ?
 * @property {string}   result.data.features.switch_status  - ?
 * @property {string}   result.data.type                    - Vehicle model, e.g. "NGT  Black with Red Stripes"
 * @property {string}   result.desc                         - Response status description
 * @property {string}   result.trace                        - For debug purposes
 * @property {number}   result.status                       - Response status number
 */

/**
 * Get a list of vehicles.
 * 
 * @returns {Vehicles} Vehicles.
 */
niuCloudConnector.Client.prototype.getVehicles = function() {
    var funcName = "getVehicles()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    return this._makeRequest({
        method: "POST",
        path: "/motoinfo/list",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        }
    });
};

/**
 * @typedef {Promise} VehiclePos
 * @property {niuCloudConnector.Client} client      - Client
 * @property {Object}   result                      - Received response
 * @property {Object}   result.data                 - Response data
 * @property {number}   result.data.lat             - Latitude in decimal degree (WGS 84)
 * @property {number}   result.data.lng             - Longitude in decimal degree (WGS 84)
 * @property {number}   result.data.timestamp       - Timestamp in unix timestamp epoch format (13 digits)
 * @property {number}   result.data.gps             - ?
 * @property {number}   result.data.gpsPrecision    - GPS precision
 * @property {string}   result.desc                 - Response status description
 * @property {string}   result.trace                - For debug purposes
 * @property {number}   result.status               - Response status number
 */

/**
 * Get current position of a vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {VehiclePos} Vehicle position.
 */
niuCloudConnector.Client.prototype.getVehiclePos = function(options) {
    var funcName = "getVehiclePos()";

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
        method: "POST",
        path: "/motoinfo/currentpos",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn
        }
    });
};

/**
 * @typedef {Promise} OverallTally
 * @property {niuCloudConnector.Client} client      - Client
 * @property {Object}   result                      - Received response
 * @property {Object}   result.data                 - Response data
 * @property {number}   result.data.bindDaysCount   - Number of days the vehicle is at the customer
 * @property {number}   result.data.totalMileage    - Total mileage in km
 * @property {string}   result.desc                 - Response status description
 * @property {string}   result.trace                - For debug purposes
 * @property {number}   result.status               - Response status number
 * 
 */

/**
 * Get overall tally of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {OverallTally} Overall tally.
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
        method: "POST",
        path: "/motoinfo/overallTally",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn
        }
    });
};

/**
 * @typedef {Promise} TrackDetail
 * @property {niuCloudConnector.Client} client      - Client
 * @property {Object}   result                      - Received response
 * @property {Object}   result.data                 - Response data
 * @property {Object[]} result.data.trackItems      - Track items (end point at index 0)
 * @property {number}   result.data.trackItems.lng  - Longitude in decimal degree (WGS 84)
 * @property {number}   result.data.trackItems.lat  - Latitude in decimal degree (WGS 84)
 * @property {number}   result.data.trackItems.date - Date in unix timestamp epoch format (13 digits)
 * @property {Object}   result.data.startPoint      - Start point
 * @property {string}   result.data.startPoint.lng  - Longitude in decimal degree (WGS 84)
 * @property {string}   result.data.startPoint.lat  - Latitude in decimal degree (WGS 84)
 * @property {Object}   result.data.lastPoint       - Start point
 * @property {string}   result.data.lastPoint.lng   - Longitude in decimal degree (WGS 84)
 * @property {string}   result.data.lastPoint.lat   - Latitude in decimal degree (WGS 84)
 * @property {string}   result.data.startTime       - Start time in unix timestamp epoch format (13 digits)
 * @property {string}   result.data.lastDate        - Last time in unix timestamp epoch format (13 digits)
 * @property {string}   result.desc                     - Response status description
 * @property {string}   result.trace                    - For debug purposes
 * @property {number}   result.status                   - Response status number
 */

/**
 * Get track details.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.sn          - Vehicle serial number.
 * @param {string}  options.trackId     - Track identification number.
 * @param {string}  options.trackDate   - Track date in yyyymmdd format.
 * 
 * @returns {TrackDetail} Track detail.
 */
niuCloudConnector.Client.prototype.getTrackDetail = function(options) {
    var funcName = "getTrackDetail()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    if ("string" !== typeof options.trackId) {
        return Promise.reject(this._error("Track ID is missing.", funcName));
    }

    if ("string" !== typeof options.trackDate) {
        return Promise.reject(this._error("Track date is missing.", funcName));
    }

    return this._makeRequest({
        method: "POST",
        path: "/v5/track/detail",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn,
            trackId: options.trackId,
            date: options.trackDate,
            token: this._token
        }
    });
};

/* ------------------------------------ */
/* ---------- Motor Data     ---------- */
/* ---------- /v3/motor_data ---------- */
/* ------------------------------------ */

/**
 * @typedef {Object} CompartmentBatteryInfo
 * @property {Object[]} items               - ?
 * @property {number}   items.x             - ?
 * @property {number}   items.y             - ?
 * @property {number}   items.z             - ?
 * @property {number}   totalPoint          - Number of items
 * @property {string}   bmsId               - Battery management identification number
 * @property {boolean}  isConnected         - Is battery connected or not
 * @property {number}   batteryCharging     - State of charge in percent
 * @property {string}   chargedTimes        - Charging cycles
 * @property {number}   temperature         - Battery temperature in degree celsius
 * @property {string}   temperatureDesc     - Battery temperature status
 * @property {number}   energyConsumedTody  - Energy consumption of today
 * @property {string}   gradeBattery        - Battery grade points
 */

/**
 * @typedef {Promise} BatteryInfo
 * @property {niuCloudConnector.Client} client                                  - Client
 * @property {Object}                   result                                  - Received response
 * @property {Object}                   result.data                             - Response data
 * @property {Object}                   result.data.batteries                   - Batteries
 * @property {CompartmentBatteryInfo}   result.data.batteries.compartmentA      - Battery of compartment A
 * @property {CompartmentBatteryInfo}   [result.data.batteries.compartmentB]    - Battery of compartment B
 * @property {number}                   result.data.isCharging                  - Is charging
 * @property {string}                   result.data.centreCtrlBattery           - Centre control battery
 * @property {boolean}                  result.data.batteryDetail               - Battery detail
 * @property {number}                   result.data.estimatedMileage            - Estimated mileage in km
 * @property {string}                   result.desc                             - Response status description
 * @property {string}                   result.trace                            - For debug purposes
 * @property {number}                   result.status                           - Response status number
 */

/**
 * Get battery info of vehicle.
 *
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {BatteryInfo} Battery info.
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
        method: "GET",
        path: "/v3/motor_data/battery_info?sn=" + options.sn,
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        }
    });
};

/**
 * @typedef {Object} CompartmentBatteryInfoHealth
 * @property {string}   bmsId                       - Battery management system identification number
 * @property {boolean}  isConnected                 - Is connected or not
 * @property {string}   gradeBattery                - Battery grade points
 * @property {Object[]} faults                      - List of faults
 * @property {Object[]} healthRecords               - List of health records
 * @property {string}   healthRecords.result        - Battery lost grade points
 * @property {string}   healthRecords.chargeCount   - Charging cycles
 * @property {string}   healthRecords.color         - HTML color in #RGB format
 * @property {number}   healthRecords.time          - Timestamp in unix timstamp epoch format (13 digits)
 * @property {string}   healthRecords.name          - Name
 */

/**
 * @typedef {Promise} BatteryInfoHealth
 * @property {niuCloudConnector.Client}     client                                  - Client
 * @property {Object}                       result                                  - Received response
 * @property {Object}                       result.data                             - Response data
 * @property {Object}                       result.data.batteries                   - Batteries
 * @property {CompartmentBatteryInfoHealth} result.data.batteries.compartmentA      - Battery compartment A
 * @property {CompartmentBatteryInfoHealth} [result.data.batteries.compartmentB]    - Battery compratment B
 * @property {boolean}                      result.data.isDoubleBattery             - Vehicle has one or two batteries
 * @property {string}                       result.desc                             - Response status description
 * @property {string}                       result.trace                            - For debug purposes
 * @property {number}                       result.status                           - Response status number
 */

/**
 * Get battery health of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {BatteryInfoHealth} Battery info health.
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
        method: "GET",
        path: "/v3/motor_data/battery_info/health?sn=" + options.sn,
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        }
    });
};

/**
 * @typedef {Object} BatteryChartData
 * @property {string}   m   - Mileage in km
 * @property {string}   b   - Battery SOC in percent
 */

/**
 * @typedef {Promise} BatteryChart
 * @property {niuCloudConnector.Client}     client                                  - Client
 * @property {Object}                       result                                  - Received response
 * @property {Object}                       result.data                             - Response data
 * @property {BatteryChartData}             result.data.items1                      - Battery data 1
 * @property {BatteryChartData}             [result.data.items2]                    - Battery data 2
 * @property {boolean}                      result.data.isDoubleBattery             - Vehicle has one or two batteries
 * @property {string}                       result.desc                             - Response status description
 * @property {string}                       result.trace                            - For debug purposes
 * @property {number}                       result.status                           - Response status number
 */

/**
 * Get battery chart data.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.sn          - Vehicle serial number.
 * @param {number}  options.bmsId       - Selects the battery (1: Battery A / 2: Battery B / 3: Battery ???).
 * @param {number}  options.page        - The page number selects the data. Start always with 1.
 * @param {string}  options.pageSize    - 'A' or 'B'. Using 'B' instead of 'A' results in getting more data at once.
 * @param {number}  options.pageLength  - [1; 2]. Controls whether the result contains a second array of data.
 * 
 * @returns {BatteryChart} Battery chart information.
 */
niuCloudConnector.Client.prototype.getBatteryChart = function(options) {
    var funcName = "getBatteryChart()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    if ("number" !== typeof options.bmsId) {
        return Promise.reject(this._error("BMS id is missing.", funcName));
    }

    if ("number" !== typeof options.page) {
        return Promise.reject(this._error("Page is missing.", funcName));
    }

    if ("string" !== typeof options.pageSize) {
        return Promise.reject(this._error("Page size is missing.", funcName));
    }

    if ("number" !== typeof options.pageLength) {
        return Promise.reject(this._error("Page length is missing.", funcName));
    }

    return this._makeRequest({
        method: "GET",
        path: "/v3/motor_data/battery_chart/?sn=" + options.sn + "&bmsId=" + options.bmsId + "&page=" + options.page + "&page_size=" + options.pageSize + "&pageLength=" + options.pageLength,
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        }
    });
};

/**
 * @typedef {Object} CompartmentMotorData
 * @property {string}   bmsId           - Battery management system identification number
 * @property {boolean}  isConnected     - Battery is connected or not
 * @property {number}   batteryCharging - Battery is charging or not
 * @property {string}   gradeBattery    - Battery grade points
 */

/**
 * @typedef {Promise} MotorData
 * @property {niuCloudConnector.Client} client                              - Client
 * @property {Object}               result                                  - Received response
 * @property {Object}               result.data                             - Response data
 * @property {number}               result.data.isCharging                  - Is charging
 * @property {number}               result.data.lockStatus                  - Lock status
 * @property {number}               result.data.isAccOn                     - Is adaptive cruise control on or not
 * @property {string}               result.data.isFortificationOn           - Is fortification on or not
 * @property {boolean}              result.data.isConnected                 - Is connected or not
 * @property {Object}               result.data.postion                     - Current position
 * @property {number}               result.data.postion.lat                 - Latitude in decimal degree (WGS 84)
 * @property {number}               result.data.postion.lng                 - Longitude in decimal degree (WGS 84)
 * @property {number}               result.data.hdop                        - Horizontal dilution of precision [0; 50]. A good HDOP is up to 2.5. For navigation a value up to 8 is acceptable.
 * @property {number}               result.data.time                        - Time in unix timestamp epoch format (13 digits)
 * @property {Object}               result.data.batteries                   - Batteries
 * @property {CompartmentMotorData} result.data.batteries.compartmentA      - Battery compartment A
 * @property {CompartmentMotorData} [result.data.batteries.compartmentB]    - Battery compartment B
 * @property {string}               result.data.leftTime                    - Left time
 * @property {number}               result.data.estimatedMileage            - Estimated mileage in km
 * @property {number}               result.data.gpsTimestamp                - GPS timestamp in unix timestamp epoch format (13 digits)
 * @property {number}               result.data.infoTimestamp               - Info timestamp in unix timestamp epoch format (13 digits)
 * @property {number}               result.data.nowSpeed                    - Current speed in km/h
 * @property {boolean}              result.data.batteryDetail               - Battery detail
 * @property {number}               result.data.centreCtrlBattery           - Centre control battery
 * @property {number}               result.data.ss_protocol_ver             - SS protocol version
 * @property {string}               result.data.ss_online_sta               - SS online status
 * @property {number}               result.data.gps                         - GPS signal strength
 * @property {number}               result.data.gsm                         - GSM signal strength
 * @property {Object}               result.data.lastTrack                   - Last track information
 * @property {number}               result.data.lastTrack.ridingTime        - Riding time in s
 * @property {number}               result.data.lastTrack.distance          - Distance in m
 * @property {number}               result.data.lastTrack.time              - Timestamp in unix timestamp epoch format (13 digits)
 * @property {string}               result.desc                             - Response status description
 * @property {string}               result.trace                            - For debug purposes
 * @property {number}               result.status                           - Response status number
 */

/**
 * Get motor info of vehicle.
 * 
 * @param {Object}  options     - Options.
 * @param {string}  options.sn  - Vehicle serial number.
 * 
 * @returns {MotorData} Motor data.
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
        method: "GET",
        path: "/v3/motor_data/index_info?sn=" + options.sn,
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        }
    });
};

/**
 * @typedef {Promise} Tracks
 * @property {niuCloudConnector.Client} client              - Client
 * @property {Object}   result                              - Received response
 * @property {Object}   result.data                         - Response data
 * @property {Object[]} result.data.items                   - Track items array
 * @property {string}   result.data.items.id                - Identification number
 * @property {string}   result.data.items.trackId           - Track identification number
 * @property {number}   result.data.items.startTime         - Start time in unix timestamp epoch format (13 digits)
 * @property {number}   result.data.items.endTime           - Stop time in unix timestamp epoch format (13 digits)
 * @property {number}   result.data.items.distance          - Distance in m
 * @property {number}   result.data.items.avespeed          - Average speed in km/h
 * @property {number}   result.data.items.ridingtime        - Riding time in minutes
 * @property {string}   result.data.items.type              - Type
 * @property {string}   result.data.items.date              - Date in the format yyyymmdd
 * @property {Object}   result.data.items.startPoint        - Start point
 * @property {string}   result.data.items.startPoint.lng    - Longitude in decimal degree (WGS 84)
 * @property {string}   result.data.items.startPoint.lat    - Latitude in decimal degree (WGS 84)
 * @property {Object}   result.data.items.lastPoint         - Start point
 * @property {string}   result.data.items.lastPoint.lng     - Longitude in decimal degree (WGS 84)
 * @property {string}   result.data.items.lastPoint.lat     - Latitude in decimal degree (WGS 84)
 * @property {string}   result.data.items.track_thumb       - URL to maps thumbnail
 * @property {number}   result.data.items.power_consumption - Power consumption
 * @property {number}   result.data.items.meet_count        - Meet count
 */

/**
 * Get recorded tracks.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.sn          - Vehicle serial number.
 * @param {number}  options.index       - Start from this index.
 * @param {number}  options.pageSize    - Number of tracks.
 * 
 * @returns {Tracks} Tracks.
 */
niuCloudConnector.Client.prototype.getTracks = function(options) {
    var funcName = "getTracks()";

    if (0 === this._token.length) {
        return Promise.reject(this._error("No valid token available.", funcName));
    }

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("string" !== typeof options.sn) {
        return Promise.reject(this._error("Vehicle serial number is missing.", funcName));
    }

    if ("number" !== typeof options.index) {
        return Promise.reject(this._error("Index is missing.", funcName));
    }

    if ("number" !== typeof options.pageSize) {
        return Promise.reject(this._error("Page size is missing.", funcName));
    }

    return this._makeRequest({
        method: "POST",
        path: "/v5/track/list/v2",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn,
            index: options.index.toString(),
            pagesize: options.pageSize,
            token: this._token
        }
    });
};

/* -------------------------------------------- */
/* --------- Motor Over The Air update -------- */
/* --------- /motorota                 -------- */
/* -------------------------------------------- */

/**
 * @typedef {Promise} FirmwareVersion
 * @property {niuCloudConnector.Client} client      - Client
 * @property {Object}   result                      - Received response
 * @property {Object[]} result.data                 - Response data
 * @property {string}   result.data.nowVersion      - Current version
 * @property {string}   result.data.version         - Current version
 * @property {string}   result.data.hardVersion     - Current hard version
 * @property {number}   result.data.ss_protocol_ver - ?
 * @property {string}   result.data.byteSize        - Byte size
 * @property {number}   result.data.date            - Date
 * @property {boolean}  result.data.isSupportUpdate - Is the update mechanism supported?
 * @property {boolean}  result.data.needUpdate      - Is update necessary?
 * @property {string}   result.data.otaDescribe     - Over the air update description
 * @property {string}   result.desc                 - Response status description
 * @property {string}   result.trace                - For debug purposes
 * @property {number}   result.status               - Response status number
 */

/**
 * Get firmware version.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.sn          - Vehicle serial number.
 * 
 * @returns {FirmwareVersion} Firmware version.
 */
niuCloudConnector.Client.prototype.getFirmwareVersion = function(options) {
    var funcName = "getTracks()";

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
        method: "POST",
        path: "/motorota/getfirmwareversion",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn
        }
    });
};

/**
 * @typedef {Promise} UpdateInfo
 * @property {niuCloudConnector.Client} client          - Client
 * @property {Object}   result                          - Received response
 * @property {Object[]} result.data                     - Response data
 * @property {number}   result.data.csq                 - ?
 * @property {string}   result.data.centreCtrlBattery   - Centre control battery
 * @property {number}   result.data.date                - Current hard version
 * @property {string}   result.desc                     - Response status description
 * @property {string}   result.trace                    - For debug purposes
 * @property {number}   result.status                   - Response status number
 */

/**
 * Get firmware version.
 * 
 * @param {Object}  options             - Options.
 * @param {string}  options.sn          - Vehicle serial number.
 * 
 * @returns {UpdateInfo} Update information.
 */
niuCloudConnector.Client.prototype.getUpdateInfo = function(options) {
    var funcName = "getTracks()";

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
        method: "POST",
        path: "/motorota/getupdateinfo",
        headers: {
            "accept-language": this._acceptLanguage,
            "token": this._token,
            "user-agent": this._userAgent
        },
        data: {
            sn: options.sn
        }
    });
};
