import axios from 'axios';

export const LOAD_PEOPLE_REQUEST = 'LOAD_PEOPLE_REQUEST';
export const LOAD_PEOPLE_SUCCESSFUL = 'LOAD_PEOPLE_SUCCESSFUL';
export const LOAD_PEOPLE_FAILURE = 'LOAD_PEOPLE_FAILURE';

export function loadPeople() {
  return (dispatch) => {
    dispatch({ type: LOAD_PEOPLE_REQUEST });

    return axios.get('/api/v1/people')
      .then((response) => {
        dispatch({ type: LOAD_PEOPLE_SUCCESSFUL, people: response.data.content });
      }).catch((error) => {
        dispatch({ type: LOAD_PEOPLE_FAILURE, error });
      });
  };
}
