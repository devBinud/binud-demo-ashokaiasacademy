import { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

export default function CustomSelect({ id, name, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Decide open direction based on space below
  const handleToggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUp(spaceBelow < 240);
    }
    setOpen((v) => !v);
  };

  const selected = options.find((o) => o === value);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt } });
    setOpen(false);
  };

  return (
    <div className={`cselect${open ? ' cselect--open' : ''}`} ref={ref}>
      <button
        type="button"
        id={id}
        className="cselect__trigger input"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`cselect__value${!selected ? ' cselect__value--placeholder' : ''}`}>
          {selected || placeholder}
        </span>
        <svg
          className="cselect__chevron"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul
          className={`cselect__dropdown${openUp ? ' cselect__dropdown--up' : ''}`}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`cselect__option${opt === value ? ' cselect__option--selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
