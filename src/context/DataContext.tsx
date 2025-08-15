import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lead {
  id: number;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  status: string;
  valorPotencial: string;
  fonte: string;
  observacoes?: string;
  hectares?: string;
  tipoCultura?: string;
  cidade?: string;
  localizacao?: string;
  ultimoContato: string;
}

interface Agendamento {
  id: number;
  cliente: string;
  servico: string;
  data: string;
  hora: string;
  status: string;
  observacoes?: string;
}

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  dataVencimento: string;
  responsavel: string;
}

interface DataContextType {
  leads: Lead[];
  agendamentos: Agendamento[];
  tarefas: Tarefa[];
  addLead: (lead: Lead) => void;
  updateLead: (lead: Lead) => void;
  deleteLead: (id: number) => void;
  addAgendamento: (agendamento: Agendamento) => void;
  updateAgendamento: (agendamento: Agendamento) => void;
  deleteAgendamento: (id: number) => void;
  addTarefa: (tarefa: Tarefa) => void;
  updateTarefa: (tarefa: Tarefa) => void;
  deleteTarefa: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      nome: "Carlos Silva",
      empresa: "Fazenda Vista Verde",
      email: "carlos@fazendavistav verde.com.br",
      telefone: "(16) 99999-1234",
      status: "novo",
      valorPotencial: "R$ 15.000",
      fonte: "Site",
      ultimoContato: "2024-01-14",
      observacoes: "Interessado em serviços de pulverização para 200 hectares",
      hectares: "200",
      tipoCultura: "Soja",
      cidade: "Ribeirão Preto",
      localizacao: "Zona Rural - Fazenda"
    },
    {
      id: 2,
      nome: "Ana Costa",
      empresa: "Plantações do Norte",
      email: "ana.costa@plantacoesnorte.com.br",
      telefone: "(17) 98888-5678",
      status: "qualificado",
      valorPotencial: "R$ 22.500",
      fonte: "Indicação",
      ultimoContato: "2024-01-13",
      observacoes: "Já trabalha com drones, quer expandir para mapeamento",
      hectares: "350",
      tipoCultura: "Milho",
      cidade: "Barretos",
      localizacao: "Fazenda Santa Rita"
    },
    {
      id: 3,
      nome: "João Santos",
      empresa: "Agro Sustentável",
      email: "joao@agrosustentavel.com.br",
      telefone: "(18) 97777-9012",
      status: "proposta",
      valorPotencial: "R$ 8.750",
      fonte: "Facebook",
      ultimoContato: "2024-01-12",
      observacoes: "Solicitou proposta para monitoramento mensal",
      hectares: "120",
      tipoCultura: "Cana-de-açúcar",
      cidade: "Araraquara",
      localizacao: "Rodovia SP-255, Km 12"
    },
    {
      id: 4,
      nome: "Maria Oliveira",
      empresa: "Fazenda Esperança",
      email: "maria@fazendaesperanca.com.br",
      telefone: "(19) 96666-3456",
      status: "ganho",
      valorPotencial: "R$ 18.000",
      fonte: "WhatsApp",
      ultimoContato: "2024-01-10",
      observacoes: "Contrato fechado para serviços trimestrais",
      hectares: "280",
      tipoCultura: "Algodão",
      cidade: "Campinas",
      localizacao: "Distrito de Barão Geraldo"
    },
    {
      id: 5,
      nome: "Pedro Fernandes",
      empresa: "Sítio Boa Vista",
      email: "pedro@sitioboavista.com.br",
      telefone: "(11) 95555-7890",
      status: "perdido",
      valorPotencial: "R$ 12.000",
      fonte: "Google",
      ultimoContato: "2024-01-09",
      observacoes: "Escolheu concorrente por questão de preço",
      hectares: "95",
      tipoCultura: "Café",
      cidade: "Franca",
      localizacao: "Zona Rural"
    },
  ]);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
  };

  const updateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
  };

  const deleteLead = (id: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const addAgendamento = (agendamento: Agendamento) => {
    setAgendamentos(prev => [...prev, agendamento]);
  };

  const updateAgendamento = (updatedAgendamento: Agendamento) => {
    setAgendamentos(prev => prev.map(agendamento => agendamento.id === updatedAgendamento.id ? updatedAgendamento : agendamento));
  };

  const deleteAgendamento = (id: number) => {
    setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
  };

  const addTarefa = (tarefa: Tarefa) => {
    setTarefas(prev => [...prev, tarefa]);
  };

  const updateTarefa = (updatedTarefa: Tarefa) => {
    setTarefas(prev => prev.map(tarefa => tarefa.id === updatedTarefa.id ? updatedTarefa : tarefa));
  };

  const deleteTarefa = (id: number) => {
    setTarefas(prev => prev.filter(tarefa => tarefa.id !== id));
  };

  return (
    <DataContext.Provider value={{
      leads,
      agendamentos,
      tarefas,
      addLead,
      updateLead,
      deleteLead,
      addAgendamento,
      updateAgendamento,
      deleteAgendamento,
      addTarefa,
      updateTarefa,
      deleteTarefa,
    }}>
      {children}
    </DataContext.Provider>
  );
};