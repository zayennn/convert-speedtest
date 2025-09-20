const testStatus = {
  NOT_STARTED: "not_started",
  TESTING_PING: "testing_ping",
  TESTING_DOWNLOAD: "testing_download",
  TESTING_UPLOAD: "testing_upload",
  TESTING_PROVIDER: "testing_provider",
  COMPLETED: "completed",
};
let currentStatus = testStatus.NOT_STARTED;

function mbpsToMBs(mbps) {
  return (mbps / 8).toFixed(2);
}
function updateNeedle(value, maxValue, unit) {
  const needle = document.getElementById("needle");
  const degrees = (value / maxValue) * 180 - 90;
  needle.style.transform = `translateX(-50%) rotate(${degrees}deg)`;
  document.getElementById("speed-value").textContent = value.toFixed(2);
  document.getElementById("speed-unit").textContent = unit;
}
function updateProgress(percentage) {
  document.getElementById("test-progress").style.width = `${percentage}%`;
}
function setTestStatus(status) {
  currentStatus = status;
  switch (status) {
    case testStatus.NOT_STARTED:
      document.getElementById("current-test").textContent =
        "Siap untuk memulai tes";
      updateNeedle(0, 100, "Mbps");
      updateProgress(0);
      break;
    case testStatus.TESTING_PING:
      document.getElementById("current-test").textContent =
        "Sedang mengukur Ping...";
      updateProgress(20);
      break;
    case testStatus.TESTING_DOWNLOAD:
      document.getElementById("current-test").textContent =
        "Sedang mengukur Download...";
      updateProgress(50);
      break;
    case testStatus.TESTING_UPLOAD:
      document.getElementById("current-test").textContent =
        "Sedang mengukur Upload...";
      updateProgress(75);
      break;
    case testStatus.TESTING_PROVIDER:
      document.getElementById("current-test").textContent =
        "Mengambil informasi ISP...";
      updateProgress(90);
      break;
    case testStatus.COMPLETED:
      document.getElementById("current-test").textContent = "Tes Selesai!";
      updateProgress(100);
      document.getElementById("start-btn").classList.add("hidden");
      document.getElementById("retest-btn").classList.remove("hidden");
      break;
  }
}

function animateValue(
  elementId,
  targetValue,
  duration = 2000,
  suffix = "",
  isPing = false
) {
  const element = document.getElementById(elementId);
  const startValue = 0;
  const increment = targetValue / (duration / 16);
  let currentValue = startValue;
  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      clearInterval(timer);
      currentValue = targetValue;
    }
    element.textContent = isPing
      ? Math.round(currentValue)
      : currentValue.toFixed(2);
    if (suffix) element.textContent += suffix;
  }, 16);
}

async function runSpeedtest() {
  document.getElementById("start-btn").disabled = true;
  document.getElementById("start-btn").classList.remove("pulse");
  try {
    setTestStatus(testStatus.TESTING_PING);
    const pingRes = await fetch("/speedtest/ping");
    const pingData = await pingRes.json();
    updateNeedle(pingData.ping_ms, 100, "ms");
    animateValue("ping-ms", pingData.ping_ms, 1000, "", true);

    setTestStatus(testStatus.TESTING_DOWNLOAD);
    const dlRes = await fetch("/speedtest/download");
    const dlData = await dlRes.json();
    updateNeedle(dlData.download_mbps, 100, "Mbps");
    animateValue("download-mbps", dlData.download_mbps);
    document.getElementById("download-mbs").textContent =
      "≈ " + mbpsToMBs(dlData.download_mbps);

    setTestStatus(testStatus.TESTING_UPLOAD);
    const ulRes = await fetch("/speedtest/upload");
    const ulData = await ulRes.json();
    updateNeedle(ulData.upload_mbps, 50, "Mbps");
    animateValue("upload-mbps", ulData.upload_mbps);
    document.getElementById("upload-mbs").textContent =
      "≈ " + mbpsToMBs(ulData.upload_mbps);

    setTestStatus(testStatus.TESTING_PROVIDER);
    const provRes = await fetch("/speedtest/provider");
    const provData = await provRes.json();

    document.getElementById("conversion-value").innerHTML = `
      <div class="fade-in">
        <p><strong>Download:</strong> ${dlData.download_mbps.toFixed(
      2
    )} Mbps ≈ ${mbpsToMBs(dlData.download_mbps)} MB/s</p>
        <p><strong>Upload:</strong> ${ulData.upload_mbps.toFixed(
      2
    )} Mbps ≈ ${mbpsToMBs(ulData.upload_mbps)} MB/s</p>
        <p><strong>Ping:</strong> ${Math.round(pingData.ping_ms)} ms</p>
        <p><strong>ISP:</strong> ${provData.isp}</p>
        <p><strong>Server:</strong> ${provData.server.name}, ${provData.server.country
      } (${provData.server.sponsor})</p>
      </div>`;
    document.getElementById("conversion-value").classList.remove("hidden");

    setTestStatus(testStatus.COMPLETED);
  } catch (e) {
    alert("Tes gagal. Coba lagi.");
    setTestStatus(testStatus.NOT_STARTED);
    document.getElementById("start-btn").disabled = false;
    document.getElementById("start-btn").classList.add("pulse");
  }
}

document.getElementById("start-btn").addEventListener("click", runSpeedtest);

document.getElementById("retest-btn").addEventListener("click", () => {
  document.getElementById("download-mbps").textContent = "-";
  document.getElementById("upload-mbps").textContent = "-";
  document.getElementById("ping-ms").textContent = "-";
  document.getElementById("download-mbs").textContent = "-";
  document.getElementById("upload-mbs").textContent = "-";
  document.getElementById("conversion-value").classList.add("hidden");
  document.getElementById("retest-btn").classList.add("hidden");
  document.getElementById("start-btn").classList.remove("hidden");
  document.getElementById("start-btn").disabled = false;
  document.getElementById("start-btn").classList.add("pulse");
  setTestStatus(testStatus.NOT_STARTED);
});