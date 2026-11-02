const dokimonList = MONDEX_DATA; // from mondex_data.js

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
    img.src = `/assets/images/${mon.name.toLowerCase()}.png`;
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
  const profileUrl = `/dokimon/${monsterName}`;

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

function createImageDropdown(mon, imageContainer, rareFormsArray) {
  const wrapper = document.createElement("div");
  wrapper.className = "image-dropdown-wrapper";

  const button = document.createElement("button");
  button.textContent = "Select...";
  button.style.padding = "4px 8px";
  button.style.cursor = "pointer";
  button.style.border = "1px solid #aaa";

  const dropdown = document.createElement("div");
  dropdown.className = "image-dropdown";
  dropdown.style.display = "none";
  dropdown.style.position = "absolute";
  dropdown.style.zIndex = "10";
  dropdown.style.background = "#fff";
  dropdown.style.padding = "4px";
  dropdown.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  dropdown.style.whiteSpace = "nowrap";

  const formLabels = ["2", "3", "4", "5", "6", "7", "8", "9"];
  const labelMap = { "9": "Bound" };

  let imagesLoaded = false;

  button.addEventListener("click", (e) => {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    e.stopPropagation();

    if (imagesLoaded) return;

    formLabels.forEach(num => {
      const label = labelMap[num] || `Form ${num}`;
      const img = document.createElement("img");
      img.src = `/assets/images/forms/${mon.number}_${mon.name.toLowerCase()}/${mon.name.toLowerCase()}_${num}.png`;
      img.title = label;
      img.width = 24;
      img.height = 24;
      img.style.margin = "2px";
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        if (!rareFormsArray.includes(label) && rareFormsArray.length < 8) {
          rareFormsArray.push(label);
          addRareImage(mon, label, imageContainer, rareFormsArray);
          savedData[mon.name].rareForms = rareFormsArray;
          localStorage.setItem("dokitracker", JSON.stringify(savedData));
          updateCounts(savedData);
          dropdown.style.display = "none";
        }
      });

      dropdown.appendChild(img);
    });

    imagesLoaded = true;
  });

  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  wrapper.appendChild(button);
  wrapper.appendChild(dropdown);
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  return wrapper;
}

  function addRareImage(mon, formLabel, container, formList) {
    const img = document.createElement("img");
    img.width = 32;
    img.height = 32;
    img.title = formLabel;

    const number = formLabel === "Bound" ? "9" : formLabel.split(" ")[1];
    img.src = `/assets/images/forms/${mon.number}_${mon.name.toLowerCase()}/${mon.name.toLowerCase()}_${number}.png`;

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
