/* ═══════════════════════════════════════════════════════
   SentinelConvert — Multi View (Responsive Multi-Device Layout Tester)
   Test projects & websites across smartphones, tablets, desktops, & smartwatches
   with instant exact-dimension popups and live side-by-side in-app mockups.
   ═══════════════════════════════════════════════════════ */

(() => {
  /* ── Device Specifications Database ── */
  const DEVICE_DATABASE = [
    // ── Mobile Phones ──
    {
      id: "iphone-17-pm",
      name: "iPhone 17 Pro Max",
      category: "mobile",
      catName: "Smartphones",
      width: 440,
      height: 956,
      dpr: 3,
      screen: "6.9\" Super Retina XDR",
      os: "iOS 19",
      frameType: "ios-island",
      icon: "📱",
      badge: "Flagship 2026",
      defaultActive: true
    },
    {
      id: "samsung-s25-ultra",
      name: "Samsung Galaxy S25 Ultra",
      category: "mobile",
      catName: "Smartphones",
      width: 412,
      height: 915,
      dpr: 3.5,
      screen: "6.86\" Dynamic AMOLED 2X",
      os: "One UI 7",
      frameType: "android-hole",
      icon: "📱",
      badge: "Flagship 2026",
      defaultActive: true
    },
    {
      id: "poco-f8-pro",
      name: "Poco F8 Pro / Xiaomi 15",
      category: "mobile",
      catName: "Smartphones",
      width: 393,
      height: 873,
      dpr: 3,
      screen: "6.67\" 120Hz Flow AMOLED",
      os: "HyperOS 2",
      frameType: "android-hole",
      icon: "📱",
      badge: "Popular Flagship Killer",
      defaultActive: true
    },
    {
      id: "iphone-16-pro",
      name: "iPhone 16 Pro",
      category: "mobile",
      catName: "Smartphones",
      width: 402,
      height: 874,
      dpr: 3,
      screen: "6.3\" Super Retina XDR",
      os: "iOS 18",
      frameType: "ios-island",
      icon: "📱"
    },
    {
      id: "pixel-9-pro-xl",
      name: "Google Pixel 9 Pro XL",
      category: "mobile",
      catName: "Smartphones",
      width: 412,
      height: 923,
      dpr: 3.5,
      screen: "6.8\" Super Actua",
      os: "Android 15",
      frameType: "android-hole",
      icon: "📱"
    },
    {
      id: "nothing-phone-2",
      name: "Nothing Phone (2)",
      category: "mobile",
      catName: "Smartphones",
      width: 412,
      height: 919,
      dpr: 3,
      screen: "6.7\" LTPO OLED",
      os: "Nothing OS",
      frameType: "android-hole",
      icon: "📱"
    },
    {
      id: "iphone-15",
      name: "iPhone 15 / 14 Pro",
      category: "mobile",
      catName: "Smartphones",
      width: 393,
      height: 852,
      dpr: 3,
      screen: "6.1\" OLED",
      os: "iOS 17+",
      frameType: "ios-island",
      icon: "📱"
    },
    {
      id: "iphone-se",
      name: "iPhone SE (Compact)",
      category: "mobile",
      catName: "Smartphones",
      width: 375,
      height: 667,
      dpr: 2,
      screen: "4.7\" Retina HD",
      os: "iOS Classic",
      frameType: "ios-classic",
      icon: "📱"
    },

    // ── Tablets & Foldables ──
    {
      id: "ipad-pro-13",
      name: "iPad Pro 13\" (M4)",
      category: "tablet",
      catName: "Tablets & Foldables",
      width: 1024,
      height: 1366,
      dpr: 2,
      screen: "13\" Ultra Retina XDR",
      os: "iPadOS 18",
      frameType: "tablet-ios",
      icon: "📟",
      badge: "Large Tablet",
      defaultActive: true
    },
    {
      id: "ipad-air-11",
      name: "iPad Air 11\"",
      category: "tablet",
      catName: "Tablets & Foldables",
      width: 820,
      height: 1180,
      dpr: 2,
      screen: "11\" Liquid Retina",
      os: "iPadOS",
      frameType: "tablet-ios",
      icon: "📟"
    },
    {
      id: "galaxy-tab-s10-ultra",
      name: "Galaxy Tab S10 Ultra",
      category: "tablet",
      catName: "Tablets & Foldables",
      width: 1120,
      height: 1792,
      dpr: 2.2,
      screen: "14.6\" Dynamic AMOLED 2X",
      os: "One UI Tab",
      frameType: "tablet-android",
      icon: "📟"
    },
    {
      id: "galaxy-z-fold-6-open",
      name: "Galaxy Z Fold 6 (Unfolded)",
      category: "tablet",
      catName: "Tablets & Foldables",
      width: 884,
      height: 1104,
      dpr: 2.5,
      screen: "7.6\" Foldable AMOLED",
      os: "Foldable UI",
      frameType: "foldable",
      icon: "📖",
      badge: "Foldable"
    },
    {
      id: "ipad-mini",
      name: "iPad Mini (A17 Pro)",
      category: "tablet",
      catName: "Tablets & Foldables",
      width: 744,
      height: 1133,
      dpr: 2,
      screen: "8.3\" Liquid Retina",
      os: "iPadOS",
      frameType: "tablet-ios",
      icon: "📟"
    },

    // ── Laptops & Desktops ──
    {
      id: "macbook-pro-16",
      name: "MacBook Pro 16\"",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 1728,
      height: 1117,
      dpr: 2,
      screen: "16.2\" Liquid Retina XDR",
      os: "macOS Sequoia",
      frameType: "laptop-mac",
      icon: "💻",
      badge: "Pro Laptop",
      defaultActive: true
    },
    {
      id: "desktop-1080p",
      name: "Full HD 1080p Desktop",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 1920,
      height: 1080,
      dpr: 1,
      screen: "24-27\" Full HD",
      os: "Standard Desktop",
      frameType: "monitor",
      icon: "🖥️",
      defaultActive: false
    },
    {
      id: "macbook-air-13",
      name: "MacBook Air 13\" / 15\"",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 1280,
      height: 832,
      dpr: 2,
      screen: "13.6\" Liquid Retina",
      os: "macOS",
      frameType: "laptop-mac",
      icon: "💻"
    },
    {
      id: "laptop-standard",
      name: "Compact Laptop (1366×768)",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 1366,
      height: 768,
      dpr: 1,
      screen: "14-15.6\" HD Display",
      os: "Windows Laptop",
      frameType: "laptop",
      icon: "💻"
    },
    {
      id: "window-small",
      name: "Standard Window (1024×768)",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 1024,
      height: 768,
      dpr: 1,
      screen: "Standard Window Size",
      os: "Window Mode",
      frameType: "window",
      icon: "🪟"
    },
    {
      id: "desktop-4k",
      name: "4K Ultra HD (3840×2160)",
      category: "desktop",
      catName: "Desktops & Laptops",
      width: 3840,
      height: 2160,
      dpr: 1,
      screen: "32\" 4K UHD",
      os: "4K Display",
      frameType: "monitor",
      icon: "🖥️"
    },

    // ── Smartwatches & Wearables ──
    {
      id: "apple-watch-ultra-2",
      name: "Apple Watch Ultra 2 (49mm)",
      category: "smartwatch",
      catName: "Smartwatches",
      width: 205,
      height: 251,
      dpr: 2,
      screen: "1.92\" OLED Always-On",
      os: "watchOS 11",
      frameType: "watch-apple-ultra",
      icon: "⌚",
      badge: "Smartwatch",
      defaultActive: true
    },
    {
      id: "apple-watch-10",
      name: "Apple Watch Series 10 (46mm)",
      category: "smartwatch",
      catName: "Smartwatches",
      width: 208,
      height: 248,
      dpr: 2,
      screen: "Wide-Angle OLED",
      os: "watchOS 11",
      frameType: "watch-apple",
      icon: "⌚"
    },
    {
      id: "galaxy-watch-7",
      name: "Samsung Galaxy Watch 7 (44mm)",
      category: "smartwatch",
      catName: "Smartwatches",
      width: 240,
      height: 240,
      dpr: 2,
      screen: "1.5\" Super AMOLED Circular",
      os: "Wear OS 5",
      frameType: "watch-round",
      icon: "⌚"
    },
    {
      id: "pixel-watch-3",
      name: "Google Pixel Watch 3 (45mm)",
      category: "smartwatch",
      catName: "Smartwatches",
      width: 228,
      height: 228,
      dpr: 2,
      screen: "1.4\" Actua Circular",
      os: "Wear OS",
      frameType: "watch-round",
      icon: "⌚"
    }
  ];

  /* ── Preset Sample / Quick Local URLs ── */
  const QUICK_URL_PRESETS = [
    { label: "Current App", url: window.location.href.split("#")[0] },
    { label: "localhost:3000", url: "http://localhost:3000" },
    { label: "localhost:5173", url: "http://localhost:5173" },
    { label: "localhost:8080", url: "http://localhost:8080" },
    { label: "Wikipedia", url: "https://en.m.wikipedia.org" },
    { label: "Example.com", url: "https://example.com" }
  ];

  /* ── Standalone QR Code Generator URL ── */
  function generateQRCodeDataURL(text) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&margin=10`;
  }

  /* ── Multi-View State ── */
  let currentURL = "https://example.com";
  let activeCategory = "all";
  let activeDeviceIds = new Set(
    DEVICE_DATABASE.filter(d => d.defaultActive).map(d => d.id)
  );
  let orientations = {}; // deviceId -> 'portrait' | 'landscape'
  let globalZoom = 0.65; // scale factor
  let deviceSkinEnabled = true;
  let customDevices = [];

  /* ── Open Standalone Window Popup ── */
  function openDevicePopup(device, urlToOpen, orientationOverride) {
    const isLandscape = orientationOverride
      ? orientationOverride === "landscape"
      : (orientations[device.id] === "landscape");

    const w = isLandscape ? device.height : device.width;
    const h = isLandscape ? device.width : device.height;

    // Calculate center on screen
    const left = Math.max(0, Math.round((screen.width - w) / 2));
    const top = Math.max(0, Math.round((screen.height - h) / 2));

    const features = `width=${w},height=${h},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`;
    
    // Normalize URL
    let url = urlToOpen || currentURL;
    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("file://")) {
      url = "https://" + url;
    }

    const win = window.open(url, `sentinel_view_${device.id}_${Date.now()}`, features);
    if (!win) {
      alert("⚠️ Popup was blocked by your browser! Please allow popups for SentinelConvert in your browser settings to use the standalone window feature.");
    } else {
      win.focus();
    }
  }

  /* ── Open All Selected Devices in Popups ── */
  function openAllPopups(devices, urlToOpen) {
    if (!devices || devices.length === 0) {
      alert("Please select at least one device first.");
      return;
    }

    let delay = 0;
    devices.forEach((device) => {
      setTimeout(() => {
        openDevicePopup(device, urlToOpen);
      }, delay);
      delay += 180;
    });
  }

  /* ── Normalize URL Helper ── */
  function formatURL(url) {
    let u = (url || "").trim();
    if (!u) return "https://example.com";
    if (!u.startsWith("http://") && !u.startsWith("https://") && !u.startsWith("file://")) {
      u = "https://" + u;
    }
    return u;
  }

  /* ── Register Tool ── */
  registerTool({
    id: "multi-view",
    name: "Multi View (Device Tester)",
    icon: "📱",
    desc: "Preview websites & projects across iPhone 17 Pro Max, Samsung S25 Ultra, Poco F8 Pro, MacBooks, & Smartwatches",
    category: "Developer Tools",
    catIcon: "💻",

    render(body) {
      // Add wide-layout class to tool container
      const parentView = body.closest(".tool-view") || body;
      parentView.classList.add("tool-view-multiview");

      body.innerHTML = `
        <div class="mv-container">
          <!-- ── Top Control Bar & URL Input ── -->
          <div class="mv-topbar">
            <div class="mv-url-box">
              <span class="mv-url-icon">🌐</span>
              <input type="text" id="mvUrlInput" class="mv-url-input" placeholder="Enter website link, e.g., http://localhost:3000 or https://..." value="${esc(currentURL)}" />
              <button class="mv-btn-go" id="mvBtnGo" title="Load URL">Go →</button>
              <button class="mv-btn-icon" id="mvBtnQR" title="Show QR Code for Mobile Testing">📱 QR</button>
            </div>

            <!-- Quick Presets -->
            <div class="mv-presets-bar">
              <span class="mv-presets-label">Quick Links:</span>
              <div class="mv-preset-chips">
                ${QUICK_URL_PRESETS.map(p => `
                  <button class="mv-preset-chip" data-url="${esc(p.url)}">${esc(p.label)}</button>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- ── Toolbar (Global Actions, Popups, Zoom, Filter) ── -->
          <div class="mv-toolbar">
            <!-- Left: Device Category Filter Tabs -->
            <div class="mv-cat-tabs">
              <button class="mv-tab ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">🌟 All Devices</button>
              <button class="mv-tab ${activeCategory === 'mobile' ? 'active' : ''}" data-cat="mobile">📱 Phones (${DEVICE_DATABASE.filter(d=>d.category==='mobile').length})</button>
              <button class="mv-tab ${activeCategory === 'tablet' ? 'active' : ''}" data-cat="tablet">📟 Tablets (${DEVICE_DATABASE.filter(d=>d.category==='tablet').length})</button>
              <button class="mv-tab ${activeCategory === 'desktop' ? 'active' : ''}" data-cat="desktop">💻 Desktops (${DEVICE_DATABASE.filter(d=>d.category==='desktop').length})</button>
              <button class="mv-tab ${activeCategory === 'smartwatch' ? 'active' : ''}" data-cat="smartwatch">⌚ Smartwatches (${DEVICE_DATABASE.filter(d=>d.category==='smartwatch').length})</button>
            </div>

            <!-- Right: Action Controls -->
            <div class="mv-actions-group">
              <!-- Launch All Popups -->
              <button class="mv-action-btn mv-btn-popup-all" id="mvBtnPopupAll" title="Open separate popup windows for all selected devices">
                🪟 Launch Selected Popups (<span id="mvSelectedCount">${activeDeviceIds.size}</span>)
              </button>

              <!-- Orientation Rotate All -->
              <button class="mv-action-btn" id="mvBtnRotateAll" title="Rotate all frames Portrait ↔ Landscape">
                🔄 Rotate All
              </button>

              <!-- Frame Bezel Toggle -->
              <button class="mv-action-btn ${deviceSkinEnabled ? 'active' : ''}" id="mvBtnToggleSkins" title="Toggle realistic device frames/bezels">
                🎨 ${deviceSkinEnabled ? 'Frames: ON' : 'Frames: OFF'}
              </button>

              <!-- Zoom Controls -->
              <div class="mv-zoom-group">
                <span class="mv-zoom-label">Zoom:</span>
                <button class="mv-zoom-btn" id="mvZoomOut">−</button>
                <span class="mv-zoom-value" id="mvZoomValue">${Math.round(globalZoom * 100)}%</span>
                <button class="mv-zoom-btn" id="mvZoomIn">+</button>
                <button class="mv-zoom-reset" id="mvZoomFit">Fit</button>
              </div>

              <!-- Refresh All -->
              <button class="mv-action-btn" id="mvBtnRefreshAll" title="Reload all iframe views">
                🔃 Reload All
              </button>

              <!-- Custom Device Modal Trigger -->
              <button class="mv-action-btn" id="mvBtnCustomDevice" title="Add Custom Screen Size">
                ➕ Custom Size
              </button>
            </div>
          </div>

          <!-- ── Device Selection Drawer / Fast Picker ── -->
          <div class="mv-picker-panel">
            <div class="mv-picker-header">
              <span class="mv-picker-title">⚡ Device Presets (Click 🪟 for instant Popup Window, or check to show in live grid):</span>
              <div class="mv-picker-quick">
                <button class="mv-link-btn" id="mvSelectAll">Select All</button>
                <span>•</span>
                <button class="mv-link-btn" id="mvSelectNone">Deselect All</button>
                <span>•</span>
                <button class="mv-link-btn" id="mvSelectFlagships">Famous Flagships Only</button>
              </div>
            </div>

            <div class="mv-device-cards-grid" id="mvDeviceCardsGrid">
              <!-- Populated by renderDeviceCards() -->
            </div>
          </div>

          <!-- ── Iframe Notice & Tip ── -->
          <div class="mv-notice-bar">
            <div class="mv-notice-content">
              <span class="mv-notice-icon">💡</span>
              <span class="mv-notice-text">
                <strong>Pro-Tip:</strong> To test local development projects (e.g. <code>localhost:3000</code> or <code>localhost:5173</code>) or any web page, the <strong>🪟 Popup Window</strong> feature opens exact pixel-sized browser windows that bypass all iframe restrictions!
              </span>
            </div>
          </div>

          <!-- ── Live In-App Multi-View Canvas ── -->
          <div class="mv-canvas-wrapper" id="mvCanvasWrapper">
            <div class="mv-canvas-grid" id="mvCanvasGrid" style="--zoom: ${globalZoom};">
              <!-- Populated by renderCanvasFrames() -->
            </div>
          </div>
        </div>

        <!-- ── QR Code Modal ── -->
        <div id="mvQRModal" class="mv-modal">
          <div class="mv-modal-dialog">
            <div class="mv-modal-header">
              <h3>📱 Test on Your Physical Mobile Device</h3>
              <button class="mv-modal-close" id="mvQRModalClose">✕</button>
            </div>
            <div class="mv-modal-body">
              <p class="mv-modal-desc">Scan this QR code with your phone camera or tablet to test this URL directly on your real hardware:</p>
              <div class="mv-qr-box" id="mvQRBox">
                <!-- QR Image loaded here -->
              </div>
              <div class="mv-qr-url-text" id="mvQRUrlText"></div>
              <p class="mv-modal-sub">Ensure your phone and computer are on the same Wi-Fi network if testing localhost.</p>
            </div>
          </div>
          <div class="mv-modal-backdrop" id="mvQRModalBackdrop"></div>
        </div>

        <!-- ── Custom Device Modal ── -->
        <div id="mvCustomModal" class="mv-modal">
          <div class="mv-modal-dialog">
            <div class="mv-modal-header">
              <h3>➕ Add Custom Device Resolution</h3>
              <button class="mv-modal-close" id="mvCustomModalClose">✕</button>
            </div>
            <div class="mv-modal-body">
              <form id="mvCustomForm">
                <div class="mv-form-row">
                  <label>Device / Screen Name</label>
                  <input type="text" id="mvCustName" class="opt-input" placeholder="e.g. Foldable Inside Screen" required />
                </div>
                <div class="mv-form-grid">
                  <div class="mv-form-row">
                    <label>Width (CSS px)</label>
                    <input type="number" id="mvCustWidth" class="opt-input" value="480" min="100" max="7680" required />
                  </div>
                  <div class="mv-form-row">
                    <label>Height (CSS px)</label>
                    <input type="number" id="mvCustHeight" class="opt-input" value="800" min="100" max="4320" required />
                  </div>
                </div>
                <div class="mv-form-row">
                  <label>Category</label>
                  <select id="mvCustCat" class="opt-select">
                    <option value="mobile">📱 Smartphone</option>
                    <option value="tablet">📟 Tablet</option>
                    <option value="desktop">💻 Desktop / Laptop</option>
                    <option value="smartwatch">⌚ Smartwatch</option>
                  </select>
                </div>
                <div class="mv-modal-actions">
                  <button type="button" class="btn-secondary" id="mvCustomCancel">Cancel</button>
                  <button type="submit" class="btn-action">Create & Launch</button>
                </div>
              </form>
            </div>
          </div>
          <div class="mv-modal-backdrop" id="mvCustomModalBackdrop"></div>
        </div>
      `;

      /* ── DOM References ── */
      const urlInput = body.querySelector("#mvUrlInput");
      const btnGo = body.querySelector("#mvBtnGo");
      const btnQR = body.querySelector("#mvBtnQR");
      const catTabs = body.querySelectorAll(".mv-tab");
      const deviceCardsGrid = body.querySelector("#mvDeviceCardsGrid");
      const canvasGrid = body.querySelector("#mvCanvasGrid");
      const selectedCountEl = body.querySelector("#mvSelectedCount");
      const btnPopupAll = body.querySelector("#mvBtnPopupAll");
      const btnRotateAll = body.querySelector("#mvBtnRotateAll");
      const btnToggleSkins = body.querySelector("#mvBtnToggleSkins");
      const btnZoomIn = body.querySelector("#mvZoomIn");
      const btnZoomOut = body.querySelector("#mvZoomOut");
      const btnZoomFit = body.querySelector("#mvZoomFit");
      const zoomValueEl = body.querySelector("#mvZoomValue");
      const btnRefreshAll = body.querySelector("#mvBtnRefreshAll");
      const btnCustomDevice = body.querySelector("#mvBtnCustomDevice");
      const selectAllBtn = body.querySelector("#mvSelectAll");
      const selectNoneBtn = body.querySelector("#mvSelectNone");
      const selectFlagshipsBtn = body.querySelector("#mvSelectFlagships");

      // Modals
      const qrModal = body.querySelector("#mvQRModal");
      const qrModalClose = body.querySelector("#mvQRModalClose");
      const qrModalBackdrop = body.querySelector("#mvQRModalBackdrop");
      const qrBox = body.querySelector("#mvQRBox");
      const qrUrlText = body.querySelector("#mvQRUrlText");

      const customModal = body.querySelector("#mvCustomModal");
      const customModalClose = body.querySelector("#mvCustomModalClose");
      const customModalBackdrop = body.querySelector("#mvCustomModalBackdrop");
      const customForm = body.querySelector("#mvCustomForm");
      const customCancel = body.querySelector("#mvCustomCancel");

      /* ── All Devices Getter ── */
      function getAllDevices() {
        return [...DEVICE_DATABASE, ...customDevices];
      }

      /* ── Render Device Cards in Picker ── */
      function renderDeviceCards() {
        const all = getAllDevices();
        const filtered = activeCategory === "all"
          ? all
          : all.filter(d => d.category === activeCategory);

        deviceCardsGrid.innerHTML = filtered.map(d => {
          const isChecked = activeDeviceIds.has(d.id);
          const isLandscape = orientations[d.id] === "landscape";
          const displayW = isLandscape ? d.height : d.width;
          const displayH = isLandscape ? d.width : d.height;

          return `
            <div class="mv-device-card ${isChecked ? 'selected' : ''}" data-device-id="${esc(d.id)}">
              <div class="mv-card-top">
                <div class="mv-card-title-wrap">
                  <span class="mv-card-icon">${d.icon}</span>
                  <div class="mv-card-name" title="${esc(d.name)}">${esc(d.name)}</div>
                </div>
                ${d.badge ? `<span class="mv-card-badge">${esc(d.badge)}</span>` : ''}
              </div>

              <div class="mv-card-specs">
                <span class="mv-spec-dim">${displayW} × ${displayH} px</span>
                <span class="mv-spec-os">${esc(d.os || '')}</span>
              </div>

              <div class="mv-card-actions">
                <label class="mv-checkbox-label" title="Toggle inside in-app grid">
                  <input type="checkbox" class="mv-card-check" data-id="${esc(d.id)}" ${isChecked ? 'checked' : ''} />
                  <span>In-App Grid</span>
                </label>
                <button class="mv-btn-popup-single" data-id="${esc(d.id)}" title="Open dedicated standalone popup window">
                  🪟 Popup
                </button>
              </div>
            </div>
          `;
        }).join("");

        // Attach card listeners
        deviceCardsGrid.querySelectorAll(".mv-card-check").forEach(chk => {
          chk.addEventListener("change", (e) => {
            const id = e.target.dataset.id;
            if (e.target.checked) {
              activeDeviceIds.add(id);
            } else {
              activeDeviceIds.delete(id);
            }
            updateSelectedCount();
            renderDeviceCards();
            renderCanvasFrames();
          });
        });

        deviceCardsGrid.querySelectorAll(".mv-btn-popup-single").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const dev = getAllDevices().find(d => d.id === id);
            if (dev) openDevicePopup(dev, currentURL);
          });
        });
      }

      /* ── Update Selected Count ── */
      function updateSelectedCount() {
        selectedCountEl.textContent = activeDeviceIds.size;
      }

      /* ── Render Canvas Frames ── */
      function renderCanvasFrames() {
        const all = getAllDevices();
        const selected = all.filter(d => activeDeviceIds.has(d.id));

        if (selected.length === 0) {
          canvasGrid.innerHTML = `
            <div class="mv-empty-state">
              <span class="mv-empty-icon">📱</span>
              <h3>No Devices Selected for Live Grid</h3>
              <p>Check one or more devices above or click <strong>🪟 Popup</strong> on any device to open an instant exact-dimension window.</p>
              <button class="btn-action" id="mvBtnSelectDefaults">Show Flagship Devices</button>
            </div>
          `;
          const defBtn = canvasGrid.querySelector("#mvBtnSelectDefaults");
          if (defBtn) {
            defBtn.addEventListener("click", () => {
              DEVICE_DATABASE.filter(d => d.defaultActive).forEach(d => activeDeviceIds.add(d.id));
              updateSelectedCount();
              renderDeviceCards();
              renderCanvasFrames();
            });
          }
          return;
        }

        const validUrl = formatURL(currentURL);

        canvasGrid.innerHTML = selected.map(dev => {
          const isLandscape = orientations[dev.id] === "landscape";
          const width = isLandscape ? dev.height : dev.width;
          const height = isLandscape ? dev.width : dev.height;
          const frameClass = deviceSkinEnabled ? `skin-${dev.frameType}` : 'skin-none';

          return `
            <div class="mv-frame-card" data-device-id="${esc(dev.id)}">
              <!-- Frame Header / Control bar -->
              <div class="mv-frame-header">
                <div class="mv-frame-title">
                  <span class="mv-frame-icon">${dev.icon}</span>
                  <strong>${esc(dev.name)}</strong>
                  <span class="mv-frame-dim">${width} × ${height}</span>
                  ${isLandscape ? '<span class="mv-pill-landscape">Landscape</span>' : ''}
                </div>

                <div class="mv-frame-ctrls">
                  <button class="mv-frame-ctrl-btn mv-ctrl-popup" data-id="${esc(dev.id)}" title="Open as Standalone Popup Window">🪟 Popup</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-rotate" data-id="${esc(dev.id)}" title="Rotate Orientation">🔄 Rotate</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-reload" data-id="${esc(dev.id)}" title="Reload Frame">🔃</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-remove" data-id="${esc(dev.id)}" title="Remove from grid">✕</button>
                </div>
              </div>

              <!-- Frame Screen Container with Hardware Bezel Mockup -->
              <div class="mv-device-mockup ${frameClass} ${isLandscape ? 'is-landscape' : 'is-portrait'}">
                <!-- Hardware Details -->
                ${dev.frameType === 'ios-island' ? '<div class="mv-dynamic-island"></div>' : ''}
                ${dev.frameType === 'android-hole' ? '<div class="mv-camera-hole"></div>' : ''}
                ${dev.frameType === 'laptop-mac' ? '<div class="mv-mac-notch"></div>' : ''}
                ${dev.frameType.startsWith('watch') ? '<div class="mv-watch-crown"></div>' : ''}

                <!-- Responsive Screen Box -->
                <div class="mv-screen-box" style="width: ${width}px; height: ${height}px;">
                  <iframe
                    src="${esc(validUrl)}"
                    class="mv-iframe"
                    title="${esc(dev.name)} preview"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                    loading="lazy"
                  ></iframe>
                </div>

                ${dev.frameType === 'laptop-mac' || dev.frameType === 'laptop' ? '<div class="mv-laptop-base"></div>' : ''}
              </div>
            </div>
          `;
        }).join("");

        // Attach frame action buttons
        canvasGrid.querySelectorAll(".mv-ctrl-popup").forEach(btn => {
          btn.addEventListener("click", () => {
            const dev = all.find(d => d.id === btn.dataset.id);
            if (dev) openDevicePopup(dev, currentURL);
          });
        });

        canvasGrid.querySelectorAll(".mv-ctrl-rotate").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            orientations[id] = orientations[id] === "landscape" ? "portrait" : "landscape";
            renderCanvasFrames();
            renderDeviceCards();
          });
        });

        canvasGrid.querySelectorAll(".mv-ctrl-reload").forEach(btn => {
          btn.addEventListener("click", () => {
            const card = btn.closest(".mv-frame-card");
            const iframe = card.querySelector("iframe");
            if (iframe) {
              iframe.src = formatURL(currentURL);
            }
          });
        });

        canvasGrid.querySelectorAll(".mv-ctrl-remove").forEach(btn => {
          btn.addEventListener("click", () => {
            activeDeviceIds.delete(btn.dataset.id);
            updateSelectedCount();
            renderDeviceCards();
            renderCanvasFrames();
          });
        });
      }

      /* ── Set Zoom Helper ── */
      function setZoom(factor) {
        globalZoom = Math.min(1.5, Math.max(0.2, factor));
        zoomValueEl.textContent = `${Math.round(globalZoom * 100)}%`;
        canvasGrid.style.setProperty("--zoom", globalZoom);
      }

      /* ── Events: URL Load ── */
      function applyURL() {
        const val = urlInput.value.trim();
        if (!val) return;
        currentURL = formatURL(val);
        urlInput.value = currentURL;
        renderCanvasFrames();
      }

      btnGo.addEventListener("click", applyURL);
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") applyURL();
      });

      // Quick Preset chips
      body.querySelectorAll(".mv-preset-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          currentURL = chip.dataset.url;
          urlInput.value = currentURL;
          applyURL();
        });
      });

      // Category Tabs
      catTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          catTabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          activeCategory = tab.dataset.cat;
          renderDeviceCards();
        });
      });

      // Launch All Popups
      btnPopupAll.addEventListener("click", () => {
        const all = getAllDevices();
        const selected = all.filter(d => activeDeviceIds.has(d.id));
        if (selected.length === 0) {
          alert("Please select at least one device to open popups.");
          return;
        }
        openAllPopups(selected, currentURL);
      });

      // Rotate All
      btnRotateAll.addEventListener("click", () => {
        const all = getAllDevices();
        const hasPortrait = all.some(d => activeDeviceIds.has(d.id) && orientations[d.id] !== "landscape");
        const nextState = hasPortrait ? "landscape" : "portrait";
        all.forEach(d => {
          orientations[d.id] = nextState;
        });
        renderCanvasFrames();
        renderDeviceCards();
      });

      // Toggle Skins / Frames
      btnToggleSkins.addEventListener("click", () => {
        deviceSkinEnabled = !deviceSkinEnabled;
        btnToggleSkins.classList.toggle("active", deviceSkinEnabled);
        btnToggleSkins.innerHTML = `🎨 ${deviceSkinEnabled ? 'Frames: ON' : 'Frames: OFF'}`;
        renderCanvasFrames();
      });

      // Zoom Buttons
      btnZoomIn.addEventListener("click", () => setZoom(globalZoom + 0.1));
      btnZoomOut.addEventListener("click", () => setZoom(globalZoom - 0.1));
      btnZoomFit.addEventListener("click", () => setZoom(0.5));

      // Reload All Frames
      btnRefreshAll.addEventListener("click", () => {
        const iframes = canvasGrid.querySelectorAll("iframe");
        iframes.forEach(f => { f.src = formatURL(currentURL); });
      });

      // Quick Select Drawer buttons
      selectAllBtn.addEventListener("click", () => {
        getAllDevices().forEach(d => activeDeviceIds.add(d.id));
        updateSelectedCount();
        renderDeviceCards();
        renderCanvasFrames();
      });

      selectNoneBtn.addEventListener("click", () => {
        activeDeviceIds.clear();
        updateSelectedCount();
        renderDeviceCards();
        renderCanvasFrames();
      });

      selectFlagshipsBtn.addEventListener("click", () => {
        activeDeviceIds.clear();
        ["iphone-17-pm", "samsung-s25-ultra", "poco-f8-pro", "ipad-pro-13", "macbook-pro-16", "apple-watch-ultra-2"].forEach(id => {
          activeDeviceIds.add(id);
        });
        updateSelectedCount();
        renderDeviceCards();
        renderCanvasFrames();
      });

      // QR Code Modal
      btnQR.addEventListener("click", () => {
        const validUrl = formatURL(currentURL);
        qrUrlText.textContent = validUrl;
        qrBox.innerHTML = `<img src="${generateQRCodeDataURL(validUrl)}" alt="QR Code for ${esc(validUrl)}" style="width:200px;height:200px;border-radius:12px;display:block;margin:0 auto;" />`;
        qrModal.classList.add("active");
      });

      function closeQRModal() { qrModal.classList.remove("active"); }
      qrModalClose.addEventListener("click", closeQRModal);
      qrModalBackdrop.addEventListener("click", closeQRModal);

      // Custom Device Modal
      btnCustomDevice.addEventListener("click", () => {
        customModal.classList.add("active");
      });
      function closeCustomModal() { customModal.classList.remove("active"); }
      customModalClose.addEventListener("click", closeCustomModal);
      customModalBackdrop.addEventListener("click", closeCustomModal);
      customCancel.addEventListener("click", closeCustomModal);

      customForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = body.querySelector("#mvCustName").value.trim();
        const w = parseInt(body.querySelector("#mvCustWidth").value, 10);
        const h = parseInt(body.querySelector("#mvCustHeight").value, 10);
        const cat = body.querySelector("#mvCustCat").value;

        if (!name || isNaN(w) || isNaN(h)) return;

        const customDev = {
          id: `custom-${Date.now()}`,
          name: name,
          category: cat,
          catName: "Custom Devices",
          width: w,
          height: h,
          dpr: 1,
          screen: `Custom ${w}×${h}`,
          os: "Custom",
          frameType: cat === "mobile" ? "android-hole" : (cat === "tablet" ? "tablet-android" : (cat === "smartwatch" ? "watch-round" : "window")),
          icon: cat === "mobile" ? "📱" : (cat === "tablet" ? "📟" : (cat === "smartwatch" ? "⌚" : "💻")),
          badge: "Custom",
          defaultActive: true
        };

        customDevices.push(customDev);
        activeDeviceIds.add(customDev.id);
        closeCustomModal();
        customForm.reset();
        updateSelectedCount();
        renderDeviceCards();
        renderCanvasFrames();

        // Option to open popup immediately
        openDevicePopup(customDev, currentURL);
      });

      // Initial Render
      renderDeviceCards();
      renderCanvasFrames();
      updateSelectedCount();
    }
  });
})();
