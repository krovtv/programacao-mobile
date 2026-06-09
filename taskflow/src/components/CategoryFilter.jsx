import React from 'react';

const CATEGORIES = [
  { id: 'todas', label: 'Todas', emoji: '' },
  { id: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { id: 'pessoal', label: 'Pessoal', emoji: '🏠' },
  { id: 'estudo', label: 'Estudo', emoji: '📚' },
  { id: 'saude', label: 'Saúde', emoji: '❤️' },
];

const CHIP_STYLES = {
  todas:    { active: { background: '#1A1A2E', color: '#fff' },    inactive: { background: '#F1EFE8', color: '#888780' } },
  trabalho: { active: { background: '#EEEDFe', color: '#5B4FD3', border: '1.5px solid #AFA9EC' }, inactive: { background: '#F1EFE8', color: '#888780' } },
  pessoal:  { active: { background: '#E1F5EE', color: '#0F6E56', border: '1.5px solid #5DCAA5' }, inactive: { background: '#F1EFE8', color: '#888780' } },
  estudo:   { active: { background: '#FAEEDA', color: '#854F0B', border: '1.5px solid #EF9F27' }, inactive: { background: '#F1EFE8', color: '#888780' } },
  saude:    { active: { background: '#FCEBEB', color: '#A32D2D', border: '1.5px solid #F09595' }, inactive: { background: '#F1EFE8', color: '#888780' } },
};

const baseChip = {
  padding: '6px 14px',
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 700,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.15s',
  border: '1.5px solid transparent',
  fontFamily: 'Nunito, sans-serif',
};

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const chipStyle = CHIP_STYLES[cat.id];
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            style={{
              ...baseChip,
              ...(isActive ? chipStyle.active : chipStyle.inactive),
            }}
          >
            {cat.emoji ? `${cat.emoji} ` : ''}{cat.label}
          </button>
        );
      })}
    </div>
  );
}
