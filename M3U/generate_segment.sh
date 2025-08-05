#!/bin/bash
set -e

cd data

incremento=60000000
baseSegmento=$(date +%s%N)

echo "#EXTM3U" > video_playlist.m3u
echo "#EXT-X-VERSION:3" >> video_playlist.m3u
echo "#EXT-X-TARGETDURATION:6" >> video_playlist.m3u
echo "#EXT-X-PLAYLIST-TYPE:VOD" >> video_playlist.m3u

for h in $(seq 0 23); do
  horaUTC=$(((10 + h) % 24))
  baseHora=$((baseSegmento + h * 3600 * incremento / 6))

  echo "" >> video_playlist.m3u
  echo "#EXT-X-DISCONTINUITY" >> video_playlist.m3u
  echo "#EXT-X-TIME-START: Hora $(printf "%02d" ${horaUTC}):00" >> video_playlist.m3u

  for i in $(seq 0 599); do
    segmento=$((baseHora + i * incremento))
    echo "#EXTINF:6.0," >> video_playlist.m3u
    echo "https://cdn-er-vspp-pcs1-mp.online.meo.pt/shls/LIVE\$SIC_HD/index.m3u8/S!d2EMQU5EUk9JRF9MaXZlEgZU.v...wEWDJ8_/Level(3000000)/Segment(${segmento}).ts" >> video_playlist.m3u
  done
done
