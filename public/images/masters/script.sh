#!/usr/bin/env bash

shopt -s nocaseglob

# out_dir="$HOME/Repos/Tapped/getmusicart.com/public/images/marque/"

for input_file in *.png *.jpg *.jpeg; do
  echo "[FILE] $input_file"

  ffmpeg -hide_banner -loglevel error -i $input_file -vf crop="iw:iw" "1-1.$input_file"

  ffmpeg -hide_banner -loglevel error -i "$input_file" -vf scale=512:512 "512.$input_file"
done;
