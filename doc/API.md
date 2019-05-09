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
</dl>

## Typedefs

<dl>
<dt><a href="#Error">Error</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Token">Token</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#Vehicles">Vehicles</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#BatteryInfo">BatteryInfo</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#BatteryInfoHealth">BatteryInfoHealth</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#MotorData">MotorData</a> : <code>Promise</code></dt>
<dd></dd>
<dt><a href="#OverallTally">OverallTally</a> : <code>Promise</code></dt>
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
        * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ [<code>BatteryInfo</code>](#BatteryInfo)
        * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ [<code>BatteryInfoHealth</code>](#BatteryInfoHealth)
        * [.getMotorInfo(options)](#niuCloudConnector.Client+getMotorInfo) ⇒ [<code>MotorData</code>](#MotorData)
        * [.getOverallTally(options)](#niuCloudConnector.Client+getOverallTally) ⇒ [<code>OverallTally</code>](#OverallTally)
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
    * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ [<code>BatteryInfo</code>](#BatteryInfo)
    * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ [<code>BatteryInfoHealth</code>](#BatteryInfoHealth)
    * [.getMotorInfo(options)](#niuCloudConnector.Client+getMotorInfo) ⇒ [<code>MotorData</code>](#MotorData)
    * [.getOverallTally(options)](#niuCloudConnector.Client+getOverallTally) ⇒ [<code>OverallTally</code>](#OverallTally)

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
Get vehicles.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>Array.&lt;Vehicles&gt;</code>](#Vehicles) - Vehicles.  
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

<a name="niuCloudConnector.AccountBaseUrl"></a>

### niuCloudConnector.AccountBaseUrl
URL to NIU login, used for retrieving an access token.

**Kind**: static property of [<code>niuCloudConnector</code>](#niuCloudConnector)  
<a name="niuCloudConnector.AppApiBaseUrl"></a>

### niuCloudConnector.AppApiBaseUrl
URL to the NIU app API.

**Kind**: static property of [<code>niuCloudConnector</code>](#niuCloudConnector)  
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
| result.sn | <code>string</code> | Vehicle serial number |
| result.specialEdition | <code>string</code> | ? |
| result.vehicleColorImg | <code>string</code> | URL to vehicle color image |
| result.vehicleLogoImg | <code>string</code> | URL to vehicle logo image |
| result.vehicleTypeId | <code>string</code> | Vehicle type id |
| result.indexHeaderBg | <code>string</code> | URL to background image |
| result.scootorImg | <code>string</code> | URL to vehicle image |
| result.batteryInfoBg | <code>string</code> | URL to battery info background image |
| result.myPageHeaderBg | <code>string</code> | URL to my page header background |
| result.listScooterImg | <code>string</code> | URL to scooter list background image |
| result.name | <code>string</code> | Vehicle name, given by the user |
| result.frameNo | <code>string</code> | Vehicle identification number (VIN) |
| result.engineNo | <code>string</code> | Engine identification number |
| result.isSelected | <code>boolean</code> | ? |
| result.isMaster | <code>boolean</code> | ? |
| result.bindNum | <code>number</code> | ? |
| result.renovated | <code>boolean</code> | ? |
| result.bindDate | <code>number</code> | ? timestamp in epoch unix timestamp format (13 digits) |
| result.isShow | <code>boolean</code> | ? |
| result.isLite | <code>boolean</code> | ? |
| result.gpsTimestamp | <code>number</code> | GPS timestamp in epoch unix timestamp format (13 digits) |
| result.infoTimestamp | <code>number</code> | Info timestamp in epoch unix timestamp format (13 digits) |
| result.productType | <code>string</code> | Product type, e.g. "native" |
| result.process | <code>string</code> | ? |
| result.brand | <code>string</code> | ? |
| result.isDoubleBattery | <code>boolean</code> | Vehicle has one or two batteries |
| result.features | <code>Array.&lt;Object&gt;</code> | List of features |
| result.features.featureName | <code>string</code> | Feature name |
| result.features.isSupport | <code>boolean</code> | ? |
| result.features.switch_status | <code>string</code> | ? |
| result.type | <code>string</code> | Vehicle model, e.g. "NGT  Black with Red Stripes" |

<a name="BatteryInfo"></a>

## BatteryInfo : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.batteries | <code>Object</code> | Batteries |
| result.batteries.compartmentA | <code>Object</code> | Battery of compartment A |
| result.batteries.compartmentA.items | <code>Array.&lt;Object&gt;</code> | ? |
| result.batteries.compartmentA.items.x | <code>number</code> | ? |
| result.batteries.compartmentA.items.y | <code>number</code> | ? |
| result.batteries.compartmentA.items.z | <code>number</code> | ? |
| result.batteries.compartmentA.totalPoint | <code>number</code> | Number of items |
| result.batteries.compartmentA.bmsId | <code>string</code> | Battery management identification number |
| result.batteries.compartmentA.isConnected | <code>boolean</code> | Is battery connected or not |
| result.batteries.compartmentA.batteryCharging | <code>number</code> | State of charge in percent |
| result.batteries.compartmentA.chargedTimes | <code>string</code> | Charging cycles |
| result.batteries.compartmentA.temperature | <code>number</code> | Battery temperature in degree celsius |
| result.batteries.compartmentA.temperatureDesc | <code>string</code> | Battery temperature status |
| result.batteries.compartmentA.energyConsumedTody | <code>number</code> | Energey consumption of today |
| result.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.[batteries.compartmentB | <code>Object</code> |  |
| result.batteries.compartmentB.items | <code>Array.&lt;Object&gt;</code> | ? |
| result.batteries.compartmentB.items.x | <code>number</code> | ? |
| result.batteries.compartmentB.items.y | <code>number</code> | ? |
| result.batteries.compartmentB.items.z | <code>number</code> | ? |
| result.batteries.compartmentB.totalPoint | <code>number</code> | Number of items |
| result.batteries.compartmentB.bmsId | <code>string</code> | Battery management identification number |
| result.batteries.compartmentB.isConnected | <code>boolean</code> | Is battery connected or not |
| result.batteries.compartmentB.batteryCharging | <code>number</code> | State of charge in percent |
| result.batteries.compartmentB.chargedTimes | <code>string</code> | Charging cycles |
| result.batteries.compartmentB.temperature | <code>number</code> | Battery temperature in degree celsius |
| result.batteries.compartmentB.temperatureDesc | <code>string</code> | Battery temperature status |
| result.batteries.compartmentB.energyConsumedTody | <code>number</code> | Energey consumption of today |
| result.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.isCharging | <code>number</code> | Is charging |
| result.centreCtrlBattery | <code>string</code> | Centre control battery |
| result.batteryDetail | <code>boolean</code> | Battery detail |
| result.estimatedMileage | <code>number</code> | Estimated mileage in km |

<a name="BatteryInfoHealth"></a>

## BatteryInfoHealth : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.batteries | <code>Object</code> | Batteries |
| result.batteries.compartmentA | <code>Object</code> | Battery compartment A |
| result.batteries.compartmentA.bmsId | <code>string</code> | Battery management system identification number |
| result.batteries.compartmentA.isConnected | <code>boolean</code> | Is connected or not |
| result.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.batteries.compartmentA.faults | <code>Array.&lt;Object&gt;</code> | List of faults |
| result.batteries.compartmentA.healthRecords | <code>Array.&lt;Object&gt;</code> | List of health records |
| result.batteries.compartmentA.healthRecords.result | <code>string</code> | Battery lost grade points |
| result.batteries.compartmentA.healthRecords.chargeCount | <code>string</code> | Charging cycles |
| result.batteries.compartmentA.healthRecords.color | <code>string</code> | HTML color in #RGB format |
| result.batteries.compartmentA.healthRecords.time | <code>number</code> | Timestamp in unix timstamp epoch format (13 digits) |
| result.batteries.compartmentA.healthRecords.name | <code>string</code> | Name |
| result.[batteries.compartmentB | <code>Object</code> | Battery compratment B |
| result.batteries.compartmentB.bmsId | <code>string</code> | Battery management system identification number |
| result.batteries.compartmentB.isConnected | <code>boolean</code> | Is connected or not |
| result.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.batteries.compartmentB.faults | <code>Array.&lt;Object&gt;</code> | List of faults |
| result.batteries.compartmentB.healthRecords | <code>Array.&lt;Object&gt;</code> | List of health records |
| result.batteries.compartmentB.healthRecords.result | <code>string</code> | Battery lost grade points |
| result.batteries.compartmentB.healthRecords.chargeCount | <code>string</code> | Charging cycles |
| result.batteries.compartmentB.healthRecords.color | <code>string</code> | HTML color in #RGB format |
| result.batteries.compartmentB.healthRecords.time | <code>number</code> | Timestamp in unix timstamp epoch format (13 digits) |
| result.batteries.compartmentB.healthRecords.name | <code>string</code> | Name |
| result.isDoubleBattery | <code>boolean</code> | Vehicle has one or two batteries |

<a name="MotorData"></a>

## MotorData : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.isCharging | <code>number</code> | Is charging |
| result.lockStatus | <code>number</code> | Lock status |
| result.isAccOn | <code>number</code> | Is adaptive cruise control on or not |
| result.isFortificationOn | <code>string</code> | Is fortification on or not |
| result.isConnected | <code>boolean</code> | Is connected or not |
| result.postion | <code>Object</code> | Current position |
| result.postion.lat | <code>number</code> | Latitude |
| result.postion.lng | <code>number</code> | Longitude |
| result.hdop | <code>number</code> | ? |
| result.time | <code>number</code> | Time in unix timestamp epoch format (13 digits) |
| result.batteries | <code>Object</code> | Batteries |
| result.batteries.compartmentA | <code>Object</code> | Battery compartment A |
| result.batteries.compartmentA.bmsId | <code>string</code> | Battery management system identification number |
| result.batteries.compartmentA.isConnected | <code>boolean</code> | Battery is connected or not |
| result.batteries.compartmentA.batteryCharging | <code>number</code> | Battery is charging or not |
| result.batteries.compartmentA.gradeBattery | <code>string</code> | Battery grade points |
| result.[batteries.compartmentB | <code>Object</code> | Battery compartment B |
| result.batteries.compartmentB.bmsId | <code>string</code> | Battery management system identification number |
| result.batteries.compartmentB.isConnected | <code>boolean</code> | Battery is connected or not |
| result.batteries.compartmentB.batteryCharging | <code>number</code> | Battery is charging or not |
| result.batteries.compartmentB.gradeBattery | <code>string</code> | Battery grade points |
| result.leftTime | <code>string</code> | Left time |
| result.estimatedMileage | <code>number</code> | Estimated mileage in km |
| result.gpsTimestamp | <code>number</code> | GPS timestamp in unix timestamp epoch format (13 digits) |
| result.infoTimestamp | <code>number</code> | Info timestamp in unix timestamp epoch format (13 digits) |
| result.nowSpeed | <code>number</code> | Current speed in km/h |
| result.batteryDetail | <code>boolean</code> | Battery detail |
| result.centreCtrlBattery | <code>number</code> | Centre control battery |
| result.ss_protocol_ver | <code>number</code> | SS protocol version |
| result.ss_online_sta | <code>string</code> | SS online status |
| result.gps | <code>number</code> | GPS signal strength |
| result.gsm | <code>number</code> | GSM signal strength |
| result.lastTrack | <code>Object</code> | Last track information |
| result.lastTrack.ridingTime | <code>number</code> | Riding time in s |
| result.lastTrack.distance | <code>number</code> | Distance in m |
| result.lastTrack.time | <code>number</code> | Timestamp in unix timestamp epoch format (13 digits) |

<a name="OverallTally"></a>

## OverallTally : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> | Received response |
| result.bindDaysCount | <code>number</code> | Number of days the vehicle is at the customer |
| result.totalMileage | <code>number</code> | Total mileage in km |

