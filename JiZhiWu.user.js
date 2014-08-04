// ==UserScript==
 
// @name          Ji Zhi Wu filter
 
// @namespace     https://github.com/lyenliang
	 
// @description   Replace some texts with 祭止兀
	 
// @include       *

// @grant         GM_log
	 
// ==/UserScript==
//alert('Ji Zhi Wu filter');
function init() {
	
}

function replace(original, replaced) {
	var searchRE = new RegExp(original,'g');
	for (var i=0; i<textNodes.snapshotLength; ++i) {
		var node = textNodes.snapshotItem(i);
		node.data = node.data.replace(searchRE, replaced); 
	}
}

function mainStuff() {
	textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	console.log('mainStuff triggered');
	replace("蔡正元", "祭止兀");
	replace("正元", "止兀");	
}

function newPostsLoaded (zEvent) {
	console.log('newPostsLoaded triggered');
    /*--- Set and reset a timer so that we run our code (LocalMain() ) only
        AFTER the last post -- in a batch -- is added.  Adjust the time if needed, but
        half a second is a good all-round value.
    */
	if (typeof PostsChangedByAJAX_Timer == "number") {
		clearTimeout (PostsChangedByAJAX_Timer);
		PostsChangedByAJAX_Timer = '';
	}
	PostsChangedByAJAX_Timer = setTimeout (function() {mainStuff (); }, 555);
}

if (window.top != window.self) {//don't run on frames or iframes
	console.log("window.top != window.self");
	return;
} 
	

init();
mainStuff();

console.log("hello this is greasemonkey");
var PostsChangedByAJAX_Timer = '';

document.addEventListener ("DOMSubtreeModified", newPostsLoaded, false);


