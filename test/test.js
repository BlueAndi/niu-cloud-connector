/* MIT License
 *
 * Copyright (c) 2019 - 2023 Andreas Merkle <web@blue-andi.de>
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
const niuCloudConnector = require("../index");

/** EMail address / Username */
var account = "";

/** Password */
var password = "";

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

    console.log("\tSession token created: " + result.result);

    console.log("Get vehicles ...");
    return result.client.getVehicles();

}).then(function(result) {

    var index       = 0;
    var nextPromise = Promise.resolve({
        client: result.client,
        index: 0
    });

    vehicles = result.result.data;

    if (0 === vehicles.length) {

        console.log("\tNo vehicles found.");
        return Promise.reject(new Error("Aborted."));
    }

    for(index = 0; index < vehicles.length; ++index) {

        nextPromise = nextPromise.then(function(vehicleResult) {
            var vehicleIndex = vehicleResult.index;

            ++vehicleResult.index;

            console.log("\t#" + vehicleResult.index + " Vehicle: " + vehicles[vehicleIndex].type + " " + vehicles[vehicleIndex].name + " (" + vehicles[vehicleIndex].sn + ")");

            return result.client.getVehiclePos({
                sn: vehicles[vehicleIndex].sn
            }).then(function(vehiclePosResult) {

                console.log("\t\tCurrent position: latitude=" + vehiclePosResult.result.data.lat + " longitude=" + vehiclePosResult.result.data.lng);
                return Promise.resolve({
                    client: vehiclePosResult.client,
                    index: vehicleResult.index
                });
            });
        });
    }

    nextPromise = nextPromise.then(function() {
        
        console.log("Get battery info of " + vehicles[0].name);
        return result.client.getBatteryInfo({
            sn: vehicles[0].sn
        });
    });

    return nextPromise;

}).then(function(result) {

    var batteries = result.result.data.batteries;

    if ("object" === typeof batteries.compartmentA) {
        console.log("\tBattery " + batteries.compartmentA.bmsId + ": SOC " + batteries.compartmentA.batteryCharging + "%");
    }
    
    if ("object" === typeof batteries.compartmentB) {
        console.log("\tBattery " + batteries.compartmentB.bmsId + ": SOC " + batteries.compartmentB.batteryCharging + "%");
    }

    console.log("\tEstimated mileage: " + result.result.data.estimatedMileage);

    console.log("Get battery health ...");
    return result.client.getBatteryHealth({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    var batteries = result.result.data.batteries;

    if ("object" === typeof batteries.compartmentA) {
        console.log("\tBattery " + batteries.compartmentA.bmsId + ": grade " + batteries.compartmentA.gradeBattery + "%");
    }
    
    if ("object" === typeof batteries.compartmentB) {
        console.log("\tBattery " + batteries.compartmentB.bmsId + ": grade " + batteries.compartmentB.gradeBattery + "%");
    }

    console.log("Get motor info ...");
    return result.client.getMotorInfo({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    console.log("\tCurrent speed: " + result.result.data.nowSpeed);

    console.log("Get overall tally ...");
    return result.client.getOverallTally({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    console.log("\tTotal mileage: " + result.result.data.totalMileage);

    console.log("Get firmware version ...");
    return result.client.getFirmwareVersion({
        sn: vehicles[0].sn
    });

}).then(function(result) {

    console.log("Current firmware version: " + result.result.data.version);

    console.log("Get a track ...");
    return result.client.getTracks({
        sn: vehicles[0].sn,
        index: 0,
        pageSize: 1
    });

}).then(function(result) {

    if (0 === result.result.data.length) {
        console.log("\tNo tracks available.");
    } else {

        var track       = result.result.data[0];
        var startTime   = new Date(track.startTime);
        var endTime     = new Date(track.endTime);

        console.log("\tTrack: " + track.trackId);
        console.log("\t\tStart time  : " + startTime.toString());
        console.log("\t\tEnd time    : " + endTime.toString());
        console.log("\t\tDistance    : " + track.distance / 1000 + " km");
        console.log("\t\tAvg. speed  : " + track.avespeed + " km/h");
        console.log("\t\tRiding time : " + track.ridingtime / 60 + " h");

        console.log("Get a track detail ...");
        return result.client.getTrackDetail({
            sn: vehicles[0].sn,
            trackId: track.trackId,
            trackDate: track.date
        }).then(function(result) {

            var index       = 0;
            var trackItems  = result.result.data.trackItems;
        
            for(index = 0; index < trackItems.length; ++index) {
        
                console.log("\tItem #" + (index + 1));
                console.log("\t\tLongitude: " + trackItems[index].lng);
                console.log("\t\tLatitude: " + trackItems[index].lat);
            }

        });
    }

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
