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
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // Track the index of the chat history

  useEffect(() => {
    async function init() {
      // initialize web-3
      if ((window as any).ethereum) {
        const web3Instance = new Web3((window as any).ethereum);
        setWeb3(web3Instance);
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = await web3Instance.eth.getAccounts();
        setConnectedAccount(accounts[0]);

        // Get the nonce
        const nonceValue = await web3Instance.eth.getTransactionCount(
          accounts[0]
        );
        setNonce(nonceValue);
      } else {
        alert("Please install MetaMask");
      }
    }
    init();

    // initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
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
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = await web3.eth.getAccounts();
        setConnectedAccount(accounts[0]);

        // Get the nonce
        const nonceValue = await web3.eth.getTransactionCount(accounts[0]);
        setNonce(nonceValue);

        console.log(`Wallet Address : ${connectedAccount}`);
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
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <ul>
            <li>Home</li>
            <li>Settings</li>
            <li>Profile</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>Zapp:) </h1>
          <div className={styles.controls}>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" checked={isDay} onChange={toggleTheme} />
              <span className={styles.slider}></span>
            </label>
            <button
              onClick={connectWallet}
              style={{ width: "100px", height: "80px" }}
            >
              Connect Wallet
            </button>
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
