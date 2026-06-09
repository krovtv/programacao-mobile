import React, { useState } from 'react';

const CATEGORY_LABELS = {
  trabalho: { emoji: '💼', label: 'Trabalho', bg: '#EEEDFe', color: '#5B4FD3' },
  pessoal:  { emoji: '🏠', label: 'Pessoal',  bg: '#E1F5EE', color: '#0F6E56' },
  estudo:   { emoji: '📚', label: 'Estudo',   bg: '#FAEEDA', color: '#854F0B' },
  saude:    { emoji: '❤️', label: 'Saúde',    bg: '#FCEBEB', color: '#A32D2D' },
};

const PRIORITY_COLORS = {
  alta:  '#E24B4A',
  media: '#BA7517',
  baixa: '#1D9E75',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const today = new Date().toISOString().split('T')[0];
  const [y, m, d] = dateStr.split('-');
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const diff = Math.floor((date - todayDate) / (1000 * 60 * 60 * 24));

  if (diff === 0)  return { label: '📅 Hoje', overdue: false };
  if (diff === 1)  return { label: '📅 Amanhã', overdue: false };
  if (diff === -1) return { label: '⚠️ Ontem', overdue: true };
  if (diff < 0)    return { label: `⚠️ Atrasada ${Math.abs(diff)}d`, overdue: true };
  return { label: `📅 ${d}/${m}`, overdue: false };
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_LABELS[task.category];
  const dateInfo = formatDate(task.date);
  const priorityColor = PRIORITY_COLORS[task.priority];

  const cardStyle = {
    background: '#fff',
    borderRadius: 16,
    padding: '14px 16px',
    marginBottom: 10,
    boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transform: hovered ? 'translateY(-1px)' : 'none',
    transition: 'transform 0.15s, box-shadow 0.15s',
    borderLeft: `4px solid ${priorityColor}`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    position: 'relative',
    opacity: task.done ? 0.65 : 1,
  };

  const checkboxStyle = {
    width: 22,
    height: 22,
    borderRadius: '50%',
    border: task.done ? 'none' : '2.5px solid #D1D5DB',
    background: task.done ? '#1D9E75' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s',
    marginTop: 1,
    color: '#fff',
    fontSize: 13,
    fontWeight: 800,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={checkboxStyle} onClick={() => onToggle(task.id)}>
        {task.done && '✓'}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: task.done ? '#9CA3AF' : '#1A1A2E',
            marginBottom: 5,
            lineHeight: 1.3,
            textDecoration: task.done ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 8,
              background: cat.bg,
              color: cat.color,
            }}
          >
            {cat.emoji} {cat.label}
          </span>
          {dateInfo && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: !task.done && dateInfo.overdue ? '#E24B4A' : '#6B7280',
              }}
            >
              {dateInfo.label}
            </span>
          )}
        </div>
      </div>

      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#FCEBEB',
            color: '#E24B4A',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
