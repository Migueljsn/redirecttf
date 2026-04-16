function getSpreadsheet_() {
  var spreadsheet = SpreadsheetApp.openById("COLE_AQUI_O_ID_DA_PLANILHA");
  var sheet = spreadsheet.getSheetByName("Leads");

  if (!sheet) {
    sheet = spreadsheet.insertSheet("Leads");
    sheet.appendRow([
      "event_timestamp",
      "click_id",
      "event_name",
      "seller_key",
      "seller_name",
      "seller_phone",
      "redirect_url",
      "page_url",
      "page_path",
      "referrer",
      "user_agent",
      "language",
      "platform",
      "screen_width",
      "screen_height",
      "viewport_width",
      "viewport_height",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_id",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "ttclid",
      "src",
      "campaign"
    ]);
  }

  return sheet;
}

function buildRow_(data) {
  return [
    data.event_timestamp || new Date().toISOString(),
    data.click_id || "",
    data.event_name || "",
    data.seller_key || "",
    data.seller_name || "",
    data.seller_phone || "",
    data.redirect_url || "",
    data.page_url || "",
    data.page_path || "",
    data.referrer || "",
    data.user_agent || "",
    data.language || "",
    data.platform || "",
    data.screen_width || "",
    data.screen_height || "",
    data.viewport_width || "",
    data.viewport_height || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_id || "",
    data.utm_term || "",
    data.utm_content || "",
    data.fbclid || "",
    data.gclid || "",
    data.ttclid || "",
    data.src || "",
    data.campaign || ""
  ];
}

function appendLead_(data) {
  var sheet = getSpreadsheet_();
  sheet.appendRow(buildRow_(data));
}

function doPost(e) {
  try {
    appendLead_(e.parameter || {});

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}
