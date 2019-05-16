## Members

<dl>
<dt><a href="#request">request</a></dt>
<dd><p>Simplified http client</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#niuCloudConnector">niuCloudConnector</a> : <code>object</code></dt>
<dd><p>NIU cloud connector</p>
</dd>
<dt><a href="#niuCloudConnectorUtils">niuCloudConnectorUtils</a> : <code>object</code></dt>
<dd><p>NIU cloud connector utilities</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Error">Error</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Token">Token</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#Vehicles">Vehicles</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#VehiclePos">VehiclePos</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#BatteryInfo">BatteryInfo</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#BatteryInfoHealth">BatteryInfoHealth</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#MotorData">MotorData</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#OverallTally">OverallTally</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#Tracks">Tracks</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#TrackDetail">TrackDetail</a> : <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="request"></a>

## request
Simplified http client

**Kind**: global variable  
<a name="niuCloudConnector"></a>

## niuCloudConnector : <code>object</code>
NIU cloud connector

**Kind**: global namespace  

* [niuCloudConnector](#niuCloudConnector) : <code>object</code>
    * [.Client](#niuCloudConnector.Client)
        * [new niuCloudConnector.Client()](#new_niuCloudConnector.Client_new)
        * [._token](#niuCloudConnector.Client+_token)
        * [.createSessionToken(options)](#niuCloudConnector.Client+createSessionToken) ⇒ [<code>Token</code>](#Token)
        * [.setSessionToken(options)](#niuCloudConnector.Client+setSessionToken) ⇒ <code>Promise</code>
        * [.getVehicles()](#niuCloudConnector.Client+getVehicles) ⇒ [<code>Array.&lt;Vehicles&gt;</code>](#Vehicles)
        * [.getVehiclePos(options)](#niuCloudConnector.Client+getVehiclePos) ⇒ [<code>VehiclePos</code>](#VehiclePos)
        * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ [<code>BatteryInfo</code>](#BatteryInfo)
        * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ [<code>BatteryInfoHealth</code>](#BatteryInfoHealth)
        * [.getMotorInfo(options)](#niuCloudConnector.Client+getMotorInfo) ⇒ [<code>MotorData</code>](#MotorData)
        * [.getOverallTally(options)](#niuCloudConnector.Client+getOverallTally) ⇒ [<code>OverallTally</code>](#OverallTally)
        * [.getTracks(options)](#niuCloudConnector.Client+getTracks) ⇒ [<code>Tracks</code>](#Tracks)
        * [.getTrackDetail(options)](#niuCloudConnector.Client+getTrackDetail) ⇒ [<code>TrackDetail</code>](#TrackDetail)
    * [.AccountBaseUrl](#niuCloudConnector.AccountBaseUrl)
    * [.AppApiBaseUrl](#niuCloudConnector.AppApiBaseUrl)

<a name="niuCloudConnector.Client"></a>

### niuCloudConnector.Client
**Kind**: static class of [<code>niuCloudConnector</code>](#niuCloudConnector)  

* [.Client](#niuCloudConnector.Client)
    * [new niuCloudConnector.Client()](#new_niuCloudConnector.Client_new)
    * [._token](#niuCloudConnector.Client+_token)
    * [.createSessionToken(options)](#niuCloudConnector.Client+createSessionToken) ⇒ [<code>Token</code>](#Token)
    * [.setSessionToken(options)](#niuCloudConnector.Client+setSessionToken) ⇒ <code>Promise</code>
    * [.getVehicles()](#niuCloudConnector.Client+getVehicles) ⇒ [<code>Array.&lt;Vehicles&gt;</code>](#Vehicles)
    * [.getVehiclePos(options)](#niuCloudConnector.Client+getVehiclePos) ⇒ [<code>VehiclePos</code>](#VehiclePos)
    * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ [<code>BatteryInfo</code>](#BatteryInfo)
    * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ [<code>BatteryInfoHealth</code>](#BatteryInfoHealth)
    * [.getMotorInfo(options)](#niuCloudConnector.Client+getMotorInfo) ⇒ [<code>MotorData</code>](#MotorData)
    * [.getOverallTally(options)](#niuCloudConnector.Client+getOverallTally) ⇒ [<code>OverallTally</code>](#OverallTally)
    * [.getTracks(options)](#niuCloudConnector.Client+getTracks) ⇒ [<code>Tracks</code>](#Tracks)
    * [.getTrackDetail(options)](#niuCloudConnector.Client+getTrackDetail) ⇒ [<code>TrackDetail</code>](#TrackDetail)

<a name="new_niuCloudConnector.Client_new"></a>

#### new niuCloudConnector.Client()
NIU cloud connector client.

<a name="niuCloudConnector.Client+_token"></a>

#### client.\_token
Session token

**Kind**: instance property of [<code>Client</code>](#niuCloudConnector.Client)  
<a name="niuCloudConnector.Client+createSessionToken"></a>

#### client.createSessionToken(options) ⇒ [<code>Token</code>](#Token)
Create a session token, to get access to the cloud API.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>Token</code>](#Token) - Session token.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.account | <code>string</code> | EMail address or mobile phone number or username. |
| options.password | <code>string</code> | Account password. |
| options.countryCode | <code>string</code> | Telephone country count without leading zeros or + sign, e.g. 49 instead of 0049 or +49. |

<a name="niuCloudConnector.Client+setSessionToken"></a>

#### client.setSessionToken(options) ⇒ <code>Promise</code>
Set a previous created session token, to get access to the cloud API.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: <code>Promise</code> - Nothing.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.token | <code>string</code> | Session token. |

<a name="niuCloudConnector.Client+getVehicles"></a>

#### client.getVehicles() ⇒ [<code>Array.&lt;Vehicles&gt;</code>](#Vehicles)
Get a list of vehicles.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>Array.&lt;Vehicles&gt;</code>](#Vehicles) - Vehicles.  
<a name="niuCloudConnector.Client+getVehiclePos"></a>

#### client.getVehiclePos(options) ⇒ [<code>VehiclePos</code>](#VehiclePos)
Get current position of a vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>VehiclePos</code>](#VehiclePos) - Vehicle position.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getBatteryInfo"></a>

#### client.getBatteryInfo(options) ⇒ [<code>BatteryInfo</code>](#BatteryInfo)
Get battery info of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>BatteryInfo</code>](#BatteryInfo) - Battery info.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getBatteryHealth"></a>

#### client.getBatteryHealth(options) ⇒ [<code>BatteryInfoHealth</code>](#BatteryInfoHealth)
Get battery health of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>BatteryInfoHealth</code>](#BatteryInfoHealth) - Battery info health.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getMotorInfo"></a>

#### client.getMotorInfo(options) ⇒ [<code>MotorData</code>](#MotorData)
Get motor info of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>MotorData</code>](#MotorData) - Motor data.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getOverallTally"></a>

#### client.getOverallTally(options) ⇒ [<code>OverallTally</code>](#OverallTally)
Get overall tally of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>OverallTally</code>](#OverallTally) - Overall tally.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getTracks"></a>

#### client.getTracks(options) ⇒ [<code>Tracks</code>](#Tracks)
Get recorded tracks.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>Tracks</code>](#Tracks) - Tracks.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |
| options.index | <code>number</code> | Start from this index. |
| options.pageSize | <code>number</code> | Number of tracks. |

<a name="niuCloudConnector.Client+getTrackDetail"></a>

#### client.getTrackDetail(options) ⇒ [<code>TrackDetail</code>](#TrackDetail)
Get track details.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>TrackDetail</code>](#TrackDetail) - Track detail.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |
| options.trackId | <code>string</code> | Track identification number. |
| options.trackDate | <code>string</code> | Track date in yyyymmdd format. |

<a name="niuCloudConnector.AccountBaseUrl"></a>

### niuCloudConnector.AccountBaseUrl
URL to NIU login, used for retrieving an access token.

**Kind**: static property of [<code>niuCloudConnector</code>](#niuCloudConnector)  
<a name="niuCloudConnector.AppApiBaseUrl"></a>

### niuCloudConnector.AppApiBaseUrl
URL to the NIU app API.

**Kind**: static property of [<code>niuCloudConnector</code>](#niuCloudConnector)  
<a name="niuCloudConnectorUtils"></a>

## niuCloudConnectorUtils : <code>object</code>
NIU cloud connector utilities

**Kind**: global namespace  
<a name="niuCloudConnectorUtils.trackItems2Kml"></a>

### niuCloudConnectorUtils.trackItems2Kml(options) ⇒ <code>string</code>
Convert track items to KML format.

**Kind**: static method of [<code>niuCloudConnectorUtils</code>](#niuCloudConnectorUtils)  
**Returns**: <code>string</code> - KML data.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.trackItems | <code>Array.&lt;Object&gt;</code> | Track items. |

<a name="Error"></a>

## Error : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| error | <code>Object</code> | 
| [error.message] | <code>string</code> | 

<a name="Token"></a>

## Token : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>string</code> | Session token |

<a name="Vehicles"></a>

## Vehicles : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.sn | <code>string</code> | Vehicle serial number |
| result.data.specialEdition | <code>string</code> | ? |
| result.data.vehicleColorImg | <code>string</code> | URL to vehicle color image |
| result.data.vehicleLogoImg | <code>string</code> | URL to vehicle logo image |
| result.data.vehicleTypeId | <code>string</code> | Vehicle type id |
| result.data.indexHeaderBg | <code>string</code> | URL to background image |
| result.data.scootorImg | <code>string</code> | URL to vehicle image |
| result.data.batteryInfoBg | <code>string</code> | URL to battery info background image |
| result.data.myPageHeaderBg | <code>string</code> | URL to my page header background |
| result.data.listScooterImg | <code>string</code> | URL to scooter list background image |
| result.data.name | <code>string</code> | Vehicle name, given by the user |
| result.data.frameNo | <code>string</code> | Vehicle identification number (VIN) |
| result.data.engineNo | <code>string</code> | Engine identification number |
| result.data.isSelected | <code>boolean</code> | ? |
| result.data.isMaster | <code>boolean</code> | ? |
| result.data.bindNum | <code>number</code> | ? |
| result.data.renovated | <code>boolean</code> | ? |
| result.data.bindDate | <code>number</code> | ? timestamp in epoch unix timestamp format (13 digits) |
| result.data.isShow | <code>boolean</code> | ? |
| result.data.isLite | <code>boolean</code> | ? |
| result.data.gpsTimestamp | <code>number</code> | GPS timestamp in epoch unix timestamp format (13 digits) |
| result.data.infoTimestamp | <code>number</code> | Info timestamp in epoch unix timestamp format (13 digits) |
| result.data.productType | <code>string</code> | Product type, e.g. "native" |
| result.data.process | <code>string</code> | ? |
| result.data.brand | <code>string</code> | ? |
| result.data.isDoubleBattery | <code>boolean</code> | Vehicle has one or two batteries |
| result.data.features | <code>Array.&lt;Object&gt;</code> | List of features |
| result.data.features.featureName | <code>string</code> | Feature name |
| result.data.features.isSupport | <code>boolean</code> | ? |
| result.data.features.switch_status | <code>string</code> | ? |
| result.data.type | <code>string</code> | Vehicle model, e.g. "NGT  Black with Red Stripes" |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="VehiclePos"></a>

## VehiclePos : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.lat | <code>number</code> | Latitude in decimal degree (WGS 84) |
| result.data.lng | <code>number</code> | Longitude in decimal degree (WGS 84) |
| result.data.timestamp | <code>number</code> | Timestamp in unix timestamp epoch format (13 digits) |
| result.data.gps | <code>number</code> | ? |
| result.data.gpsPrecision | <code>number</code> | GPS precision |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="BatteryInfo"></a>

## BatteryInfo : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.batteries | <code>Object</code> | Batteries |
| result.data.batteries.compartmentA | <code>Object</code> | Battery of compartment A |
| result.data.batteries.compartmentA.items | <code>Array.&lt;Object&gt;</code> | ? |
| result.data.batteries.compartmentA.items.x | <code>number</code> | ? |
| result.data.batteries.compartmentA.items.y | <code>number</code> | ? |
| result.data.batteries.compartmentA.items.z | <code>number</code> | ? |
| result.data.batteries.compartmentA.totalPoint | <code>number</code> | Number of items |
| result.data.batteries.compartmentA.bmsId | <code>string</code> | Battery management identification number |
| result.data.batteries.compartmentA.isConnected | <code>boolean</code> | Is battery connected or not |
| result.data.batteries.compartmentA.batteryCharging | <code>number</code> | State of charge in percent |
| result.data.batteries.compartmentA.chargedTimes | <code>string</code> | Charging cycles |
| result.data.batteries.compartmentA.temperature | <code>number</code> | Battery temperature in degree celsius |
| result.data.batteries.compartmentA.temperatureDesc | <code>string</code> | Battery temperature status |
| result.data.batteries.compartmentA.energyConsumedTody | <code>number</code> | Energey consumption of today |
| result.data.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.data.[batteries.compartmentB | <code>Object</code> | Battery of compartment B |
| result.data.batteries.compartmentB.items | <code>Array.&lt;Object&gt;</code> | ? |
| result.data.batteries.compartmentB.items.x | <code>number</code> | ? |
| result.data.batteries.compartmentB.items.y | <code>number</code> | ? |
| result.data.batteries.compartmentB.items.z | <code>number</code> | ? |
| result.data.batteries.compartmentB.totalPoint | <code>number</code> | Number of items |
| result.data.batteries.compartmentB.bmsId | <code>string</code> | Battery management identification number |
| result.data.batteries.compartmentB.isConnected | <code>boolean</code> | Is battery connected or not |
| result.data.batteries.compartmentB.batteryCharging | <code>number</code> | State of charge in percent |
| result.data.batteries.compartmentB.chargedTimes | <code>string</code> | Charging cycles |
| result.data.batteries.compartmentB.temperature | <code>number</code> | Battery temperature in degree celsius |
| result.data.batteries.compartmentB.temperatureDesc | <code>string</code> | Battery temperature status |
| result.data.batteries.compartmentB.energyConsumedTody | <code>number</code> | Energey consumption of today |
| result.data.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.data.isCharging | <code>number</code> | Is charging |
| result.data.centreCtrlBattery | <code>string</code> | Centre control battery |
| result.data.batteryDetail | <code>boolean</code> | Battery detail |
| result.data.estimatedMileage | <code>number</code> | Estimated mileage in km |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="BatteryInfoHealth"></a>

## BatteryInfoHealth : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.batteries | <code>Object</code> | Batteries |
| result.data.batteries.compartmentA | <code>Object</code> | Battery compartment A |
| result.data.batteries.compartmentA.bmsId | <code>string</code> | Battery management system identification number |
| result.data.batteries.compartmentA.isConnected | <code>boolean</code> | Is connected or not |
| result.data.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.data.batteries.compartmentA.faults | <code>Array.&lt;Object&gt;</code> | List of faults |
| result.data.batteries.compartmentA.healthRecords | <code>Array.&lt;Object&gt;</code> | List of health records |
| result.data.batteries.compartmentA.healthRecords.result | <code>string</code> | Battery lost grade points |
| result.data.batteries.compartmentA.healthRecords.chargeCount | <code>string</code> | Charging cycles |
| result.data.batteries.compartmentA.healthRecords.color | <code>string</code> | HTML color in #RGB format |
| result.data.batteries.compartmentA.healthRecords.time | <code>number</code> | Timestamp in unix timstamp epoch format (13 digits) |
| result.data.batteries.compartmentA.healthRecords.name | <code>string</code> | Name |
| result.data.[batteries.compartmentB | <code>Object</code> | Battery compratment B |
| result.data.batteries.compartmentB.bmsId | <code>string</code> | Battery management system identification number |
| result.data.batteries.compartmentB.isConnected | <code>boolean</code> | Is connected or not |
| result.data.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.data.batteries.compartmentB.faults | <code>Array.&lt;Object&gt;</code> | List of faults |
| result.data.batteries.compartmentB.healthRecords | <code>Array.&lt;Object&gt;</code> | List of health records |
| result.data.batteries.compartmentB.healthRecords.result | <code>string</code> | Battery lost grade points |
| result.data.batteries.compartmentB.healthRecords.chargeCount | <code>string</code> | Charging cycles |
| result.data.batteries.compartmentB.healthRecords.color | <code>string</code> | HTML color in #RGB format |
| result.data.batteries.compartmentB.healthRecords.time | <code>number</code> | Timestamp in unix timstamp epoch format (13 digits) |
| result.data.batteries.compartmentB.healthRecords.name | <code>string</code> | Name |
| result.data.isDoubleBattery | <code>boolean</code> | Vehicle has one or two batteries |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="MotorData"></a>

## MotorData : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.isCharging | <code>number</code> | Is charging |
| result.data.lockStatus | <code>number</code> | Lock status |
| result.data.isAccOn | <code>number</code> | Is adaptive cruise control on or not |
| result.data.isFortificationOn | <code>string</code> | Is fortification on or not |
| result.data.isConnected | <code>boolean</code> | Is connected or not |
| result.data.postion | <code>Object</code> | Current position |
| result.data.postion.lat | <code>number</code> | Latitude in decimal degree (WGS 84) |
| result.data.postion.lng | <code>number</code> | Longitude in decimal degree (WGS 84) |
| result.data.hdop | <code>number</code> | Horizontal dilution of precision [0; 50]. A good HDOP is up to 2.5. For navigation a value up to 8 is acceptable. |
| result.data.time | <code>number</code> | Time in unix timestamp epoch format (13 digits) |
| result.data.batteries | <code>Object</code> | Batteries |
| result.data.batteries.compartmentA | <code>Object</code> | Battery compartment A |
| result.data.batteries.compartmentA.bmsId | <code>string</code> | Battery management system identification number |
| result.data.batteries.compartmentA.isConnected | <code>boolean</code> | Battery is connected or not |
| result.data.batteries.compartmentA.batteryCharging | <code>number</code> | Battery is charging or not |
| result.data.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.data.[batteries.compartmentB | <code>Object</code> | Battery compartment B |
| result.data.batteries.compartmentB.bmsId | <code>string</code> | Battery management system identification number |
| result.data.batteries.compartmentB.isConnected | <code>boolean</code> | Battery is connected or not |
| result.data.batteries.compartmentB.batteryCharging | <code>number</code> | Battery is charging or not |
| result.data.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.data.leftTime | <code>string</code> | Left time |
| result.data.estimatedMileage | <code>number</code> | Estimated mileage in km |
| result.data.gpsTimestamp | <code>number</code> | GPS timestamp in unix timestamp epoch format (13 digits) |
| result.data.infoTimestamp | <code>number</code> | Info timestamp in unix timestamp epoch format (13 digits) |
| result.data.nowSpeed | <code>number</code> | Current speed in km/h |
| result.data.batteryDetail | <code>boolean</code> | Battery detail |
| result.data.centreCtrlBattery | <code>number</code> | Centre control battery |
| result.data.ss_protocol_ver | <code>number</code> | SS protocol version |
| result.data.ss_online_sta | <code>string</code> | SS online status |
| result.data.gps | <code>number</code> | GPS signal strength |
| result.data.gsm | <code>number</code> | GSM signal strength |
| result.data.lastTrack | <code>Object</code> | Last track information |
| result.data.lastTrack.ridingTime | <code>number</code> | Riding time in s |
| result.data.lastTrack.distance | <code>number</code> | Distance in m |
| result.data.lastTrack.time | <code>number</code> | Timestamp in unix timestamp epoch format (13 digits) |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="OverallTally"></a>

## OverallTally : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.bindDaysCount | <code>number</code> | Number of days the vehicle is at the customer |
| result.data.totalMileage | <code>number</code> | Total mileage in km |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="Tracks"></a>

## Tracks : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Array.&lt;Object&gt;</code> | Response data |
| result.data.id | <code>string</code> | Identification number |
| result.data.trackId | <code>string</code> | Track identification number |
| result.data.startTime | <code>number</code> | Start time in unix timestamp epoch format (13 digits) |
| result.data.endTime | <code>number</code> | Stop time in unix timestamp epoch format (13 digits) |
| result.data.distance | <code>number</code> | Distance in m |
| result.data.avespeed | <code>number</code> | Average speed in km/h |
| result.data.ridingtime | <code>number</code> | Riding time in minutes |
| result.data.type | <code>string</code> | Type |
| result.data.date | <code>string</code> | Date in the format yyyymmdd |
| result.data.startPoint | <code>Object</code> | Start point |
| result.data.startPoint.lng | <code>string</code> | Longitude in decimal degree (WGS 84) |
| result.data.startPoint.lat | <code>string</code> | Latitude in decimal degree (WGS 84) |
| result.data.startPoint.speed | <code>string</code> | Speed |
| result.data.startPoint.battery | <code>string</code> | Battery state of charge in percent |
| result.data.startPoint.mileage | <code>string</code> | Mileage in m |
| result.data.startPoint.date | <code>string</code> | Date in unix timestamp epoch format (13 digits) |
| result.data.lastPoint | <code>Object</code> | Start point |
| result.data.lastPoint.lng | <code>string</code> | Longitude in decimal degree (WGS 84) |
| result.data.lastPoint.lat | <code>string</code> | Latitude in decimal degree (WGS 84) |
| result.data.lastPoint.speed | <code>string</code> | Speed |
| result.data.lastPoint.battery | <code>string</code> | Battery state of charge in percent |
| result.data.lastPoint.mileage | <code>string</code> | Mileage in m |
| result.data.lastPoint.date | <code>string</code> | Date in unix timestamp epoch format (13 digits) |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

<a name="TrackDetail"></a>

## TrackDetail : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.data | <code>Object</code> | Response data |
| result.data.trackItems | <code>Array.&lt;Object&gt;</code> | Track items (end point at index 0) |
| result.data.trackItems.lng | <code>number</code> | Longitude in decimal degree (WGS 84) |
| result.data.trackItems.lat | <code>number</code> | Latitude in decimal degree (WGS 84) |
| result.data.trackItems.date | <code>number</code> | Date in unix timestamp epoch format (13 digits) |
| result.data.startPoint | <code>Object</code> | Start point |
| result.data.startPoint.lng | <code>string</code> | Longitude in decimal degree (WGS 84) |
| result.data.startPoint.lat | <code>string</code> | Latitude in decimal degree (WGS 84) |
| result.data.lastPoint | <code>Object</code> | Start point |
| result.data.lastPoint.lng | <code>string</code> | Longitude in decimal degree (WGS 84) |
| result.data.lastPoint.lat | <code>string</code> | Latitude in decimal degree (WGS 84) |
| result.data.startTime | <code>string</code> | Start time in unix timestamp epoch format (13 digits) |
| result.data.lastDate | <code>string</code> | Last time in unix timestamp epoch format (13 digits) |
| result.desc | <code>string</code> | Response status description |
| result.trace | <code>string</code> | For debug purposes |
| result.status | <code>number</code> | Response status number |

