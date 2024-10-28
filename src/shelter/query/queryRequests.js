



const QueryRequests =
{
    SELECT_ALL :
    `SELECT 
        applicant_name, phone, message, social_media_url
    FROM 
        adoption_requests
    WHERE 
        status = 'pending'`,



    UPDATE_APPROVE_OR_NOT:
    `
    UPDATE 
        adoption_requests 
    SET
        status = $2 WHERE id = $1
    RETURNING status;
    `,



    SELECT_ONE:
    `SELECT 
        applicant_name, phone, email, message, social_media_url, status
    FROM
        adoption_requests
    WHERE 
        id = $1`,


    INSERT_NEW_ONE:
    `INSERT INTO 
    adoption_requests 
        (kitten_id, applicant_name, phone, email, message, social_media_url) 
    VALUES 
        ($1, $2, $3, $4, $5, $6)
    RETURNING applicant_name`,



    SELECT_ONE_KITTY:
        `
    SELECT 
        name, age, breed, description, photo
    FROM 
        kittens
    where 
        id = $1 AND adopted = false;
    `,

    UPDATE_KITTEN:
    `UPDATE
        kittens
    SET
        adopted = true
    WHERE  
        id = $1
    RETURNING 
        name`
}

module.exports =  QueryRequests;