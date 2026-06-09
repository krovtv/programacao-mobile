import React from 'react';

const CATEGORY_INFO = {
  trabalho: { emoji: '💼', label: 'Trabalho', color: '#5B4FD3', bg: '#EEEDFe' },
  pessoal:  { emoji: '🏠', label: 'Pessoal',  color: '#0F6E56', bg: '#E1F5EE' },
  estudo:   { emoji: '📚', label: 'Estudo',   color: '#854F0B', bg: '#FAEEDA' },
  saude:    { emoji: '❤️', label: 'Saúde',    color: '#A32D2D', bg: '#FCEBEB' },
};

function StatCard({ label, value, emoji, color }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '14px 16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)', flex: 1, minWidth: 0,
      borderTop: `4px solid ${color}`,
    }}>
      <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#1A1A2E' }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function MiniBar({ label, done, total, color, bg, emoji }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{emoji}</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{label}</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>
          {done}/{total} · {pct}%
        </span>
      </div>
      <div style={{ height: 8, background: '#F0F2F5', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 8, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export default function StatsScreen({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;
  const today = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter((t) => !t.done && t.date < today).length;
  const todayTasks = tasks.filter((t) => t.date === today).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const byPriority = {
    alta:  tasks.filter((t) => t.priority === 'alta'),
    media: tasks.filter((t) => t.priority === 'media'),
    baixa: tasks.filter((t) => t.priority === 'baixa'),
  };

  return (
    <div style={{ padding: 16, background: '#F0F2F5', flex: 1, overflowY: 'auto', paddingBottom: 24 }}>

      {/* Overall progress */}
      <div style={{ background: 'linear-gradient(135deg, #5B4FD3, #7B6FE3)', borderRadius: 20, padding: 20, marginBottom: 16, color: '#fff' }}>
        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85, marginBottom: 4 }}>Progresso geral</div>
        <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>{pct}%</div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: '#fff', borderRadius: 8, transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>{done} de {total} tarefas concluídas</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <StatCard label="Concluídas" value={done}    emoji="✅" color="#1D9E75" />
        <StatCard label="Pendentes"  value={pending} emoji="⏳" color="#BA7517" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <StatCard label="Atrasadas"  value={overdue}    emoji="⚠️" color="#E24B4A" />
        <StatCard label="Para hoje"  value={todayTasks} emoji="📅" color="#5B4FD3" />
      </div>

      {/* By category */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', marginBottom: 14 }}>Por categoria</div>
        {Object.entries(CATEGORY_INFO).map(([key, info]) => {
          const catTasks = tasks.filter((t) => t.category === key);
          const catDone = catTasks.filter((t) => t.done).length;
          return (
            <MiniBar key={key} label={info.label} done={catDone} total={catTasks.length}
              color={info.color} bg={info.bg} emoji={info.emoji} />
          );
        })}
      </div>

      {/* By priority */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', marginBottom: 14 }}>Por prioridade</div>
        {[
          { key: 'alta',  label: 'Alta',  color: '#E24B4A', bg: '#FCEBEB', emoji: '🔴' },
          { key: 'media', label: 'Média', color: '#BA7517', bg: '#FAEEDA', emoji: '🟡' },
          { key: 'baixa', label: 'Baixa', color: '#1D9E75', bg: '#E1F5EE', emoji: '🟢' },
        ].map((p) => {
          const ptasks = byPriority[p.key];
          const pdone = ptasks.filter((t) => t.done).length;
          return <MiniBar key={p.key} label={p.label} done={pdone} total={ptasks.length}
            color={p.color} bg={p.bg} emoji={p.emoji} />;
        })}
      </div>
    </div>
  );
}
