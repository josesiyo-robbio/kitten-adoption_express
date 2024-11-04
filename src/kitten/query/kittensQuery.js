


const KittensQuery = 
{
    SELECT_ALL_KITTENS :
    `
    SELECT 
        name, age, breed, description, photo
    FROM
        kittens
    WHERE 
        adopted = false
    `,


    SELECT_ONE_KITTY:
    `
    SELECT 
        name, age, breed, description, photo
    FROM 
        kittens
    WHERE 
        id = $1
    `,


    INSERT_ONE_KITTY:
    `INSERT INTO 
    kittens 
        (name, age, breed, description, photo) 
    VALUES 
        ($1, $2, $3, $4, $5)
    RETURNING 
        name, age, breed, description, photo
    `,


    UPDATE_ADEOPTED :
    `UPDATE 
        kittens 
    SET 
        adopted = TRUE WHERE id = $1
    RETURNING 
        name;
    `,


    UPDATE_ONE_KITTY:
    `
    UPDATE 
        kittens 
    SET 
        name = $2, age = $3, breed = '$4', description = $5, photo = $6
    WHERE 
        id = $1;
    `
}

module.exports = KittensQuery;