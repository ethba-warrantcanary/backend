let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));
let account = '0x0BDa834163fCc10fDbcD3944CC9834E77Ea31207'; // Dev
let contractAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let contract = web3.eth.contract(abi).at(contractAddress);
web3.eth.defaultAccount = account;

var objCheckCanary = document.getElementById("check_canary_status");
objCheckCanary.addEventListener('submit', () => {
    _0xaddress = document.querySelector('form#check_canary_status input').value;
    contract.isCanaryAlive([_0xaddress]).call(function (err, result) {
        if (err) {
            return alert(err);
        } else {
            alert("getCount call executed successfully."+result);
        }
    });
});