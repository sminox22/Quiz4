function CharacterDetail({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-avatar">
          <img src={character.image} alt={character.name} loading="lazy" decoding="async" />
        </div>
        <h2>{character.name}</h2>
        <ul className="modal-details">
          <li>
            <strong>Estado:</strong> {character.status}
          </li>
          <li>
            <strong>Especie:</strong> {character.species}
          </li>
          <li>
            <strong>Género:</strong> {character.gender}
          </li>
          <li>
            <strong>Origen:</strong> {character.origin?.name}
          </li>
          <li>
            <strong>Ubicación actual:</strong> {character.location?.name}
          </li>
          <li>
            <strong>Episodios:</strong> {character.episode?.length}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
