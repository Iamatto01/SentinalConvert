/* ═══════════════════════════════════════════════════════
   Media Download Tools — Download Videos and Audio
   ═══════════════════════════════════════════════════════ */

/* Video/Audio URL Downloader Tool */
registerTool({
  id: "media-download", name: "Download Video/Audio", icon: "⬇️", desc: "Download video/audio from direct URLs (MP4, WebM, MP3, etc.)",
  category: "Media Tools", catIcon: "🎞️",
  render(body) {
    let urlInput = null;

    // URL Input Section
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    inputContainer.innerHTML = `
      <div class="input-group">
        <label for="mediaUrl" class="input-label">Paste direct video/audio URL here:</label>
        <textarea id="mediaUrl" class="input-field" placeholder="e.g., https://example.com/video.mp4" rows="3"></textarea>
        <small class="input-hint">
          <strong>Direct links only</strong> (MP4, WebM, MP3, WAV, etc.)
          For YouTube, TikTok, Instagram, etc., use the <em>Social Downloader</em> tool instead.
        </small>
      </div>
    `;
    body.appendChild(inputContainer);
    urlInput = body.querySelector("#mediaUrl");

    // Format Selection
    const opts = document.createElement("div"); opts.className = "opts-panel";
    opts.innerHTML = `
      <div class="opt-group">
        <span class="opt-label">Save as:</span>
        <select class="opt-select" id="downloadFormat">
          <option value="auto" selected>Auto-detect (original format)</option>
          <option value="mp4">MP4 Video</option>
          <option value="webm">WebM Video</option>
          <option value="mp3">MP3 Audio</option>
          <option value="wav">WAV Audio</option>
        </select>
      </div>
      <div class="opt-group">
        <input type="checkbox" id="extractAudio" class="opt-checkbox" />
        <span class="opt-label">Extract audio only (MP3)</span>
      </div>
    `;
    body.appendChild(opts);

    document.getElementById("extractAudio").addEventListener("change", (e) => {
      if (e.target.checked) {
        document.getElementById("downloadFormat").value = "mp3";
      }
    });

    // Download Button
    const row = document.createElement("div"); row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnDownload">⬇️ Download Media</button>`;
    body.appendChild(row);

    row.querySelector("#btnDownload").addEventListener("click", async () => {
      const url = urlInput.value.trim();
      if (!url) return showStatus(body, "Enter a URL first", "error");

      clearResults(body);
      showStatus(body, "Downloading…", "loading");

      try {
        const format = document.getElementById("downloadFormat").value;
        const extractAudio = document.getElementById("extractAudio").checked;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Download failed (HTTP ${response.status}). This tool only works with direct publicly accessible URLs.`);
        }

        const blob = await response.blob();
        handleDownloadedMedia(body, blob, url, format, extractAudio);

      } catch (e) {
        showStatus(body, "Error: " + e.message + "\n💡 For social media (YouTube, TikTok, etc.) use the Social Downloader tool.", "error");
      }
    });
  }
});

/* Helper: Process Downloaded Media */
async function handleDownloadedMedia(body, blob, url, format, extractAudio) {
  try {
    showStatus(body, "Processing media…", "loading");

    // Determine filename
    let filename = url.split('/').pop().split('?')[0] || 'download';
    if (!filename.includes('.')) {
      const contentType = blob.type;
      const ext = contentType.includes('video') ? 'mp4' : contentType.includes('audio') ? 'mp3' : 'bin';
      filename = `downloaded_media.${ext}`;
    }

    // If format conversion or audio extraction needed
    if (format !== 'auto' || extractAudio) {
      showStatus(body, "Loading converter (first time ~30MB)…", "loading");

      const ffmpeg = await ensureFFmpeg((pct) => showStatus(body, `Converting… ${pct}%`, "loading"));

      showStatus(body, "Processing file…", "loading");

      const inputExt = getExt(filename) || 'mp4';
      const inputName = `input.${inputExt}`;
      await ffmpeg.writeFile(inputName, new Uint8Array(await blob.arrayBuffer()));

      let outputName = filename;
      let targetFormat = format;

      if (extractAudio || format === 'mp3') {
        outputName = filename.substring(0, filename.lastIndexOf('.')) + '.mp3';
        targetFormat = 'mp3';
      } else if (format !== 'auto') {
        outputName = filename.substring(0, filename.lastIndexOf('.')) + `.${format}`;
      }

      const args = ["-i", inputName];
      if (targetFormat === 'mp3') {
        args.push("-q:a", "0", "-map", "a");
      } else if (targetFormat === 'mp4') {
        args.push("-preset", "ultrafast", "-crf", "28");
      }
      args.push(outputName);

      showStatus(body, "Converting…", "loading");
      await ffmpeg.exec(args);

      const data = await ffmpeg.readFile(outputName);
      const convertedBlob = new Blob([data.buffer], {
        type: targetFormat === 'mp3' ? 'audio/mpeg' : `video/${targetFormat}`
      });

      clearResults(body);
      addResult(body, convertedBlob, outputName);

      try { await ffmpeg.deleteFile(inputName); } catch {}
      try { await ffmpeg.deleteFile(outputName); } catch {}

    } else {
      clearResults(body);
      addResult(body, blob, filename);
    }

    clearStatus(body);
    showStatus(body, "Downloaded successfully!", "ok");

  } catch (e) {
    showStatus(body, "Conversion error: " + e.message, "error");
  }
}

/* YouTube/Social Media Video Downloader (uses cobalt.tools API) */
registerTool({
  id: "social-video-downloader", name: "Social Media Downloader", icon: "📹", desc: "Download from YouTube, TikTok, Instagram, etc. (via cobalt.tools)",
  category: "Media Tools", catIcon: "🎞️",
  render(body) {
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    inputContainer.innerHTML = `
      <div class="input-group">
        <label for="socialUrl" class="input-label">Paste social media URL:</label>
        <textarea id="socialUrl" class="input-field" placeholder="e.g., https://www.youtube.com/watch?v=... or TikTok URL" rows="2"></textarea>
        <small class="input-hint">
          YouTube • TikTok • Instagram • Facebook • Twitter/X • Reddit • Vimeo and more
        </small>
      </div>
    `;
    body.appendChild(inputContainer);

    // Quality selection
    const opts = document.createElement("div"); opts.className = "opts-panel";
    opts.innerHTML = `
      <div class="opt-group">
        <span class="opt-label">Format:</span>
        <select class="opt-select" id="videoQuality">
          <option value="best">Best available (video)</option>
          <option value="audio">Audio only (MP3)</option>
        </select>
      </div>
    `;
    body.appendChild(opts);

    // Download button
    const row = document.createElement("div"); row.className = "action-row";
    row.innerHTML = `<button class="btn-action" id="btnDownloadSocial">📹 Download</button>`;
    body.appendChild(row);

    row.querySelector("#btnDownloadSocial").addEventListener("click", async () => {
      const url = body.querySelector("#socialUrl").value.trim();
      if (!url) return showStatus(body, "Enter a URL first", "error");

      clearResults(body);
      showStatus(body, "Fetching video info…", "loading");

      try {
        const quality = document.getElementById("videoQuality").value;
        const isAudioOnly = quality === "audio";

        const apiUrl = `https://api.cobalt.tools/api/json`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            url: url,
            isAudioOnly: isAudioOnly,
            isNoTTWatermark: true,
            isAudioMuted: false,
            filenameStyle: "basic"
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`API error (${response.status}): ${errText || "Could not reach cobalt.tools"}`);
        }

        const data = await response.json();

        if (data.status !== "tunnel" && data.status !== "redirect") {
          throw new Error(data.error || "Could not extract video. The URL may be unsupported.");
        }

        const downloadUrl = data.url || data.redirect;
        if (!downloadUrl) throw new Error("No download URL returned from cobalt.tools");

        showStatus(body, "Downloading…", "loading");

        const videoResponse = await fetch(downloadUrl);
        if (!videoResponse.ok) throw new Error(`Download failed (HTTP ${videoResponse.status})`);

        const videoBlob = await videoResponse.blob();

        const filename = data.filename || `video_${Date.now()}.${isAudioOnly ? "mp3" : "mp4"}`;

        clearResults(body);
        addResult(body, videoBlob, filename);
        clearStatus(body);
        showStatus(body, "Downloaded successfully!", "ok");

      } catch (e) {
        showStatus(body, `Error: ${e.message}\n\n💡 If this fails, try the Social Downloader tool (redirects to external sites).`, "error");
      }
    });
  }
});
