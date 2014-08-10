// ==UserScript==
 
// @name          Ji Zhi Wu filter
 
// @namespace     https://github.com/lyenliang
	 
// @description   Replace some texts with 祭止兀
	 
// @include       https://www.facebook.com/*
	 
// ==/UserScript==

function resetTimer() {
	clearTimeout (PostsChangedByAJAX_Timer);
	PostsChangedByAJAX_Timer = '';
}

function replace(node, original, replaced) {
	node.data = node.data.replace(original, replaced);
}

function replaceText() {
	// //: Selects nodes in the document from the current node that match the selection no matter where they are
	textNodes = document.evaluate("//a/text() | //span/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<textNodes.snapshotLength; ++i) {
		var node = textNodes.snapshotItem(i);
		replace(node, "蔡正元", "祭止兀");
		replace(node, "正元", "止兀");
	}
	resetTimer();
}

function hasTimerTriggered() {
	return (typeof PostsChangedByAJAX_Timer == "number");
}

function newPostsLoaded () {
    if ( !hasTimerTriggered() ) {
    	PostsChangedByAJAX_Timer = setTimeout (function() {replaceText(); }, 555);
    }
}

function replaceTitle () {
	document.title = document.title.replace('蔡正元', '祭止兀');
}


var PostsChangedByAJAX_Timer = '';

if (window.top != window.self) { //don't run on frames or iframes
    return;
}

replaceTitle();
replaceText();

var config = { attributes: true, 
	subtree: true, 
	characterData: true, 
	attributeOldValue: true, 
	childList: true 
};

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type == 'childList') {
			newPostsLoaded()
		}
	});
});

observer.observe(document, config);