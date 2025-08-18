import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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
  loading: boolean;
  addLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
  updateLead: (lead: Lead) => Promise<void>;
  deleteLead: (id: number) => Promise<void>;
  addAgendamento: (agendamento: Omit<Agendamento, 'id'>) => Promise<void>;
  updateAgendamento: (agendamento: Agendamento) => Promise<void>;
  deleteAgendamento: (id: number) => Promise<void>;
  addTarefa: (tarefa: Omit<Tarefa, 'id'>) => Promise<void>;
  updateTarefa: (tarefa: Tarefa) => Promise<void>;
  deleteTarefa: (id: number) => Promise<void>;
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
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Load leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (leadsError) throw leadsError;
      
      // Load agendamentos
      const { data: agendamentosData, error: agendamentosError } = await supabase
        .from('agendamentos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (agendamentosError) throw agendamentosError;
      
      // Load tarefas
      const { data: tarefasData, error: tarefasError } = await supabase
        .from('tarefas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (tarefasError) throw tarefasError;
      
      setLeads((leadsData || []).map((l: any) => ({
        id: l.id,
        nome: l.nome,
        empresa: l.empresa,
        email: l.email,
        telefone: l.telefone,
        status: l.status,
        valorPotencial: l.valor_potencial,
        fonte: l.fonte,
        observacoes: l.observacoes,
        hectares: l.hectares,
        tipoCultura: l.tipo_cultura,
        cidade: l.cidade,
        localizacao: l.localizacao,
        ultimoContato: l.ultimo_contato,
      })));
      setAgendamentos(agendamentosData || []);
      setTarefas((tarefasData || []).map((t: any) => ({
        id: t.id,
        titulo: t.titulo,
        descricao: t.descricao,
        status: t.status,
        prioridade: t.prioridade,
        dataVencimento: t.data_vencimento,
        responsavel: t.responsavel,
      })));
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          nome: leadData.nome,
          empresa: leadData.empresa,
          email: leadData.email,
          telefone: leadData.telefone,
          status: leadData.status,
          valor_potencial: leadData.valorPotencial,
          fonte: leadData.fonte,
          observacoes: leadData.observacoes,
          hectares: leadData.hectares,
          tipo_cultura: leadData.tipoCultura,
          cidade: leadData.cidade,
          localizacao: leadData.localizacao,
          ultimo_contato: leadData.ultimoContato,
        }])
        .select()
        .single();

      if (error) throw error;

      const newLead = {
        id: data.id,
        nome: data.nome,
        empresa: data.empresa,
        email: data.email,
        telefone: data.telefone,
        status: data.status,
        valorPotencial: data.valor_potencial,
        fonte: data.fonte,
        observacoes: data.observacoes,
        hectares: data.hectares,
        tipoCultura: data.tipo_cultura,
        cidade: data.cidade,
        localizacao: data.localizacao,
        ultimoContato: data.ultimo_contato,
      };

      setLeads(prev => [newLead, ...prev]);
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: "Erro ao adicionar lead",
        description: "Não foi possível salvar o lead.",
        variant: "destructive",
      });
    }
  };

  const updateLead = async (updatedLead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          nome: updatedLead.nome,
          empresa: updatedLead.empresa,
          email: updatedLead.email,
          telefone: updatedLead.telefone,
          status: updatedLead.status,
          valor_potencial: updatedLead.valorPotencial,
          fonte: updatedLead.fonte,
          observacoes: updatedLead.observacoes,
          hectares: updatedLead.hectares,
          tipo_cultura: updatedLead.tipoCultura,
          cidade: updatedLead.cidade,
          localizacao: updatedLead.localizacao,
          ultimo_contato: updatedLead.ultimoContato,
        })
        .eq('id', updatedLead.id);

      if (error) throw error;

      setLeads(prev => prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Erro ao atualizar lead",
        description: "Não foi possível atualizar o lead.",
        variant: "destructive",
      });
    }
  };

  const deleteLead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeads(prev => prev.filter(lead => lead.id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Erro ao excluir lead",
        description: "Não foi possível excluir o lead.",
        variant: "destructive",
      });
    }
  };

  const addAgendamento = async (agendamentoData: Omit<Agendamento, 'id'>) => {
    try {
      // Garantir que apenas colunas existentes sejam enviadas ao banco
      const payload = {
        cliente: (agendamentoData as any).cliente,
        servico: (agendamentoData as any).servico,
        data: (agendamentoData as any).data,
        hora: (agendamentoData as any).hora,
        status: (agendamentoData as any).status ?? 'agendado',
        observacoes: (agendamentoData as any).observacoes,
      };

      const { data, error } = await supabase
        .from('agendamentos')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setAgendamentos(prev => [data, ...prev]);
    } catch (error: any) {
      console.error('Error adding agendamento:', error);
      toast({
        title: "Erro ao adicionar agendamento",
        description: error?.message || "Não foi possível salvar o agendamento.",
        variant: "destructive",
      });
    }
  };

  const updateAgendamento = async (updatedAgendamento: Agendamento) => {
    try {
      // Atualizar somente colunas válidas da tabela
      const payload = {
        cliente: (updatedAgendamento as any).cliente,
        servico: (updatedAgendamento as any).servico,
        data: (updatedAgendamento as any).data,
        hora: (updatedAgendamento as any).hora,
        status: (updatedAgendamento as any).status,
        observacoes: (updatedAgendamento as any).observacoes,
      };

      const { error } = await supabase
        .from('agendamentos')
        .update(payload)
        .eq('id', (updatedAgendamento as any).id);

      if (error) throw error;

      setAgendamentos(prev => prev.map(agendamento => agendamento.id === (updatedAgendamento as any).id ? { ...agendamento, ...payload, id: (updatedAgendamento as any).id } : agendamento));
    } catch (error: any) {
      console.error('Error updating agendamento:', error);
      toast({
        title: "Erro ao atualizar agendamento",
        description: error?.message || "Não foi possível atualizar o agendamento.",
        variant: "destructive",
      });
    }
  };

  const deleteAgendamento = async (id: number) => {
    try {
      const { error } = await supabase
        .from('agendamentos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
    } catch (error) {
      console.error('Error deleting agendamento:', error);
      toast({
        title: "Erro ao excluir agendamento",
        description: "Não foi possível excluir o agendamento.",
        variant: "destructive",
      });
    }
  };

  const addTarefa = async (tarefaData: Omit<Tarefa, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tarefas')
        .insert([{
          titulo: tarefaData.titulo,
          descricao: tarefaData.descricao,
          status: tarefaData.status,
          prioridade: tarefaData.prioridade,
          data_vencimento: tarefaData.dataVencimento,
          responsavel: tarefaData.responsavel,
        }])
        .select()
        .single();

      if (error) throw error;

      const newTarefa = {
        id: data.id,
        titulo: data.titulo,
        descricao: data.descricao,
        status: data.status,
        prioridade: data.prioridade,
        dataVencimento: data.data_vencimento,
        responsavel: data.responsavel,
      };

      setTarefas(prev => [newTarefa, ...prev]);
    } catch (error) {
      console.error('Error adding tarefa:', error);
      toast({
        title: "Erro ao adicionar tarefa",
        description: "Não foi possível salvar a tarefa.",
        variant: "destructive",
      });
    }
  };

  const updateTarefa = async (updatedTarefa: Tarefa) => {
    try {
      const { error } = await supabase
        .from('tarefas')
        .update({
          titulo: updatedTarefa.titulo,
          descricao: updatedTarefa.descricao,
          status: updatedTarefa.status,
          prioridade: updatedTarefa.prioridade,
          data_vencimento: updatedTarefa.dataVencimento,
          responsavel: updatedTarefa.responsavel,
        })
        .eq('id', updatedTarefa.id);

      if (error) throw error;

      setTarefas(prev => prev.map(tarefa => tarefa.id === updatedTarefa.id ? updatedTarefa : tarefa));
    } catch (error) {
      console.error('Error updating tarefa:', error);
      toast({
        title: "Erro ao atualizar tarefa",
        description: "Não foi possível atualizar a tarefa.",
        variant: "destructive",
      });
    }
  };

  const deleteTarefa = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tarefas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTarefas(prev => prev.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error('Error deleting tarefa:', error);
      toast({
        title: "Erro ao excluir tarefa",
        description: "Não foi possível excluir a tarefa.",
        variant: "destructive",
      });
    }
  };

  return (
    <DataContext.Provider value={{
      leads,
      agendamentos,
      tarefas,
      loading,
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