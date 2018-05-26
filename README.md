### WarrantCanary contract

This contract will create a "warrant canary" that you need to keep alive by 
sending a 0 ETH transaction to `pingCanary()` on the address that you created
the canary with (in `initCanary()`).

After _x_ blocks, if you haven't sent a transaction to the contract, then your 
canary becomes "dead" - which you can query with `isCanaryAlive()`.

### Deploy

Run;

* `truffle develop`
* `compile`
* `migrate --reset`

The contract will then be on a private network with 10 accounts you can test with.

### Methods

##### `initCanary(bytes32 _name)`

This method creates a canary against your address. The name of the canary is chosen
by you as a parameter (`_name`).

##### `getCanaryNameByAddress(address _address)`

This method will return a canary name for a given address. If a canary does not exist
for the given address then a return of `0x000...` is given.

#### `pingCanary()`

This method is what you will call to keep your canary alive. You can only send
a 0 ETH transfer to it (only paying the gas) and you must do it again before
`BLOCKS_UNTIL_DEATH` number of blocks are mined.

Only canary owners can do this.

#### `getCanaryLastBlockPing(address _address)`

This method will return the last block number that the canary pinged itself
on.

#### `isCanaryAlive(address _address)`

This method will return a bool to indicate if a canary for a specific address is alive or not.