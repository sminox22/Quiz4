const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters({ page = 1, name = '', status = '' } = {}) {
  const params = new URLSearchParams();
  params.set('page', page);
  if (name) params.set('name', name);
  if (status) params.set('status', status);

  const response = await fetch(`${BASE_URL}/character?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { pages: 0, count: 0 }, results: [] };
    }
    throw new Error(`Error al consultar la API: ${response.status}`);
  }

  return response.json();
}

export async function fetchCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error(`Error al consultar la API: ${response.status}`);
  }

  return response.json();
}
