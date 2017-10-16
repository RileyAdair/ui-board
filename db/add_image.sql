INSERT INTO images (image_url, board_id, title)
VALUES ($1, $2, $3);
SELECT * FROM images
WHERE image_url = $1;
