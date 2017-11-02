function buildForms() {
    var formsArray = [];

    var environmentObject = {
        anchor: "#environmentParameterForm",
        headlines: ["Air Pressure", "Temperature", "Humidity", "Wind Speed", "Precipitation", "Light", "CPU Temperature"]
    }
    formsArray.push(environmentObject);

    var channelConfigObject = {
        anchor: "#channelConfigurationForm",
        headlines: ["Sample Rate", "Pre Trigger", "Post Trigger", "Threshold", "Time On Channel", "Amplitude", "Amplification", "High Pass Filter"]
    }
    formsArray.push(channelConfigObject);

    for (j = 0; j < formsArray.length; j++) {
        for (i = 0; i < formsArray[j].headlines.length; i++) {
            var idParamArray = formsArray[j].headlines[i].split(" ");
            idParamArray[0] = idParamArray[0].toLowerCase();
            var idParam = idParamArray.join("");

            var paragraph = $('<p/>', {
                class: "configText"
            });
            paragraph.text(formsArray[j].headlines[i]);
            input = $('<input/>', {
                type: "text",
                name: idParam,
                id: idParam,
                class: "configInput",
                size: 10
            });
            input.appendTo(paragraph);
            paragraph.appendTo(formsArray[j].anchor);
        }
    }

}