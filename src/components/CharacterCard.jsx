import { useState } from 'react';

const STATUS_COLOR = {
  Alive: '#97ce4c',
  Dead: '#ff4d4d',
  unknown: '#4dd0e1',
};

function CharacterCard({ character, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="character-card" onClick={() => onSelect(character)}>
      <div className="card-media">
        <div className={`media-skeleton ${loaded ? 'is-hidden' : ''}`} />
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={loaded ? 'is-loaded' : ''}
        />
        <div className="portal-sheen" aria-hidden="true" />
      </div>
      <div className="character-info">
        <h3>{character.name}</h3>
        <p>
          <span
            className="status-dot"
            style={{ backgroundColor: STATUS_COLOR[character.status] || '#9e9e9e' }}
          />
          {character.status} - {character.species}
        </p>
        <p className="location">Última ubicación: {character.location?.name}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
