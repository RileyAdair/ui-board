SELECT DISTINCT ON (board_id) b.board_id, b.name, x.image_url, x.site_url, i.image_id
FROM boards b
JOIN users u ON u.id = b.id
LEFT JOIN

(SELECT board_id, MIN(image_id) AS image_id
FROM images
GROUP BY board_id) i
ON b.board_id = i.board_id

LEFT JOIN images x
ON i.board_id = x.board_id
AND i.image_id = x.image_id
WHERE u.id = $1;
