// ==UserScript==
 
// @name          Ji Zhi Wu filter
 
// @namespace     https://github.com/lyenliang
	 
// @description   Replace some texts with 祭止兀
	 
// @include       *
	 
// ==/UserScript==
//alert('Ji Zhi Wu filter');
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
function replace(original, replaced) {
	var searchRE = new RegExp(original,'g');
	for (var i=0; i<textNodes.snapshotLength; ++i) {
		var node = textNodes.snapshotItem(i);
		node.data = node.data.replace(searchRE, replaced); 
	}
}

replace("蔡正元", "祭止兀");
replace("正元", "止兀");