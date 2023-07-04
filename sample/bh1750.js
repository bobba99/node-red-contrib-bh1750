'use strict';

module.exports = function (RED) {
    const BH1750 = require('bh1750-sensor');

    function Bh1750(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.bus = parseInt(n.bus);
        node.addr = parseInt(n.address, 16);
        node.topic = n.topic || "";
        node.readMode = parseInt(n.readMode,16) || BH1750.CONTINUOUS_H_RESOLUTION_MODE;
        node.isInitialized = false;

        node.status({ fill: "grey", shape: "ring", text: "Initializing..." });
        node.log("Initializing on bus" + node.bus + " addr:" + node.addr);
        const options = {
            i2cBusNo: node.bus,
            i2cAddress: node.addr,
            readMode: node.readMode
        }

        node.sensor = new BH1750(options);

        var init= function(){
            node.isInitialized = true;
            node.status({ fill: "green", shape: "dot", text: node.type + " ready" });
        }
        init();

        node.on('input', function (_msg) {
            if (!node.isInitialized) {
                init();
                return null;
            }
            try {
                _msg.payload = node.sensor.readData();
                if (node.topic !== undefined && node.topic != "") _msg.topic = node.topic;
                node.send(_msg);
                node.status({ fill: "green", shape: "dot", text: _msg.payload + " lx" });
            } catch(err) {
                node.status({ fill: "red", shape: "ring", text: "Reading Error" });
                node.error("Error ->" + err);
            };
            return null;
        });

    } // Bh1750

    RED.nodes.registerType("Bh1750", Bh1750);
};
