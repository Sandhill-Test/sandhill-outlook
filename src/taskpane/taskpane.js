/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, localStorage */

import { initFormatButtons } from "./format.js";

// WARNING!!!!  WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!

// I HAVE USED execCommand() FOR THE TEXT EDITOR. HTML5 HAS RENDERED THIS METHOD AS OBSOLETE AND MULTIPLE BROWSERS ARE MOVING AWAY FROM THIS.
// HOWEVER OUTLOOK ADD IN USES CHROMIUM BROWSER BY DEFAULT AND THE METHOD HAS NOT DEPRECATED COMPLETELY
// SINCE HTML5 ARE LIARS AND CANNOT MAKE UP THEIR MIND, THERE'S NO CURRENT ALTERNATIVE TO THIS DAY (MAY 2026). A DECADE HAS PASSED AND DEVS RELY ON REACT JS OR NODE PACKAGES TO CREATE THIS.
// ***HOWEVER*** IM USING VANILLA JS - NO PACKAGES - SO MY ONLY CHOICE IS CAPTURING EVERY SINGLE KEYUP/DOWN EVENT OR USE THE CONTENTEDITABLE ATTRIBUTE. I DO NOT WANT TO DO THE FORMER, SO I'M STICKING WITH THE CONTENTEDITABLE + execCommand() COMBO.
// IF THE TEXT AREA STOPS REGISTERING BOLD FONT, UNDERLINES ETC. THIS MEANS THAT MY applyFormat() FUCNTION IS OBSOLETE AND YOU WILL NEED TO USE REACT JS TO GET A WORKING WYSIWYG TEXT EDITOR. ALSO REMEMBER TO HOOK THIS UP WITH THE CONN.JS FILE SO CHANEGS CAN BE APPENDED TO THE DATABASE.

// WARNING!!!!  WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!

// TODO: do smth about the back btn function cuz it works quite sloppy when editing and pressing back - check if i did smth about it cuz i cant remember

// add a delete article function?
/**
 * @type {Array} allSubpages - Contains every subpage
 * @type {Array} allPages - Contains every page
 * @type {*} [currentPageId="null"] - mutable variable to track which page is currently open
 * @type {*} [currentPageId="null"] - mutable variable to track which page is currently open
 * @type {*} [currentSubPageId="null"] - mutable variable to track which subpage is currently open
 */
let allSubpages = [];
let allPages = [];
let currentPageId = null;
let currentSubpageId = null;

/**
 * @async testConnection - Collects the data from the Pages and Subpage tables in the database using fetch API. Attempts to connect to the database 7 times before throwing an error. If successfull, renderPage() will execute
 * @param {number} retries - The amount of retries it takes to connect
 * @param {number} delay - The wait between each connection attempt in miliseconds
 * @returns
 */

async function testConnection(retries = 7, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const [pagesRes, subpagesRes] = await Promise.all([
        fetch("https://localhost:3001/api/pages"),
        fetch("https://localhost:3001/api/subpages"),
      ]);
      const pages = await pagesRes.json();
      const subpages = await subpagesRes.json();
      allSubpages = subpages;
      allPages = pages;

      // checking if the data has been correctly appended to the arrays
      console.log("Pages:", pages);
      console.log("Subpages:", subpages);

      renderResults(pages, subpages);
      return;
    } catch (err) {
      console.warn(
        `Connection attempt ${i + 1} of ${retries} failed. Retrying in ${delay / 1000}s...`,
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  console.error("Could not connect to server after multiple attempts.");
}

/**
 * renderResults
 * @param {*} pages
 * @param {*} subpages
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
      .map(
        (sp) =>
          `<li><a href="${sp.Id != null ? "#subpage-" + sp.Id : ""}">${sp.title}</a></li>`,
      )
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
 *
 * @param {*} id
 * @returns
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
// FIXME: lol the search bar dont work for now.... probs will remove it later

/**
 *
 * @param {*} id
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
  } catch (err) {}
}

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

    const imgEl = document.getElementById("img-el");
    if (subpage.img) {
      imgEl.src = subpage.img;
      imgEl.style.display = "block";
    } else {
      imgEl.style.display = "none";
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

    document.getElementById("edit-btn").onclick = () =>
      showFormView("edit", subpage);

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
        },
      );
    };

    showView("subpage-view");
  } catch (err) {
    console.error("Failed to load subpage:", err);
  }
}

function backButton() {
  window.location.hash = "";
}

function showView(viewId) {
  ["main-view", "searchpage-view", "subpage-view", "form-view"].forEach(
    (id) => {
      document.getElementById(id).style.display =
        id === viewId ? "block" : "none";
    },
  );
}

function showMainView() {
  showView("main-view");
}

const formSolution = document.getElementById("form-solution");

function showFormView(mode, subpage = null) {
  document.getElementById("form-title-el").innerText =
    mode === "edit" ? "Edit Entry" : "Add Entry";
  document.getElementById("form-title").value = subpage?.title ?? "";
  document.getElementById("form-description").value =
    subpage?.description ?? "";
  document.getElementById("form-symptom").value = subpage?.symptom ?? "";

  formSolution.innerHTML = subpage?.solution ?? "";
  document.getElementById("form-product").value = subpage?.product ?? "";
  document.getElementById("form-topic").value = subpage?.topic ?? "";
  document.getElementById("form-link").value = subpage?.officialpg_link ?? "";
  document.getElementById("form-img").value = subpage?.img ?? "";
  document.getElementById("form-error").style.display = "none";

  document.getElementById("form-submit-btn").onclick = () =>
    submitForm(mode, subpage?.Id ?? null);
  document.getElementById("back-btn-form").onclick = () => {
    mode === "edit" ? showView("subpage-view") : showView("searchpage-view");
  };
  // turn btn to an X -> ppl think that it wont save, keep arrow -> ppl think it will save and u can go back to it

  showView("form-view");
}

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
    description:
      document.getElementById("form-description").value.trim() || null,
    symptom: document.getElementById("form-symptom").value.trim() || null,

    // FIXME:yeah look into this one rq
    solution: formSolution.innerHTML.trim() || null,
    product: document.getElementById("form-product").value.trim() || null,
    topic: document.getElementById("form-topic").value.trim() || null,
    officialpg_link: document.getElementById("form-link").value.trim() || null,
    img: document.getElementById("form-img").value.trim() || null,
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
function toggleHidden(e) {
  const targetId = e.currentTarget.dataset.toggleTarget;
  document.getElementById(targetId)?.classList.toggle("hidden");
}
function initToggleButtons() {
  document.querySelectorAll("[data-toggle-target]").forEach((btn) => {
    btn.addEventListener("click", toggleHidden);
  });
}
// TODO:maybe add a ranking idk like top 3 lol cuz the front page lowk has some nothingburgers from 2020..
Office.onReady((info) => {
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
