// Cloudflare static assets return the complete file even for a Range request.
// Only the three small soundtrack loops are routed here by wrangler.jsonc.
export default {
  async fetch(request, env) {
    const range = request.headers.get('Range');
    const match = request.method === 'GET' && range?.match(/^bytes=(\d*)-(\d*)$/i);
    if (!match || (!match[1] && !match[2])) return env.ASSETS.fetch(request);

    const assetHeaders = new Headers(request.headers);
    assetHeaders.delete('Range');
    const asset = await env.ASSETS.fetch(new Request(request, { headers: assetHeaders }));
    if (asset.status !== 200) return asset;

    const ifRange = request.headers.get('If-Range');
    const etag = asset.headers.get('ETag');
    if (ifRange && !((!ifRange.startsWith('W/') && ifRange === etag) ||
        ifRange === asset.headers.get('Last-Modified'))) return asset;

    const bytes = await asset.arrayBuffer();
    const length = bytes.byteLength;
    const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
    const end = match[1] && match[2] ? Math.min(Number(match[2]), length - 1) : length - 1;
    const headers = new Headers(asset.headers);
    headers.set('Accept-Ranges', 'bytes');
    if (start >= length || start > end) {
      headers.set('Content-Range', `bytes */${length}`);
      headers.set('Content-Length', '0');
      return new Response(null, { status: 416, headers });
    }

    headers.set('Content-Range', `bytes ${start}-${end}/${length}`);
    headers.set('Content-Length', String(end - start + 1));
    return new Response(bytes.slice(start, end + 1), { status: 206, headers });
  },
};
