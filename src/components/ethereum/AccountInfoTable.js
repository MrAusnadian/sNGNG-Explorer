import React from 'react';
import { bigNumber } from '../../utils/format-utils';
import * as appSettings from '../../appSettings.json';
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(appSettings.SIDECHAIN_RPC));

const AccountInfoTable = ({ account }) => {
  let tokenAddress = appSettings.TOKEN_CONTRACT;
  let walletAddress = account.address;
  // Get ERC20 Token contract instance
  let contract = new web3.eth.Contract(JSON.parse(appSettings.SIDECHAIN_ABI), tokenAddress);
  contract.methods.balanceOf(walletAddress).call((error, balance) => {
    // Get decimals
    contract.methods.decimals().call((error, decimals) => {
      console.log(balance);
      console.log(decimals);
      // calculate a balance
      if(balance > 0) {
        balance = balance / (10 ** decimals);
      }
      else {
        balance = 0;
      }
      console.log(balance.toString());
      var span = document.getElementById("tokenBal");
      span.textContent = balance.toString() + " sNGN-G";
    });
  });
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr>
            <th colSpan="2">Address: {account.address}</th>
          </tr>
      </thead>
      <tbody>
        <tr>
            <td>ETH Balance</td>
            <td><span>{ bigNumber(account.balance) } ETH</span></td>
        </tr>
        <tr>
          <td>Token Balance</td>
          <td><span id="tokenBal">0 sNGN-G</span></td>
        </tr>
        <tr>
            <td>Transaction Count <em>(# of outgoing TXs)</em></td>
            <td>{ account.transactionCount }</td>
        </tr>
        <tr>
            <td>Code</td>
            <td><textarea disabled="disabled">{ account.code }</textarea></td>
        </tr>
      </tbody>
    </table>
  )
}

export default AccountInfoTable;
