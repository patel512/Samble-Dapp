/**
 * <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js"></script>
 */

// var Web3 = require('web3');
// console.log(Web3);
let web3;
let selectedNetwork = '4';
let paintingContract;

let api = {};

// /**
//  * A simple function to update text on the sample HTML page.
//  * @param {string} message: Message to update on the UI 
//  */
function updateMessage(message) {
    let hone = document.getElementById('message');
    hone.innerHTML = message;
}

console.log("From js");
window.addEventListener('load', function () {
    console.log("From jsinside ");
    // console.log(window.web3);
    if (typeof Web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider)
        console.log("web3");
        console.log(web3);
        if (window.web3.currentProvider.isMetaMask === true) {
            window.web3.eth.getAccounts((error, accounts) => {
                if (accounts.length == 0) {
                    // there is no active accounts in MetaMask
                    console.log('No Accounts');
                } else {
                    console.log("From Accounts");
                    // It's ok
                    let state = web3.currentProvider.publicConfigStore._state;
                    let address = state.selectedAddress;
                    let network = state.networkVersion;
                    // console.log(address, network);
                    // console.log(web3.eth.defaultAccount);
                    web3.eth.defaultAccount = web3.eth.coinbase;
                    // console.log(web3.eth.defaultAccount);
                    if (network !== selectedNetwork) {
                        
                        updateMessage('You need to be on the mainnet to use this website...');
                    } else {
                        
                        //0xbdba694b11cc4fb0a99124805359986e034f01e3
                        updateMessage('You are on the mainnet...');
                        let tokenaddress = "0x74a901cd0642d2a07763e62019595454966f009b";
                        console.log("",tokenaddress);
                        fetch('contracts/Token.json')
                            .then(response => response.json())
                            .then(json => {
                                
                                let TokenSaleContract = web3.eth.contract(json);
                                let tokenSaleContractInstance = TokenSaleContract.at(tokenaddress);
                                tokenContract = tokenSaleContractInstance;
                                console.log(tokenSaleContractInstance);
                                console.log("Instance",tokenSaleContractInstance)
                                api.getName = function(callback){
                                    tokenSaleContractInstance.name.call((err,name)=>{
                                        callback(err, name);
                                    });
                                }
                                
                                api.getSymbol = function(callback) {
                                    tokenSaleContractInstance.symbol.call((err, symbol)=>{
                                        callback(err, symbol);
                                    })
                                }
                                                             
                                api.balanceOf =function(address,callback) {
                                    tokenSaleContractInstance.balanceOf.call(address,(err,balances)=>{
                                        callback(err,balances)
                                    })
                                }
                                api.mint =function(addr,bal) {
                                    tokenSaleContractInstance.minttokens.sendTransaction(addr,bal,(err,balances)=>{
                                        console.log("Done ")
                                    })
                                }             

                                api.totalSupply = function(callback) {
                                    tokenSaleContractInstance.totalSupply.call((err,result) => {
                                        callback(err,result);
                                    })
                                }

                                api.owner = function(callback) {
                                    tokenSaleContractInstance.owner.call((err,result) => {
                                        callback(err,result);
                                    })
                                }

                                api.transferTo = function(address,tkid, callback) {
                                    tokenSaleContractInstance.transfer.sendTransaction(address,tkid,(err,result) => {
                                        callback(err,result);
                                    })
                                }
                            });
                    }
                }
            });
        } else {
            // Another web3 provider
            console.log('Another');
        }
    } else {
        // No web 3 provider
        console.log('No web3');
    }

});