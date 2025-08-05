const fs = require('fs');

const canal = "LIVE$SIC_HD";
const baseSegmento = 17543840737868290; // Segmento que corresponde às 10h
const incremento = 60000000;
const horaAtual = new Date().getHours();

const baseUrl = `https://cdn-er-vspp-pcs1-mp.online.meo.pt/shls/${canal}/index.m3u8/S!d2EMQU5EUk9JRF9MaXZlEgZU.v...wEWDJ8_/Level(3000000)/Segment`;

const linhas = [
  "#EXTM3U",
  "#EXT-X-VERSION:3",
  "#EXT-X-TARGETDURATION:6",
  "#EXT-X-PLAYLIST-TYPE:VOD"
];

// 🔁 Gera apenas blocos de horaAtual até às 23h
for (let h = horaAtual; h < 24; h++) {
  const horaFormatada = h.toString().padStart(2, '0');

  // 📌 Corrigido: cálculo com base na referência das 10h
  const horasDesdeBase = h - 10;
  if (horasDesdeBase < 0) continue; // Evita gerar blocos antes das 10h

  const baseHora = baseSegmento + horasDesdeBase * 3600 * incremento / 6;

  linhas.push("");
  linhas.push(`#EXT-X-DISCONTINUITY`);
  linhas.push(`#EXT-X-TIME-START: Hora ${horaFormatada}:00`);

  for (let i = 0; i < 600; i++) {
    const segmento = baseHora + i * incremento;
    linhas.push(`#EXTINF:6.0,`);
    linhas.push(`${baseUrl}(${segmento}).ts`);
  }
}

// ✅ Gera o ficheiro final
fs.writeFileSync("video_playlist.m3u", linhas.join('\n'));
