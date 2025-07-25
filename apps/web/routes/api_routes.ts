const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const API_URL = BACKEND_URL + '/api/v1'
export const SIGNIN_URL = API_URL + '/sign-in'
export const QUIZ_URL = API_URL + '/quiz'
export const CREATE_QUIZ_URL = QUIZ_URL + '/create-quiz'
export const UPLOAD_IMAGE_URL = API_URL + '/get-presigned-url'
export const GET_OWNER_QUIZ_URL = QUIZ_URL + '/get-quiz'