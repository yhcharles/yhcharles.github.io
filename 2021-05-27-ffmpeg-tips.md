# ffmpeg tips

https://opensource.com/article/17/6/ffmpeg-convert-media-file-formats



change video resolution but keep aspect ratio: with  `scale=x:y`

`ffmpeg -i input.mp4 -vf scale=320:-2 output.mp4`

