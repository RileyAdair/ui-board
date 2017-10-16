DELETE FROM images
WHERE board_id = $1;
DELETE FROM boards
WHERE board_id = $1;
