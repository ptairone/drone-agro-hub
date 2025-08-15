import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id?: number
  nome: string
  empresa: string
  email: string
  telefone: string
  status: string
  valor_potencial: string
  fonte: string
  observacoes?: string
  hectares?: string
  tipo_cultura?: string
  cidade?: string
  localizacao?: string
  ultimo_contato: string
  created_at?: string
  updated_at?: string
}

export type Agendamento = {
  id?: number
  cliente: string
  servico: string
  data: string
  hora: string
  status: string
  observacoes?: string
  created_at?: string
  updated_at?: string
}

export type Tarefa = {
  id?: number
  titulo: string
  descricao: string
  status: string
  prioridade: string
  data_vencimento: string
  responsavel: string
  created_at?: string
  updated_at?: string
}