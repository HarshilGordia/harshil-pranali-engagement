import { defineConfig } from 'vite';
import { event, displayTime, makeCalendar } from './src/event.mjs';
const date = new Intl.DateTimeFormat('en-GB', {dateStyle:'full', timeZone:event.timezone}).format(new Date(event.date + 'T12:00:00' + event.offset));
const tokens = {
  date, dateIso:event.date, venue:event.venue, directions:event.directions, calendar:event.calendar,
  ...Object.fromEntries(event.schedule.flatMap((s,i) => [[`time${i}`,displayTime(s.time)],[`iso${i}`,`${event.date}T${s.time}:00${event.offset}`],[`name${i}`,s.name]])),
};
const html = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export default defineConfig({
  plugins: [{
    name: 'invitation-event-details',
    transformIndexHtml: { order:'pre', handler(markup) {
      return markup.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        if (!(key in tokens)) throw new Error('Unknown event token: ' + key);
        return html(tokens[key]);
      });
    }},
    configureServer(server) {
      server.middlewares.use((req,res,next) => {
        if (req.url?.split('?')[0] !== event.calendar) return next();
        res.setHeader('Content-Type','text/calendar; charset=utf-8');
        res.end(makeCalendar());
      });
    },
    generateBundle() {
      this.emitFile({ type:'asset', fileName:event.calendar.slice(1), source:makeCalendar() });
    },
  }],
});
