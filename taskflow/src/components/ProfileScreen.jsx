import React, { useState } from 'react';

export default function ProfileScreen({ tasks }) {
  const [name, setName] = useState('João Dev');
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [darkNotif, setDarkNotif] = useState(true);
  const [soundNotif, setSoundNotif] = useState(false);

  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const streak = 5; // simulated streak

  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const saveEdit = () => { setName(tempName); setEditing(false); };

  return (
    <div style={{ padding: 16, background: '#F0F2F5', flex: 1, overflowY: 'auto', paddingBottom: 24 }}>

      {/* Avatar + name */}
      <div style={{
        background: 'linear-gradient(135deg, #5B4FD3, #7B6FE3)',
        borderRadius: 20, padding: '24px 16px', textAlign: 'center', marginBottom: 16, color: '#fff',
      }}>
        <div style={{
          width: 68, height: 68, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 800, margin: '0 auto 10px',
          border: '3px solid rgba(255,255,255,0.4)',
        }}>
          {initials}
        </div>

        {editing ? (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 10, padding: '6px 12px', color: '#fff', fontSize: 14,
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, outline: 'none', width: 160,
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
              autoFocus
            />
            <button onClick={saveEdit} style={{ background: '#fff', color: '#5B4FD3', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>✓</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>{name}</span>
            <button onClick={() => { setTempName(name); setEditing(true); }}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 6, padding: '3px 8px', color: '#fff', cursor: 'pointer', fontSize: 12, fontFamily: 'Nunito, sans-serif' }}>
              ✏️ editar
            </button>
          </div>
        )}
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Estudante de Programação Mobile</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{total}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Tarefas</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{done}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Concluídas</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{streak}🔥</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Dias seguidos</div>
          </div>
        </div>
      </div>

      {/* Notifications settings */}
      <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 16 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F2F5' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notificações</div>
        </div>
        <ToggleRow label="Lembretes de tarefas" emoji="🔔" value={darkNotif} onChange={setDarkNotif} />
        <ToggleRow label="Sons e vibrações" emoji="🔊" value={soundNotif} onChange={setSoundNotif} last />
      </div>

      {/* App info */}
      <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 16 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F2F5' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sobre o app</div>
        </div>
        <InfoRow emoji="📱" label="Versão" value="1.0.0" />
        <InfoRow emoji="⚛️" label="Tecnologia" value="React" />
        <InfoRow emoji="🎓" label="Disciplina" value="Prog. Mobile" last />
      </div>

      {/* Achievement */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Conquistas</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { emoji: '🚀', label: 'Primeira tarefa', unlocked: total >= 1 },
            { emoji: '🔥', label: '5 dias seguidos', unlocked: streak >= 5 },
            { emoji: '✅', label: '5 concluídas', unlocked: done >= 5 },
            { emoji: '🏆', label: '10 tarefas', unlocked: total >= 10 },
          ].map((a) => (
            <div key={a.label} style={{
              background: a.unlocked ? '#EEEDFe' : '#F0F2F5',
              borderRadius: 12, padding: '8px 12px', textAlign: 'center', flex: '1 0 calc(50% - 5px)',
              opacity: a.unlocked ? 1 : 0.4,
            }}>
              <div style={{ fontSize: 22 }}>{a.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: a.unlocked ? '#5B4FD3' : '#9CA3AF', marginTop: 4 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, emoji, value, onChange, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 16px', borderBottom: last ? 'none' : '1px solid #F0F2F5',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{label}</span>
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
          background: value ? '#5B4FD3' : '#D1D5DB',
          position: 'relative', transition: 'background 0.2s',
        }}
      >
        <div style={{
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 3, left: value ? 23 : 3,
          transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </div>
    </div>
  );
}

function InfoRow({ emoji, label, value, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 16px', borderBottom: last ? 'none' : '1px solid #F0F2F5',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{label}</span>
      </div>
      <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600 }}>{value}</span>
    </div>
  );
}
