const https = require('https');
const http = require('http');

const urls = [
    "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
    "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js",
    "https://cdn.jsdelivr.net/npm/mammoth@1.4.22/mammoth.browser.min.js",
    "https://unpkg.com/mammoth@1.4.22/mammoth.browser.min.js",
    "https://unpkg.com/mammoth@1.4.22/browser/mammoth.browser.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
    "https://unpkg.com/docx@8.2.3/build/index.umd.js",
    "https://cdn.jsdelivr.net/npm/docx@8.2.3/build/index.umd.js",
    "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
    "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",
    "https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js",
    "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.min.js",
    "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js",
    "https://unpkg.com/pptxgenjs@3.12.0/dist/pptxgen.min.js",
    "https://unpkg.com/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"
];

function checkUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({url, status: res.statusCode, ok: true});
            } else {
                resolve({url, status: res.statusCode, ok: false});
            }
        }).on('error', (e) => {
            resolve({url, error: e.message, ok: false});
        });
        req.end();
    });
}

Promise.all(urls.map(checkUrl)).then(results => {
    let failed = false;
    for (const r of results) {
        if (!r.ok) {
            console.log(`FAIL: ${r.url} - Status: ${r.status || r.error}`);
            failed = true;
        } else {
            console.log(`OK: ${r.url}`);
        }
    }
    if (!failed) {
        console.log("All URLs are OK.");
    }
});
