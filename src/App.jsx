import { useEffect, useState } from 'react';
import { fetchCharacters } from './api/rickAndMorty';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import CharacterDetail from './components/CharacterDetail';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reinicia a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // Debounce de la búsqueda para no disparar una petición por cada tecla
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);

      fetchCharacters({ page, name: search, status })
        .then((data) => {
          if (cancelled) return;
          setCharacters(data.results ?? []);
          setTotalPages(data.info?.pages ?? 1);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.message);
          setCharacters([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [page, search, status]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="portal-ring" aria-hidden="true" />
        <h1>Rick and Morty Explorer</h1>
        <p className="subtitle">
          Datos en vivo desde{' '}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
            rickandmortyapi.com
          </a>
        </p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar value={status} onChange={setStatus} />
      </div>

      {loading && <p className="loading-message">Abriendo un portal a la dimensión C-137...</p>}
      {error && <p className="error-message">Wubba lubba dub dub! Algo salió mal: {error}</p>}

      {!loading && !error && (
        <>
          <CharacterList characters={characters} onSelect={setSelected} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <CharacterDetail character={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
