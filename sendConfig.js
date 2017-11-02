var express = require('express'),
    app = express(),
    http = require('http'),
    url = require('url'),
    fs = require("fs"),
    server, io;
sti = '/userInterface.html';
exitSti = '/exit.png';
cssSti = '/css/userInterface.css';
channelsCssSti = '/css/channels.css';
simpleSliderCssSti = '/css/simple-slider.css';

smoothieSti = '/js/smoothie.js';
timelineSti = '/js/timeline.js';
channelsSti = '/js/channels.js';
socketConfigSti = '/js/socketConfig.js';
simpleSliderSti = '/js/simple-slider.js';
slidersSti = '/js/sliders.js';
popupSti = '/js/popups.js';
commonParametersSti = '/js/commonParameters.js';
var fileNameArray = ['/userInterface.html', '/css/userInterface.css', '/css/channels.css',
    '/js/smoothie.js', '/js/timeline.js'
];

app.get(sti, function(req, res) {
    res.sendFile(__dirname + sti);
});
app.get(exitSti, function(req, res) {
    res.sendFile(__dirname + exitSti);
});
app.get(cssSti, function(req, res) {
    res.sendFile(__dirname + cssSti);
});
app.get(channelsCssSti, function(req, res) {
    res.sendFile(__dirname + channelsCssSti);
});
app.get(smoothieSti, function(req, res) {
    res.sendFile(__dirname + smoothieSti);
});
app.get(popupSti, function(req, res) {
    res.sendFile(__dirname + popupSti);
});
app.get(timelineSti, function(req, res) {
    res.sendFile(__dirname + timelineSti);
});
app.get(channelsSti, function(req, res) {
    res.sendFile(__dirname + channelsSti);
});
app.get(socketConfigSti, function(req, res) {
    res.sendFile(__dirname + socketConfigSti);
});
app.get(simpleSliderCssSti, function(req, res) {
    res.sendFile(__dirname + simpleSliderCssSti);
});
app.get(simpleSliderSti, function(req, res) {
    res.sendFile(__dirname + simpleSliderSti);
});
app.get(commonParametersSti, function(req, res) {
    res.sendFile(__dirname + commonParametersSti);
});
app.get(slidersSti, function(req, res) {
    res.sendFile(__dirname + slidersSti);
});

server = http.Server(app);
server.listen(8001);
io = require('socket.io').listen(server);
var jsonContent = "hej";
var numberOfChannels = 8;
var channelStatus = [];
var temperature;
var humidity;
var systemState = "initializing";
var emission = "";
var emissions = [];
var numberOfMikeStates = 3;
var firstChannelStatusEmitted = false;
var firstEnvironmentDataEmitted = false;
var oldTime = 0;
var connectionTime = 0;
var sequenceNumber = 0;
var fileSeqNum;
var oldMinute = -1;


var LineByLineReader = require('line-by-line');

configData = new LineByLineReader('configuration.txt');
configData.on('error', function(err) {
    console.log("error");
});

configData.on('line', function(line) {
    jsonContent = line;
    io.emit('updateConfiguration', line);
});

configData.on('end', function() {
    console.log("eof congiguration.txt");
});


io.sockets.on('connection', function(socket) {
    connectionTime = new Date();
    console.log("connect: " + jsonContent);
    io.emit('connectedToServer', jsonContent);
    if (!firstChannelStatusEmitted) {emitChannelStatus();}
    if (!firstEnvironmentDataEmitted) {environmentData();}
    firstEnvironmentDataEmitted = true;
    firstChannelStatusEmitted = true;

    socket.on('getDate', function() {
        var d = new Date();
        var fullYear = d.getFullYear();
        var month = d.getMonth() + 1;
        monthString = month.toString();
        if (monthString.length == 1) {
            monthString = "0" + monthString;
        }
        var date = d.getDate();
        if (date.toString().length == 1) {
            date = "0" + date;
        }
        var hour = d.getHours();
        if (hour.toString().length == 1) {
            hour = "0" + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length == 1) {
            minute = "0" + minute;
        }
        if(oldMinute != minute) {fileSeqNum = 1;}
        else {fileSeqNum++;}
        oldMinute = minute;
        var fullDate = fullYear.toString() + monthString + date + hour + minute.toString();
        io.emit('emitDate', fullDate);
        io.emit('emitSequenceNumber', fileSeqNum);
    });

    socket.on('client_data', function(data) {
        process.stdout.write(data.letter);
    });
    
    socket.on('startRecord', function(record) {
        console.log("Start recording " + record);
        setTimeout(function() {
            io.emit('stopRecord');
            console.log('Stop record');
        }, 5000);
    });
    
    socket.on('saveRecord', function(fileSaveName) {
        console.log(fileSaveName);
    });    
    
    socket.on('startGallery', function(gallery) {
        console.log("Start gallery " + gallery);
    });
    socket.on('configUpdate', function(newConfig) {
        console.log("Config Update " + newConfig.amplitude);
    });
    socket.on('outOfSequence', function(time) {
        fs.appendFile('outOfSequence.log', time + "\r\n", 'utf8', function (err) {
              if (err) return console.log(err);});
    });
    socket.on('packageLoss', function(time) {
        fs.appendFile('packageLoss.log', time + "\r\n", 'utf8', function (err) {
              if (err) return console.log(err);});
    });    
});

function environmentData() {
    temperature = 12 + Math.floor(10 * Math.random());
    humidity = 40 + Math.floor(50 * Math.random());
    airPressure = 101.325 + Math.floor(10 * Math.random()) - Math.floor(10 * Math.random());
    windSpeed = Math.floor(20 * Math.random());
    precipitation = Math.floor(30 * Math.random());
    light = Math.floor(500 * Math.random());
    
    cpuTemperature = 20 + Math.floor(Math.random() * 50);
    
    d = new Date();
    var diffTime = d.getTime() - oldTime;
    oldTime = d.getTime();

    io.emit('temperature', temperature);
    io.emit('humidity', humidity);
    io.emit('airPressure', airPressure);
    io.emit('windSpeed', windSpeed);
    io.emit('precipitation', precipitation);
    io.emit('light', light);
    
    io.emit('cpuTemperature', cpuTemperature);
}

function systemStateData() {
    d = new Date();
    var diffTime = d.getTime() - connectionTime;
     if (diffTime > 10000) {systemState = "ready";}
     if (diffTime > 20000 && diffTime < 25000) {systemState = "error";}
      io.emit('systemState', systemState);
}

function emitChannelStatus() {
    for (k = 0; k < numberOfChannels; k++) {channelStatus[k] = Math.floor(numberOfMikeStates * Math.random());}
    io.emit('channelStatus', [channelStatus, numberOfChannels]);
}

function emitData() {
    if(sequenceNumber == 200){ emissions.push(205);sequenceNumber++;}
    if(sequenceNumber == 400){ emissions.push(405);sequenceNumber++;}
    if(sequenceNumber == 600){ emissions.push(605);sequenceNumber++;}
    else {emissions.push(sequenceNumber++);}
    for (i = 0; i < 16; i++) {
        emission = Math.floor(Math.random() * 5000);
        emissions.push(emission);
    }
    io.emit('emissions', emissions);
    emissions = [];    
}

    setInterval(function() {environmentData();}, 2000);
    setInterval(function() {systemStateData();}, 1000);
    setInterval(function() {emitChannelStatus()}, 10000);
    setInterval(function() {emitData()}, 10);
