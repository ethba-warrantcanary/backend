pragma solidity ^0.4.23;

contract WarrantCanary
{
    uint constant BLOCKS_UNTIL_DEATH = 5;

    mapping(address => bytes32) CanaryAddressToCanaryName;
    mapping(address => bool) CanaryAddressToAliveStatus;
    mapping(address => uint) CanaryAddressToLastBlock;

    // Only spawned canaries can call
    modifier onlySpawnedCanaries {
        require(CanaryAddressToCanaryName[msg.sender]>0);
        _;
    }

    //Ensure they don't send any eth
    modifier noEthTrans {
        require(msg.value <= 1);
        _;
    }

    //Create a new canary for the sending address
    function initCanary(bytes32 _name) public returns(bool)
    {
        require(CanaryAddressToCanaryName[msg.sender] == 0);
        CanaryAddressToCanaryName[msg.sender] = _name;
        CanaryAddressToAliveStatus[msg.sender] = true;
        return true;
    }

    //Get the canary name by any address
    function getCanaryNameByAddress(address _address) public view returns(bytes32)
    {
        return CanaryAddressToCanaryName[_address];
    }

    //Update the canary to say its still alive for the sending address
    function pingCanary() public payable onlySpawnedCanaries noEthTrans
    {
        if(this.isCanaryAlive(msg.sender)) {
            CanaryAddressToAliveStatus[msg.sender] = true;
            CanaryAddressToLastBlock[msg.sender] = block.number;
        } else {
            revert();
        }
    }

    //Get the last block number a canary "spoke" at
    function getCanaryLastBlockPing(address _address) public view returns(uint)
    {
        return CanaryAddressToLastBlock[_address];
    }

    //Get the canary alive status for any address
    function isCanaryAlive(address _address) public view returns(bool)
    {
        if(CanaryAddressToLastBlock[_address]==0) {
            return true;
        }

        if((CanaryAddressToLastBlock[_address]+BLOCKS_UNTIL_DEATH) <= block.number) {
            return false;
        }

        return true;
    }
}