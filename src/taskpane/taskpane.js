/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, localStorage */
/**
 * @module taskpane
 * @description Main taskpane - data fetchng, page rendering, and navigation
 */
import { initFormatButtons } from "./format.js";
import * as editor from "./WYSIWYGeditor.js";

// WARNING!!!!  WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!

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
    if (page.Id == 1) return;
    const hrefUtil = `#page-${page.Id}`;
    const pageSubpages = subpages.filter((sp) => sp.parentpg == page.Id);
    const topSubpage = pageSubpages.slice(0, 3); //only shows the first 3 articles

    // creating the design for each section on the main page
    const subItems = topSubpage
      .map((sp) => `<li><a href="${sp.Id != null ? "#subpage-" + sp.Id : ""}">${sp.title}</a></li>`)
      .join("");

    const listIcon =
      page.Id == 2
        ? "ms-Icon--Ribbon"
        : page.Id == 3
          ? "ms-Icon--Repo"
          : page.Id == 4
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
async function renderSearchBarList(subpages) {
  try {
    const filterSubpages = (startLetters, subpages) =>
      subpages.filter((subpage) => subpage.title.match(new RegExp(startLetters, "i")));
    const subpageList = document.getElementById("search-results");
    // subpageList.innerHTML = subpages.map((subpage) => `<li>${subpage.title}</li>`).join("");
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
          ) => `<li class="search-list"><a href="${subpage.Id != null ? "#subpage-" + subpage.Id : ""}" class="wrapper list-link">
          <i class="ms-Icon ms-Icon--${subpage.topic == "Troubleshooting" ? "SearchIssue" : subpage.topic == "Guides" ? "Help" : subpage.topic == "Informational" ? "Info" : subpage.topic == "Resources" ? "Download" : ""} ms-font-xl" aria-hidden="true"></i>
          <div class="search-result-text">
            <p>${subpage.title}</p>
            <div class="justify-end-wrapper">
              <p class="result-desc">${subpage.description}</p>
              <p class="result-tag">${subpage.topic}</p>
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
async function renderSearchList(id) {
  try {
    currentPageId = id;
    const subpages = allSubpages.filter((sp) => sp.parentpg == id);
    console.log(subpages);

    const page = allPages.find((p) => p.Id == id);
    document.getElementById("main-title-el").innerText = page?.name ?? "";
    showView("searchpage-view");

    const listContainer = document.getElementById("searchpage-list-container");
    listContainer.innerHTML = "";
    subpages.forEach((subpage) => {
      const subPgList = `<li><a href="${subpage.Id != null ? "#subpage-" + subpage.Id : ""}">${subpage.title}</a></li>`;
      const subPgUl = `<ul class="sub-listitem">${subPgList}</ul>`;
      listContainer.insertAdjacentHTML("beforeend", subPgUl);
    });
    // TODO: UPDATE THIS
  } catch (err) {}
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
    document.getElementById("desc-el").innerText = subpage.description ?? "";

    const sympWrapper = document.getElementById("symp-wrapper");
    const sympEl = document.getElementById("symptoms-el");
    if (subpage.symptom) {
      sympEl.innerText = subpage.symptom;
      sympWrapper.classList.remove("hidden");
      sympWrapper.classList.add("wrapper");
    } else {
      sympWrapper.classList.add("hidden");
      sympWrapper.classList.remove("wrapper");
    }

    const solWrapper = document.getElementById("sol-wrapper");
    const solEl = document.getElementById("solution-el");
    if (subpage.solution) {
      solEl.innerHTML = subpage.solution;
      solWrapper.classList.remove("hidden");
      // solWrapper.classList.add("wrapper");
    } else {
      solWrapper.classList.add("hidden");
      // solWrapper.classList.remove("wrapper");
    }

    // const imgEl = document.getElementById("img-el");
    // if (subpage.img) {
    //   imgEl.src = subpage.img;
    //   imgEl.style.display = "block";
    // } else {
    //   imgEl.style.display = "none";
    // }

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
const formSolution = document.getElementById("form-solution");

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
  document.getElementById("form-description").value = subpage?.description ?? "";
  document.getElementById("form-symptom").value = subpage?.symptom ?? "";

  const solutionData = subpage?.solution ?? "";
  editor.setEditorContent(solutionData);
  formSolution.innerHTML = subpage?.solution ?? "";

  document.getElementById("form-product").value = subpage?.product ?? "";

  // TODO: MAKE THIS THE DEFAULT VALUE OF THE DROPDOWN

  document.getElementById("form-topic").value = subpage?.topic ?? "";
  document.getElementById("form-link").value = subpage?.officialpg_link ?? "";
  document.getElementById("form-error").style.display = "none";

  document.getElementById("form-submit-btn").onclick = () => submitForm(mode, subpage?.Id ?? null);
  document.getElementById("back-btn-form").onclick = () => {
    mode === "edit" ? showView("subpage-view") : showView("searchpage-view");
  };
  // turn btn to an X -> ppl think that it wont save, keep arrow -> ppl think it will save and u can go back to it

  showView("form-view");
}
function getTopicOptions(topics) {
  const topicSelector = document.getElementById("form-topic");
  topicSelector.innerHTML = topics
    .map((tp) => `<option value="${tp.Id != null ? tp.Id : ""}">${tp.name}</option>`)
    .join("");
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
    description: document.getElementById("form-description").value.trim() || null,
    symptom: document.getElementById("form-symptom").value.trim() || null,

    // FIXME:yeah look into this one rq
    // solution: formSolution.innerHTML.trim() || null,

    solution: editor.getEditorContent().trim() || null,
    product: document.getElementById("form-product").value.trim() || null,
    topic: document.getElementById("form-topic").value.trim() || null,
    officialpg_link: document.getElementById("form-link").value.trim() || null,
    // TODO: REMOVE FORM IMG
  };

  // TODO: add an alert? yes or no?
  try {
    let res, saved;
    if (mode === "add") {
      body.parentpg = currentPageId;
      res = await fetch("https://localhost:3001/api/subpages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      saved = await res.json();
      if (!res.ok) throw new Error(saved.error ?? "Failed to save");
      allSubpages.push(saved);
      renderSearchList(currentPageId);
    } else {
      res = await fetch(`https://localhost:3001/api/subpages/${subpageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      saved = await res.json();
      if (!res.ok) throw new Error(saved.error ?? "Failed to save");
      const idx = allSubpages.findIndex((sp) => sp.Id === subpageId);
      if (idx !== -1) allSubpages[idx] = saved;
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
  // const heading = () => {
  //   const element = document.createElement("h1");
  //   element.innerText = "TinyMCE Webpack demo";
  //   return element;
  // };

  const editorArea = () => {
    const element = document.getElementById("basic-example");
    element.id = "editor";
    return element;
  };
  // const parent = document.createElement("p");
  // parent.appendChild(editorArea());
  // document.body.appendChild(heading());
  // document.body.appendChild(parent);

  editor.render();
  initToggleButtons();
  initFormatButtons(formSolution);

  document.getElementById("back-btn-search").onclick = backButton;
  document.getElementById("back-btn-subpage").onclick = () => history.back();

  document.getElementById("add-btn").onclick = () => showFormView("add");

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
// fix the search function like rn bro
// should i add key words
