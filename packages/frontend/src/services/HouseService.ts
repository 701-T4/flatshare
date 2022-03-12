import { auth } from './firebase';

export const HouseServices = {
  joinHouse,
  createHouse,
};

async function joinHouse(houseCode: string) {
  const token = await auth.currentUser?.getIdToken();

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ houseCode }),
  };

  console.log(process.env.PUBLIC_URL);

  return fetch(process.env.REACT_APP_ENDPOINT + '/api/v1/house', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

async function createHouse(newHouse: any) {
  const token = await auth.currentUser?.getIdToken();

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(newHouse),
  };

  return fetch(process.env.REACT_APP_ENDPOINT + '/api/v1/house', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
