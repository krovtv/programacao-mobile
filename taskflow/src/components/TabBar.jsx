import React from 'react';

const TABS = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'concluidas', label: 'Concluídas' },
  { id: 'hoje', label: 'Hoje' },
];

const styles = {
  wrapper: {
    display: 'flex',
    background: '#fff',
    padding: '6px 20px 0',
    borderBottom: '1.5px solid #E5E7EB',
    overflowX: 'auto',
  },
  tab: {
    padding: '10px 14px',
    fontSize: 13,
    fontWeight: 600,
    color: '#6B7280',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    borderBottom: '2.5px solid transparent',
    marginBottom: -1.5,
    transition: 'color 0.2s, border-color 0.2s',
    fontFamily: 'Nunito, sans-serif',
    background: 'none',
    border: 'none',
    borderBottom: '2.5px solid transparent',
  },
  tabActive: {
    color: '#5B4FD3',
    borderBottomColor: '#5B4FD3',
  },
};

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div style={styles.wrapper}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            ...styles.tab,
            ...(activeTab === tab.id ? styles.tabActive : {}),
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
