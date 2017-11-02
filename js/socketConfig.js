            var socket = io.connect();
            var receivedData = "";
            var receivedDataArray = [];

            socket.on('connectedToServer', function(configData) {
                console.log('Connected to server ' + configData);
                var configDataJSON = JSON.parse(configData);
                var configDataJSONOld = configDataJSON;
                $('#sampleRate').val(configDataJSON.sampleRate + " kHz");
                $('#preTrigger').val(configDataJSON.preTrigger + " ms");
                $('#postTrigger').val(configDataJSON.postTrigger + " ms");
                $('#threshold').val(configDataJSON.threshold);
                $('#timeOnChannel').val(configDataJSON.timeOnChannel + " ms");
                $('#amplitude').val(configDataJSON.amplitude);
                $('#amplification').val(configDataJSON.amplification);
                $('#highPassFilter').val(configDataJSON.highPassFilter);
            });
            
            socket.on('channelStatus', function(channelArray) {
               var numberOfChannels = channelArray[0].length;
               for (j = 1; j <= numberOfChannels; j++)
                  {

                    if(channelArray[0][j - 1] == 0){$("#channel" + j).css("background-color", "green");}
                    if(channelArray[0][j - 1] == 1){
                        $("#channel" + j).css("background-color", "red");
                        $("#microphonesButton").css("background-color", "red");
                        }
                    if(channelArray[0][j - 1] == 2){$("#channel" + j).css("background-color", "grey");}
                    
                  }
            });  
            
            socket.on('emitDate', function(fullDate) {$('#fileName').val(fullDate);});
            socket.on('emitSequenceNumber', function(fileSeqNum) {$('#fileNumber').val(fileSeqNum);});
            
            socket.on('airPressure', function(airPressure) {$('#airPressure').val(airPressure + " kPa");});
            socket.on('temperature', function(temperature) {$('#temperature').val(temperature + " C");});
            socket.on('humidity', function(humidity) {$('#humidity').val(humidity + " %");});
            socket.on('windSpeed', function(windSpeed) {$('#windSpeed').val(windSpeed + " m/s");});
            socket.on('precipitation', function(precipitation) {$('#precipitation').val(precipitation + " ?");});
            socket.on('light', function(light) {$('#light').val(light + " ?");});
            socket.on('systemState', function(systemState) {
            console.log(systemState);
              if(systemState == "initializing") {backgroundColor = "orange";}
              if(systemState == "ready") {backgroundColor = "green";}
              if(systemState == "error") {backgroundColor = "red";}
              $('#systemState').css("background-color", backgroundColor)
              });
            socket.on('cpuTemperature', function(cpuTemperature) {$('#cpuTemperature').val(cpuTemperature + " C");});
            
            socket.on('emissions', function(emissions) 
              {
       //           updateTimeline(emissions);
                });
            socket.on('stopRecord', function() {
                                                   $('#recordButton').css("pointer-events", "auto");
                                                   $('#recordButton').css("opacity", "1.0");
                                                });
