const fs = require('fs');

const canal = "LIVE$SIC_HD";
const baseSegmento = 17543840737868290; // Segmento inicial das 10h da manhã
const incremento = 60000000;
const horaAtual = new Date().getHours();

const baseUrl = `https://cdn-er-vspp-pcs1-mp.online.meo.pt/shls/${canal}/index.m3u8/S!d2EMQU5EUk9JRF9MaXZlEgZU.v...wEWDJ8_/Level(3000000)/Segment`;

const linhas = [
  "#EXTM3U",
  "#EXT-X-VERSION:3",
  "#EXT-X-TARGETDURATION:6",
  "#EXT-X-PLAYLIST-TYPE:VOD"
];

// ✅ Corrigido: começa na horaAtual (não +1)
for (let h = horaAtual; h <= 23; h++) {
  const horaUTC = (10 + h) % 24;
  const baseHora = baseSegmento + h * 3600 * incremento / 6;

  linhas.push("");
  linhas.push(`#EXT-X-DISCONTINUITY`);
  linhas.push(`#EXT-X-TIME-START: Hora ${horaUTC.toString().padStart(2, '0')}:00`);

  for (let i = 0; i < 600; i++) {
    const segmento = baseHora + i * incremento;
    linhas.push(`#EXTINF:6.0,`);
    linhas.push(`${baseUrl}(${segmento}).ts`);
  }
}

// ✅ Corrigido: método completo para escrever o ficheiro
fs.writeFileSync("video_playlist.m3u", linhas.join('\n'));
