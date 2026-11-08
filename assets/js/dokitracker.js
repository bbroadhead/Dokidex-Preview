const dokimonList = MONDEX_DATA; // from mondex_data.js
// GitHub Pages project site is hosted below /Yanoverse-Multidex/.
const dokiSiteBase = window.location.pathname.startsWith('/Yanoverse-Multidex/') ? '/Yanoverse-Multidex' : '';
const dokiAssetUrl = path => dokiSiteBase + path;


document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tracker-table-body");
  const savedData = JSON.parse(localStorage.getItem("dokitracker") || "{}");

  dokimonList.forEach(mon => {
    const row = document.createElement("tr");

    const dexCell = document.createElement("td");
    dexCell.textContent = mon.number || "-";
    row.appendChild(dexCell);

    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = dokiAssetUrl(`/assets/images/${mon.name.toLowerCase()}.png`);
    img.alt = mon.name;
    img.width = 24;
    img.height = 24;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

const nameCell = document.createElement("td");
nameCell.textContent = mon.name;
nameCell.classList.add("clickable-name");
row.appendChild(nameCell);

    const caughtCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = savedData[mon.name]?.caught || false;
    caughtCell.appendChild(checkbox);
    row.appendChild(caughtCell);

    const rareCell = document.createElement("td");
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("rare-images");
    imageContainer.style.display = "inline-block";
    imageContainer.style.marginLeft = "0.5rem";

    const rareFormsArray = savedData[mon.name]?.rareForms || [];
    rareFormsArray.forEach(form => addRareImage(mon, form, imageContainer, rareFormsArray));

    const dropdown = createImageDropdown(mon, imageContainer, rareFormsArray);

    const rareFlexWrapper = document.createElement("div");
    rareFlexWrapper.style.display = "flex";
    rareFlexWrapper.style.alignItems = "center";

    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.minWidth = "130px";
    buttonWrapper.appendChild(dropdown);

    rareFlexWrapper.appendChild(buttonWrapper);
    rareFlexWrapper.appendChild(imageContainer);
    rareCell.appendChild(rareFlexWrapper);
    row.appendChild(rareCell);

    checkbox.addEventListener("change", (event) => {
      if (!event.type.startsWith("checkbox-silent-change")) {
        updateCounts(savedData);
      }
      savedData[mon.name] = savedData[mon.name] || {};
      savedData[mon.name].caught = checkbox.checked;
      localStorage.setItem("dokitracker", JSON.stringify(savedData));
      updateCounts(savedData);
    });

nameCell.addEventListener("click", (event) => {
  event.stopPropagation(); // prevent any accidental bubbling

  const monsterName = mon.name.toLowerCase().replace(/\s+/g, '-');
  const profileUrl = dokiAssetUrl(`/dokimon/${monsterName}`);

  const panel = document.getElementById("monster-profile-panel");
  const iframe = document.getElementById("monster-profile-frame");

  iframe.src = profileUrl + "?panel=1";
  panel.classList.remove("hidden");
  panel.classList.add("visible");
});

    tableBody.appendChild(row);
  });

  const closeBtn = document.getElementById("close-profile-panel");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const panel = document.getElementById("monster-profile-panel");
      panel.classList.remove("visible");
      panel.classList.add("hidden");
    });
  }

// One reusable palette picker avoids overlapping menus and dozens of floating layers.
let activeRareButton = null;
const rarePicker = document.createElement("div");
rarePicker.id = "tracker-rare-picker";
rarePicker.className = "tracker-rare-picker";
rarePicker.hidden = true;
rarePicker.setAttribute("role", "dialog");
document.body.appendChild(rarePicker);

function closeRarePicker() {
  rarePicker.hidden = true;
  if (activeRareButton) activeRareButton.setAttribute("aria-expanded", "false");
  activeRareButton = null;
}
function positionRarePicker(button) {
  const rect = button.getBoundingClientRect();
  const margin = 12;
  const vw = document.documentElement.clientWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const width = Math.min(304, vw - margin * 2);
  rarePicker.style.width = width + "px";
  rarePicker.style.left = Math.max(margin, Math.min(rect.left + rect.width / 2 - width / 2, vw - width - margin)) + "px";
  const height = rarePicker.getBoundingClientRect().height;
  const spaceBelow = vh - rect.bottom - margin;
  const spaceAbove = rect.top - margin;
  const preferBelow = spaceBelow >= height + 8 || (spaceBelow >= spaceAbove && spaceBelow >= 120);
  const top = preferBelow ? rect.bottom + 8 : rect.top - height - 8;
  rarePicker.style.top = Math.max(margin, Math.min(top, vh - height - margin)) + "px";
}
document.addEventListener("pointerdown", e => {
  if (!rarePicker.contains(e.target) && !(activeRareButton && activeRareButton.contains(e.target))) closeRarePicker();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeRarePicker(); });
window.addEventListener("resize", closeRarePicker);
window.addEventListener("scroll", closeRarePicker, true);

function createImageDropdown(mon, imageContainer, rareFormsArray) {
  const wrapper = document.createElement("div");
  wrapper.className = "image-dropdown-wrapper";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "rare-select-button";
  button.textContent = "Select...";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", event => {
    event.stopPropagation();
    if (activeRareButton === button && !rarePicker.hidden) {
      closeRarePicker();
      return;
    }
    closeRarePicker();
    rarePicker.replaceChildren();
    rarePicker.setAttribute("aria-label", mon.name + " rare palettes");
    const formLabels = ["2", "3", "4", "5", "6", "7", "8", "9"];
    formLabels.forEach(num => {
      const label = num === "9" ? "Bound" : `Form ${num}`;
      const choice = document.createElement("button");
      choice.type = "button";
      choice.className = "rare-palette-choice";
      choice.setAttribute("aria-label", label);
      const img = document.createElement("img");
      img.src = dokiAssetUrl(`/assets/images/forms/${mon.number}_${mon.name.toLowerCase()}/${mon.name.toLowerCase()}_${num}.png`);
      img.alt = "";
      img.loading = "eager";
      choice.appendChild(img);
      const caption = document.createElement("span");
      caption.textContent = label;
      choice.appendChild(caption);
      choice.addEventListener("click", e => {
        e.stopPropagation();
        if (!rareFormsArray.includes(label) && rareFormsArray.length < 8) {
          rareFormsArray.push(label);
          addRareImage(mon, label, imageContainer, rareFormsArray);
          savedData[mon.name] = savedData[mon.name] || {};
          savedData[mon.name].rareForms = rareFormsArray;
          localStorage.setItem("dokitracker", JSON.stringify(savedData));
          updateCounts(savedData);
        }
        closeRarePicker();
      });
      rarePicker.appendChild(choice);
    });
    activeRareButton = button;
    button.setAttribute("aria-expanded", "true");
    rarePicker.hidden = false;
    positionRarePicker(button);
  });
  wrapper.appendChild(button);
  return wrapper;
}

  function addRareImage(mon, formLabel, container, formList) {
    const img = document.createElement("img");
    img.width = 32;
    img.height = 32;
    img.title = formLabel;

    const number = formLabel === "Bound" ? "9" : formLabel.split(" ")[1];
    img.src = dokiAssetUrl(`/assets/images/forms/${mon.number}_${mon.name.toLowerCase()}/${mon.name.toLowerCase()}_${number}.png`);

    img.addEventListener("dblclick", () => {
      container.removeChild(img);
      const index = formList.indexOf(formLabel);
      if (index !== -1) {
        formList.splice(index, 1);
        localStorage.setItem("dokitracker", JSON.stringify(savedData));
        updateCounts(savedData);
      }
    });

    container.appendChild(img);
  }

  function updateCounts(data) {
    let caughtCount = 0;
    let rareCount = 0;
    Object.values(data).forEach(entry => {
      if (entry.caught) caughtCount++;
      if (Array.isArray(entry.rareForms)) rareCount += entry.rareForms.length;
    });
    document.getElementById("caught-count").textContent = caughtCount;
    document.getElementById("rare-count").textContent = rareCount;
  }

  updateCounts(savedData);

const filterCaughtBtn = document.getElementById("filter-caught");
const restoreFilteredBtn = document.getElementById("restore-filtered");

let allRows = []; // holds full row data for restoration

// Save full table data with sort order
function snapshotRows() {
  allRows = [];
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const name = row.querySelector("td:nth-child(3)").textContent.trim();
    allRows.push({ name, index, row });
  });
}

function applyFilterState() {
  const filterState = JSON.parse(localStorage.getItem("dokitracker-filtered") || "[]");
  if (filterState.length > 0) {
    snapshotRows();
    filterState.forEach(name => {
      const match = allRows.find(r => r.name === name);
      if (match) {
        match.row.remove();
      }
    });
    restoreFilteredBtn.disabled = false;
  }
}

filterCaughtBtn.addEventListener("click", () => {
  snapshotRows();
  const filteredNames = [];

  allRows.forEach(({ name, row }) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox?.checked) {
      filteredNames.push(name);
      row.remove();
    }
  });

  if (filteredNames.length > 0) {
    localStorage.setItem("dokitracker-filtered", JSON.stringify(filteredNames));
    restoreFilteredBtn.disabled = false;
  }
});

restoreFilteredBtn.addEventListener("click", () => {
  const filterState = JSON.parse(localStorage.getItem("dokitracker-filtered") || "[]");
  if (filterState.length === 0) return;

  filterState.forEach(name => {
    const match = allRows.find(r => r.name === name);
    if (match) {
      // Insert row at the correct index
      const existingRows = tableBody.querySelectorAll("tr");
      const insertIndex = match.index;
      if (insertIndex >= existingRows.length) {
        tableBody.appendChild(match.row);
      } else {
        tableBody.insertBefore(match.row, existingRows[insertIndex]);
      }
    }
  });

  localStorage.removeItem("dokitracker-filtered");
  restoreFilteredBtn.disabled = true;
});

  applyFilterState();
});
