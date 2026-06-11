/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, localStorage */
/**
 * @module taskpane
 * @description Main taskpane - data fetchng, page rendering, and navigation
 */
import * as editor from "./WYSIWYGeditor.js";
import { showAlert } from "./utilscripts.js";

// do a selection thing - select to bulk delete
// TODO: do smth about the back btn function cuz it works quite sloppy when editing and pressing back - check if i did smth about it cuz i cant remember

// add a delete article function?

/** @type {Array<Object>} Contains every subpage fetched from the database */
let allSubpages = [];

/** @type {Array<Object>} Contains every page fetched from the database */
let allPages = [];

let allTopics = [];

/** @type {Array<Object>} Contains every pinned subpage fetched from the database */
let pinnedSubpages = [];

/** @type {number|null} Tracks which page is currently open; null if none */
let currentPageId = null;

/** @type {number|null} Tracks which subpage is currently open; null if none */
let currentSubpageId = null;

// testing
// TODO: REMOVE THIS FUNCTION

async function printPinned() {
  try {
    const res = await fetch(`https://localhost:3001/api/subpages/pin`);
    if (!res.ok) throw new Error("pinned Subpage not found");
    // return await res.json();
    const pinnedPgs = await res.json();
    pinnedSubpages = pinnedPgs;
    console.log(pinnedPgs);
  } catch (err) {
    console.error("Failed to load subpage:", err);
  }
}

// TODO: FUNCTION TO GET THE RENDERS idk

// function renderItems(toRender) {
// switch (toRender){
//   case mainPage:
//      renderResults(allPages, allSubPages)
//     break
//   case subPage:
//     renderSubpage()
//     break
//   case searchBarList:
//     renderSearchBarList(allSubpages)
//     break
//   case searchList:
//     renderSearchList()
// }

// }
/**
 * Collects data from the Pages and Subpage tables in the database using the Fetch API.
 * Retries the connection up to `retries` times before logging an error. On success, calls {@link renderResults}.
 * @async
 * @param {number} [retries=7] - The number of connection attempts before giving up
 * @param {number} [delay=2000] - The wait between each attempt in milliseconds
 * @returns {Promise<void>}
 */
async function testConnection(retries = 7, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const [pagesRes, subpagesRes, topicsRes] = await Promise.all([
        fetch("https://localhost:3001/api/pages"),
        fetch("https://localhost:3001/api/subpages"),
        fetch("https://localhost:3001/api/topics"),
      ]);
      const pages = await pagesRes.json();
      const subpages = await subpagesRes.json();
      const topics = await topicsRes.json();
      allSubpages = subpages;
      allPages = pages;
      allTopics = topics;

      // checking if the data has been correctly appended to the arrays
      console.log("Pages:", pages);
      console.log("Subpages:", subpages);
      console.log("Topics:", topics);
      // TODO: UPDATE THIS PINNED LOGIC
      printPinned();
      getTopicOptions(topics);
      renderResults(pages, subpages);
      renderSearchBarList(subpages);
      return;
    } catch (err) {
      console.warn(
        `Connection attempt ${i + 1} of ${retries} failed. Retrying in ${delay / 1000}s...`
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  console.error("Could not connect to server after multiple attempts.");
}

/**
 * Renders the list of pages and their top subpages on the main view.
 * Each page is shown with up to 3 of its subpages listed beneath it.
 * @param {Array<Object>} pages - Array of page objects from the database
 * @param {Array<Object>} subpages - Array of subpage objects from the database
 * @returns {void}
 */
function renderResults(pages, subpages) {
  const mainListUl = document.getElementById("main-list-ul");
  mainListUl.innerHTML = "";

  // ignores the main menu page (it's id = 1)
  pages.forEach((page) => {
    if (page.id == 1) return;
    const hrefUtil = `#page-${page.id}`;
    const pageSubpages = subpages.filter((sp) => sp.parentpg == page.id);
    const topSubpage = pageSubpages.slice(0, 5); //only shows the first 3 articles

    // creating the design for each section on the main page
    const subItems = topSubpage
      .map((sp) => `<li><a href="${sp.id != null ? "#subpage-" + sp.id : ""}">${sp.title}</a></li>`)
      .join("");

    const listIcon =
      page.id == 2
        ? "ms-Icon--Ribbon"
        : page.id == 3
          ? "ms-Icon--Repo"
          : page.id == 4
            ? "ms-Icon--WorkFlow"
            : "ms-Icon--Cancel";

    const mainListLi = `
      <li class="main-listitem">
        <div class="ms-ListItem">
          <i class="ms-Icon ${listIcon} ms-font-xl"></i>
          <span class="ms-font-m">
            <a href="${hrefUtil}">${page.name}</a>
            <ul class="sub-listitem">${subItems}</ul>
          </span>
        </div>
      </li>
    `;

    mainListUl.insertAdjacentHTML("beforeend", mainListLi);
  });
}

/**
 * Fetches a single subpage record from the API by its ID.
 * @async
 * @param {number} id - The ID of the subpage to fetch
 * @returns {Promise<Object|undefined>} The subpage object, or `undefined` if the request fails
 */
async function subpageFetchUtil(id) {
  try {
    const res = await fetch(`https://localhost:3001/api/subpages/${id}`);
    if (!res.ok) throw new Error("Subpage not found");
    return await res.json();
  } catch (err) {
    console.error("Failed to load subpage:", err);
  }
}
// FIXME: fuzzy matching, showing main pg if input == null or ""
// TODO: ADD SMTH WHERE THE USER CAN ADD AN ARTICLE IF THERE'S NO RESULTS
async function renderSearchBarList(subpages) {
  try {
    const filterSubpages = (startLetters, subpages) =>
      subpages.filter((subpage) => subpage.title.match(new RegExp(startLetters, "i")));
    const subpageList = document.getElementById("search-results");
    subpageList.innerHTML = "";

    document.getElementById("search-bar").addEventListener("input", function (event) {
      const startLetters = event.target.value;
      if (startLetters != "" || null) {
        showView("search-view");
      } else {
        showView("main-view");
      }
      const filteredSubpages = filterSubpages(startLetters, subpages);
      console.log(filteredSubpages);
      subpageList.innerHTML = filteredSubpages
        .map(
          (
            subpage
          ) => `<li class="search-list"><a href="${subpage.id != null ? "#subpage-" + subpage.id : ""}" class="wrapper list-link">
          <i class="search-icon ms-Icon ms-Icon--${subpage.topic == "Troubleshooting" ? "SearchIssue" : subpage.topic == "Guides" ? "Help" : subpage.topic == "Informational" ? "Info" : subpage.topic == "Resources" ? "Download" : ""} ms-font-xl" aria-hidden="true"></i>
          <div class="search-result-text">
            <p>${subpage.title}</p>
            <div class="justify-end-wrapper">
              <p class="result-desc">${allPages.find((p) => p.id == subpage.parentpg)?.name ?? ""}</p>
              <p class="result-tag">${allTopics.find((t) => t.id == subpage.topic)?.name ?? ""}</p>
            </div>
          </div>
        </a></li>`
        )
        .join("");
    });
  } catch (error) {}
}
/**
 * Renders the list view for a given page, displaying all of its subpages.
 * Updates {@link currentPageId} and switches to the `searchpage-view`.
 * @async
 * @param {number} id - The ID of the parent page to display
 * @returns {Promise<void>}
 */
async function renderSearchList(id, { switchView = true } = {}) {
  try {
    currentPageId = id;

    const pageSubpages = allSubpages
      .filter((sp) => sp.parentpg == id)
      .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));

    const page = allPages.find((p) => p.id == id);
    document.getElementById("main-title-el").innerText = page?.name ?? "";
    if (switchView) showView("searchpage-view");

    const ulItem = document.getElementById("ul-list-item");
    const selectBtn = document.getElementById("select-btn");
    const addBtn = document.getElementById("add-btn");
    const filterSelector = document.getElementById("filter-topic");

    let selectBtnStatus = selectBtn.dataset.selectionmode;

    const getFilteredSubpages = () => {
      const filterValue = filterSelector.value;
      // console.log("fv", filterValue);

      return filterValue ? pageSubpages.filter((sp) => sp.topic == filterValue) : pageSubpages;
    };

    const renderList = (useCheckbox) => {
      ulItem.innerHTML = "";
      const subpages = getFilteredSubpages();

      useCheckbox
        ? (selectBtn.innerHTML = "Cancel") &&
          (addBtn.innerHTML = `<i class="ms-Icon ms-Icon--Delete ms-font-xl"></i>`)
        : (selectBtn.innerHTML = `<i class="ms-Icon ms-Icon--MultiSelect ms-font-xl"></i>`) &&
          (addBtn.innerHTML = `<i class="ms-Icon ms-Icon--Add ms-font-xl"></i>`);

      subpages.forEach((subpage) => {
        const topicIcon =
          subpage.topic == "Troubleshooting"
            ? "SearchIssue"
            : subpage.topic == "Guides"
              ? "Help"
              : subpage.topic == "Informational"
                ? "Info"
                : subpage.topic == "Resources"
                  ? "Download"
                  : "";

        const subPgList = useCheckbox
          ? `<li class="search-list"><div class="wrapper list-link">
              <input class="checkbox" type="checkbox" id="checkbox-${subpage.id}" name="" value="${subpage.id}">
              <label for="checkbox-${subpage.id}" style="width: 100%;">
                <div class="search-result-text">
                  <p>${subpage.title}</p>
                  <div class="justify-end-wrapper">
                    <p class="result-desc">${subpage.description ? subpage.description.replace(/<[^>]+>/g, "").trim() : "..."}</p>
                    <p class="result-tag">${subpage.topic ?? ""}</p>
                  </div>
                </div>
              </label>
            </div></li>`
          : `<li class="search-list"><a href="${subpage.id != null ? "#subpage-" + subpage.id : ""}" class="wrapper list-link">
              <i class="search-icon ms-Icon ms-Icon--${topicIcon} ms-font-xl" aria-hidden="true"></i>
              <div class="search-result-text">
                <div class="${subpage.is_pinned ? "justify-end-wrapper" : ""}">
                  <p>${subpage.title}</p>
                  ${subpage.is_pinned ? `<i class="ms-Icon ms-Icon--PinnedSolid ms-font-m"></i>` : ""}
                </div>
                <div class="justify-end-wrapper">
                  <p class="result-desc">${subpage.description ? subpage.description.replace(/<[^>]+>/g, "").trim() : "..."}</p>
                  <p class="result-tag">${subpage.topic ?? ""}</p>
                </div>
              </div>
            </a></li>`;
        ulItem.insertAdjacentHTML("beforeend", subPgList);
      });

      if (useCheckbox) selectArticle();
    };

    renderList(selectBtnStatus === "true");

    filterSelector.onchange = () => renderList(selectBtnStatus === "true");

    selectBtn.onclick = () => {
      selectBtnStatus = selectBtnStatus === "true" ? "false" : "true";
      selectBtn.dataset.selectionmode = selectBtnStatus;
      addBtn.toggleAttribute("data-deleteMode");
      renderList(selectBtnStatus === "true");
    };
  } catch (err) {
    console.error("Failed to render search list:", err);
  }
}

function selectArticle() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map((cb) =>
        parseInt(cb.value)
      );
      console.log("Selected article IDs:", selected);
    });
  });
}

async function deleteSubpages(ids) {
  // TODO: FIX THIS LATER
  const names = allSubpages.find((sp) => sp.id == ids)?.name;
  const msg = `Do you wish to delete ${names}?`;
  const confirmed = await showAlert(msg);
  if (!confirmed) return;
  try {
    await Promise.all(
      ids.map((id) =>
        fetch(`https://localhost:3001/api/subpages/${id}`, { method: "DELETE" }).then((res) => {
          if (!res.ok) throw new Error(`Failed to delete subpage ${id}`);
        })
      )
    );
    allSubpages = allSubpages.filter((sp) => !ids.includes(Number(sp.id)));
    const selectBtn = document.getElementById("select-btn");
    const addBtn = document.getElementById("add-btn");
    selectBtn.dataset.selectionmode = "false";
    addBtn.removeAttribute("data-deletemode");
    renderSearchList(currentPageId);
    renderResults(allPages, allSubpages);
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

// check topic and change labels
// do i even need this ....

function changeLabel(subpage, mode) {
  const symptomWrappers = ["symp-wrapper", "symp-wrapper-form"];
  const sympWIds = symptomWrappers.map((id) => document.getElementById(id));

  // const symptomElements = ["symptoms-el", "form-symptom"];
  // symptomElements.map((id) => document.getElementById(id)).innerHTML = subpage.symptom ?? "";

  const topicSelector = document.getElementById("form-topic"); //make this global or smth
  if (mode === "edit") {
    subpage?.topic !== "Troubleshooting"
      ? sympWIds[1].classList.add("hidden")
      : sympWIds[1].classList.remove("hidden");
  } else {
    subpage.topic !== "Troubleshooting" || !subpage.symptom
      ? sympWIds[0].classList.add("hidden")
      : sympWIds[0].classList.remove("hidden");
  }

  // topicSelector.value !== "Troubleshooting" ||
  // subpage.topic !== "Troubleshooting" ||
  // !subpage.symptom
  //   ? sympWIds.classList.add("hidden")
  //   : sympWIds.classList.remove("hidden");

  // topicSelector.value === "Guides"
}

/**
 * Fetches and renders a subpage in the subpage view by its ID.
 * Populates all content fields (title, description, symptoms, solution, image),
 * and wires up the edit button and additional-info dialog.
 * @async
 * @param {number} id - The ID of the subpage to render
 * @returns {Promise<void>}
 */
async function renderSubpage(id) {
  try {
    currentSubpageId = id;
    const subpage = await subpageFetchUtil(id);

    document.getElementById("title-el").innerText = subpage.title ?? "";
    document.getElementById("desc-el").innerHTML = subpage.description ?? "";
    changeLabel(subpage, "view");

    // const sympWrapper = document.getElementById("symp-wrapper");
    const sympEl = document.getElementById("symptoms-el");
    sympEl.innerHTML = subpage?.symptom ?? "";
    // const sympLabel = document.getElementById("symp-label")
    // if (subpage.symptom) {
    //   sympEl.innerHTML = subpage.symptom;
    //   sympWrapper.classList.remove("hidden");
    //   // sympWrapper.classList.add("wrapper");
    // } else {
    //   sympWrapper.classList.add("hidden");
    //   sympWrapper.classList.remove("wrapper");
    // }

    const solWrapper = document.getElementById("sol-wrapper");
    const solEl = document.getElementById("solution-el");
    // TODO: REMOVE SOLUTIONS LABEL IF THE TOPIC === INFORMATIONAL
    // TODO: ADD A WAY TO ATTACH A FILE
    // TODO: UPDATE HYPERLINKS AND EMBED THEM TO TEXT

    if (subpage.solution) {
      solEl.innerHTML = subpage.solution;
      solWrapper.classList.remove("hidden");
      // solWrapper.classList.add("wrapper");
    } else {
      solWrapper.classList.add("hidden");
      // solWrapper.classList.remove("wrapper");
    }

    // TODO: Update dates
    // additional fields - supposed to open up another panel or smth. TODO: might do smth similar for the edit functions idk yet
    const additionalFields = [
      { key: "product", label: "Product" },
      { key: "created_on", label: "Date" },
      { key: "last_update", label: "Last Update" },
      { key: "topic", label: "Topic" },
      { key: "officialpg_link", label: "Official Page", isLink: true },
    ];

    const dialogData = additionalFields
      .filter(({ key }) => subpage[key])
      .map(({ key, label, isLink }) => ({
        label,
        value: subpage[key],
        isLink: !!isLink,
      }));

    document.getElementById("edit-btn").onclick = () => showFormView("edit", subpage);

    document.getElementById("additional-info").onclick = () => {
      localStorage.setItem("additionalInfoData", JSON.stringify(dialogData));
      Office.context.ui.displayDialogAsync(
        `${window.location.origin}/additional-info-dialog.html`,
        { height: 40, width: 30 },
        (asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error("Dialog failed:", asyncResult.error.message);
            return;
          }
          const dialog = asyncResult.value;
          dialog.addEventHandler(Office.EventType.DialogMessageReceived, () => {
            dialog.close();
          });
        }
      );
    };
    const pinIcon = document.getElementById("pin-icon");
    pinIcon.className = `ms-Icon ${subpage.is_pinned ? "ms-Icon--PinnedSolid" : "ms-Icon--Pinned"} ms-font-xl`;
    document.getElementById("pin-btn").onclick = () => pinSubpg(id);
    showView("subpage-view");
  } catch (err) {
    console.error("Failed to load subpage:", err);
  }
}

async function pinSubpg(id) {
  try {
    const res = await fetch(`https://localhost:3001/api/subpages/${id}/pin`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("failed to toggle pin");
    const updated = await res.json();
    const pinned = !!updated.is_pinned;

    const pinIcon = document.getElementById("pin-icon");
    pinIcon.className = `ms-Icon ${pinned ? "ms-Icon--PinnedSolid" : "ms-Icon--Pinned"} ms-font-xl`;

    const entry = allSubpages.find((sp) => sp.id == id);
    if (entry) entry.is_pinned = pinned;
    renderSearchList(currentPageId, { switchView: false });
  } catch (err) {
    console.error("pin toggle failed", err);
  }
}

/**
 * Clears the URL hash, triggering the `hashchange` event to navigate back to the main view.
 * @returns {void}
 */
function backButton() {
  window.location.hash = "";
}

/**
 * Shows the specified view element and hides all others.
 * @param {"main-view"|"searchpage-view"|"subpage-view"|"form-view"} viewId - The ID of the view to show
 * @returns {void}
 */
function showView(viewId) {
  ["main-view", "searchpage-view", "subpage-view", "form-view", "search-view"].forEach((id) => {
    document.getElementById(id).style.display = id === viewId ? "block" : "none";
  });
}

/**
 * Convenience wrapper that switches the display to the main view.
 * @returns {void}
 */
function showMainView() {
  showView("main-view");
}

/** @type {HTMLElement} The contenteditable element used as the WYSIWYG solution editor */
// const formSolution = document.getElementById("form-solution");

/**
 * Populates and displays the add/edit form view.
 * Sets all form fields from the given subpage object (if editing) and wires up the submit and back buttons.
 * @param {"add"|"edit"} mode - Whether the form is for adding a new entry or editing an existing one
 * @param {Object|null} [subpage=null] - The subpage object to pre-populate form fields with (used in "edit" mode)
 * @returns {void}
 */
function showFormView(mode, subpage = null) {
  document.getElementById("form-title-el").innerText = mode === "edit" ? "Edit Entry" : "Add Entry";
  document.getElementById("form-title").value = subpage?.title ?? "";

  const descriptionData = subpage?.description ?? "";
  editor.setEditorContent("form-description", descriptionData);

  changeLabel(subpage, "edit");
  const symptomData = subpage?.symptom ?? "";
  editor.setEditorContent("form-symptom", symptomData);

  const solutionData = subpage?.solution ?? "";
  editor.setEditorContent("form-solution", solutionData);

  document.getElementById("form-product").value = subpage?.product ?? "";

  const topicId = allTopics.find((t) => t.name == subpage?.topic)?.id;
  const topicSelector = document.getElementById("form-topic");
  topicSelector.value = topicId ?? "";
  topicSelector.onchange = () => {
    const selectedName = allTopics.find((t) => t.id == topicSelector.value)?.name;
    document
      .getElementById("symp-wrapper-form")
      .classList.toggle("hidden", selectedName !== "Troubleshooting");
  };
  document.getElementById("form-link").value = subpage?.officialpg_link ?? "";
  document.getElementById("form-error").style.display = "none";

  const submitBtns = document.querySelectorAll(".form-submit");
  submitBtns.forEach((btn) => {
    btn.onclick = () => submitForm(mode, subpage?.id ?? null);
  });
  // document.getElementById("form-submit-btn").onclick = () => submitForm(mode, subpage?.id ?? null);
  document.getElementById("back-btn-form").onclick = () => {
    mode === "edit" ? showView("subpage-view") : showView("searchpage-view");
  };

  showView("form-view");
}
function getTopicOptions(topics) {
  // TODO: REMOVE REPETITION AND ADD A DEFAULT VIEW
  const topicSelector = document.getElementById("form-topic");
  const filterSelector = document.getElementById("filter-topic");
  topicSelector.innerHTML = topics
    .map((tp) => `<option value="${tp.id ?? ""}">${tp.name ?? ""}</option>`)
    .join("");
  filterSelector.innerHTML =
    `<option value="">All</option>` +
    topics.map((tp) => `<option value="${tp.name ?? ""}">${tp.name ?? ""}</option>`).join("");
  topicSelector.onchange = () => console.log("picked: ", topicSelector.value);
  console.log(topicSelector);
}
/**
 * Validates and submits the form data to the API.
 * Sends a POST request in "add" mode or a PUT request in "edit" mode.
 * On success, updates the local cache and navigates to the appropriate view.
 * @async
 * @param {"add"|"edit"} mode - Whether to create a new subpage or update an existing one
 * @param {number|null} subpageId - The ID of the subpage to update (only used in "edit" mode)
 * @returns {Promise<void>}
 */
async function submitForm(mode, subpageId) {
  const title = document.getElementById("form-title").value.trim();
  const errorEl = document.getElementById("form-error");

  if (!title) {
    errorEl.innerText = "Title is required.";
    errorEl.style.display = "block";
    return;
  }

  const body = {
    title,

    description: editor.getEditorContent("form-description").trim() || null,
    symptom: editor.getEditorContent("form-symptom").trim() || null,

    solution: editor.getEditorContent("form-solution").trim() || null,
    product: document.getElementById("form-product").value.trim() || null,
    // TODO : NOW
    topic: document.getElementById("form-topic").value.trim() || null,
    officialpg_link: document.getElementById("form-link").value.trim() || null,
  };

  // TODO: add an alert? yes or no?
  try {
    let res, saved;
    let topicParse;
    if (mode === "add") {
      body.parentpg = currentPageId;
      res = await fetch("https://localhost:3001/api/subpages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      saved = await res.json();
      if (!res.ok) throw new Error(saved.error ?? "Failed to save");
      // console.log(topicParse);
      topicParse = allTopics.find((t) => t.id == saved.topic)?.name ?? "";

      saved.topic = topicParse;
      allSubpages.push(saved);
      console.log(saved);
      renderSearchList(currentPageId);
      renderSearchBarList(allSubpages);
    } else {
      // edit mode
      res = await fetch(`https://localhost:3001/api/subpages/${subpageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      saved = await res.json();
      if (!res.ok) throw new Error(saved.error ?? "Failed to save");
      const idx = allSubpages.findIndex((sp) => sp.id === subpageId);
      if (idx !== -1) allSubpages[idx] = saved;

      if (typeof saved.topic === "number") {
        topicParse = allTopics.find((t) => t.id == saved.topic)?.name ?? "";
        saved.topic = topicParse;
      }

      renderSubpage(subpageId);
    }
  } catch (err) {
    errorEl.innerText = err.message;
    errorEl.style.display = "block";
  }
}

// toggle util function cuz im tired of making an eventhandler for every single element
/**
 * Toggles the `hidden` CSS class on the element referenced by the clicked button's
 * `data-toggle-target` attribute.
 * @param {MouseEvent} e - The click event from the toggle button
 * @returns {void}
 */
function toggleHidden(e) {
  const targetId = e.currentTarget.dataset.toggleTarget;
  document.getElementById(targetId)?.classList.toggle("hidden");
}
/**
 * Attaches click event listeners to all elements with a `data-toggle-target` attribute,
 * wiring them up to {@link toggleHidden}.
 * @returns {void}
 */
function initToggleButtons() {
  document.querySelectorAll("[data-toggle-target]").forEach((btn) => {
    btn.addEventListener("click", toggleHidden);
  });
}

// TODO:maybe add a ranking idk like top 3 lol cuz the front page lowk has some nothingburgers from 2020..
Office.onReady((info) => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.setAttribute("autocomplete", "off");
  });

  editor.render();
  initToggleButtons();

  document.getElementById("back-btn-search").onclick = backButton;
  document.getElementById("back-btn-subpage").onclick = () => history.back();

  const addButton = document.getElementById("add-btn");
  addButton.onclick = async () => {
    if (addButton.hasAttribute("data-deletemode")) {
      const ids = [...document.querySelectorAll('input[type="checkbox"]:checked')].map((cb) =>
        parseInt(cb.value)
      );
      if (ids.length) await deleteSubpages(ids);
    } else {
      showFormView("add");
    }
  };

  // yeah this function is a floppery if u reload on a subpage
  // copied and pasted from stackoverflow... sorry...
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (!hash || hash === "#") {
      showMainView();
      return;
    }
    if (hash.startsWith("#subpage-")) {
      const id = parseInt(hash.replace("#subpage-", ""));
      if (!isNaN(id)) renderSubpage(id);
    } else if (hash.startsWith("#page-")) {
      const id = parseInt(hash.replace("#page-", ""));
      if (!isNaN(id)) renderSearchList(id);
    } else if (hash === "#form") {
      showView("form-view");
    }
  });

  testConnection();
});

// TODO: - ENTIRE LIST OF ALL ARTICLES VIEW WHERE U CAN SORT THEM OUT AND FILTER?
// should i add key words
