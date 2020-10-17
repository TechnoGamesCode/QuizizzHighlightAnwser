var msg = null;

function resetMSG(){
	msg.setAttribute("target", "null");
	msg.innerText = "";
}

function displayMSG(type, text){
	msg.innerText = text;
	msg.setAttribute("target", type);
	setTimeout(function(){ resetMSG(); }, 1600);
}

function doStuff(){
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		
		let url = tabs[0].url;
		if(url == null){
			displayMSG("error", "Najpierw wejdz w quiz.");
		}
		if(url.substring(0, 30) == "https://quizizz.com/join/game/"){
			displayMSG("success", "Pomyslnie uruchomiono.");
			chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
				chrome.tabs.executeScript(null, { file: "toInject.js" });
			});
		}else{
			displayMSG("error", "Najpierw wejdz w quiz.");
		}
	});
}
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('a');
	msg = document.getElementById('msg');
    // onClick's logic below:
    link.addEventListener('click', function() {
        doStuff();
    });
});