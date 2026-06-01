/******/ (function() { // webpackBootstrap
/*!************************************************!*\
  !*** ./src/taskpane/additional-info-dialog.js ***!
  \************************************************/
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
Office.onReady(function () {
  var data = JSON.parse(localStorage.getItem("additionalInfoData") || "[]");
  var container = document.getElementById("info-container");
  if (data.length === 0) {
    container.innerHTML = '<p class="ms-font-m">No additional information available.</p>';
  } else {
    data.forEach(function (_ref) {
      var label = _ref.label,
        value = _ref.value,
        isLink = _ref.isLink;
      var row = document.createElement("div");
      row.className = "info-row";
      var labelEl = document.createElement("span");
      labelEl.className = "info-label ms-font-m";
      labelEl.textContent = "".concat(label, ":");
      var valueEl = isLink ? document.createElement("a") : document.createElement("span");
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
  document.getElementById("close-btn").onclick = function () {
    Office.context.ui.messageParent("close");
  };
});
/******/ })()
;
//# sourceMappingURL=additional-info-dialog.js.map