        function buildTags(numberOfChannels, alertLevel, chosenChannels, selection) {
            $('#showChannels').val(chosenChannels.join());
            $("#graphsLeft").empty();
            $("#graphsRight").empty();
            
            var loopBegin = 1;
            var loopEnd = numberOfChannels;
            
            var channelText;
            var channelTextTwoColumns = "Ch ";
            var channelTextOneColumn = "Channel ";
            var channelTextWidth;
            var channelTextWidthTwoColumns = "50px";
            var channelTextWidthOneColumn = "100px";
            
            var canvasWidth = "600px";
            var canvasHeight = "50px";
            var canvasWidthTwoColumns = "600px";
            var canvasHeight16 = "50px";
            var canvasWidthOneColumn = "800px";
            var canvasHeight8 = "50px";  
                                  
            var graphsWidth = $("#graphs").css("width");
            var headerWidth = $("#header").css("width");
            var halfHeaderWidth = parseInt(headerWidth)/2 + "px"
            var divider;
            var graphs = "#graphsLeft";

            $("#graphs").css("width", headerWidth);
            if (selection == "init" || selection == "all")
              {
                loopBegin = 1;
                loopEnd = loopBegin + numberOfChannels - 1;              
                $("#graphsLeft").css("width", halfHeaderWidth);
                $("#graphsRight").css("width", halfHeaderWidth);
                channelText = channelTextTwoColumns;
                channelTextWidth = channelTextWidthTwoColumns;
                canvasWidth = canvasWidthTwoColumns;
                clearInterval(updateGraphs); 
               }
         
            if (selection == "first") 
              {
              
                loopBegin = 1;
                $("#graphsRight").css("width", "0px");
                $("#graphsLeft").css("width", headerWidth);

                      divider = 4;
                      $("#graphsRight").css("width", "0px");
                      $("#graphsLeft").css("width", headerWidth);  
                      channelText = channelTextOneColumn;
                      channelTextWidth = channelTextWidthOneColumn;
                      canvasWidth = canvasWidthOneColumn;                                        
             
                
                }  
                
            if (selection == "second") 
              {
                loopBegin = numberOfChannels + 1;
                $("#graphsRight").css("width", headerWidth);
                $("#graphsLeft").css("width", "0px");
                } 
                
            if (selection == "free") 
              {
                  loopBegin = 1;
                  loopEnd = loopBegin + numberOfChannels - 1;
                  clearInterval(updateGraphs);
                  if (numberOfChannels < 5) 
                    {
                      divider = 4;
                      $("#graphsRight").css("width", "0px");
                      $("#graphsLeft").css("width", headerWidth);  
                      channelText = channelTextOneColumn;
                      channelTextWidth = channelTextWidthOneColumn;
                      canvasWidth = canvasWidthOneColumn;                                        
                    }
                  else if (numberOfChannels > 4 && numberOfChannels < 9)
                    {
                      divider = 4;
                      $("#graphsLeft").css("width", halfHeaderWidth);
                      $("#graphsRight").css("width", halfHeaderWidth);
                      channelText = channelTextTwoColumns;
                      channelTextWidth = channelTextWidthTwoColumns;
                      canvasWidth = canvasWidthTwoColumns;
                      }
                  else 
                    {
                      divider = 8;
                      $("#graphsLeft").css("width", halfHeaderWidth);
                      $("#graphsRight").css("width", halfHeaderWidth);
                      channelText = channelTextTwoColumns;
                      channelTextWidth = channelTextWidthTwoColumns;
                      canvasWidth = canvasWidthTwoColumns;
                      }                      
                }                
               
                
             if (selection == "first" || selection == "second")
              {
                loopEnd = loopBegin + numberOfChannels - 1;
                channelText = channelTextOneColumn;
                channelTextWidth = channelTextWidthOneColumn;
                canvasWidth = canvasWidthOneColumn;                
                clearInterval(updateGraphs); 
              }

             if (numberOfChannels == 16 && (selection == "init" || selection == "all")) {divider = 8;}
             if (numberOfChannels == 16 && (selection == "first" || selection == "second")) {divider = 4;}
             if (numberOfChannels == 8 && (selection == "first" || selection == "second")) {divider = 8;}
             if (numberOfChannels == 8 && (selection == "init" || selection == "all")) {divider = 4;}
             if (numberOfChannels == 4 && (selection == "first" || selection == "second")) {divider = 4;}
              for (i = loopBegin; i <= loopEnd; i++) {
                if (i > divider) {graphs = "#graphsRight";}
                if (true) {
                    wrapper = "wrapper" + (i - 1);
                    wrapperId = "#" + wrapper;
                    $('<div/>', {
                        id: wrapper,
                        class: "canvasWrapper"
                    }).appendTo(graphs);

                    textId = "Channel" + chosenChannels[i - loopBegin];
                    $('<p/>', {
                        id: textId,
                        class: "channelText"
                    }).appendTo(wrapperId);
                    jQTextId = "#" + textId;
                    $(jQTextId).text(channelText + chosenChannels[i - loopBegin]);
                    $(jQTextId).css("width", channelTextWidth);
                    
                    alertId = 'alert' + (i - 1);
                    $('<div/>', {
                        id: alertId,
                        class: "alertLevel"
                    }).appendTo(wrapperId);                    

                    chart = 'chart' + (i - 1);
                    $('<canvas/>', {
                        class: 'timeLine',
                        id: chart,
                        width: canvasWidth,
                        height: canvasHeight
                    }).appendTo(wrapperId);
                    
                    if (divider == 8) {$(".canvasWrapper").css("height", "70px");}
                    if (divider == 4) {$(".canvasWrapper").css("height", "160px");}
                    
                    var wrapperBorder = parseInt($(".canvasWrapper").css("border"), 10);
                    var wrapperPaddingLeft = parseInt($(".canvasWrapper").css("padding-left"), 10);
                    var pBorder = parseInt($(".channelText").css("border"), 10);
                    var pWidth = parseInt($(".channelText").css("width"), 10);
                    var timeLineMarginLeft = parseInt($(".timeLine").css("margin-left"), 10);
                    
                    var totalLeftIncrement = wrapperBorder + wrapperPaddingLeft + pWidth + 2 * pBorder + timeLineMarginLeft;
                    $(".alertLevel").css("left", totalLeftIncrement + "px");
                    
                    var timeLineWidth = $(".timeLine").css("width");
                    $(".alertLevel").css("width", timeLineWidth);
                    
                    var pMarginTop = parseInt($(".timeLine").css("margin-top"), 10);
                    var timeLineHeight = parseInt($(wrapperId).css("height"), 10) - 2 * parseInt($(".timeLine").css("margin-top"), 10);
                    $(".timeLine").css("height", timeLineHeight);
                    //fix because for some strange reason you cannot specify width and height
                    //for a canvas element in the create code above!!
                    $('.timeLine').attr({
                        width: parseInt(canvasWidth),
                        height: parseInt(timeLineHeight)
                    }).css({
                        width: canvasWidth,
                        height: timeLineHeight + "px",
                        border: '1px black solid'
                    });
                    
                    var totalTopIncrement = pMarginTop + timeLineHeight * (1 - alertLevel/100);
                    $("#alert" + (i - 1)).css("top", totalTopIncrement + "px");
                    
                    if (numberOfChannels == 16 && selection == "init" ) 
                      {
                          $("#firstChannels").text("Channels 1 - 8");
                          $("#secondChannels").text("Channels 9 - 16");
                          $("#allChannels").text("Channels 1 - 16");
                       }
                    if (numberOfChannels == 8 && selection == "init" ) 
                      {
                          $("#firstChannels").text("Channels 1 - 4");
                          $("#secondChannels").text("Channels 5 - 8");
                          $("#allChannels").text("Channels 1 - 8");
                       }  
                }
            }
        }

