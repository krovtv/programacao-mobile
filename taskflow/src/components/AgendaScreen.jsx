import React, { useState } from 'react';

const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const PRIORITY_COLORS = { alta: '#E24B4A', media: '#BA7517', baixa: '#1D9E75' };
const CAT_EMOJI = { trabalho: '💼', pessoal: '🏠', estudo: '📚', saude: '❤️' };

export default function AgendaScreen({ tasks }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const tasksByDate = {};
  tasks.forEach((t) => {
    if (!tasksByDate[t.date]) tasksByDate[t.date] = [];
    tasksByDate[t.date].push(t);
  });

  const selectedTasks = tasksByDate[selectedDate] || [];

  const formatSelected = () => {
    const [y, m, d] = selectedDate.split('-');
    return `${d} de ${MONTHS_PT[Number(m) - 1]}`;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ padding: 16, background: '#F0F2F5', flex: 1, overflowY: 'auto', paddingBottom: 24 }}>
      {/* Calendar card */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        {/* Month navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button onClick={prevMonth} style={navBtn}>‹</button>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E' }}>
            {MONTHS_PT[month]} {year}
          </span>
          <button onClick={nextMonth} style={navBtn}>›</button>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
          {DAYS_PT.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#9CA3AF', padding: '2px 0' }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === today.toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate;
            const hasTasks = tasksByDate[dateStr]?.length > 0;
            const hasUndone = tasksByDate[dateStr]?.some((t) => !t.done);

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                style={{
                  textAlign: 'center',
                  padding: '6px 2px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  background: isSelected ? '#5B4FD3' : isToday ? '#EEEDFe' : 'transparent',
                  position: 'relative',
                }}
              >
                <span style={{
                  fontSize: 13,
                  fontWeight: isToday || isSelected ? 800 : 500,
                  color: isSelected ? '#fff' : isToday ? '#5B4FD3' : '#1A1A2E',
                }}>
                  {day}
                </span>
                {hasTasks && (
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: isSelected ? '#fff' : hasUndone ? '#E24B4A' : '#1D9E75',
                    margin: '2px auto 0',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tasks for selected day */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E' }}>📅 {formatSelected()}</span>
        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{selectedTasks.length} tarefa{selectedTasks.length !== 1 ? 's' : ''}</span>
      </div>

      {selectedTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: '#9CA3AF' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🗓️</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Nenhuma tarefa neste dia</div>
        </div>
      ) : (
        selectedTasks.map((t) => (
          <div key={t.id} style={{
            background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 8,
            borderLeft: `4px solid ${PRIORITY_COLORS[t.priority]}`,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: 10,
            opacity: t.done ? 0.6 : 1,
          }}>
            <span style={{ fontSize: 18 }}>{CAT_EMOJI[t.category]}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>{t.category} · prioridade {t.priority}</div>
            </div>
            {t.done && <span style={{ fontSize: 16 }}>✅</span>}
          </div>
        ))
      )}
    </div>
  );
}

const navBtn = {
  background: '#F0F2F5', border: 'none', borderRadius: 10,
  width: 32, height: 32, fontSize: 18, fontWeight: 700,
  cursor: 'pointer', color: '#1A1A2E', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  fontFamily: 'Nunito, sans-serif',
};
