/* global document, Office, localStorage */
/**
 * @module Dialog
 * @description Additional info dialog behaviour and form handling.
 */

/**
 * Initialises the additional-info dialog once the Office runtime is ready.
 * Reads the `additionalInfoData` array from localStorage (written by the main taskpane before
 * opening this dialog), renders each field as a labelled row, and wires up the close button.
 */
Office.onReady(() => {
  const data = JSON.parse(localStorage.getItem("additionalInfoData") || "[]");
  const container = document.getElementById("info-container");

  if (data.length === 0) {
    container.innerHTML = '<p class="ms-font-m">No additional information available.</p>';
  } else {
    data.forEach(({ label, value, isLink }) => {
      const row = document.createElement("div");
      row.className = "info-row";

      const labelEl = document.createElement("span");
      labelEl.className = "info-label ms-font-m";
      labelEl.textContent = `${label}:`;

      const valueEl = isLink ? document.createElement("a") : document.createElement("span");
      valueEl.className = "info-value ms-font-m";
      if (isLink) {
        valueEl.href = value;
        valueEl.target = "_blank";
        valueEl.rel = "noopener noreferrer";
        valueEl.textContent = value;
      } else {
        valueEl.textContent = value;
      }

      row.append(labelEl, valueEl);
      container.appendChild(row);
    });
  }

  document.getElementById("close-btn").onclick = () => {
    Office.context.ui.messageParent("close");
  };
});
