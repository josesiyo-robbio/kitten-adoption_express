



const QueryRequests =
{
    SELECT_ALL :
    `SELECT 
        applicant_name, phone, message, social_media_url
    FROM 
        adoption_requests
    WHERE 
        status = 'pending'`,
}

module.exports =  QueryRequests;