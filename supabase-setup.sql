-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    empresa TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'novo',
    valor_potencial TEXT,
    fonte TEXT,
    observacoes TEXT,
    hectares TEXT,
    tipo_cultura TEXT,
    cidade TEXT,
    localizacao TEXT,
    ultimo_contato DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create agendamentos table
CREATE TABLE IF NOT EXISTS public.agendamentos (
    id BIGSERIAL PRIMARY KEY,
    cliente TEXT NOT NULL,
    servico TEXT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'agendado',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tarefas table
CREATE TABLE IF NOT EXISTS public.tarefas (
    id BIGSERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    status TEXT NOT NULL DEFAULT 'pendente',
    prioridade TEXT NOT NULL DEFAULT 'media',
    data_vencimento DATE,
    responsavel TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- Create policies for leads
CREATE POLICY "Allow all operations for leads" ON public.leads
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for agendamentos
CREATE POLICY "Allow all operations for agendamentos" ON public.agendamentos
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for tarefas
CREATE POLICY "Allow all operations for tarefas" ON public.tarefas
    FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.agendamentos
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.tarefas
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();