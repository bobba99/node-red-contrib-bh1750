# node-red-contrib-bh1750

A node-red wrapper for my Node.js module [bh1750-sensor](https://www.npmjs.com/package/bh1750-sensor). This library uses the [i2c-bus](https://github.com/fivdi/i2c-bus) package for the communication with I2C devices on Raspberry Pi and other Linux's based boards.

The package provide a node __Bh1750__ that can be used directly in your flow.


## Installation

Either use the "Manage Palette" option menu or run the following command under your node-red working directory (default ``/.node-red``).

``
npm install node-red-contrib-bh1750
``

After restarting node-red the "Bh1750" node will be available in "sensors" category.

## Usage

### Configuration
After installation you can configure the following parameters:

* __Name:__ Display name of the node.
* __I2C Bus:__ I2C bus to which the sensor is connected (Default: 1).
* __I2C address:__ I2C address (7-bit) hexdecimal address (0x##). BH1750 sensors have 2 possible fixed address 0x23 or 0x5c.
* __Read Mode__ BH1750 Sensibility. Values can be :
  * _0x10_ CONTINUOUS_H_RESOLUTION_MODE (Default)
  * _0x11_ CONTINUOUS_H_RESOLUTION_MODE2
  * _0x13_ CONTINUOUS_L_RESOLUTION_MODE
* __Topic:__ Topic field for the output message. If topic is not configured (empty) the input msg topic will be used.

### Reading Data
When an input message arrive on the input called __Trigger__, data will be read and send to the output __Sensor reads__.
All of property except Topic (if configured) and payload present on the input message will be send as-is to the output message.

The __Sensor reads__ will have the following format:

```
msg = {
  _msgid: <node-red msg_id>,
  topic: <defined topic>,
  payload: <float in lx>
}
```

## Notes

This node was inspired by [ludiazv](https://github.com/ludiazv) work on [node-red-contrib-bme280](https://github.com/ludiazv/node-red-contrib-bme280) module.


## Change log

* 0.0.1 First version