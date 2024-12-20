"use client"; // Add this directive to indicate that this is a client component

import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import styles from "../../index.module.css";
import Web3 from "web3";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Home: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string>("");
  const [nonce, setNonce] = useState<bigint | null>(null);
  const [isDay, setIsDay] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [walletConnected, setWalletConnected] = useState<boolean>(false); // State to manage wallet connection

  useEffect(() => {
    async function init() {
      if ((window as any).ethereum) {
        const web3Instance = new Web3((window as any).ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          setWalletConnected(true); // Set wallet connected state
          const nonceValue = await web3Instance.eth.getTransactionCount(accounts[0]);
          setNonce(nonceValue);
        }
      } else {
        alert("Please install MetaMask");
      }
    }
    init();

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech Recognition not supported in this browser.");
    }
  }, []);

  const toggleTheme = () => {
    setIsDay(!isDay);
  };

  const connectWallet = async () => {
    if (web3 && (window as any).ethereum) {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          // Show alert if no account is connected
          alert("Please connect to MetaMask.");
        } else {
          setConnectedAccount(accounts[0]);
          setWalletConnected(true); // Set wallet connected state
          const nonceValue = await web3.eth.getTransactionCount(accounts[0]);
          setNonce(nonceValue);
          console.log(`Wallet Address: ${accounts[0]}`);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, message]);
      setMessage("");
      setHistoryIndex(-1);
    }
  };

  const handleSendVoice = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    } else if (e.key === "ArrowUp") {
      if (historyIndex < chatHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setMessage(chatHistory[historyIndex + 1]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setMessage(chatHistory[historyIndex - 1]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setMessage("");
      }
    }
  };

  return (
    <div className={`${styles.container} ${isDay ? styles.day : styles.night}`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>Zapp BOT:) </h1>
          <div className={styles.controls}>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" checked={isDay} onChange={toggleTheme} />
              <span className={styles.slider}></span>
            </label>
            {!walletConnected ? ( // Conditionally render the button based on wallet connection
              <button
                onClick={connectWallet}
                className={styles.connectWalletButton}
              >
                Connect Wallet
              </button>
            ) : null}
            {connectedAccount && (
              <p>Connected Account: {connectedAccount.slice(0, 14)}...</p>
            )}
          </div>
        </header>
        <div className={styles.chatBox}>
          <div className={styles.chatHistory}>
            {chatHistory.map((msg, index) => (
              <div key={index} className={styles.chatMessage}>
                {msg}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className={styles.input}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              <img
                src="/pointer.png"
                alt="Arrow"
                style={{ width: "28px", height: "28px" }}
              />
            </button>
            <button onClick={handleSendVoice} className={styles.voiceButton}>
              <img
                src="/miccc.png"
                alt="Microphone"
                style={{ width: "26px", height: "26px" }}
              />
            </button>
            <button className={styles.newChatButton}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 