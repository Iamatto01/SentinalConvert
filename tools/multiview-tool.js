/* ═══════════════════════════════════════════════════════
   SentinelConvert — Multi View (Responsive Multi-Device Layout Tester)
   Hyper-realistic hardware phone mockups (iPhone 17 Pro Max, Samsung S25 Ultra,
   Poco F8 Pro, MacBooks, iPad Pro, Smartwatches) with live multi-screen matrix,
   synced controls, and multi-window popup launcher.
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
      badge: "Flagship Killer",
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
      icon: "🖥️"
    },
    {
      id: "macbook-air-13",
      name: "MacBook Air 13\"",
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

  /* ── Multi-Screen Preset Combos ── */
  const MULTI_SCREEN_COMBOS = [
    {
      id: "combo-flagships",
      label: "🔥 Flagship Duel (3 Phones)",
      desc: "iPhone 17 Pro Max + Samsung Galaxy S25 Ultra + Poco F8 Pro",
      deviceIds: ["iphone-17-pm", "samsung-s25-ultra", "poco-f8-pro"]
    },
    {
      id: "combo-suite",
      label: "💻 Full Ecosystem (4 Screens)",
      desc: "iPhone 17 Pro Max + iPad Pro 13\" + MacBook Pro 16\" + Apple Watch Ultra 2",
      deviceIds: ["iphone-17-pm", "ipad-pro-13", "macbook-pro-16", "apple-watch-ultra-2"]
    },
    {
      id: "combo-mobile-all",
      label: "📱 Mobile Arena (6 Phones)",
      desc: "iPhone 17 PM, S25 Ultra, Poco F8, Pixel 9 Pro, Nothing Phone 2, iPhone 16 Pro",
      deviceIds: ["iphone-17-pm", "samsung-s25-ultra", "poco-f8-pro", "pixel-9-pro-xl", "nothing-phone-2", "iphone-16-pro"]
    },
    {
      id: "combo-tablets",
      label: "📟 Tablets & Foldables (3 Screens)",
      desc: "iPad Pro 13\" + Galaxy Tab S10 Ultra + Galaxy Z Fold 6",
      deviceIds: ["ipad-pro-13", "galaxy-tab-s10-ultra", "galaxy-z-fold-6-open"]
    },
    {
      id: "combo-wearables",
      label: "⌚ Smartwatch Duo (2 Watches)",
      desc: "Apple Watch Ultra 2 + Samsung Galaxy Watch 7",
      deviceIds: ["apple-watch-ultra-2", "galaxy-watch-7"]
    }
  ];

  /* ── Preset Sample / Quick Local URLs ── */
  const QUICK_URL_PRESETS = [
    { label: "⚡ Current Project", url: window.location.href.split("#")[0] },
    { label: "🔌 localhost:3000", url: "http://localhost:3000" },
    { label: "⚡ localhost:5173", url: "http://localhost:5173" },
    { label: "🌐 localhost:8080", url: "http://localhost:8080" },
    { label: "📖 Wikipedia", url: "https://en.m.wikipedia.org" },
    { label: "🎨 Tailwind UI", url: "https://tailwindui.com" },
    { label: "📄 Example.com", url: "https://example.com" }
  ];

  /* ── Standalone QR Code Generator URL ── */
  function generateQRCodeDataURL(text) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&margin=10`;
  }

  /* ── Inject Self-Contained Styles ── */
  function injectMultiViewStyles() {
    if (document.getElementById("mv-inline-styles")) return;
    const styleEl = document.createElement("style");
    styleEl.id = "mv-inline-styles";
    styleEl.textContent = `
      #app:has(.tool-view-multiview), .app-wide-container {
        width: min(1700px, calc(100% - 2rem)) !important;
        max-width: 1700px !important;
        margin: 0 auto !important;
      }
      .tool-view-multiview {
        width: 100% !important;
        animation: fadeIn 0.2s ease both;
      }
      .mv-container {
        display: flex;
        flex-direction: column;
        gap: 1.35rem;
        width: 100%;
      }
      /* Topbar */
      .mv-topbar {
        background: linear-gradient(135deg, rgba(22, 24, 38, 0.92) 0%, rgba(14, 15, 24, 0.95) 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 1.35rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        backdrop-filter: blur(20px);
        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      .mv-hero-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .mv-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.12);
        padding: 0.35rem 0.8rem;
        border-radius: 20px;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }
      .mv-hero-stats {
        font-size: 0.78rem;
        color: #94a3b8;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
      .mv-stat-pill {
        background: rgba(255, 255, 255, 0.06);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .mv-url-box {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(8, 9, 14, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        padding: 0.55rem 1rem;
        transition: all 0.2s ease;
      }
      .mv-url-box:focus-within {
        border-color: #6c63ff;
        box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.35);
      }
      .mv-url-icon { font-size: 1.3rem; }
      .mv-url-input {
        flex: 1;
        background: transparent;
        border: none;
        color: #fff;
        font: inherit;
        font-size: 1rem;
        outline: none;
      }
      /* URL input hint */
      .mv-url-hint {
        font-size: 0.72rem;
        color: #64748b;
        font-weight: 500;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
      .mv-url-hint kbd {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 5px;
        padding: 0.1rem 0.4rem;
        font-size: 0.7rem;
        font-family: monospace;
        color: #94a3b8;
      }
      .mv-btn-icon {
        background: rgba(255, 255, 255, 0.08);
        color: #e8e9f0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        padding: 0.55rem 0.95rem;
        font: inherit;
        font-weight: 600;
        font-size: 0.84rem;
        cursor: pointer;
        transition: background 0.15s;
      }
      .mv-btn-icon:hover { background: rgba(255, 255, 255, 0.16); }
      .mv-presets-bar {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        flex-wrap: wrap;
      }
      .mv-presets-label {
        font-size: 0.74rem;
        font-weight: 700;
        color: #7b7f99;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .mv-preset-chips { display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; }
      .mv-preset-chip {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.09);
        color: #94a3b8;
        border-radius: 20px;
        padding: 0.28rem 0.75rem;
        font: inherit;
        font-size: 0.76rem;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .mv-preset-chip:hover {
        color: #fff;
        border-color: #38bdf8;
        background: rgba(56, 189, 248, 0.15);
      }
      /* Quick Combos Section */
      .mv-combos-panel {
        background: rgba(20, 22, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 16px;
        padding: 1rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }
      .mv-combos-title {
        font-size: 0.76rem;
        font-weight: 800;
        color: #7b7f99;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .mv-combos-list {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
      }
      .mv-combo-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #e2e8f0;
        border-radius: 12px;
        padding: 0.5rem 0.95rem;
        font: inherit;
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.18s ease;
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }
      .mv-combo-btn:hover {
        background: linear-gradient(135deg, rgba(108, 99, 255, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%);
        border-color: #38bdf8;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(6, 182, 212, 0.25);
      }
      /* Toolbar */
      .mv-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
        padding: 0.2rem 0;
      }
      .mv-cat-tabs { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
      .mv-tab {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        border-radius: 12px;
        padding: 0.55rem 1rem;
        font: inherit;
        font-size: 0.84rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .mv-tab:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
      .mv-tab.active {
        background: linear-gradient(135deg, #6c63ff, #8b5cf6);
        border-color: #6c63ff;
        color: #fff;
        box-shadow: 0 4px 18px rgba(108, 99, 255, 0.4);
      }
      .mv-actions-group { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
      .mv-action-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #e8e9f0;
        border-radius: 12px;
        padding: 0.55rem 1rem;
        font: inherit;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .mv-action-btn:hover { background: rgba(255, 255, 255, 0.14); border-color: rgba(255, 255, 255, 0.25); }
      .mv-btn-popup-all {
        background: linear-gradient(135deg, #06b6d4, #3b82f6) !important;
        color: #fff !important;
        border: none !important;
        font-weight: 700 !important;
        box-shadow: 0 4px 18px rgba(6, 182, 212, 0.35);
      }
      .mv-btn-popup-all:hover { opacity: 0.92; transform: translateY(-1px); }
      .mv-zoom-group {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.3rem 0.6rem;
        gap: 0.4rem;
      }
      .mv-zoom-label { font-size: 0.74rem; color: #7b7f99; font-weight: 600; }
      .mv-zoom-value { font-size: 0.82rem; font-weight: 700; min-width: 42px; text-align: center; font-family: monospace; }
      .mv-zoom-btn, .mv-zoom-reset {
        background: rgba(255, 255, 255, 0.09);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #fff;
        border-radius: 8px;
        padding: 0.25rem 0.55rem;
        font-weight: bold;
        font-size: 0.84rem;
        cursor: pointer;
      }
      /* Picker Panel */
      .mv-picker-panel {
        background: rgba(20, 22, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        padding: 1.2rem;
        backdrop-filter: blur(14px);
      }
      .mv-picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .mv-picker-title {
        font-size: 0.8rem;
        font-weight: 800;
        color: #7b7f99;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .mv-picker-quick { display: flex; align-items: center; gap: 0.6rem; font-size: 0.78rem; color: #7b7f99; }
      .mv-link-btn {
        background: none;
        border: none;
        color: #38bdf8;
        font: inherit;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
      }
      .mv-link-btn:hover { text-decoration: underline; }
      .mv-device-cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 0.85rem;
      }
      .mv-device-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 0.95rem;
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        transition: all 0.18s ease;
      }
      .mv-device-card:hover {
        background: rgba(255, 255, 255, 0.07);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
      }
      .mv-device-card.selected {
        border-color: rgba(108, 99, 255, 0.6);
        background: rgba(108, 99, 255, 0.1);
      }
      .mv-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4rem; }
      .mv-card-title-wrap { display: flex; align-items: center; gap: 0.45rem; overflow: hidden; }
      .mv-card-icon { font-size: 1.3rem; flex-shrink: 0; }
      .mv-card-name { font-size: 0.88rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff; }
      .mv-card-badge {
        font-size: 0.64rem;
        font-weight: 700;
        padding: 0.15rem 0.5rem;
        border-radius: 10px;
        background: rgba(6, 182, 212, 0.18);
        color: #38bdf8;
        border: 1px solid rgba(6, 182, 212, 0.35);
        white-space: nowrap;
      }
      .mv-card-specs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.76rem;
        color: #94a3b8;
        font-family: monospace;
      }
      .mv-card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.25rem;
        padding-top: 0.55rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      /* Prominent Tick Checkbox */
      .mv-checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.78rem;
        color: #e2e8f0;
        cursor: pointer;
        user-select: none;
      }
      .mv-card-check {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        position: relative;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }
      .mv-card-check:checked {
        background: linear-gradient(135deg, #6c63ff, #8b5cf6);
        border-color: #6c63ff;
        box-shadow: 0 2px 8px rgba(108, 99, 255, 0.45);
      }
      .mv-card-check:checked::after {
        content: "✓";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 13px;
        font-weight: 900;
        line-height: 1;
      }
      .mv-card-check:hover {
        border-color: rgba(108, 99, 255, 0.6);
        background: rgba(108, 99, 255, 0.15);
      }
      .mv-btn-popup-single {
        background: rgba(6, 182, 212, 0.15);
        border: 1px solid rgba(6, 182, 212, 0.35);
        color: #38bdf8;
        border-radius: 8px;
        padding: 0.32rem 0.7rem;
        font: inherit;
        font-size: 0.76rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .mv-btn-popup-single:hover {
        background: #06b6d4;
        border-color: #06b6d4;
        color: #000;
        box-shadow: 0 4px 14px rgba(6, 182, 212, 0.45);
      }
      /* Notice Bar */
      .mv-notice-bar {
        background: rgba(108, 99, 255, 0.08);
        border: 1px solid rgba(108, 99, 255, 0.22);
        border-radius: 14px;
        padding: 0.85rem 1.15rem;
      }
      .mv-notice-content { display: flex; align-items: center; gap: 0.65rem; font-size: 0.84rem; color: #c4c1f7; }
      .mv-notice-content code {
        background: rgba(0, 0, 0, 0.4);
        padding: 0.15rem 0.45rem;
        border-radius: 4px;
        font-family: monospace;
        color: #93c5fd;
      }
      /* Canvas */
      .mv-canvas-wrapper {
        width: 100%;
        overflow: auto;
        padding: 2rem 0 4rem;
        position: relative;
      }
      .mv-canvas-grid {
        position: relative;
        min-height: 500px;
        width: 100%;
      }
      /* Grid mode (default before any drag) */
      .mv-canvas-grid.grid-mode {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
        gap: 3.5rem;
      }
      /* Free-form mode (after first drag) */
      .mv-canvas-grid.freeform-mode {
        display: block;
      }
      .mv-empty-state {
        text-align: center;
        padding: 4.5rem 2rem;
        background: rgba(255, 255, 255, 0.03);
        border: 2px dashed rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        width: 100%;
        max-width: 620px;
        margin: 0 auto;
      }
      .mv-empty-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; }
      .mv-empty-state h3 { font-size: 1.35rem; margin-bottom: 0.5rem; color: #fff; }
      .mv-empty-state p { color: #94a3b8; font-size: 0.92rem; margin-bottom: 1.5rem; }
      /* Frame Card */
      .mv-frame-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.85rem;
        transition: box-shadow 0.15s ease;
      }
      /* When in freeform mode, frames are absolutely positioned */
      .mv-canvas-grid.freeform-mode .mv-frame-card {
        position: absolute;
      }
      .mv-frame-card.is-dragging {
        z-index: 9000 !important;
        opacity: 0.92;
      }
      /* Iframe drag shield — covers iframes during drag so mouse events aren't stolen */
      .mv-drag-shield {
        position: fixed;
        inset: 0;
        z-index: 8999;
        cursor: grabbing;
        display: none;
      }
      .mv-drag-shield.active { display: block; }
      .mv-frame-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 0.8rem;
        background: rgba(20, 22, 34, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.5rem 0.9rem;
        backdrop-filter: blur(10px);
        cursor: grab;
        user-select: none;
      }
      .mv-frame-header:active { cursor: grabbing; }
      .mv-drag-indicator {
        font-size: 0.85rem;
        opacity: 0.4;
        margin-right: 0.2rem;
        cursor: grab;
      }
      .mv-frame-title { display: flex; align-items: center; gap: 0.5rem; font-size: 0.84rem; color: #fff; }
      .mv-frame-dim {
        color: #94a3b8;
        font-size: 0.74rem;
        font-family: monospace;
        background: rgba(255, 255, 255, 0.08);
        padding: 0.15rem 0.45rem;
        border-radius: 6px;
      }
      .mv-pill-landscape {
        font-size: 0.65rem;
        font-weight: 700;
        padding: 0.15rem 0.45rem;
        background: rgba(245, 158, 11, 0.2);
        color: #fbbf24;
        border-radius: 6px;
      }
      .mv-frame-ctrls { display: flex; align-items: center; gap: 0.35rem; }
      .mv-frame-ctrl-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #e8e9f0;
        border-radius: 8px;
        padding: 0.25rem 0.55rem;
        font: inherit;
        font-size: 0.74rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .mv-frame-ctrl-btn:hover { background: rgba(255, 255, 255, 0.18); }
      .mv-ctrl-popup:hover { background: #06b6d4; color: #000; border-color: #06b6d4; }
      .mv-ctrl-remove:hover { background: #f87171; color: #fff; border-color: #f87171; }

      /* ═══════════════════════════════════════════════════════
         PHOTOREALISTIC PHONE HARDWARE MOCKUPS
         Multi-layer 3D depth, titanium edges, inner bezel rings
         ═══════════════════════════════════════════════════════ */
      .mv-phone-wrapper {
        position: relative;
        display: inline-block;
        transform-origin: top center;
        transform: scale(var(--zoom, 0.65));
        margin-bottom: calc(-1 * (1 - var(--zoom, 0.65)) * 100%);
        /* Ambient floor shadow under the device */
        filter: drop-shadow(0 40px 30px rgba(0, 0, 0, 0.55));
      }

      /* ── Base Chassis (shared by all devices) ── */
      .mv-phone-chassis {
        position: relative;
      }

      /* ── iPhone Titanium Body (Dynamic Island devices) ── */
      .skin-ios-island {
        border-radius: 58px;
        padding: 16px;
        /* Multi-layer titanium gradient */
        background:
          linear-gradient(170deg,
            #4a4d5e 0%,
            #2b2d3a 8%,
            #1a1c26 20%,
            #17181f 50%,
            #1a1c26 80%,
            #2b2d3a 92%,
            #3e4050 100%
          );
        /* Outer metal rim highlight + inner shadow for depth */
        border: 3px solid transparent;
        background-clip: padding-box;
        box-shadow:
          /* Outer highlight (top-left light source) */
          0 0 0 1px rgba(120, 125, 155, 0.45),
          /* Outer bright edge (metal rim catch) */
          0 0 0 3px #2a2c38,
          0 0 0 4px rgba(100, 105, 130, 0.35),
          /* Ambient shadow */
          0 30px 60px rgba(0, 0, 0, 0.5),
          0 10px 20px rgba(0, 0, 0, 0.3),
          /* Inner top highlight */
          inset 0 2px 3px rgba(255, 255, 255, 0.15),
          /* Inner bottom shadow */
          inset 0 -2px 3px rgba(0, 0, 0, 0.3);
      }
      .skin-ios-island .mv-screen-box {
        border-radius: 44px;
        /* Inner bezel ring around the screen */
        box-shadow:
          0 0 0 2px #0a0b0f,
          0 0 0 3px rgba(60, 64, 80, 0.5),
          inset 0 0 0 1px rgba(0, 0, 0, 0.3);
      }

      /* ── Samsung S25 Ultra / Android Flagships ── */
      .skin-android-hole {
        border-radius: 38px;
        padding: 14px;
        background:
          linear-gradient(165deg,
            #3d3f4e 0%,
            #25272f 10%,
            #1b1c24 25%,
            #151620 50%,
            #1b1c24 75%,
            #25272f 90%,
            #36384a 100%
          );
        border: 3px solid transparent;
        background-clip: padding-box;
        box-shadow:
          0 0 0 1px rgba(100, 105, 135, 0.4),
          0 0 0 3px #232530,
          0 0 0 4px rgba(90, 95, 120, 0.3),
          0 30px 60px rgba(0, 0, 0, 0.5),
          0 10px 20px rgba(0, 0, 0, 0.3),
          inset 0 2px 3px rgba(255, 255, 255, 0.12),
          inset 0 -2px 3px rgba(0, 0, 0, 0.25);
      }
      .skin-android-hole .mv-screen-box {
        border-radius: 28px;
        box-shadow:
          0 0 0 2px #08090d,
          0 0 0 3px rgba(50, 54, 70, 0.5),
          inset 0 0 0 1px rgba(0, 0, 0, 0.3);
      }

      /* ── iPhone SE / Classic (Home Button) ── */
      .skin-ios-classic {
        border-radius: 50px;
        padding: 70px 14px 80px 14px;
        background:
          linear-gradient(170deg, #48495a 0%, #2a2c38 15%, #17181f 50%, #2a2c38 85%, #3e3f50 100%);
        box-shadow:
          0 0 0 1px rgba(120, 125, 155, 0.4),
          0 0 0 3px #2a2c38,
          0 30px 60px rgba(0, 0, 0, 0.5),
          inset 0 2px 3px rgba(255, 255, 255, 0.12),
          inset 0 -2px 3px rgba(0, 0, 0, 0.25);
      }
      .skin-ios-classic .mv-screen-box {
        border-radius: 4px;
        box-shadow: 0 0 0 2px #0a0b0f;
      }
      /* Home button for classic iPhone */
      .skin-ios-classic::after {
        content: "";
        position: absolute;
        bottom: 22px;
        left: 50%;
        transform: translateX(-50%);
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 2.5px solid rgba(120, 125, 155, 0.35);
        background: linear-gradient(145deg, #1e2028, #15161d);
        pointer-events: none;
      }
      /* Earpiece speaker for classic iPhone */
      .skin-ios-classic::before {
        content: "";
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 55px;
        height: 6px;
        border-radius: 3px;
        background: #0d0e14;
        border: 1px solid rgba(40, 42, 56, 0.5);
        pointer-events: none;
      }

      /* ── Physical Hardware Side Buttons ── */
      .mv-hw-btn {
        position: absolute;
        pointer-events: none;
        z-index: 200;
      }
      /* Left: Silent/Action switch */
      .mv-btn-action {
        left: -7px;
        top: 120px;
        width: 7px;
        height: 30px;
        border-radius: 4px 0 0 4px;
        background: linear-gradient(to bottom, #555770, #35374a, #2a2c3a);
        box-shadow:
          -1px 0 2px rgba(0, 0, 0, 0.5),
          inset 1px 0 1px rgba(255, 255, 255, 0.1);
      }
      /* Left: Volume Up */
      .mv-btn-vol-up {
        left: -7px;
        top: 175px;
        width: 7px;
        height: 55px;
        border-radius: 4px 0 0 4px;
        background: linear-gradient(to bottom, #555770, #35374a, #2a2c3a);
        box-shadow:
          -1px 0 2px rgba(0, 0, 0, 0.5),
          inset 1px 0 1px rgba(255, 255, 255, 0.1);
      }
      /* Left: Volume Down */
      .mv-btn-vol-down {
        left: -7px;
        top: 245px;
        width: 7px;
        height: 55px;
        border-radius: 4px 0 0 4px;
        background: linear-gradient(to bottom, #555770, #35374a, #2a2c3a);
        box-shadow:
          -1px 0 2px rgba(0, 0, 0, 0.5),
          inset 1px 0 1px rgba(255, 255, 255, 0.1);
      }
      /* Right: Power / Lock */
      .mv-btn-power {
        right: -7px;
        top: 195px;
        width: 7px;
        height: 85px;
        border-radius: 0 4px 4px 0;
        background: linear-gradient(to bottom, #555770, #35374a, #2a2c3a);
        box-shadow:
          1px 0 2px rgba(0, 0, 0, 0.5),
          inset -1px 0 1px rgba(255, 255, 255, 0.1);
      }

      /* Antenna Line Cutouts */
      .mv-antenna {
        position: absolute;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.5);
      }
      .mv-ant-tl { left: -1px; top: 80px; width: 4px; height: 2px; }
      .mv-ant-tr { right: -1px; top: 80px; width: 4px; height: 2px; }
      .mv-ant-bl { left: -1px; bottom: 80px; width: 4px; height: 2px; }
      .mv-ant-br { right: -1px; bottom: 80px; width: 4px; height: 2px; }

      /* ── Tablets ── */
      .skin-tablet-ios, .skin-tablet-android, .skin-foldable {
        border-radius: 30px;
        padding: 20px;
        background:
          linear-gradient(170deg, #3e4050 0%, #22242e 15%, #17181f 50%, #22242e 85%, #3a3c4d 100%);
        box-shadow:
          0 0 0 1px rgba(100, 105, 130, 0.35),
          0 0 0 3px #222430,
          0 30px 60px rgba(0, 0, 0, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.1),
          inset 0 -1px 2px rgba(0, 0, 0, 0.2);
      }
      .skin-tablet-ios .mv-screen-box, .skin-tablet-android .mv-screen-box, .skin-foldable .mv-screen-box {
        border-radius: 14px;
        box-shadow: 0 0 0 2px #08090d;
      }

      /* ── MacBook Pro 16" ── */
      .skin-laptop-mac {
        border-radius: 16px 16px 0 0;
        padding: 16px 16px 0 16px;
        background:
          linear-gradient(170deg, #3a3c4d 0%, #1e2028 15%, #121318 50%, #1e2028 85%, #333548 100%);
        box-shadow:
          0 0 0 1px rgba(90, 95, 120, 0.3),
          0 0 0 2px #1e2028,
          0 30px 60px rgba(0, 0, 0, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.08);
      }
      .skin-laptop-mac .mv-screen-box {
        border-radius: 8px 8px 0 0;
        box-shadow: 0 0 0 2px #08090d;
      }
      .mv-mac-notch {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 130px;
        height: 20px;
        background: #000;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        z-index: 200;
        pointer-events: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      }
      .mv-mac-cam {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 7px;
        height: 7px;
        background: radial-gradient(circle, #1a1d30 30%, #0a0b12 80%);
        border-radius: 50%;
        border: 1px solid #262840;
        box-shadow: 0 0 3px rgba(40, 50, 100, 0.4);
      }
      .mv-laptop-base {
        width: calc(100% + 50px);
        height: 20px;
        margin-left: -25px;
        background: linear-gradient(to bottom, #2d2f3d, #181922, #141520);
        border-radius: 0 0 14px 14px;
        border: 1px solid rgba(60, 64, 80, 0.5);
        border-top: none;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
        position: relative;
      }
      .mv-laptop-base::after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 90px;
        height: 5px;
        background: #0c0d14;
        border-radius: 0 0 5px 5px;
        border: 1px solid rgba(40, 42, 56, 0.4);
        border-top: none;
      }

      /* ── Apple Watch Ultra 2 (Titanium Orange Case) ── */
      .skin-watch-apple-ultra {
        border-radius: 44px;
        padding: 20px;
        background:
          linear-gradient(145deg, #e8a060 0%, #c07838 25%, #a86428 50%, #c07838 75%, #d49050 100%);
        border: 4px solid #8c5225;
        box-shadow:
          0 0 0 2px rgba(200, 140, 60, 0.4),
          0 20px 50px rgba(0, 0, 0, 0.6),
          inset 0 2px 4px rgba(255, 220, 160, 0.3),
          inset 0 -2px 4px rgba(80, 40, 10, 0.4);
      }
      .skin-watch-apple-ultra .mv-screen-box {
        border-radius: 30px;
        box-shadow: 0 0 0 3px #1a1008, 0 0 0 5px rgba(120, 80, 30, 0.4);
      }
      .mv-watch-crown {
        position: absolute;
        right: -12px;
        top: 30%;
        width: 10px;
        height: 32px;
        background: linear-gradient(to right, #a0a3b5, #6b6e80, #505368);
        border-radius: 5px;
        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.5), inset -1px 0 1px rgba(255, 255, 255, 0.15);
      }
      /* Side button below crown */
      .mv-watch-crown::after {
        content: "";
        position: absolute;
        top: 45px;
        left: 1px;
        width: 8px;
        height: 16px;
        background: linear-gradient(to right, #9093a5, #60637a);
        border-radius: 4px;
        box-shadow: 1px 0 3px rgba(0, 0, 0, 0.4);
      }

      /* Apple Watch Series 10 (Standard) */
      .skin-watch-apple {
        border-radius: 38px;
        padding: 16px;
        background:
          linear-gradient(145deg, #38394a 0%, #1e2028 30%, #151620 60%, #22232e 100%);
        border: 3px solid #2a2c3a;
        box-shadow:
          0 0 0 1px rgba(70, 75, 95, 0.35),
          0 20px 50px rgba(0, 0, 0, 0.6),
          inset 0 1px 3px rgba(255, 255, 255, 0.1),
          inset 0 -1px 3px rgba(0, 0, 0, 0.3);
      }
      .skin-watch-apple .mv-screen-box {
        border-radius: 24px;
        box-shadow: 0 0 0 2px #0a0b0f;
      }

      /* ── Galaxy Watch / Round Wearables ── */
      .skin-watch-round {
        border-radius: 50%;
        padding: 18px;
        background:
          linear-gradient(145deg, #353748 0%, #1a1c26 35%, #12131a 60%, #252738 100%);
        border: 4px solid #2d2f3d;
        box-shadow:
          0 0 0 2px rgba(60, 64, 80, 0.3),
          0 20px 50px rgba(0, 0, 0, 0.6),
          inset 0 2px 4px rgba(255, 255, 255, 0.08),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3);
      }
      .skin-watch-round .mv-screen-box {
        border-radius: 50%;
        box-shadow: 0 0 0 2px #0a0b0f, 0 0 0 3px rgba(50, 54, 70, 0.4);
      }

      /* ── Desktop Monitor / Standard Window ── */
      .skin-monitor, .skin-laptop, .skin-window {
        border-radius: 14px;
        padding: 12px;
        background:
          linear-gradient(170deg, #333548 0%, #1a1c26 20%, #121318 50%, #1a1c26 80%, #2d2f3d 100%);
        border: 2px solid #2a2c3a;
        box-shadow:
          0 0 0 1px rgba(60, 64, 80, 0.3),
          0 20px 50px rgba(0, 0, 0, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.06);
      }
      .skin-monitor .mv-screen-box, .skin-laptop .mv-screen-box, .skin-window .mv-screen-box {
        border-radius: 6px;
        box-shadow: 0 0 0 2px #08090d;
      }

      /* Screen Box containing iframe */
      .mv-screen-box {
        position: relative;
        background: #fff;
        overflow: hidden;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
      }
      .mv-iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
        background: #fff;
      }

      /* Screen Gloss Overlay — Simulates real gorilla glass light catch */
      .mv-screen-glare {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 60;
        background:
          /* Primary diagonal glare sweep */
          linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 15%,
            rgba(255, 255, 255, 0.01) 30%,
            transparent 45%,
            transparent 100%
          );
        /* Subtle edge highlight */
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      /* ── Realistic Mobile OS Status Bar Overlays ── */
      .mv-status-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 38px;
        z-index: 100;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 22px;
        color: #000;
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
      }
      .mv-status-time { font-weight: 800; font-size: 13px; }
      .mv-status-icons { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; }
      .mv-battery-icon {
        width: 22px;
        height: 11px;
        border: 1.5px solid currentColor;
        border-radius: 3.5px;
        padding: 1.5px;
        display: flex;
        align-items: center;
        position: relative;
      }
      .mv-battery-icon::after {
        content: "";
        position: absolute;
        right: -3.5px;
        top: 2.5px;
        width: 2px;
        height: 4px;
        background: currentColor;
        border-radius: 0 1px 1px 0;
      }
      .mv-battery-fill { width: 100%; height: 100%; background: #22c55e; border-radius: 1px; }

      /* Dynamic Island */
      .mv-dynamic-island {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
        height: 28px;
        background: #000;
        border-radius: 20px;
        z-index: 150;
        pointer-events: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6), inset 0 0 2px rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
      }
      .mv-island-cam {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, #1d2238 25%, #080911 80%);
        border: 1px solid #141724;
      }
      .mv-island-sensor {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #0d0f17;
      }

      /* Android Punch Hole Camera */
      .mv-camera-hole {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 13px;
        height: 13px;
        background: radial-gradient(circle, #1d2238 30%, #060608 85%);
        border: 1.5px solid #1c1e28;
        border-radius: 50%;
        z-index: 150;
        pointer-events: none;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
      }

      /* Bottom Home Indicator Bar */
      .mv-home-indicator {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 130px;
        height: 4px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        z-index: 100;
        pointer-events: none;
        box-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
      }

      /* Modals */
      .mv-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      .mv-modal.active { opacity: 1; pointer-events: auto; }
      .mv-modal-dialog {
        position: relative;
        z-index: 2;
        background: #14151f;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        width: 100%;
        max-width: 460px;
        padding: 1.6rem;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
      }
      .mv-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: #fff; }
      .mv-modal-close { background: none; border: none; color: #7b7f99; font-size: 1.3rem; cursor: pointer; }
      .mv-modal-close:hover { color: #fff; }
      .mv-modal-desc { font-size: 0.86rem; color: #94a3b8; margin-bottom: 1rem; line-height: 1.45; }
      .mv-qr-box { padding: 1.2rem; background: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.85rem; }
      .mv-qr-url-text { font-size: 0.76rem; font-family: monospace; color: #38bdf8; text-align: center; word-break: break-all; margin-bottom: 0.85rem; }
      .mv-modal-sub { font-size: 0.76rem; color: #7b7f99; text-align: center; }
      .mv-modal-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(6px); }
      .mv-form-row { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.95rem; }
      .mv-form-row label { font-size: 0.8rem; font-weight: 600; color: #94a3b8; }
      .mv-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
      .mv-modal-actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 1.35rem; }
    `;
    document.head.appendChild(styleEl);
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
  let devicePositions = {}; // deviceId -> { x, y }
  let isFreeformMode = false;
  let zCounter = 1;
  let topZ = 100;

  /* ── Open Standalone Window Popup ── */
  function openDevicePopup(device, urlToOpen, orientationOverride, offsetX = 0, offsetY = 0) {
    const isLandscape = orientationOverride
      ? orientationOverride === "landscape"
      : (orientations[device.id] === "landscape");

    const w = isLandscape ? device.height : device.width;
    const h = isLandscape ? device.width : device.height;

    // Calculate position on screen
    const baseLeft = Math.max(0, Math.round((screen.width - w) / 2));
    const baseTop = Math.max(0, Math.round((screen.height - h) / 2));
    const left = Math.min(screen.width - w, baseLeft + offsetX);
    const top = Math.min(screen.height - h, baseTop + offsetY);

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

  /* ── Open All Selected Devices in Popups with Tiling ── */
  function openAllPopups(devices, urlToOpen) {
    if (!devices || devices.length === 0) {
      alert("Please select at least one device first.");
      return;
    }

    let delay = 0;
    let offsetStep = 0;
    devices.forEach((device) => {
      setTimeout(() => {
        const ox = (offsetStep % 4) * 60 - 90;
        const oy = (offsetStep % 4) * 40 - 60;
        openDevicePopup(device, urlToOpen, null, ox, oy);
        offsetStep++;
      }, delay);
      delay += 200;
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
    desc: "Preview websites across realistic iPhone 17 Pro Max, Samsung S25 Ultra, Poco F8 Pro, MacBooks, & Smartwatches",
    category: "Developer Tools",
    catIcon: "💻",

    render(body) {
      // Inject self-contained styles immediately
      injectMultiViewStyles();

      // Add wide-layout class to tool container and app shell
      const appMain = document.getElementById("app");
      if (appMain) appMain.classList.add("app-wide-container");
      
      const parentView = body.closest(".tool-view") || body;
      parentView.classList.add("tool-view-multiview");

      body.innerHTML = `
        <div class="mv-container">
          <!-- ── Top Control Bar & URL Input ── -->
          <div class="mv-topbar">
            <div class="mv-hero-row">
              <div class="mv-hero-badge">⚡ Multi View · Real Phone & Multi-Device Studio</div>
              <div class="mv-hero-stats">
                <span class="mv-stat-pill">📱 ${DEVICE_DATABASE.length} Flagship Profiles</span>
                <span class="mv-stat-pill">✨ Realistic Hardware Bezels</span>
                <span class="mv-stat-pill">🪟 Standalone Popup Simulator</span>
              </div>
            </div>
            
            <div class="mv-url-box">
              <span class="mv-url-icon">🌐</span>
              <input type="text" id="mvUrlInput" class="mv-url-input" placeholder="Paste a URL and press Enter to preview on all ticked devices..." value="${esc(currentURL)}" />
              <span class="mv-url-hint"><kbd>Enter ↵</kbd> to load</span>
              <button class="mv-btn-icon" id="mvBtnQR" title="Show QR Code for Mobile Testing">📱 QR Share</button>
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

          <!-- ── Quick Multi-Screen Combos Panel ── -->
          <div class="mv-combos-panel">
            <span class="mv-combos-title">🚀 1-Click Multi-Screen Workspace Presets:</span>
            <div class="mv-combos-list">
              ${MULTI_SCREEN_COMBOS.map(c => `
                <button class="mv-combo-btn" data-combo-id="${esc(c.id)}" title="${esc(c.desc)}">
                  ${esc(c.label)}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- ── Toolbar (Global Actions, Popups, Zoom, Filter) ── -->
          <div class="mv-toolbar">
            <!-- Left: Device Category Filter Tabs -->
            <div class="mv-cat-tabs">
              <button class="mv-tab ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">🌟 All (${DEVICE_DATABASE.length})</button>
              <button class="mv-tab ${activeCategory === 'mobile' ? 'active' : ''}" data-cat="mobile">📱 Phones (${DEVICE_DATABASE.filter(d=>d.category==='mobile').length})</button>
              <button class="mv-tab ${activeCategory === 'tablet' ? 'active' : ''}" data-cat="tablet">📟 Tablets (${DEVICE_DATABASE.filter(d=>d.category==='tablet').length})</button>
              <button class="mv-tab ${activeCategory === 'desktop' ? 'active' : ''}" data-cat="desktop">💻 Desktops (${DEVICE_DATABASE.filter(d=>d.category==='desktop').length})</button>
              <button class="mv-tab ${activeCategory === 'smartwatch' ? 'active' : ''}" data-cat="smartwatch">⌚ Watches (${DEVICE_DATABASE.filter(d=>d.category==='smartwatch').length})</button>
            </div>

            <!-- Right: Action Controls -->
            <div class="mv-actions-group">
              <!-- Launch All Popups -->
              <button class="mv-action-btn mv-btn-popup-all" id="mvBtnPopupAll" title="Open separate popup windows for all selected devices simultaneously">
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

              <!-- Reset Layout (snap back to grid) -->
              <button class="mv-action-btn" id="mvBtnResetLayout" title="Reset all phones back to grid layout">
                📌 Reset Grid
              </button>
            </div>
          </div>

          <!-- ── Device Selection Drawer / Fast Picker ── -->
          <div class="mv-picker-panel">
            <div class="mv-picker-header">
              <span class="mv-picker-title">⚡ Select Devices (Checked devices display live on the canvas below):</span>
              <div class="mv-picker-quick">
                <button class="mv-link-btn" id="mvSelectAll">Select All</button>
                <span>•</span>
                <button class="mv-link-btn" id="mvSelectNone">Deselect All</button>
                <span>•</span>
                <button class="mv-link-btn" id="mvSelectFlagships">Flagships Only</button>
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
                <strong>Pro-Tip:</strong> To test projects with restricted iframe headers, click <strong>🪟 Popup</strong> on any device card to launch a standalone pixel-perfect viewport that runs 100% unrestricted!
              </span>
            </div>
          </div>

          <!-- ── Live In-App Multi-View Canvas ── -->
          <div class="mv-canvas-wrapper" id="mvCanvasWrapper">
            <div class="mv-canvas-grid ${isFreeformMode ? 'freeform-mode' : 'grid-mode'}" id="mvCanvasGrid" style="--zoom: ${globalZoom};">
              <!-- Populated by renderCanvasFrames() -->
            </div>
            <!-- Invisible overlay to prevent iframes stealing mouse during drag -->
            <div class="mv-drag-shield" id="mvDragShield"></div>
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
      const btnResetLayout = body.querySelector("#mvBtnResetLayout");
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
                  <span>Show Screen</span>
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

      /* ── Render Canvas Frames with Hyper-Realistic Hardware ── */
      function renderCanvasFrames() {
        const all = getAllDevices();
        const selected = all.filter(d => activeDeviceIds.has(d.id));

        // Set the correct layout mode class
        canvasGrid.classList.toggle("grid-mode", !isFreeformMode);
        canvasGrid.classList.toggle("freeform-mode", isFreeformMode);

        if (selected.length === 0) {
          canvasGrid.innerHTML = `
            <div class="mv-empty-state">
              <span class="mv-empty-icon">📱</span>
              <h3>No Screens Selected</h3>
              <p>Choose a multi-screen combo above or check one or more devices to preview multiple screens simultaneously.</p>
              <button class="btn-action" id="mvBtnSelectDefaults">🔥 Load Flagship Trio (3 Screens)</button>
            </div>
          `;
          const defBtn = canvasGrid.querySelector("#mvBtnSelectDefaults");
          if (defBtn) {
            defBtn.addEventListener("click", () => {
              activeDeviceIds.clear();
              ["iphone-17-pm", "samsung-s25-ultra", "poco-f8-pro"].forEach(id => activeDeviceIds.add(id));
              updateSelectedCount();
              renderDeviceCards();
              renderCanvasFrames();
            });
          }
          return;
        }

        const validUrl = formatURL(currentURL);
        zCounter = 1;

        canvasGrid.innerHTML = selected.map(dev => {
          const isLandscape = orientations[dev.id] === "landscape";
          const width = isLandscape ? dev.height : dev.width;
          const height = isLandscape ? dev.width : dev.height;
          const isMobile = dev.category === "mobile";
          const isIOS = dev.frameType.startsWith("ios");
          const frameClass = deviceSkinEnabled ? `skin-${dev.frameType}` : 'skin-none';

          return `
            <div class="mv-frame-card" data-device-id="${esc(dev.id)}" style="z-index: ${zCounter++};">
              <!-- Frame Header / Drag Handle + Control bar -->
              <div class="mv-frame-header mv-drag-handle" data-drag-id="${esc(dev.id)}">
                <div class="mv-frame-title">
                  <span class="mv-drag-indicator" title="Drag to reposition">⠿</span>
                  <span>${dev.icon}</span>
                  <strong>${esc(dev.name)}</strong>
                  <span class="mv-frame-dim">${width} × ${height}</span>
                  ${isLandscape ? '<span class="mv-pill-landscape">Landscape</span>' : ''}
                </div>

                <div class="mv-frame-ctrls">
                  <button class="mv-frame-ctrl-btn mv-ctrl-popup" data-id="${esc(dev.id)}" title="Open as Standalone Popup Window">🪟 Popup</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-rotate" data-id="${esc(dev.id)}" title="Rotate Orientation">🔄 Rotate</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-reload" data-id="${esc(dev.id)}" title="Reload Frame">🔃</button>
                  <button class="mv-frame-ctrl-btn mv-ctrl-remove" data-id="${esc(dev.id)}" title="Remove screen">✕</button>
                </div>
              </div>

              <!-- Phone Chassis Wrapper with Physical Hardware Buttons -->
              <div class="mv-phone-wrapper">
                <div class="mv-phone-chassis ${frameClass} ${isLandscape ? 'is-landscape' : 'is-portrait'}">
                  
                  <!-- Physical Hardware Buttons (Side volume, action, power) -->
                  ${isMobile && deviceSkinEnabled && !isLandscape ? `
                    <div class="mv-hw-btn mv-btn-action"></div>
                    <div class="mv-hw-btn mv-btn-vol-up"></div>
                    <div class="mv-hw-btn mv-btn-vol-down"></div>
                    <div class="mv-hw-btn mv-btn-power"></div>
                    <div class="mv-antenna mv-ant-tl"></div>
                    <div class="mv-antenna mv-ant-tr"></div>
                    <div class="mv-antenna mv-ant-bl"></div>
                    <div class="mv-antenna mv-ant-br"></div>
                  ` : ''}

                  ${dev.frameType === 'watch-apple-ultra' && deviceSkinEnabled ? `
                    <div class="mv-watch-crown"></div>
                  ` : ''}

                  <!-- Screen Container -->
                  <div class="mv-screen-box" style="width: ${width}px; height: ${height}px;">
                    
                    <!-- Realistic Mobile OS Status Bar Overlay -->
                    ${isMobile && deviceSkinEnabled && !isLandscape ? `
                      <div class="mv-status-bar">
                        <span class="mv-status-time">${isIOS ? '9:41' : '12:00'}</span>
                        
                        ${dev.frameType === 'ios-island' ? `
                          <div class="mv-dynamic-island">
                            <span class="mv-island-cam"></span>
                            <span class="mv-island-sensor"></span>
                          </div>
                        ` : ''}

                        ${dev.frameType === 'android-hole' ? `
                          <div class="mv-camera-hole"></div>
                        ` : ''}

                        <div class="mv-status-icons">
                          <span>5G</span>
                          <span>📶</span>
                          <div class="mv-battery-icon"><div class="mv-battery-fill"></div></div>
                        </div>
                      </div>
                    ` : ''}

                    <!-- Mac Notch -->
                    ${dev.frameType === 'laptop-mac' && deviceSkinEnabled ? `
                      <div class="mv-mac-notch">
                        <div class="mv-mac-cam"></div>
                      </div>
                    ` : ''}

                    <!-- Iframe Viewport -->
                    <iframe
                      src="${esc(validUrl)}"
                      class="mv-iframe"
                      title="${esc(dev.name)} preview"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                      loading="lazy"
                    ></iframe>

                    <!-- Glare & Reflection overlay -->
                    ${deviceSkinEnabled ? '<div class="mv-screen-glare"></div>' : ''}

                    <!-- Bottom Gesture / Home Bar -->
                    ${isMobile && deviceSkinEnabled && !isLandscape ? `
                      <div class="mv-home-indicator"></div>
                    ` : ''}
                  </div>

                  <!-- Laptop Keyboard Deck Base -->
                  ${dev.frameType === 'laptop-mac' && deviceSkinEnabled ? `
                    <div class="mv-laptop-base"></div>
                  ` : ''}
                </div>
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
            delete devicePositions[btn.dataset.id];
            updateSelectedCount();
            renderDeviceCards();
            renderCanvasFrames();
          });
        });

        // ── Attach Drag Handlers to each frame header ──
        attachDragHandlers();

        // ── Restore saved positions if in freeform mode ──
        if (isFreeformMode) {
          canvasGrid.querySelectorAll(".mv-frame-card").forEach(card => {
            const id = card.dataset.deviceId;
            if (devicePositions[id]) {
              card.style.left = devicePositions[id].x + "px";
              card.style.top = devicePositions[id].y + "px";
            }
          });
        }
      }

      /* ── Drag & Drop Free-Form Positioning ── */
      const dragShield = body.querySelector("#mvDragShield");
      let dragState = null; // { el, deviceId, startX, startY, origLeft, origTop }

      function attachDragHandlers() {
        canvasGrid.querySelectorAll(".mv-drag-handle").forEach(handle => {
          handle.addEventListener("mousedown", onDragStart);
          handle.addEventListener("touchstart", onTouchStart, { passive: false });
        });
      }

      function switchToFreeform() {
        if (isFreeformMode) return;
        isFreeformMode = true;
        canvasGrid.classList.remove("grid-mode");
        canvasGrid.classList.add("freeform-mode");

        // Snapshot current rendered positions before switching
        const cards = canvasGrid.querySelectorAll(".mv-frame-card");
        cards.forEach(card => {
          const id = card.dataset.deviceId;
          if (!devicePositions[id]) {
            const rect = card.getBoundingClientRect();
            const parentRect = canvasGrid.getBoundingClientRect();
            devicePositions[id] = {
              x: rect.left - parentRect.left,
              y: rect.top - parentRect.top
            };
          }
          card.style.left = devicePositions[id].x + "px";
          card.style.top = devicePositions[id].y + "px";
        });
      }

      function onDragStart(e) {
        // Don't drag if clicking a button
        if (e.target.closest("button")) return;
        e.preventDefault();

        const handle = e.currentTarget;
        const card = handle.closest(".mv-frame-card");
        const deviceId = handle.dataset.dragId;

        // Switch to freeform mode on first drag
        switchToFreeform();

        // Bring to front
        topZ++;
        card.style.zIndex = topZ;

        const parentRect = canvasGrid.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        dragState = {
          el: card,
          deviceId,
          startX: e.clientX,
          startY: e.clientY,
          origLeft: cardRect.left - parentRect.left,
          origTop: cardRect.top - parentRect.top
        };

        card.classList.add("is-dragging");
        dragShield.classList.add("active");

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
      }

      function onDragMove(e) {
        if (!dragState) return;
        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;
        const newX = dragState.origLeft + dx;
        const newY = dragState.origTop + dy;

        dragState.el.style.left = newX + "px";
        dragState.el.style.top = newY + "px";
      }

      function onDragEnd(e) {
        if (!dragState) return;
        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;
        const finalX = dragState.origLeft + dx;
        const finalY = dragState.origTop + dy;

        // Save position
        devicePositions[dragState.deviceId] = { x: finalX, y: finalY };

        dragState.el.classList.remove("is-dragging");
        dragShield.classList.remove("active");

        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        dragState = null;
      }

      // Touch support
      function onTouchStart(e) {
        if (e.target.closest("button")) return;
        e.preventDefault();
        const touch = e.touches[0];
        const handle = e.currentTarget;
        const card = handle.closest(".mv-frame-card");
        const deviceId = handle.dataset.dragId;

        switchToFreeform();
        topZ++;
        card.style.zIndex = topZ;

        const parentRect = canvasGrid.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        dragState = {
          el: card,
          deviceId,
          startX: touch.clientX,
          startY: touch.clientY,
          origLeft: cardRect.left - parentRect.left,
          origTop: cardRect.top - parentRect.top
        };

        card.classList.add("is-dragging");
        dragShield.classList.add("active");

        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
      }

      function onTouchMove(e) {
        if (!dragState) return;
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - dragState.startX;
        const dy = touch.clientY - dragState.startY;
        dragState.el.style.left = (dragState.origLeft + dx) + "px";
        dragState.el.style.top = (dragState.origTop + dy) + "px";
      }

      function onTouchEnd(e) {
        if (!dragState) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - dragState.startX;
        const dy = touch.clientY - dragState.startY;
        devicePositions[dragState.deviceId] = {
          x: dragState.origLeft + dx,
          y: dragState.origTop + dy
        };
        dragState.el.classList.remove("is-dragging");
        dragShield.classList.remove("active");
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        dragState = null;
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

      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          applyURL();
        }
      });

      // Quick Preset chips
      body.querySelectorAll(".mv-preset-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          currentURL = chip.dataset.url;
          urlInput.value = currentURL;
          applyURL();
        });
      });

      // Multi-Screen Combos
      body.querySelectorAll(".mv-combo-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const comboId = btn.dataset.comboId;
          const combo = MULTI_SCREEN_COMBOS.find(c => c.id === comboId);
          if (combo) {
            activeDeviceIds.clear();
            combo.deviceIds.forEach(id => activeDeviceIds.add(id));
            updateSelectedCount();
            renderDeviceCards();
            renderCanvasFrames();
          }
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
        ["iphone-17-pm", "samsung-s25-ultra", "poco-f8-pro"].forEach(id => {
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

      // Reset Layout (snap back to grid)
      btnResetLayout.addEventListener("click", () => {
        devicePositions = {};
        isFreeformMode = false;
        renderCanvasFrames();
      });

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

      // Initial Render — show device cards but canvas shows empty state until user presses Enter
      renderDeviceCards();
      renderCanvasFrames();
      updateSelectedCount();

      // Auto-focus the URL input for quick paste & Enter workflow
      setTimeout(() => urlInput.focus(), 100);
    }
  });
})();
