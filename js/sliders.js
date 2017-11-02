
      function readAlertSlider() {
            $("#slider")
                .bind("slider:ready slider:changed", function(event, data) {
                    $("#slider + span").html(data.value.toFixed(0));

                   // alertSliderValue = data.value.toFixed(0);
                    alertLevel = data.value.toFixed(0);
                    timeLineHeight = parseInt($(".timeLine").css("height"), 10);
                    for (i = 0; i < numberOfChannels; i++) {
                        pMarginTop = parseInt($("#chart" + i).css("margin-top"), 10);
                        subTotal = timeLineHeight + pMarginTop - timeLineHeight * (data.value.toFixed(0) / 100);
                        $("#alert" + i).css("top", subTotal + "px");
                    }
                });
                console.log("alertlevel: " + alertLevel);
           //     return alertLevel;
                }
                
      function readCycleSlider() {                
           $("#cycleSlider").bind("slider:ready slider:changed", function(event, data) {
                    if (data.value.toFixed(0) == 0) {data.value.toFixed(0) = 1000;}
                    $("#cycleSlider + span").html(data.value.toFixed(0)/1000);
                    cycleSliderValue = data.value.toFixed(0);
                    
                });
                }
                
   
                       