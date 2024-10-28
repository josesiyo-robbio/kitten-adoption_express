


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
    where 
        id = $1
    `
}

module.exports = KittensQuery;