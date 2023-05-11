import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function connectWeb3() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      }
    }
    connectWeb3();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (web3 && account) {
        const balance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(balance, "ether"));
      }
    }
    fetchBalance();
  }, [web3, account]);

  return (
    <div>
      {web3 && account && (
        <p>
          Your account: <strong>{account}</strong>
        </p>
      )}
      {balance && (
        <p>
          Your balance: <strong>{balance}</strong> ETH
        </p>
      )}
    </div>
  );
}

export default App;
