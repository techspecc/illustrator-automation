(function () {
  if (app.documents.length === 0) { alert("Open a document first."); return; }
  var doc = app.activeDocument;

  // ---- Helpers ----
  function trimES3(s){ return String(s).replace(/^\s+|\s+$/g, ""); }
  function toPt(v,u){ return (u==="pt") ? v : v*(72/25.4); }
  function parseDim(input) {
    if (input == null) return null;
    var str = trimES3(input);
    if (str === "") return null;
    var m = str.match(/^([\d.]+)\s*(pt|mm)?$/i);
    if (!m) { alert("Invalid value: " + input); throw new Error("bad input"); }
    var val = parseFloat(m[1]); var unit = (m[2]||"mm").toLowerCase();
    return toPt(val, unit);
  }

  // ---- Prompts (blank = none) ----
  var wMinIn = prompt("Minimum WIDTH (e.g. 10mm or 28pt). Leave blank for none:", "");
  var wMaxIn = prompt("Maximum WIDTH (e.g. 100mm or 300pt). Leave blank for none:", "");
  var hMinIn = prompt("Minimum HEIGHT (e.g. 10mm or 28pt). Leave blank for none:", "");
  var hMaxIn = prompt("Maximum HEIGHT (e.g. 100mm or 300pt). Leave blank for none:", "");

  var wMin = parseDim(wMinIn);
  var wMax = parseDim(wMaxIn);
  var hMin = parseDim(hMinIn);
  var hMax = parseDim(hMaxIn);

  // small tolerance to absorb rounding when reading bounds
  var tol = 0.25; // points

  var hits = [];
  var items = doc.pageItems;
  for (var i=0, n=items.length; i<n; i++) {
    var it = items[i];
    if (it.locked || it.hidden) continue;

    var w = it.width, h = it.height;
    if (w <= 0 || h <= 0) continue;

    // Width checks
    if (wMin !== null && w < (wMin - tol)) continue;
    if (wMax !== null && w > (wMax + tol)) continue;

    // Height checks
    if (hMin !== null && h < (hMin - tol)) continue;
    if (hMax !== null && h > (hMax + tol)) continue;

    hits.push(it);
  }

  doc.selection = hits;
  alert("Selected " + hits.length + " object(s) by size range.");
})();