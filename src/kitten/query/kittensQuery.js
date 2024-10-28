


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
    `
}

module.exports = KittensQuery;