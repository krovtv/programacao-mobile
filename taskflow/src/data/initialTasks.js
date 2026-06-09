const today = new Date().toISOString().split('T')[0];

const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const initialTasks = [
  {
    id: 1,
    title: 'Preparar apresentação do projeto mobile',
    category: 'trabalho',
    priority: 'alta',
    date: addDays(3),
    done: false,
  },
  {
    id: 2,
    title: 'Estudar React Native para a prova',
    category: 'estudo',
    priority: 'alta',
    date: today,
    done: false,
  },
  {
    id: 3,
    title: 'Treino na academia',
    category: 'saude',
    priority: 'baixa',
    date: today,
    done: true,
  },
  {
    id: 4,
    title: 'Comprar ingredientes para o jantar',
    category: 'pessoal',
    priority: 'media',
    date: today,
    done: false,
  },
  {
    id: 5,
    title: 'Revisar código do trabalho final',
    category: 'estudo',
    priority: 'media',
    date: addDays(2),
    done: false,
  },
  {
    id: 6,
    title: 'Consulta médica de rotina',
    category: 'saude',
    priority: 'media',
    date: addDays(5),
    done: false,
  },
  {
    id: 7,
    title: 'Reunião com equipe de desenvolvimento',
    category: 'trabalho',
    priority: 'alta',
    date: addDays(-1),
    done: true,
  },
];

export default initialTasks;
