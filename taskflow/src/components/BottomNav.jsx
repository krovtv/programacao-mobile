import React from 'react';

const NAV_ITEMS = [
  { id: 'tarefas',  label: 'Tarefas',  emoji: '📋' },
  { id: 'agenda',   label: 'Agenda',   emoji: '📅' },
  { id: 'stats',    label: 'Stats',    emoji: '📊' },
  { id: 'perfil',   label: 'Perfil',   emoji: '👤' },
];

export default function BottomNav({ activeNav, onNavChange }) {
  return (
    <div
      style={{
        background: '#fff',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        height: 60,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeNav === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              cursor: 'pointer',
              color: isActive ? '#5B4FD3' : '#6B7280',
              fontSize: 10,
              fontWeight: 700,
              background: 'none',
              border: 'none',
              fontFamily: 'Nunito, sans-serif',
              transition: 'color 0.2s',
            }}
          >
            <span style={{ fontSize: 20 }}>{item.emoji}</span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
