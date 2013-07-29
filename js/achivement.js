$(function() {
	var achievement = window.localStorage["achievement"];
	var t = 0;
	for(i = 0;i < 7;i++){
		if(achievement[i] == "t"){
			console.log(achievement[i]);
			var t = i + 1;
			$("#img" + t).attr("src","img/icon.png");
		}
	}
});