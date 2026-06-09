import React from 'react';

const styles = {
  header: {
    background: 'linear-gradient(135deg, #5B4FD3 0%, #7B6FE3 100%)',
    padding: '20px 20px 24px',
    color: '#fff',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  greeting: {
    fontSize: 13,
    opacity: 0.85,
    fontWeight: 500,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    userSelect: 'none',
  },
  statsRow: {
    display: 'flex',
    gap: 10,
    marginTop: 4,
  },
  statPill: {
    background: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 700,
    backdropFilter: 'blur(4px)',
  },
  progressBar: {
    height: 6,
    background: 'rgba(255,255,255,0.25)',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    background: '#fff',
    borderRadius: 6,
    transition: 'width 0.5s ease',
  },
  progressLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 600,
    marginTop: 5,
    textAlign: 'right',
  },
  searchBar: {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  searchInput: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nunito, sans-serif',
    width: '100%',
    fontWeight: 500,
  },
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia! 👋';
  if (hour < 18) return 'Boa tarde! 👋';
  return 'Boa noite! 👋';
}

export default function Header({ tasks, searchTerm, onSearchChange }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={styles.header}>
      <div style={styles.headerTop}>
        <div>
          <div style={styles.greeting}>{getGreeting()}</div>
          <div style={styles.title}>Minhas Tarefas</div>
        </div>
        <div style={styles.avatar}>JD</div>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statPill}>⬜ {total} tarefa{total !== 1 ? 's' : ''}</div>
        <div style={styles.statPill}>✅ {done} concluída{done !== 1 ? 's' : ''}</div>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${pct}%` }} />
      </div>
      <div style={styles.progressLabel}>{pct}% concluído</div>

      <div style={styles.searchBar}>
        <span style={{ fontSize: 16, opacity: 0.7 }}>🔍</span>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Buscar tarefas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
