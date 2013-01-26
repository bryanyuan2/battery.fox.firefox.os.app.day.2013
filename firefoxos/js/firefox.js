$(function() {
	
	String.prototype.replaceAt=function(index, character) {
    	return this.substr(0, index) + character + this.substr(index+character.length);
   	}
	//
	// battery
	// https://github.com/robnyman/robnyman.github.com/tree/master/battery
	//
	
	// under 30%, remove_plug, charging, ready to die, full battery, normal condition, 50%
	var dev_text_title = ["主人，該充電了","主人，好過分","主人，我在恢復體力","主人，我好餓好餓","主人，我體力滿滿","主人，我想吃餅乾"];
	var dev_text_description = ["您手機的電量過低，請連結充電器","喔，你拔除了充電器","您的手機目前正在充電","您的手機即將沒電","您的手機目前電力良好","您的手機目前電力良好，可順手接上充電器"];
	

	$("#dev_content_text").text("").append(dev_text_title[0]);
	$("#dev_content_description_text").text("").append(dev_text_description[0]);
	$("#progress_item").css("width","0%").parent().removeClass("blue").addClass("orange");

	$("#dev_win").hide();
	
	var p_charging,p_level;
	var color;
	var require_charging = false;
	var achievement="fffffff";
	
	var color_array = ['red','yellow','orange','green'];

	
	var notification_m1 = navigator.mozNotification.createNotification("勇者無懼" , "成就「勇者無懼」解鎖");
	notification_m1.show();
	achievement.replaceAt(3,"t");


	battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    if (battery != null) {
        function setStatus () {
        	$("#progress_item").css("width",Math.round(battery.level * 100)+"%").parent().addClass(color);
            
            if(battery.level < 0.1){
            	color = color_array[0];
            	if(require_charging)
            	{
            		// 屢勸不聽
            		achievement.replaceAt(3,"t");

					var notification_m2 = navigator.mozNotification.createNotification("勇者無懼" , "成就「勇者無懼」解鎖");
					notification_m2.show();
            	}
            }
            else if(battery.level < 0.3){

            	// under 30%  主人，我好餓好餓 (您手機的電量過低，請連結充電器)
            	$("#dev_content_text").text("").append(dev_text_title[0]);
    			$("#dev_content_description_text").text("").append(dev_text_description[0]);

    			achievement.replaceAt(5,"t");

    			color = color_array[1];
    			require_charging = true;
    			;//主人，該充電了
            }
            else if(battery.level < 0.1){
            	
            	// ready to die  主人，該充電了 (您的手機即將沒電)
            	$("#dev_content_text").text("").append(dev_text_title[3]);
    			$("#dev_content_description_text").text("").append(dev_text_description[3]);

    			color = color_array[0];
    			require_charging = true;
            }
            else if(battery.level < 0.7)
            {
            	// normal condition 主人，我想吃餅乾 (您的手機電力良好，可順手接上充電器)
            	$("#dev_content_text").text("").append(dev_text_title[3]);
    			$("#dev_content_description_text").text("").append(dev_text_description[3]);

            	color = color_array[2];
            }
            else
            {
            	// full battery 主人非常好，我體力滿滿 (您的手機目前電力良好)
            	$("#dev_content_text").text("").append(dev_text_title[4]);
    			$("#dev_content_description_text").text("").append(dev_text_description[4]);
            	color = color_array[3];
            }
            
            switch(Math.round(battery.level * 100)){
            	case 100:
            		//audio.play();
            		document.getElementById('100per').play();
            	case 70:
            		document.getElementById('70per').play();
            	case 30:
            		document.getElementById('30per').play();
            	case 10:
            		document.getElementById('10per').play();
            	break;
            }

            if(battery.charging){

            	// 充電中     
            	document.getElementById('plug').play();

            	// charging 主人，我在恢復體力 (您的手機目前正在充電)
            	$("#dev_content_text").text("").append(dev_text_title[2]);
				$("#dev_content_description_text").text("").append(dev_text_description[2]);
            		
            	if(Math.round(battery.level * 100) == 5)
            	{
            		// 即刻救援

            		achievement.replaceAt(4,"t");

					var notification_m2 = navigator.mozNotification.createNotification("即刻救援" , "成就「即刻救援」解鎖");
					notification_m2.show();
            	}
            }
            else if(p_charging == "y" && !battery.charging ){

            	document.getElementById('unplug').play();

            	//之前有充電 現在充電終止

            	if(Math.round(battery.level * 100) < 10)
            	{
            		// 勇者無懼

            		achievement.replaceAt(0,"t");

					var notification_m1 = navigator.mozNotification.createNotification("勇者無懼" , "成就「勇者無懼」解鎖");
					notification_m1.show();

            		$("#dev_win").fadeIn(2000,function(){
            			$(this).fadeOut();
            		});
            	}
            	
            	else if(Math.round(battery.level * 100) == 100)
            	{
            		// 體力全滿

            		achievement.replaceAt(1,"t");

					var notification_m3 = navigator.mozNotification.createNotification("體力全滿" , "成就「體力全滿」解鎖");
					notification_m3.show();
            	}
            	else {

            		achievement.replaceAt(6,"t");

            		// remove_plug  主人，好過分 (喔，你拔除了充電器)
            		$("#dev_content_text").text("").append(dev_text_title[1]);
    				$("#dev_content_description_text").text("").append(dev_text_description[1]);
            	}
            }
            p_level= Math.round(battery.level * 100);
            p_charging= (battery.charging)? "y" : "n";

            window.localStorage["achievement"] = achievement;

        }
        // Set initial status
        setStatus();
    

        // Set events
        battery.addEventListener("levelchange", setStatus, false);
        battery.addEventListener("chargingchange", setStatus, false);
        //battery.addEventListener("chargingtimechange", setStatus, false);
        //battery.addEventListener("dischargingtimechange", setStatus, false);
    }


	document.getElementById('open').play();

});