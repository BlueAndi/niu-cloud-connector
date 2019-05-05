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

/** NIU cloud client, used to access the NIU cloud. */
var niuCloudConnector = require("../index");

/** EMail address / Username */
var account = "email@somewhere.org";

/** Password */
var password = "1234";

/** Telephone country code, without leading 0s or plus sign. */
var countryCode = "49";

/** Client to access the NIU cloud */
var client = new niuCloudConnector.Client();

/** NIU vehicles */
var vehicles = [];

console.log("Creating session token ...");

client.createSessionToken({
    account: account,
    password: password,
    countryCode: countryCode
}).then(function(result) {

    console.log("Session token created: " + result.result);

    console.log("Get vehicles ...");
    return result.client.getVehicles();

}).then(function(result) {

    var index = 0;

    vehicles = result.result.data;

    if (0 === vehicles.length) {

        console.log("No vehicles found.");
        return Promise.reject(new Error("Aborted."));

    } else {

        for(index = 0; index < vehicles.length; ++index) {
            console.log("Vehicle: " + vehicles[index].type + " " + vehicles[index].name + " (" + vehicles[index].sn + ")");
        }
    
        console.log("Get battery info of " + vehicles[0].name);
        return result.client.getBatteryInfo({
            sn: vehicles[0].sn
        });
    }

}).then(function(result) {

    var batteries = result.result.data.batteries;

    if ("object" === typeof batteries.compartmentA) {
        console.log("Battery " + batteries.compartmentA.bmsId + ": SOC " + batteries.compartmentA.batteryCharging + "%");
    }
    
    if ("object" === typeof batteries.compartmentB) {
        console.log("Battery " + batteries.compartmentB.bmsId + ": SOC " + batteries.compartmentB.batteryCharging + "%");
    }

    console.log("Estimated mileage: " + result.result.data.estimatedMileage);

    console.log("Get battery health ...");
    return result.client.getBatteryHealth({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    var batteries = result.result.data.batteries;

    if ("object" === typeof batteries.compartmentA) {
        console.log("Battery " + batteries.compartmentA.bmsId + ": grade " + batteries.compartmentA.gradeBattery + "%");
    }
    
    if ("object" === typeof batteries.compartmentB) {
        console.log("Battery " + batteries.compartmentB.bmsId + ": grade " + batteries.compartmentB.gradeBattery + "%");
    }

    console.log("Get motor info ...");
    return result.client.getMotorInfo({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    console.log("Current speed: " + result.result.data.nowSpeed);

    console.log("Get overall tally ...");
    return result.client.getOverallTally({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    console.log("Total mileage: " + result.result.data.totalMileage);

}).catch(function(error) {

    if ("object" === typeof error) {

        if ("object" === typeof error.debug) {
            console.log("Debug: " + error.debug.date + " " + error.debug.funcName);
        }

        if ("object" === typeof error.error) {
            if (null === error.error) {
                console.log("Error: Unknown");
            } else if ("string" === typeof error.error.message) {
                console.log("Error: " + error.error.message);
            } else {
                console.log("Error: ");
                console.log(JSON.stringify(error.error, null, 4));
            }
        } else if ("string" === typeof error.message) {
            console.log("Error:");
            console.log(error.message);
        } else {
            console.log("Internal error: Unsupported error");
            console.log(JSON.stringify(error, null, 4));
        }
    } else {
        console.log("Error: Unknown");
    }

});
