/* global document */
// TODO: FONT SIZE DROP DOWNS
// FIXME: INSERT IMAGE COMMAND NEEDS A URL TO FUNCTION PROPERLY

export function applyFormat(command, formSolution) {
  document.execCommand(command, false, null);
  formSolution.focus();
  syncFormatButtons();
}
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
export function syncFormatButtons() {
  Object.entries(map).forEach(([btnId, cmd]) => {
    document.getElementById(btnId).dataset.active = document.queryCommandState(cmd)
      ? "true"
      : "false";
  });
}
// FIXME: IMPORTANT. FIX THIS!!!!!!!
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
