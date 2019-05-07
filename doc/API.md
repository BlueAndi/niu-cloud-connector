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
        * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ <code>Promise</code>
        * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ <code>Promise</code>
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
    * [.getBatteryInfo(options)](#niuCloudConnector.Client+getBatteryInfo) ⇒ <code>Promise</code>
    * [.getBatteryHealth(options)](#niuCloudConnector.Client+getBatteryHealth) ⇒ <code>Promise</code>
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

#### client.getBatteryInfo(options) ⇒ <code>Promise</code>
Get battery info of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: <code>Promise</code> - Data object.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getBatteryHealth"></a>

#### client.getBatteryHealth(options) ⇒ <code>Promise</code>
Get battery health of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: <code>Promise</code> - BatteryInfoHealth  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getMotorInfo"></a>

#### client.getMotorInfo(options) ⇒ [<code>MotorData</code>](#MotorData)
Get motor info of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>MotorData</code>](#MotorData) - Motor data  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options. |
| options.sn | <code>string</code> | Vehicle serial number. |

<a name="niuCloudConnector.Client+getOverallTally"></a>

#### client.getOverallTally(options) ⇒ [<code>OverallTally</code>](#OverallTally)
Get overall tally of vehicle.

**Kind**: instance method of [<code>Client</code>](#niuCloudConnector.Client)  
**Returns**: [<code>OverallTally</code>](#OverallTally) - Overall tally  

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
| result | <code>Object</code> |  |
| result.sn | <code>string</code> |  |
| result.specialEdition | <code>string</code> |  |
| result.vehicleColorImg | <code>string</code> |  |
| result.vehicleLogoImg | <code>string</code> |  |
| result.vehicleTypeId | <code>string</code> |  |
| result.indexHeaderBg | <code>string</code> |  |
| result.scootorImg | <code>string</code> |  |
| result.batteryInfoBg | <code>string</code> |  |
| result.myPageHeaderBg | <code>string</code> |  |
| result.listScooterImg | <code>string</code> |  |
| result.name | <code>string</code> |  |
| result.frameNo | <code>string</code> |  |
| result.engineNo | <code>string</code> |  |
| result.isSelected | <code>boolean</code> |  |
| result.isMaster | <code>boolean</code> |  |
| result.bindNum | <code>number</code> |  |
| result.renovated | <code>boolean</code> |  |
| result.bindDate | <code>number</code> |  |
| result.isShow | <code>boolean</code> |  |
| result.isLite | <code>boolean</code> |  |
| result.gpsTimestamp | <code>number</code> |  |
| result.infoTimestamp | <code>number</code> |  |
| result.productType | <code>string</code> |  |
| result.process | <code>string</code> |  |
| result.brand | <code>string</code> |  |
| result.isDoubleBattery | <code>boolean</code> |  |
| result.features | <code>Array.&lt;Object&gt;</code> |  |
| result.features.featureName | <code>string</code> |  |
| result.features.isSupport | <code>boolean</code> |  |
| result.features.switch_status | <code>string</code> |  |
| result.type | <code>string</code> |  |

<a name="BatteryInfo"></a>

## BatteryInfo : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> |  |
| result.batteries | <code>Object</code> |  |
| result.batteries.compartmentA | <code>Object</code> |  |
| result.batteries.compartmentA.items | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentA.items.x | <code>number</code> |  |
| result.batteries.compartmentA.items.y | <code>number</code> |  |
| result.batteries.compartmentA.items.z | <code>number</code> |  |
| result.batteries.compartmentA.totalPoint | <code>number</code> |  |
| result.batteries.compartmentA.bmsId | <code>string</code> |  |
| result.batteries.compartmentA.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentA.batteryCharging | <code>number</code> |  |
| result.batteries.compartmentA.chargedTimes | <code>string</code> |  |
| result.batteries.compartmentA.temperature | <code>number</code> |  |
| result.batteries.compartmentA.temperatureDesc | <code>string</code> |  |
| result.batteries.compartmentA.energyConsumedTody | <code>number</code> |  |
| result.batteries.compartmentA.gradeBattery | <code>string</code> |  |
| result.[batteries.compartmentB | <code>Object</code> |  |
| result.batteries.compartmentB.items | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentB.items.x | <code>number</code> |  |
| result.batteries.compartmentB.items.y | <code>number</code> |  |
| result.batteries.compartmentB.items.z | <code>number</code> |  |
| result.batteries.compartmentB.totalPoint | <code>number</code> |  |
| result.batteries.compartmentB.bmsId | <code>string</code> |  |
| result.batteries.compartmentB.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentB.batteryCharging | <code>number</code> |  |
| result.batteries.compartmentB.chargedTimes | <code>string</code> |  |
| result.batteries.compartmentB.temperature | <code>number</code> |  |
| result.batteries.compartmentB.temperatureDesc | <code>string</code> |  |
| result.batteries.compartmentB.energyConsumedTody | <code>number</code> |  |
| result.batteries.compartmentB.gradeBattery | <code>string</code> |  |
| result.isCharging | <code>number</code> |  |
| result.centreCtrlBattery | <code>string</code> |  |
| result.batteryDetail | <code>boolean</code> |  |
| result.estimatedMileage | <code>number</code> |  |

<a name="BatteryInfoHealth"></a>

## BatteryInfoHealth : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> |  |
| result.batteries | <code>Object</code> |  |
| result.batteries.compartmentA | <code>Object</code> |  |
| result.batteries.compartmentA.bmsId | <code>string</code> |  |
| result.batteries.compartmentA.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentA.gradeBattery | <code>string</code> |  |
| result.batteries.compartmentA.faults | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentA.healthRecords | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentA.healthRecords.result | <code>string</code> |  |
| result.batteries.compartmentA.healthRecords.chargeCount | <code>string</code> |  |
| result.batteries.compartmentA.healthRecords.color | <code>string</code> |  |
| result.batteries.compartmentA.healthRecords.time | <code>number</code> |  |
| result.batteries.compartmentA.healthRecords.name | <code>string</code> |  |
| result.[batteries.compartmentB | <code>Object</code> |  |
| result.batteries.compartmentB.bmsId | <code>string</code> |  |
| result.batteries.compartmentB.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentB.gradeBattery | <code>string</code> |  |
| result.batteries.compartmentB.faults | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentB.healthRecords | <code>Array.&lt;Object&gt;</code> |  |
| result.batteries.compartmentB.healthRecords.result | <code>string</code> |  |
| result.batteries.compartmentB.healthRecords.chargeCount | <code>string</code> |  |
| result.batteries.compartmentB.healthRecords.color | <code>string</code> |  |
| result.batteries.compartmentB.healthRecords.time | <code>number</code> |  |
| result.batteries.compartmentB.healthRecords.name | <code>string</code> |  |
| result.isDoubleBattery | <code>boolean</code> |  |

<a name="MotorData"></a>

## MotorData : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> |  |
| result.isCharging | <code>number</code> |  |
| result.lockStatus | <code>number</code> |  |
| result.isAccOn | <code>number</code> |  |
| result.isFortificationOn | <code>string</code> |  |
| result.isConnected | <code>boolean</code> |  |
| result.postion | <code>Object</code> |  |
| result.postion.lat | <code>number</code> |  |
| result.postion.lng | <code>number</code> |  |
| result.hdop | <code>number</code> |  |
| result.time | <code>number</code> |  |
| result.batteries | <code>Object</code> |  |
| result.batteries.compartmentA | <code>Object</code> |  |
| result.batteries.compartmentA.bmsId | <code>string</code> |  |
| result.batteries.compartmentA.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentA.batteryCharging | <code>number</code> |  |
| result.batteries.compartmentA.gradeBattery | <code>string</code> |  |
| result.[batteries.compartmentB | <code>Object</code> |  |
| result.batteries.compartmentB.bmsId | <code>string</code> |  |
| result.batteries.compartmentB.isConnected | <code>boolean</code> |  |
| result.batteries.compartmentB.batteryCharging | <code>number</code> |  |
| result.batteries.compartmentB.gradeBattery | <code>string</code> |  |
| result.leftTime | <code>string</code> |  |
| result.estimatedMileage | <code>number</code> |  |
| result.gpsTimestamp | <code>number</code> |  |
| result.infoTimestamp | <code>number</code> |  |
| result.nowSpeed | <code>number</code> |  |
| result.batteryDetail | <code>boolean</code> |  |
| result.centreCtrlBattery | <code>number</code> |  |
| result.ss_protocol_ver | <code>number</code> |  |
| result.ss_online_sta | <code>string</code> |  |
| result.gps | <code>number</code> |  |
| result.gsm | <code>number</code> |  |
| result.lastTrack | <code>Object</code> |  |
| result.lastTrack.ridingTime | <code>number</code> |  |
| result.lastTrack.distance | <code>number</code> |  |
| result.lastTrack.time | <code>number</code> |  |

<a name="OverallTally"></a>

## OverallTally : <code>Promise</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#niuCloudConnector.Client) | Client |
| result | <code>Object</code> |  |
| result.bindDaysCount | <code>number</code> | Number of days the vehicle is at the customer |
| result.totalMileage | <code>number</code> | Total mileage in km |

