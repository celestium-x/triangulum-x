const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const API_URL = BACKEND_URL + '/api/v1';
export const SIGNIN_URL = API_URL + '/sign-in';
export const QUIZ_URL = API_URL + '/quiz';
export const CREATE_QUIZ_URL = QUIZ_URL + '/create-quiz';
export const UPLOAD_IMAGE_URL = API_URL + '/get-presigned-url';
export const GET_OWNER_QUIZ_URL = QUIZ_URL + '/get-quiz';
export const GET_ALL_OWNER_QUIZ_URL = QUIZ_URL + '/get-all-quiz';
export const PUBLISH_QUIZ_URL = QUIZ_URL + '/publish-quiz';
export const LAUNCH_QUIZ_URL = QUIZ_URL + '/launch-quiz';
export const PARTICIPANT_JOIN_QUIZ_URL = QUIZ_URL + '/participant-join-quiz';
export const SPECTATOR_JOIN_QUIZ_URL = QUIZ_URL + '/spectator-join-quiz';
export const LIVE_QUIZ_DATA_URL = QUIZ_URL + '/get-live-quiz-data';
export const REVIEW_URL = API_URL + '/user/review';
export const DELETE_QUIZ_URL = API_URL + '/quiz/delete-quiz';
