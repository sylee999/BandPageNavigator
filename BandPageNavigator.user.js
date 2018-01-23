// ==UserScript==
// @name        Band Userscript Test
// @namespace   https://github.com/sylee999/BandPageNavigator/
// @description Add a link to Band(https://band.us/) to go to next and prev pages directly.
// @author      sylee999
// @license     GNU GPLv3
// @downloadURL https://github.com/sylee999/BandPageNavigator/raw/master/BandPageNavigator.user.js
// @updateURL   https://github.com/sylee999/BandPageNavigator/raw/master/BandPageNavigator.user.js
// @supportURL  https://github.com/sylee999/BandPageNavigator/issues
// @icon        https://github.com/sylee999/BandPageNavigator/band.png
// @version     0.1
// @grant       none
// @run-at      document-end
// @include     https://band.us/*
// ==/UserScript==

(function() {
    String.format = function(string) {
        var args = Array.prototype.slice.call(arguments, 1, arguments.length);
        return string.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== "undefined" ? args[number] : match;
        });
    };

    function addLinks() {
        var currentUrl = document.URL.split("/"); // `https://band.us/band/{band_no}/post/{post_no}`;
        if(currentUrl.length !== 7 || currentUrl[3] !== "band" || currentUrl[5] !== "post") {
            return;
        }

        console.log("currentUrl:" + currentUrl);
        // find a parent & sibling node to attach child link node
        var parent = document.querySelector("#lnb > ul");
        console.log("parent:" + parent);
        if (!parent) {
            return;
        }

        // create prev and next url
        var prevUrl = String.format("https://band.us/band/{0}/post/{1}", currentUrl[4], Number(currentUrl[6])-1);
        var nextUrl = String.format("https://band.us/band/{0}/post/{1}", currentUrl[4], Number(currentUrl[6])+1);
        console.log("prevUrl:" + prevUrl + ", nextUrl:" + nextUrl);

        // create prev and next image
        var prevImg = document.createElement("img");
        prevImg.setAttribute("src", "https://assets-cdn.github.com/images/icons/emoji/octocat.png");
        prevImg.style.height = "16px";
        prevImg.style.width = "16px";
        var nextImg = document.createElement("img");
        nextImg.setAttribute("src", "https://assets-cdn.github.com/images/icons/emoji/octocat.png");
        nextImg.style.height = "16px";
        nextImg.style.width = "16px";

        // create prev and next div node
        var prevLink = document.createElement("li");
        prevLink.id = "PrevLinker";
        prevLink.style.display = "block";
        prevLink.style.height = "34px";
        prevLink.style.paddingTop = "9px";
        prevLink.style.lineHeight = "normal";
        prevLink.appendChild(prevImg);
        parent.insertAdjacentElement('afterbegin', prevLink);

        var nextLink = document.createElement("li");
        nextLink.id = "NextLinker";
        nextLink.style.display = "block";
        nextLink.style.height = "34px";
        nextLink.style.paddingTop = "9px";
        nextLink.style.lineHeight = "normal";
        nextLink.appendChild(nextImg);
        parent.appendChild(nextLink);
    }

    // Init;
    window.addEventListener("load", lazyLoading);
    function lazyLoading(event) {
        setTimeout(function() {
            addLinks();
        }, 1000);
    }
})();

