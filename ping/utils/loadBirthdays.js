var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Event[i] = the ith event, set in a json with fields:
//       date  = %y%m%d
//       title = string
function get_birthdays(ical_file){
  var request = new XMLHttpRequest();
      request.open(
        "GET",
        ical_file,
        true
      );
      request.send(null);
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          var type = request.getResponseHeader("Content-Type");
          if (type.indexOf("text") !== 1) {
            var lines = request.responseText.split("\n");
            var events = {}
            var events_i = 0;
            for (i = 0; i < lines.length; i++) {
              if (lines[i].includes('DTSTART')) {
                var date = lines[i].split(":");
                events[events_i] = {date: date[1]};
              }
              else if (lines[i].includes('SUMMARY')) {
                var title = lines[i].split(":");
                events[events_i]["title"] = title[1];
              }
              else if (lines[i].includes('END:VEVENT')) {
                events_i++;
              }
            }
            var string_events = JSON.stringify(events);
            fs.writeFile("birthdays.txt",
                          JSON.stringify(events), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
          }
        };
      };

}
