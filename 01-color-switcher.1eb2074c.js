!function(){var t=null,n={bodyEl:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};n.startBtn.disabled=!1,n.stopBtn.disabled=!0,n.startBtn.classList.add("btn","btn-start"),n.stopBtn.classList.add("btn","btn-stop"),n.startBtn.addEventListener("click",(function(){t=setInterval((function(){n.bodyEl.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),n.startBtn.disabled=!0,n.stopBtn.disabled=!1})),n.stopBtn.addEventListener("click",(function(){clearInterval(t),n.startBtn.disabled=!1,n.stopBtn.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.1eb2074c.js.map