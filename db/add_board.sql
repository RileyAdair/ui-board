INSERT INTO boards (name, id)
VALUES ($1, $2);
SELECT MAX(board_id) AS board_id
FROM boards
WHERE name = $1 AND id = $2;
