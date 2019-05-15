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

/**
 * NIU cloud connector utilities
 * @namespace
 */
var niuCloudConnectorUtils = {};

module.exports = niuCloudConnectorUtils;

/**
 * Convert a value in degree to radian.
 * 
 * @private
 * 
 * @param {number} n    - Value in degree.
 * 
 * @returns {number} Value in radians.
 */
function radians(n) {
    return n * (Math.PI / 180);
}

/**
 * Convert a value in radian to degree.
 * 
 * @private
 * 
 * @param {number} n    - Value in radian.
 * 
 * @returns {number} Value in degree.
 */
function degrees(n) {
    return n * (180 / Math.PI);
}

/**
 * Calculate bearing from two GPS points.
 * 
 * @private
 * 
 * @param {number} startLat     - Start latitude in decimal degree.
 * @param {number} startLong    - Start longitude in decimal degree.
 * @param {number} endLat       - End latitude in decimal degree.
 * @param {number} endLong      - End longitude in decimal degree.
 * 
 * @returns {number} Bearing [0; 360[ degree.
 */
function getBearing(startLat, startLong, endLat, endLong) {
    startLat    = radians(startLat);
    startLong   = radians(startLong);
    endLat      = radians(endLat);
    endLong     = radians(endLong);

    var dLong = endLong - startLong;

    var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));

    if (Math.abs(dLong) > Math.PI) {
        if (dLong > 0.0) {
            dLong = -(2.0 * Math.PI - dLong);
        } else {
            dLong = (2.0 * Math.PI + dLong);
        }
    }

    return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

/**
 * Convert track items to KML format.
 * 
 * @param {Object}      options             - Options.
 * @param {Object[]}    options.trackItems  - Track items.
 * 
 * @returns {string} KML data.
 */
niuCloudConnectorUtils.trackItems2Kml = function(options) {
    var funcName    = "trackItems2Kml()";
    var kmlData     = "";
    var index       = 0;
    var track       = {};
    var trackNext   = {};
    var epoch       = 0;
    var dateStr     = "";
    var lineEnding  = "\r\n";
    var bearing     = 0;
    var urlStyle    = "";

    if ("object" !== typeof options) {
        return Promise.reject(this._error("Options is missing.", funcName));
    }

    if ("object" !== typeof options.trackItems) {
        return Promise.reject(this._error("Track items is missing.", funcName));
    }

    /* KML header */
    kmlData  = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + lineEnding;
    /* KML namespace declaration */
    kmlData += "<kml xmlns=\"http://www.opengis.net/kml/2.2\">" + lineEnding;
    /* KML document */
    kmlData += "    <Document>" + lineEnding;
    /* Style */
    kmlData += "    <Style id=\"normalPlacemark\">" + lineEnding;
    kmlData += "        <IconStyle>" + lineEnding;
    kmlData += "            <Icon>" + lineEnding;
    kmlData += "                <href>http://earth.google.com/images/kml-icons/track-directional/track-none.png</href>" + lineEnding;
    kmlData += "            </Icon>" + lineEnding;
    kmlData += "        </IconStyle>" + lineEnding;
    kmlData += "    </Style>" + lineEnding;

    for(index = 0; index < 16; ++index) {
        kmlData += "    <Style id=\"bearing" + index + "\">" + lineEnding;
        kmlData += "        <IconStyle>" + lineEnding;
        kmlData += "            <Icon>" + lineEnding;
        kmlData += "                <href>http://earth.google.com/images/kml-icons/track-directional/track-" + index + ".png</href>" + lineEnding;
        kmlData += "            </Icon>" + lineEnding;
        kmlData += "        </IconStyle>" + lineEnding;
        kmlData += "    </Style>" + lineEnding;            
    }

    /* Covert each track item to a placement object. */
    for(index = 0; index < options.trackItems.length; ++index) {

        /* Index 0 in the track items contains the destination, therefore start from the tail. */
        track = options.trackItems[options.trackItems.length - index - 1];

        if (options.trackItems.length > (index + 1)) {
            trackNext = options.trackItems[options.trackItems.length - index - 2];
        } else {
            trackNext = null;
        }

        epoch = parseInt(track.date);

        if (true === isNaN(epoch)) {
            dateStr = "-";
        } else {
            dateStr = new Date(epoch).toLocaleString();
        }

        if (null == trackNext) {
            urlStyle ="#normalPlacemark";
        } else {
            bearing = getBearing(track.lat, track.lng, trackNext.lat, trackNext.lng);

            urlStyle = "#bearing" + (Math.ceil(bearing / 22.5) % 16);
        }
        
        kmlData += "        <Placemark>" + lineEnding;
        kmlData += "            <name>#" + index + "</name>" + lineEnding;
        kmlData += "            <description>" + dateStr + " - bearing: " + bearing + "</description>" + lineEnding;
        kmlData += "            <Point>" + lineEnding;
        kmlData += "                <coordinates>" + track.lng + "," + track.lat + "</coordinates>" + lineEnding;
        kmlData += "            </Point>" + lineEnding;
        kmlData += "            <styleUrl>" + urlStyle + "</styleUrl>" + lineEnding;
        kmlData += "        </Placemark>" + lineEnding;
    }

    kmlData += "    </Document>" + lineEnding;
    kmlData += "</kml>";

    return kmlData;
};
