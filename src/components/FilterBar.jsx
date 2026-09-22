const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
];

function FilterBar({ value, onChange }) {
  return (
    <div className="filter-bar">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${value === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
