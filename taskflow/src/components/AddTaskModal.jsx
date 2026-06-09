import React, { useState, useEffect } from 'react';

const today = new Date().toISOString().split('T')[0];

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 50,
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    background: '#fff',
    borderRadius: '24px 24px 0 0',
    padding: '24px 20px 32px',
    width: '100%',
    maxWidth: 430,
    animation: 'slideUp 0.25s ease-out',
  },
  handle: {
    width: 36,
    height: 4,
    background: '#E5E7EB',
    borderRadius: 4,
    margin: '0 auto 18px',
  },
  title: {
    fontSize: 17,
    fontWeight: 800,
    color: '#1A1A2E',
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: '#6B7280',
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 12,
    border: '1.5px solid #E5E7EB',
    fontSize: 14,
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 500,
    color: '#1A1A2E',
    outline: 'none',
    background: '#FAFAFA',
    transition: 'border-color 0.2s',
    marginBottom: 14,
  },
  row: {
    display: 'flex',
    gap: 10,
  },
  btn: {
    width: '100%',
    padding: 13,
    background: '#5B4FD3',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    fontFamily: 'Nunito, sans-serif',
    cursor: 'pointer',
    marginTop: 6,
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
};

export default function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('trabalho');
  const [priority, setPriority] = useState('media');
  const [date, setDate] = useState(today);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleAdd = () => {
    if (!title.trim()) {
      setError(true);
      setTimeout(() => setError(false), 1200);
      return;
    }
    onAdd({ title: title.trim(), category, priority, date: date || today });
    onClose();
  };

  const selectStyle = {
    ...styles.input,
    marginBottom: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
      <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={styles.modal}>
          <div style={styles.handle} />
          <div style={styles.title}>Nova Tarefa ✨</div>

          <div>
            <label style={styles.label}>Título da tarefa</label>
            <input
              style={{ ...styles.input, borderColor: error ? '#E24B4A' : '#E5E7EB' }}
              type="text"
              placeholder="O que precisa ser feito?"
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
              autoFocus
            />
          </div>

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Categoria</label>
              <select
                style={selectStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="trabalho">💼 Trabalho</option>
                <option value="pessoal">🏠 Pessoal</option>
                <option value="estudo">📚 Estudo</option>
                <option value="saude">❤️ Saúde</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Prioridade</label>
              <select
                style={selectStyle}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="alta">🔴 Alta</option>
                <option value="media">🟡 Média</option>
                <option value="baixa">🟢 Baixa</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={styles.label}>Prazo</label>
            <input
              style={styles.input}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button style={styles.btn} onClick={handleAdd}>
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </>
  );
}
