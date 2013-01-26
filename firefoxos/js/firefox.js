$(function() {
	
	//
	// battery
	// https://github.com/robnyman/robnyman.github.com/tree/master/battery
	//
	
	var dev_text_title = ['主人，該充電了','好過分','電力全滿'];
	var dev_text_description = ['您手機的電量過低，請連結充電器','喔，你拔除了充電器','主人非常好，我電力全滿'];

	$("#dev_content_text").text("").append(dev_text_title[0]);
	$("#dev_content_description_text").text("").append(dev_text_description[0]);
	$("#progress_item").css("width","0%").parent().removeClass("blue").addClass("orange");

	$("#dev_win").fadeOut(2000);
	

	var p_charging,p_level;
	var color;
	var require_charging = false;

	var color_array = ['red','yellow','orange','green'];
	var dev_text_title = ['主人，該充電了','好過分'];
    var dev_text_description = ['您手機的電量過低，請連結充電器','喔，你拔除了充電器'];
	battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    if (battery != null) {
        function setStatus () {
        	$("#progress_item").css("width",Math.round(battery.level * 100)+"%").parent().addClass(color);
            
            if(battery.level < 0.1){
            	color = color_array[0];
            	if(require_charging)
            		;//屢勸不聽
            }
            else if(battery.level < 0.3){
            	color = color_array[1];
            	$("#dev_content_text").text("").append(dev_text_title[0]);
    			$("#dev_content_description_text").text("").append(dev_text_description[0]);
    			require_charging = true;
    			;//主人，該充電了
            }
            else if(battery.level < 0.7)
            {
            	color = color_array[2];
            }
            else
            {
            	color = color_array[3];
            }
            
            
            switch(Math.round(battery.level * 100)){
            	case 100:
            		//audio.play();
            	break;
            }
            if(battery.charging){//充電中
            	
            	document.getElementById('in').play();

            	if(Math.round(battery.level * 100) == 5)
            		;//即刻救援
            }
            else if(p_charging == "y" && !battery.charging ){

            	document.getElementById('out').play();

            	//之前有充電 現在充電終止
            	if(Math.round(battery.level * 100) < 10)
            		;//勇者無懼
            	else if(Math.round(battery.level * 100) == 100)
            		;//體力全滿
            	else {
            		$("#dev_content_text").text("").append(dev_text_title[1]);
    				$("#dev_content_description_text").text("").append(dev_text_description[1]);
            		;//好過分
            	}
            }
            p_level= Math.round(battery.level * 100);
            p_charging= (battery.charging)? "y" : "n";
        }
        // Set initial status
        setStatus();
    

        // Set events
        battery.addEventListener("levelchange", setStatus, false);
        battery.addEventListener("chargingchange", setStatus, false);
        //battery.addEventListener("chargingtimechange", setStatus, false);
        //battery.addEventListener("dischargingtimechange", setStatus, false);
    }


	//document.getElementById('audio').play();


});