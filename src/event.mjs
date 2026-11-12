export const event = {
  date: '2026-12-27',
  venue: 'Sai Palace, Mira Road',
  directions: 'https://maps.app.goo.gl/LYDEGDFgfHN9hb9C6',
  timezone: 'Asia/Kolkata',
  offset: '+05:30',
  end: '2026-12-28T00:00:00',
  schedule: [
    { id: 'sakharpuda', name: 'Sakharpuda', time: '16:00' },
    { id: 'goddhana', name: 'Gol Dhana & Chunari', time: '18:00' },
    { id: 'sangeet', name: 'Ring Ceremony & Sangeet', time: '20:00' },
  ],
  site: 'https://harshil-pranali-engagement.harshilgoradia123.workers.dev/',
  calendar: '/harshil-pranali-engagement.ics',
};

export function displayTime(time) {
  const [hour, minute] = time.split(':').map(Number);
  return (hour % 12 || 12) + ':' + String(minute).padStart(2, '0') + (hour >= 12 ? ' PM' : ' AM');
}

export function makeCalendar() {
  const utc = local => new Date(local + event.offset).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escape = s => s.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(',', '\\,').replaceAll(';', '\\;');
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Harshil & Pranali//Engagement Celebration//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    'UID:harshil-pranali-engagement-20261227@sonugotchillllled', 'DTSTAMP:20261111T222100Z', 'SEQUENCE:1',
    'DTSTART:' + utc(event.date + 'T' + event.schedule[0].time + ':00'),
    'DTEND:' + utc(event.end), 'SUMMARY:Harshil & Pranali — Engagement Celebration',
    'LOCATION:' + escape(event.venue),
    'DESCRIPTION:' + escape([...event.schedule.map(s => s.name + ' at ' + displayTime(s.time) + ' IST'), event.venue, event.directions].join('\n')),
    'URL:' + event.site, 'STATUS:CONFIRMED', 'END:VEVENT', 'END:VCALENDAR',
  ];
  const encoder = new TextEncoder();
  return content.map(line => {
    let out = '', bytes = 0;
    for (const char of line) {
      const n = encoder.encode(char).length;
      if (bytes + n > 75) { out += '\r\n '; bytes = 1; }
      out += char; bytes += n;
    }
    return out;
  }).join('\r\n') + '\r\n';
}
