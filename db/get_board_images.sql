SELECT * FROM images
WHERE board_id = $1
ORDER BY image_id;
