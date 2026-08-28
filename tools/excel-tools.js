/* ═══════════════════════════════════════════════════════
   Excel & Spreadsheet Tools — SentinelConvert
   PDF ↔ Excel / CSV Conversion (100% In-Browser)
   ═══════════════════════════════════════════════════════ */

/* PDF to Excel (.xlsx) Tool */
registerTool({
  id: "pdf-to-excel",
  name: "PDF to Excel",
  icon: "📑",
  desc: "Extract tables and tabular data from PDF into Excel (.xlsx)",
  category: "PDF Tools",
  catIcon: "📄",
  render(body) {
    let file = null;
    createDropZone(body, {
      accept: ".pdf",
      multiple: false,
      label: "Drop a PDF file here",
      sublabel: "Converts text and tables into structured Excel (.xlsx) sheets",
      onFiles(f) {
        file = f[0];
        createFileList(body, [file], { onRemove: () => (file = null) });
      }
    });

    const opts = document.createElement("div");
    opts.className = "opts-panel";
    opts.innerHTML = `
      <div class="opt-group">
        <span class="opt-label">Format:</span>
        <select class="opt-select" id="pdfExcelFormat">
          <option value="xlsx" selected>Excel (.xlsx)</option>
          <option value="csv">Comma-Separated (.csv)</option>
        </select>
      </div>
      <div class="opt-group">
        <span class="opt-label">Sheet Layout:</span>
        <select class="opt-select" id="pdfExcelLayout">
          <option value="single" selected>Combine all pages into 1 Sheet</option>
          <option value="multi">Separate Sheet per PDF Page</option>
        </select>
      </div>
    `;
    body.appendChild(opts);

    const row = document.createElement("div");
    row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnPdfToExcel">📊 Convert PDF to Excel</button>`;
    body.appendChild(row);

    row.querySelector("#btnPdfToExcel").addEventListener("click", async () => {
      if (!file) return showStatus(body, "Add a PDF file first", "error");
      clearResults(body);
      showStatus(body, "Loading Excel and PDF engines…", "loading");

      try {
        if (typeof XLSX === "undefined") {
          await loadScript("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js");
        }
        if (typeof pdfjsLib === "undefined") {
          await loadScript("https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js");
        }

        const fmt = document.getElementById("pdfExcelFormat").value;
        const layout = document.getElementById("pdfExcelLayout").value;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        const totalPages = pdf.numPages;

        showStatus(body, `Extracting structured tables from ${totalPages} pages…`, "loading");

        const wb = XLSX.utils.book_new();
        const combinedRows = [];

        for (let i = 1; i <= totalPages; i++) {
          showStatus(body, `Processing page ${i} of ${totalPages}…`, "loading");
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const items = textContent.items;

          // Group items by vertical Y coordinate with line-height tolerance
          const lineMap = new Map();
          const tolerance = 4;

          items.forEach(item => {
            if (!item.str || !item.str.trim()) return;
            const y = Math.round(item.transform[5]);
            let matchedKey = null;

            for (const key of lineMap.keys()) {
              if (Math.abs(key - y) <= tolerance) {
                matchedKey = key;
                break;
              }
            }

            const targetKey = matchedKey !== null ? matchedKey : y;
            if (!lineMap.has(targetKey)) lineMap.set(targetKey, []);
            lineMap.get(targetKey).push({
              x: item.transform[4],
              str: item.str.trim()
            });
          });

          // Sort Y lines descending (top to bottom of page)
          const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
          const pageRows = [];

          sortedY.forEach(y => {
            const lineItems = lineMap.get(y).sort((a, b) => a.x - b.x);
            // Reconstruct row cells
            const rowCells = [];
            let currentCell = [];
            let lastX = -1;

            lineItems.forEach(item => {
              if (lastX >= 0 && (item.x - lastX > 35)) {
                if (currentCell.length > 0) {
                  rowCells.push(currentCell.join(" "));
                  currentCell = [];
                }
              }
              currentCell.push(item.str);
              lastX = item.x + (item.str.length * 6);
            });

            if (currentCell.length > 0) {
              rowCells.push(currentCell.join(" "));
            }

            if (rowCells.length > 0) {
              pageRows.push(rowCells);
            }
          });

          if (layout === "multi") {
            const ws = XLSX.utils.aoa_to_sheet(pageRows.length > 0 ? pageRows : [["(No text found on page)"]]);
            XLSX.utils.book_append_sheet(wb, ws, `Page ${i}`);
          } else {
            if (i > 1 && pageRows.length > 0) {
              combinedRows.push([`--- Page ${i} ---`]);
            }
            combinedRows.push(...pageRows);
          }
        }

        if (layout === "single") {
          const ws = XLSX.utils.aoa_to_sheet(combinedRows.length > 0 ? combinedRows : [["(No text found in PDF)"]]);
          XLSX.utils.book_append_sheet(wb, ws, "Extracted Data");
        }

        clearStatus(body);

        if (fmt === "csv") {
          const firstSheet = wb.Sheets[wb.SheetNames[0]];
          const csvText = XLSX.utils.sheet_to_csv(firstSheet);
          const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
          addResult(body, blob, `${stem(file.name)}_extracted.csv`);
        } else {
          const outArray = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const blob = new Blob([outArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          addResult(body, blob, `${stem(file.name)}_extracted.xlsx`);
        }

        showStatus(body, `Successfully converted ${totalPages} PDF pages to Excel!`, "ok");
      } catch (err) {
        showStatus(body, "Error: " + err.message, "error");
      }
    });
  }
});

/* Excel / CSV to PDF Tool */
registerTool({
  id: "excel-to-pdf",
  name: "Excel to PDF",
  icon: "📕",
  desc: "Convert Excel (.xlsx, .xls, .csv) worksheets to formatted PDF documents",
  category: "Document Tools",
  catIcon: "📝",
  render(body) {
    let file = null;
    createDropZone(body, {
      accept: ".xlsx, .xls, .csv",
      multiple: false,
      label: "Drop an Excel or CSV file here",
      sublabel: "Generates clean, auto-table formatted PDF pages",
      onFiles(f) {
        file = f[0];
        createFileList(body, [file], { onRemove: () => (file = null) });
      }
    });

    const opts = document.createElement("div");
    opts.className = "opts-panel";
    opts.innerHTML = `
      <div class="opt-group">
        <span class="opt-label">Orientation:</span>
        <select class="opt-select" id="excelPdfOrient">
          <option value="landscape" selected>Landscape (Recommended for tables)</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>
      <div class="opt-group">
        <span class="opt-label">Theme:</span>
        <select class="opt-select" id="excelPdfTheme">
          <option value="cyber" selected>Cyber Blue Glass</option>
          <option value="minimal">Clean Minimalist</option>
          <option value="executive">Executive Slate</option>
        </select>
      </div>
    `;
    body.appendChild(opts);

    const row = document.createElement("div");
    row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnExcelToPdf">📕 Convert Excel to PDF</button>`;
    body.appendChild(row);

    row.querySelector("#btnExcelToPdf").addEventListener("click", async () => {
      if (!file) return showStatus(body, "Add an Excel or CSV file first", "error");
      clearResults(body);
      showStatus(body, "Reading spreadsheet data…", "loading");

      try {
        if (typeof XLSX === "undefined") {
          await loadScript("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js");
        }

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const orientation = document.getElementById("excelPdfOrient").value;
        const theme = document.getElementById("excelPdfTheme").value;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "pt",
          format: "a4"
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let isFirstPage = true;

        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          if (!rows || rows.length === 0) continue;

          if (!isFirstPage) pdf.addPage(orientation);
          isFirstPage = false;

          // Header title banner
          const headerBg = theme === "cyber" ? [14, 116, 144] : (theme === "executive" ? [30, 41, 59] : [71, 85, 105]);
          pdf.setFillColor(...headerBg);
          pdf.rect(20, 20, pageWidth - 40, 36, "F");

          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(14);
          pdf.setFont(undefined, "bold");
          pdf.text(`Sheet: ${sheetName}`, 32, 43);

          pdf.setFontSize(9);
          pdf.setFont(undefined, "normal");
          pdf.text(`File: ${file.name}`, pageWidth - 35, 43, { align: "right" });

          // Calculate column count and column widths
          const maxCols = Math.max(...rows.map(r => (Array.isArray(r) ? r.length : 0)));
          const colWidth = (pageWidth - 60) / Math.max(maxCols, 1);
          let currentY = 75;
          const rowHeight = 22;

          rows.forEach((rowCells, rowIdx) => {
            if (currentY + rowHeight > pageHeight - 40) {
              pdf.addPage(orientation);
              currentY = 40;
            }

            const isHeaderRow = rowIdx === 0;
            if (isHeaderRow) {
              pdf.setFillColor(30, 58, 138);
              pdf.rect(20, currentY, pageWidth - 40, rowHeight, "F");
              pdf.setTextColor(255, 255, 255);
              pdf.setFont(undefined, "bold");
              pdf.setFontSize(9);
            } else {
              pdf.setFillColor(rowIdx % 2 === 0 ? 245 : 255, rowIdx % 2 === 0 ? 247 : 255, rowIdx % 2 === 0 ? 250 : 255);
              pdf.rect(20, currentY, pageWidth - 40, rowHeight, "F");
              pdf.setTextColor(30, 41, 59);
              pdf.setFont(undefined, "normal");
              pdf.setFontSize(8);
            }

            // Cell borders
            pdf.setDrawColor(226, 232, 240);
            pdf.rect(20, currentY, pageWidth - 40, rowHeight, "S");

            if (Array.isArray(rowCells)) {
              rowCells.forEach((cellVal, colIdx) => {
                const cellText = String(cellVal !== undefined && cellVal !== null ? cellVal : "");
                const cellX = 25 + (colIdx * colWidth);
                const truncatedText = pdf.splitTextToSize(cellText, colWidth - 8)[0] || "";
                pdf.text(truncatedText, cellX, currentY + 14);
              });
            }

            currentY += rowHeight;
          });
        }

        const blob = pdf.output("blob");
        clearStatus(body);
        addResult(body, blob, `${stem(file.name)}.pdf`);
        showStatus(body, "Converted Excel spreadsheet to PDF successfully!", "ok");
      } catch (err) {
        showStatus(body, "Error: " + err.message, "error");
      }
    });
  }
});

/* Excel to CSV Tool */
registerTool({
  id: "excel-to-csv", name: "Excel to CSV", icon: "📊", desc: "Convert Excel (.xlsx, .xls) to CSV",
  category: "Document Tools", catIcon: "📝",
  render(body) {
    let file = null;
    createDropZone(body, {
      accept: ".xlsx, .xls", multiple: false,
      label: "Drop an Excel file here", sublabel: "Converts the first worksheet to CSV",
      onFiles(f) { file = f[0]; createFileList(body, [file], { onRemove: () => file=null }); }
    });

    const row = document.createElement("div"); row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnConvertExcel">📊 Convert to CSV</button>`;
    body.appendChild(row);

    row.querySelector("#btnConvertExcel").addEventListener("click", async () => {
      if (!file) return showStatus(body, "Add an Excel file first", "error");
      clearResults(body); showStatus(body, "Converting Excel…", "loading");

      try {
        if (typeof XLSX === "undefined") {
          await loadScript("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js");
        }

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        const csvText = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

        clearStatus(body);
        addResult(body, blob, `${stem(file.name)}.csv`);
        showStatus(body, "Converted Excel to CSV successfully!", "ok");

      } catch (e) {
        showStatus(body, "Error: " + e.message, "error");
      }
    });
  }
});

/* CSV to Excel Tool */
registerTool({
  id: "csv-to-excel", name: "CSV to Excel", icon: "📈", desc: "Convert CSV to Excel (.xlsx)",
  category: "Document Tools", catIcon: "📝",
  render(body) {
    let file = null;
    createDropZone(body, {
      accept: ".csv", multiple: false,
      label: "Drop a CSV file here", sublabel: "Converts to a standard .xlsx file",
      onFiles(f) { file = f[0]; createFileList(body, [file], { onRemove: () => file=null }); }
    });

    const row = document.createElement("div"); row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnConvertCsv">📈 Convert to Excel</button>`;
    body.appendChild(row);

    row.querySelector("#btnConvertCsv").addEventListener("click", async () => {
      if (!file) return showStatus(body, "Add a CSV file first", "error");
      clearResults(body); showStatus(body, "Converting CSV…", "loading");

      try {
        if (typeof XLSX === "undefined") {
          await loadScript("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js");
        }

        const text = await file.text();
        const workbook = XLSX.read(text, { type: "string" });
        const outArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([outArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        clearStatus(body);
        addResult(body, blob, `${stem(file.name)}.xlsx`);
        showStatus(body, "Converted CSV to Excel successfully!", "ok");

      } catch (e) {
        showStatus(body, "Error: " + e.message, "error");
      }
    });
  }
});
