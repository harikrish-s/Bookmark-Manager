/*global chrome*/
import React, { useState, useEffect } from "react";

function Popup() {
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    // Send a message to the background script to get the URLs of the current open tabs
    chrome.runtime.sendMessage({ message: "getTabs" }, (response) => {
      setTabs(response.tabs);
    });
  }, []);
  const downloadTabUrls = () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const urls = tabs.map((tab) => tab.url);
      const urlsText = urls.join('\n');
      const blob = new Blob([urlsText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tab-urls.txt';
      link.click();
    });
  };
  return (
    <div className="mx-8 mt-8" >
      <div className="header-font text-center font-bold text-[40px] mb-[10px] text-[#2B1887]"><h1 className="inline">Study Buddy </h1> 
      <a href="https://onlinenotepad.org/notepad" className="ml-[10px] inline" target="_blank"><img src={require("./notebook.png")} className="inline h-[28px] hover:scale-[1.2] duration-[400ms]"></img></a>
        <a onClick={downloadTabUrls} className="ml-[10px] inline" target="_blank"><img src={require("./download.png")} className="inline h-[28px] hover:scale-[1.2] hover:cursor-pointer duration-[400ms]"></img></a>
        </div>
      <div>
        {tabs.map((url) => (

          <div className="my-[16px] bg-white rounded-[12px]  mx-[10px]  p-[16px] flex duration-[400ms] group hover:bg-[#2B1887]">
            <img className="w-4 h-4 mt-[5px]"
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
            />
            <a href={url} target="_blank" rel="noopener noreferrer" className="body-font text-justify text-[14px] ml-4 duration-[400ms] truncate group-hover:text-white">
              {url}
            </a>
          </div>

        ))}
      </div>
      <div className="h-[10px]"></div>
    </div>
  );
}

export default Popup;
