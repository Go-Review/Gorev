function setup() {
  const properties = PropertiesService.getScriptProperties();
  const existingId = properties.getProperty("SPREADSHEET_ID");
  if (existingId) {
    try {
      const existingSpreadsheet = SpreadsheetApp.openById(existingId);
      Logger.log("Review spreadsheet: " + existingSpreadsheet.getUrl());
      return existingSpreadsheet.getUrl();
    } catch (error) {
      properties.deleteProperty("SPREADSHEET_ID");
    }
  }

  const spreadsheet = SpreadsheetApp.create("GoRev Customer Reviews");
  const sheet = spreadsheet.getSheets()[0];
  sheet.setName("Reviews");
  sheet.getRange(1, 1, 1, 7).setValues([[
    "Submitted at",
    "Place",
    "Rating (1-5)",
    "Review",
    "Visit date",
    "Name (optional)",
    "Status"
  ]]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 7)
    .setBackground("#202622")
    .setFontColor("#ffffff")
    .setFontWeight("bold");
  sheet.setColumnWidths(1, 1, 165);
  sheet.setColumnWidths(2, 1, 190);
  sheet.setColumnWidths(3, 1, 105);
  sheet.setColumnWidths(4, 1, 480);
  sheet.setColumnWidths(5, 1, 120);
  sheet.setColumnWidths(6, 1, 180);
  sheet.setColumnWidths(7, 1, 120);
  sheet.getRange("D:D").setWrap(true);
  properties.setProperty("SPREADSHEET_ID", spreadsheet.getId());
  Logger.log("Review spreadsheet: " + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};
  if (parameters.website) return response_(true);

  const place = cleanText_(parameters.place, 120);
  const rating = Number(parameters.rating);
  const review = cleanText_(parameters.review, 1600);
  const visitDate = cleanText_(parameters.visitDate || "", 10);
  const displayName = cleanText_(parameters.displayName || "", 80);

  if (!place || !Number.isInteger(rating) || rating < 1 || rating > 5 ||
      !review || review.length < 8 || visitDate === null || displayName === null ||
      (visitDate && !/^\d{4}-\d{2}-\d{2}$/.test(visitDate))) {
    return response_(false);
  }

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) return response_(false);

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Reviews");
    if (!sheet) return response_(false);
    sheet.appendRow([
      new Date(),
      safeCellText_(place),
      rating,
      safeCellText_(review),
      visitDate,
      safeCellText_(displayName),
      "Pending"
    ]);
    return response_(true);
  } catch (error) {
    return response_(false);
  } finally {
    lock.releaseLock();
  }
}

function cleanText_(value, maxLength) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length <= maxLength ? text : null;
}

function safeCellText_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function response_(ok) {
  const message = JSON.stringify({ source: "gorev-review", ok: ok }).replace(/</g, "\\u003c");
  const html = "<!doctype html><html><body><script>window.top.postMessage(" + message + ", '*');</script></body></html>";
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}