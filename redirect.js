const CONFIG = {
  appsScriptUrl:
    "https://script.google.com/macros/s/AKfycbxCiWBjr1yM_QLLJGrko-FsRmmofAOPi5LONxJmiNG5gCSFCSr1PJ2m2SNgq0CCBlw/exec",
  defaultMessage:
    "Ol%C3%A1%21+Vim+do+link+de+atendimento+e+quero+mais+informa%C3%A7%C3%B5es.",
  fallbackSeller: "ana",
  sellers: {
    rafa: {
      name: "Rafa",
      phone: "5586995327646",
    },
    nicaele: {
      name: "Nicaele",
      phone: "5586994228978",
    },
    antonia: {
      name: "Antonia",
      phone: "5586998180799",
    },
  },
};

const statusEl = document.getElementById("status");
const manualLinkEl = document.getElementById("manual-link");

function getParams() {
  return new URLSearchParams(window.location.search);
}

function getSeller(params) {
  const sellerKey = (
    params.get("seller") || CONFIG.fallbackSeller
  ).toLowerCase();
  return {
    key: sellerKey,
    ...CONFIG.sellers[sellerKey],
  };
}

function buildWhatsappUrl(seller, params) {
  const message = params.get("text") || CONFIG.defaultMessage;
  return `https://wa.me/${seller.phone}?text=${message}`;
}

function createClickId() {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${Date.now()}-${randomPart}`;
}

function collectPayload(params, seller, whatsappUrl) {
  const currentUrl = new URL(window.location.href);

  return {
    event_name: "whatsapp_redirect_click",
    click_id: createClickId(),
    event_timestamp: new Date().toISOString(),
    seller_key: seller.key,
    seller_name: seller.name || "",
    seller_phone: seller.phone || "",
    redirect_url: whatsappUrl,
    page_url: currentUrl.href,
    page_path: currentUrl.pathname,
    referrer: document.referrer || "",
    user_agent: navigator.userAgent || "",
    language: navigator.language || "",
    platform: navigator.platform || "",
    screen_width: window.screen.width || "",
    screen_height: window.screen.height || "",
    viewport_width: window.innerWidth || "",
    viewport_height: window.innerHeight || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_id: params.get("utm_id") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    fbclid: params.get("fbclid") || "",
    gclid: params.get("gclid") || "",
    ttclid: params.get("ttclid") || "",
    src: params.get("src") || "",
    campaign: params.get("campaign") || "",
  };
}

function updateStatus(message) {
  statusEl.textContent = message;
}

function sendToAppsScript(payload) {
  if (!CONFIG.appsScriptUrl || CONFIG.appsScriptUrl.includes("COLE_AQUI")) {
    return Promise.resolve({ skipped: true });
  }

  const query = new URLSearchParams(payload).toString();
  const url = `${CONFIG.appsScriptUrl}?${query}`;

  if (window.fetch) {
    return fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      keepalive: true,
    })
      .then(() => ({ sent: true }))
      .catch(() => {
        const beaconImage = new Image();
        beaconImage.referrerPolicy = "no-referrer-when-downgrade";
        beaconImage.src = url;
        return { fallback: true };
      });
  }

  const beaconImage = new Image();
  beaconImage.referrerPolicy = "no-referrer-when-downgrade";
  beaconImage.src = url;
  return Promise.resolve({ fallback: true });
}

function redirect(url) {
  window.location.replace(url);
}

async function run() {
  const params = getParams();
  const seller = getSeller(params);

  if (!seller.phone) {
    updateStatus("Vendedora nao configurada. Revise o parametro seller.");
    manualLinkEl.style.display = "none";
    return;
  }

  const whatsappUrl = buildWhatsappUrl(seller, params);
  manualLinkEl.href = whatsappUrl;

  const payload = collectPayload(params, seller, whatsappUrl);
  updateStatus(`Registrando clique e abrindo o WhatsApp da ${seller.name}...`);

  const sendPromise = sendToAppsScript(payload);
  const timeoutPromise = new Promise((resolve) => {
    window.setTimeout(resolve, 900);
  });

  await Promise.race([sendPromise, timeoutPromise]);
  redirect(whatsappUrl);
}

run();
