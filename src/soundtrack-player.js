// AudioBufferSourceNode wraps within a decoded buffer, without a network seek at
// the loop point. The MP3 is also usable by the native player as a fallback.
export function createSoundtrackPlayer(media, volume = 0.42) {
  let context, gain, source, buffer, loadedUrl, pending, request;
  let offset = 0, startedAt = 0, wanted = false, revision = 0;

  function pause() {
    wanted = false;
    revision++;
    request?.abort();
    request = undefined;
    pending = undefined;
    if (source) {
      offset = (offset + Math.max(0, context.currentTime - startedAt)) % buffer.duration;
      source.stop();
      source.disconnect();
      source = undefined;
    }
    media?.pause();
  }

  async function play(url) {
    if (!media) return false;
    if (wanted && url === loadedUrl) return true;
    if (wanted) pause();
    const id = ++revision;
    wanted = true;
    const isCurrent = () => id === revision;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    try {
      if (AudioContext) {
        context ||= new AudioContext();
        if (!gain) {
          gain = context.createGain();
          gain.connect(context.destination);
        }
        // Request permission to resume while still inside the user's click.
        const resumed = context.resume();
        if (loadedUrl !== url) {
          offset = 0;
          buffer = undefined;
          loadedUrl = url;
        }
        if (!buffer) {
          request = new AbortController();
          pending = fetch(url, { signal: request.signal })
            .then(response => {
              if (!response.ok) throw new Error('Soundtrack unavailable');
              return response.arrayBuffer();
            })
            .then(bytes => context.decodeAudioData(bytes));
        }
        const [, decoded] = await Promise.all([resumed, pending]);
        if (!isCurrent()) return false;
        buffer ||= decoded;
        request = undefined;
        pending = undefined;
        const now = context.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.35);
        source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        startedAt = now;
        source.start(now, offset % buffer.duration);
        return true;
      }
    } catch {
      if (!isCurrent()) return false;
      request?.abort();
      request = undefined;
      pending = undefined;
      source?.disconnect();
      source = undefined;
    }

    try {
      if (media.getAttribute('src') !== url) {
        media.src = url;
        media.load();
      }
      loadedUrl = url;
      media.volume = volume;
      await media.play();
      return isCurrent();
    } catch {
      if (isCurrent()) wanted = false;
      return false;
    }
  }

  return { play, pause, get active() { return wanted; } };
}
