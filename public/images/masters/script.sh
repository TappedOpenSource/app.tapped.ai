format=*.png
for i in $format;
do
 if [[ "$i" == "$format" ]]
 then
    echo "No Files"
 else
   name=$(basename -- "$i")
    echo "file name $name"
  ffmpeg -hide_banner -loglevel error -i "$name" -vf crop="iw:iw" "tmp/$name.1-1.png"
  ffmpeg -hide_banner -loglevel error -i "tmp/$name.1-1.png" -vf scale=512:512 "output/$name.512x512.png"
 fi
done 
