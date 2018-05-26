var Canary = artifacts.require("./WarrantCanary.sol");

contract('Canary', function(accounts) {
    it("we can create a canary?", () => {
        return Canary.deployed().then(function(instance) {
            return instance.initCanary.call("0x123");
        }).then(function(r) {
            assert.equal(r.valueOf(), true, "Canary was not created");
        });
    });
    it("canary should be alive at spawn", () => {
        return Canary.deployed().then(function(instance) {
            instance.initCanary.call("0x123");
            return instance.isCanaryAlive.call(accounts[0]);
        }).then(function(r) {
            assert.equal(r, true, JSON.stringify(r));
        });
    });
    it("canary is alive after ping", () => {
        return Canary.deployed().then(function(instance) {
            instance.initCanary.call("0x123", {from:accounts[4]});
            instance.pingCanary({from:accounts[4]});
            return instance.isCanaryAlive.call(accounts[4]);
        }).then(function(r) {
            assert.equal(r, true, "Canary is alive...");
        });
    });
    /*
    it("we cannot create 2 canaries on the same account?", () => {
        return Canary.deployed().then(function(instance) {
            instance.initCanary.call("0x123");
            return instance.initCanary.call("0x123");
        }).then(function(r) {
            assert.equal(r.valueOf(), false, "Canary was created");
        });
    });
    it("canary is named correctly?", () => {
        let inst;

        return Canary.deployed().then(function(instance) {
            inst = instance;
            inst.initCanary.call("0x123");
            return inst.getCanaryNameByAddress.call(accounts[0]);
        }).then(function(r) {
            assert.equal(r.valueOf(), accounts[0], "Canary name is returned incorrect!");
        });
    })
    */
});
