



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
}

module.exports =  QueryRequests;