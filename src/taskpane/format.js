/* global document */
// TODO: FONT SIZE DROP DOWNS
// FIXME: INSERT IMAGE COMMAND NEEDS A URL TO FUNCTION PROPERLY
/**
 * @module Formatting
 * @description Toolbar formatting commands and WYSIWYG editor setup.
 */

/**
 * Executes a formatting command on the solution editor via `document.execCommand` and syncs toolbar button states.
 * @param {string} command - A valid `document.execCommand` command string (e.g. `"bold"`, `"italic"`)
 * @param {HTMLElement} formSolution - The contenteditable element to refocus after applying the command
 * @returns {void}
 */
export function applyFormat(command, formSolution) {
  document.execCommand(command, false, null);
  formSolution.focus();
  syncFormatButtons();
}
/**
 * Maps toolbar button element IDs to their corresponding `document.execCommand` command strings.
 * @type {Object.<string, string>}
 */
const map = {
  "bold-btn": "bold",
  "italic-btn": "italic",
  "underline-btn": "underline",
  "strike-btn": "strikethrough",
  "list-btn": "insertUnorderedList",
  "ordered-list-btn": "insertOrderedList",
  "pic-btn": "insertImage",
  "fontsize-btn": "fontSize",
};
/**
 * Queries the current editor format state and updates each toolbar button's `data-active` attribute
 * to reflect whether that format is currently active at the cursor position.
 * @returns {void}
 */
export function syncFormatButtons() {
  Object.entries(map).forEach(([btnId, cmd]) => {
    document.getElementById(btnId).dataset.active = document.queryCommandState(cmd)
      ? "true"
      : "false";
  });
}
// FIXME: IMPORTANT. FIX THIS!!!!!!!
/**
 * Attaches all toolbar button click handlers, keyboard shortcuts (Tab → indent),
 * and auto-capitalisation logic to the WYSIWYG solution editor element.
 * @param {HTMLElement} formSolution - The contenteditable element acting as the WYSIWYG editor
 * @returns {void}
 */
export function initFormatButtons(formSolution) {
  const fmt = (cmd) => applyFormat(cmd, formSolution);
  Object.entries(map).forEach(([btnId, cmd]) => {
    document.getElementById(btnId).onclick = () => fmt(cmd);
  });

  const listBtn = document.getElementById("list-btn");
  const orderedListBtn = document.getElementById("ordered-list-btn");

  formSolution.addEventListener("keyup", syncFormatButtons);
  formSolution.addEventListener("mouseup", syncFormatButtons);

  formSolution.addEventListener("keydown", function (event) {
    if (event.code === "Tab") {
      event.preventDefault();
      fmt("indent");
      // fmt("insertUnorderedList");
      // const inList = listBtn.dataset.active === "true" || orderedListBtn.dataset.active === "true";
      // if (inList) {
      //   fmt(event.shiftKey || event.key === "Backspace" ? "outdent" : "indent");
      // }
    }
  });

  // affects bolds - fix later
  formSolution.addEventListener("input", (e) => {
    if (e.inputType !== "insertText" || !e.data || !/[a-z]/.test(e.data)) return;
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return;
    const beforeTyped = node.textContent.slice(0, range.startOffset - 1);
    if (/[.!?]\s$/.test(beforeTyped) || beforeTyped === "") {
      document.execCommand("delete", false);
      document.execCommand("insertText", false, e.data.toUpperCase());
    }
  });
}
// Source - https://stackoverflow.com/a/40669242
// Posted by haxxxton, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-21, License - CC BY-SA 3.0
// TODO: decide whether to remove this or not. i dont think i used this function
/**
 * Converts a string so that the first letter of each sentence is capitalised.
 * @param {string} input - The string to convert
 * @param {boolean} [lowercaseBefore=false] - If `true`, lowercases the entire string before applying sentence casing
 * @returns {string} The sentence-cased string
 */
export function sentenceCase(input, lowercaseBefore) {
  input = input === undefined || input === null ? "" : input;
  if (lowercaseBefore) {
    input = input.toLowerCase();
  }
  return input
    .toString()
    .replace(/(^|[.!?]\s+|\n)([a-z])/g, (match, separator, char) => separator + char.toUpperCase());
}

// shift =
