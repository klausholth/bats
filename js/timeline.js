        if (numberOfChannels == 8) {millisPerPixelValue = 12;}
        if (numberOfChannels == 8 && selection == "init") {millisPerPixelValue = 17;}
        if (numberOfChannels == 16) {millisPerPixelValue = 17;}
        for (i = 0; i < numberOfChannels; i++) {
            randomArray.push(new TimeSeries());
        } 
        var oldSequenceNumber = 0;      
        var d; 
        var dString;
        var gmtIndex;



        function updateTimeline(receivedData) {
        	time = new Date();
        	for (i = 0; i < numberOfChannels; i++) {
        		randomArray[i].append(time.getTime(), receivedData[i + 1]);
        	}
        	if(receivedData[0] - oldSequenceNumber > 1 && oldSequenceNumber != 0) 
            {
              $('#timeOoS').html("Time: " + timeStamp());
              $('#outOfSequence').css("visibility", "visible");
              socket.emit("outOfSequence", timeStamp());
              }
        	if(receivedData[0] - oldSequenceNumber < 1) 
            {
              $('#timePL').html("Time: " + timeStamp());
              $('#packageLoss').css("visibility", "visible");
              socket.emit("packageLoss", timeStamp());
              }
        	oldSequenceNumber = receivedData[0];

        }

        function createTimeline(shownNumberOfChannels,  selection) {
          var j;
        	for (i = 0; i < shownNumberOfChannels; i++) {
     		chartArray[i] = new SmoothieChart({maxValue:6000,minValue:0, millisPerPixel:millisPerPixelValue, enableDpiScaling: false, interpolation: 'linear', scrollBackwards: true, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 100000, verticalSections: 0, borderVisible: true}, labels: {disabled: true}});
        		chartArray[i].addTimeSeries(randomArray[i], {
        			strokeStyle: 'rgba(0, 255, 0, 1)',
         			lineWidth: 1,
        		});
        		j = i;
        		if (selection == "second") {j = i + shownNumberOfChannels;} 
        		chartArray[i].streamTo(document.getElementById("chart" + j), 0);
        	}
        }
        
        function timeStamp() {
          d = new Date();
          dString = d.toString();
          gmtIndex = dString.indexOf("GMT");
          
         return dString.substring(0, gmtIndex);
        
        }
        


