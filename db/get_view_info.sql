SELECT b.name, i.board_id, i.image_id, i.title, i.description, i.image_url, i.reference_url, i.site_url
FROM boards b
LEFT JOIN images i ON i.board_id = b.board_id
WHERE i.image_id = $1;
