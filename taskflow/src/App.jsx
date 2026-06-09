import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import CategoryFilter from './components/CategoryFilter';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import BottomNav from './components/BottomNav';
import AgendaScreen from './components/AgendaScreen';
import StatsScreen from './components/StatsScreen';
import ProfileScreen from './components/ProfileScreen';
import initialTasks from './data/initialTasks';

let nextId = 100;

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('todas');
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeNav, setActiveNav] = useState('tarefas');

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (activeCategory !== 'todas') result = result.filter((t) => t.category === activeCategory);
    if (activeTab === 'pendentes')  result = result.filter((t) => !t.done);
    if (activeTab === 'concluidas') result = result.filter((t) => t.done);
    if (activeTab === 'hoje')       result = result.filter((t) => t.date === today);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    const priorityOrder = { alta: 0, media: 1, baixa: 2 };
    result.sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return result;
  }, [tasks, activeTab, activeCategory, searchTerm, today]);

  const handleToggle = (id) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const handleDelete = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const handleAdd = ({ title, category, priority, date }) => {
    setTasks((prev) => [{ id: nextId++, title, category, priority, date, done: false }, ...prev]);
  };

  const navTitles = { tarefas: 'Minhas Tarefas', agenda: 'Agenda', stats: 'Estatísticas', perfil: 'Perfil' };

  const renderContent = () => {
    if (activeNav === 'agenda') return <AgendaScreen tasks={tasks} />;
    if (activeNav === 'stats')  return <StatsScreen tasks={tasks} />;
    if (activeNav === 'perfil') return <ProfileScreen tasks={tasks} />;

    return (
      <div style={{ flex: 1, padding: '16px 16px 16px', overflowY: 'auto', background: '#F0F2F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Filtrar por categoria</span>
        </div>
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>
            {filteredTasks.length} tarefa{filteredTasks.length !== 1 ? 's' : ''}
          </span>
          <button onClick={() => setShowModal(true)} style={{ fontSize: 12, color: '#5B4FD3', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>
            + Nova tarefa
          </button>
        </div>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9CA3AF' }}>
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>📭</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Nenhuma tarefa aqui!<br />Toque em + para adicionar.</div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 32, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.15)', minHeight: 720,
      display: 'flex', flexDirection: 'column',
      border: '8px solid #1A1A2E', position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{ background: '#1A1A2E', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>9:41</span>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>⚡ 87%</span>
      </div>

      {/* Header — only on tarefas screen */}
      {activeNav === 'tarefas' && (
        <Header tasks={tasks} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      )}

      {/* Compact header for other screens */}
      {activeNav !== 'tarefas' && (
        <div style={{ background: 'linear-gradient(135deg, #5B4FD3, #7B6FE3)', padding: '16px 20px', color: '#fff' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{navTitles[activeNav]}</div>
        </div>
      )}

      {/* Tabs — only on tarefas */}
      {activeNav === 'tarefas' && (
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {renderContent()}
      </div>

      {/* FAB — only on tarefas */}
      {activeNav === 'tarefas' && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: 'absolute', bottom: 76, right: 20,
            width: 52, height: 52, background: '#5B4FD3', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#fff', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(91,79,211,0.45)', border: 'none', zIndex: 10,
          }}
          aria-label="Adicionar tarefa"
        >+</button>
      )}

      <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  );
}
