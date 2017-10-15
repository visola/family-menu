import axios from 'axios';

export const CREATE_PERSON_REQUEST = 'CREATE_PERSON_REQUEST';
export const CREATE_PERSON_SUCCESSFUL = 'CREATE_PERSON_SUCCESSFUL';
export const CREATE_PERSON_FAILURE = 'CREATE_PERSON_FAILURE';

export const LOAD_PEOPLE_REQUEST = 'LOAD_PEOPLE_REQUEST';
export const LOAD_PEOPLE_SUCCESSFUL = 'LOAD_PEOPLE_SUCCESSFUL';
export const LOAD_PEOPLE_FAILURE = 'LOAD_PEOPLE_FAILURE';

export function createPerson(person) {
  return (dispatch) => {
    dispatch({ type: CREATE_PERSON_REQUEST });

    return axios.post('/api/v1/people', person)
      .then((response) => {
        dispatch({ type: CREATE_PERSON_SUCCESSFUL, person: response.data });
        dispatch(loadPeople());
      })
      .catch((error) => {
        dispatch({ type: CREATE_PERSON_FAILURE, error });
      });
  };
}

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
