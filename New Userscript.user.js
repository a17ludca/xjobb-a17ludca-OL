// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        localhost:3000/*
// @require      https://code.jquery.com/jquery-3.4.1.js
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    const scraped_url='https://wwwlab.iit.his.se/a17ludca/CMS/scraped-data.php';
    var i = 0;
    var setRuns = 8;
    //HARD RELOAD SCRIPT
    var runs = localStorage.getItem("runs") || 0;
    runs++;
    localStorage.setItem("runs", runs);

    setTimeout(function(){
        if(runs <= setRuns){
            document.getElementById("start").click();
        }else if(runs == (setRuns+1)){
            document.getElementById("send").click();
            console.log("test complete");
        }
    }, 3000);

    function ajaxCall(data) {
        try {
            GM.xmlHttpRequest({
                method: 'POST',
                url: scraped_url,
                data: 'str=' + encodeURIComponent(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        } catch (ex1) {
            console.log(ex1);
        }
    }
    document.getElementById("start").onclick = function(){
                setInterval(zoomClick, 2500);
    }
    function zoomClick(){
        i++;
        if(i == 19){
            console.log("test done");
            document.getElementById("send").click();
        }
        if (window.location.href == 'http://localhost:3000/OL') {
            document.querySelector(".ol-zoom-in").click();
            console.log(i);
        } else if (window.location.href == 'http://localhost:3000/L3') {
            document.querySelector(".leaflet-control-zoom-in").click();
            console.log(i);
        }

    }

    document.getElementById("send").onclick = function(){
        var tempVariable = localStorage.getItem('Refresh Loadtimes');
        console.log("ajax call incoming");
        ajaxCall(tempVariable);
        setTimeout(function(){
            localStorage.removeItem("Refresh Loadtimes");
            location.reload(true);
        },500);
    }
})();