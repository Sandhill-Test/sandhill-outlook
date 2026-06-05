export function showAlert(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const box = document.createElement("div");
    box.classList.add("box");
    const msg = document.createElement("p");
    msg.classList.add("msg");
    msg.textContent = message;

    const [okBtn, noBtn] = ["OK", "NO"].map((label) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.classList.add("alertbtn");
      btn.onclick = () => {
        document.body.removeChild(overlay);
        resolve(label === "OK");
      };
      return btn;
    });

    box.appendChild(msg);
    box.appendChild(okBtn);
    box.appendChild(noBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    okBtn.focus();
  });
}
