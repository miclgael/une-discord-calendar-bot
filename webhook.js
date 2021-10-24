import fetch from "node-fetch";
import ical2json from "ical2json";

const url = "https://www.une.edu.au/connect/events/feed";
const calendar = await fetch(url)
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    return ical2json.convert(text);
  })
  .catch((error) => {
    console.log(error);
  });

const VEvents = calendar["VCALENDAR"][0]["VEVENT"];

let caldata = [];

for (let index = 0; index < VEvents.length; index++) {
  const url = VEvents[index]["UID"]; // 'https://www.une.edu.au/connect/events/events/christmas-day',
  const summary = VEvents[index]["SUMMARY"]; // 'Christmas Day',
  const dtstart = VEvents[index]["DTSTART"]; // '20211225T000000',
  const dtend = VEvents[index]["DTEND"];
  const description = VEvents[index]["DESCRIPTION"]; // 'Official Public Holiday - NSW Wide: \\n',
  const location = VEvents[index]["LOCATION"]; // '',
  const categories = VEvents[index]["ATEGORIES"]; // 'Academic; Community; Students; Staff; Principal'

  // Only push if vals above are defined
  caldata.push({
    ...(url && { url }),
    ...(summary && { summary }),
    ...(dtstart && { dtstart }),
    ...(dtend && { dtend }),
    ...(description && { description }),
    ...(location && { location }),
    ...(categories && { categories }),
  });
}

let events = [];
const labels = [
  "Event URL",
  "Summary",
  "Event Start",
  "Event Finish",
  "Description",
  "Location",
  "Categories",
];
const fields = [];

for (let i = 0; i < caldata.length; i++) {
  for (const prop in caldata[i]) {
    if (Object.hasOwnProperty.call(caldata[i], prop)) {
      const field = caldata[i][prop];

      fields.push({
        name: labels[i],
        value: field.location || "N/A",
        inline: true,
      });
    }
  }
}

for (let i = 0; i < caldata.length; i++) {
  events.push({
    username: calendar["VCALENDAR"][0]["NAME"],
    avatar_url:
      "https://www.une.edu.au/__data/assets/image/0009/347247/logo.png?v=0.0.1",
    content: calendar.summary || "",
    embeds: [
      {
        author: {
          name: "Events Bot",
          url: "https://michaelgale.dev/discord-calendar-bot",
          icon_url:
            "https://www.une.edu.au/__data/assets/image/0009/347247/logo.png?v=0.0.1",
        },
        title: caldata[i].summary || "",
        url: "https://www.une.edu.au/connect/events/feed",
        description: caldata[i].description || "",
        color: "9879613",
        fields: fields[i],
        thumbnail: {
          url: "https://www.une.edu.au/__data/assets/image/0009/347247/logo.png?v=0.0.1",
        },
        footer: {
          text: "UNE Calendar Bot by Michael Gale",
          icon_url:
            "https://raw.githubusercontent.com/miclgael/michaelgale.dev/main/static/favicons/favicon-32x32.png?token=ABA2ELSQ43M2HWHUIT7T5LDBPZB4E",
        },
      },
    ],
  });
}

export default events;
