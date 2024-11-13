import React, { useEffect } from 'react';
import Web3 from 'web3';
import { contractAddress, abi } from './constants/index.js';

const App = () => {
  const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/Bde8ZuQeitDe85oIGLHNrXurpO3bKBfW";
  let web3;
  let contract;

  useEffect(() => {
    connectMetaMask();
    // runMain();
  }, []);

  // Connect to MetaMask and set Web3 instance
  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Use MetaMask's provider
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("MetaMask connected successfully!");
      } else {
        console.error("MetaMask not found. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  // Get Address and send transaction
  const runMain = async () => {
    try {
      // Ensure MetaMask is connected
      const accounts = await web3.eth.getAccounts();
      console.log('accounts========', accounts)

      // Send a transaction to the contract (requires gas fees and user approval via MetaMask)
      const tx = await contract.methods.transferEther("0xC059365B58Af53dfAf7FE677eFA825702bc32fBF", 10).send({ from: accounts[0], value: 10 });
      console.log("Transaction sent:", tx);

      // Listen to the event emitted from the contract
      contract.events.getAmount({
        fromBlock: 'latest',
      })
      .on('data', (event) => {
        console.log("Event received:", event);
      })
      .on('error', (error) => {
        console.error("Error in event listener:", error);
      });

    } catch (error) {
      console.error("Error sending transaction or listening to events:", error);
    }
  };

  return (
    <div className="App">
      <h1>Web3 Interaction</h1>
      <button onClick={runMain}>Get Address and Listen to Events</button>
    </div>
  );
};

export default App;
