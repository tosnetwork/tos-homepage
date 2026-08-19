/**
 * Legacy anchor forwarding.
 *
 * The site used to be one page, so links shared before the split point at
 * fragments like tos.network/#economics. Fragments never reach the server,
 * so this has to run in the browser. Only the landing page loads it, and
 * only fragments that moved are forwarded; anything still on the landing
 * page is left alone.
 */
(function () {
    "use strict";

    var MOVED = {
        "#platform": "platform.html",
        "#a2a": "platform.html#a2a",
        "#ard": "platform.html#ard",
        "#agent-ecosystem": "platform.html#agent-ecosystem",
        "#user-assets": "platform.html#user-assets",
        "#foundation": "foundation.html",
        "#mesh": "foundation.html#mesh",
        "#edge": "foundation.html#edge",
        "#openfox": "foundation.html#openfox",
        "#economics": "token.html",
        "#roadmap": "roadmap.html",
        "#faq": "roadmap.html#faq"
    };

    function forward() {
        var target = MOVED[window.location.hash];
        if (!target) {
            return;
        }
        // replace() rather than assign() so the dead fragment does not end up
        // in history and trap the back button on the landing page.
        window.location.replace(target);
    }

    forward();
    window.addEventListener("hashchange", forward);
})();
