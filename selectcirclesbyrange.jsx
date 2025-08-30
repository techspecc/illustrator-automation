(function () {
  if (app.documents.length === 0) { alert("Open a document first."); return; }
  var doc = app.activeDocument;

  // Ask user for range
  var minInput = prompt("Minimum diameter (e.g. 50mm or 100pt). Leave blank for none:", "");
  var maxInput = prompt("Maximum diameter (e.g. 200mm or 300pt). Leave blank for none:", "");

function parseVal(input) {
  if (!input) return null;
  var str = String(input).replace(/^\s+|\s+$/g, ""); // manual trim
  if (str === "") return null;
  var m = str.match(/^([\d.]+)\s*(pt|mm)?$/i);
  if (!m) { alert("Invalid input: " + input); throw new Error("bad input"); }
  var val = parseFloat(m[1]);
  var unit = (m[2]||"mm").toLowerCase();
  return (unit==="pt") ? val : val*(72/25.4); // convert mm→pt
}

  var minPt = parseVal(minInput);
  var maxPt = parseVal(maxInput);
  var tol = 0.5; // pt tolerance

  function isCircle(w,h){ return w>0 && h>0 && Math.abs(w-h)<=0.25; }

  var hits = [];
  var items = doc.pageItems;
  for (var i=0;i<items.length;i++){
    var it = items[i];
    if (it.locked || it.hidden) continue;
    var w = it.width, h = it.height;
    if (!isCircle(w,h)) continue;
    if (minPt !== null && w < minPt - tol) continue;
    if (maxPt !== null && w > maxPt + tol) continue;
    hits.push(it);
  }

  doc.selection = hits;
  alert("Selected " + hits.length + " circle(s).");
})();