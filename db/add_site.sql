INSERT INTO images (site_url, board_id, title)
VALUES ($1, $2, $3);
SELECT board_id, image_url, site_url, reference_url, title, description, Max(image_id) AS image_id FROM images
WHERE site_url = $1
GROUP BY board_id, image_url, site_url, reference_url, title, description;
