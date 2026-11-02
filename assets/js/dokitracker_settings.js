
document.addEventListener("DOMContentLoaded", () => {
  const markAllCaughtBtn = document.getElementById("mark-all-caught");
  const removeAllCaughtBtn = document.getElementById("remove-all-caught");
  const removeAllRaresBtn = document.getElementById("remove-all-rares");
  const exportCsvBtn = document.getElementById("export-csv");

  const themeSwitch = document.getElementById("dark-mode-toggle");
  if (themeSwitch) {
    themeSwitch.addEventListener("change", (e) => {
      document.body.classList.toggle("dark-mode", e.target.checked);
    });
  }

  markAllCaughtBtn?.addEventListener("click", () => {
    document.querySelectorAll('input[type="checkbox"]:not(#dark-mode-toggle)').forEach(cb => {
      cb.checked = true;
      cb.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  removeAllCaughtBtn?.addEventListener("click", () => {
    document.querySelectorAll('input[type="checkbox"]:not(#dark-mode-toggle)').forEach(cb => {
      cb.checked = false;
      cb.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  removeAllRaresBtn?.addEventListener("click", () => {
    const savedData = JSON.parse(localStorage.getItem("dokitracker") || "{}");
    Object.keys(savedData).forEach(name => {
      savedData[name].rareForms = [];
    });
    localStorage.setItem("dokitracker", JSON.stringify(savedData));
    location.reload();
  });

  exportCsvBtn?.addEventListener("click", () => {
    const savedData = JSON.parse(localStorage.getItem("dokitracker") || "{}");
    let csv = `dokimon caught:,${document.getElementById("caught-count").textContent} / 144\n`;
    csv += `rare forms caught:,${document.getElementById("rare-count").textContent}\n`;
    csv += "Dex #,Name,Caught?,Rare Forms\n";
    const rows = document.querySelectorAll("#tracker-table-body tr");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const dex = cells[0].textContent.trim();
      const name = cells[2].textContent.trim();
      const caught = cells[3].querySelector("input").checked ? "Yes" : "No";
      const rares = JSON.parse(localStorage.getItem("dokitracker") || "{}")[name]?.rareForms || [];
      csv += `${dex},${name},${caught},"${rares.join(", ")}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dokitracker_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  let filteredRows = [];

const filterCaughtBtn = document.getElementById("filter-caught");
const restoreFilteredBtn = document.getElementById("restore-filtered");

filterCaughtBtn.addEventListener("click", () => {
  const rows = document.querySelectorAll("#tracker-table-body tr");
  filteredRows = [];

  rows.forEach(row => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      filteredRows.push(row);
      row.remove(); // remove caught rows from DOM
    }
  });

  if (filteredRows.length > 0) {
    restoreFilteredBtn.disabled = false;
  }
});

restoreFilteredBtn.addEventListener("click", () => {
  const tableBody = document.getElementById("tracker-table-body");
  filteredRows.forEach(row => tableBody.appendChild(row));
  filteredRows = [];
  restoreFilteredBtn.disabled = true;
});
});
