import { Calendar, CheckSquare, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';

const Dashboard = () => {
  const { leads, agendamentos, tarefas } = useData();

  // Calcular estatísticas dinâmicas
  const leadsAtivos = leads.filter(lead => ['novo', 'qualificado', 'proposta'].includes(lead.status)).length;
  const tarefasPendentes = tarefas.filter(tarefa => tarefa.status !== 'concluida').length;
  const agendamentosHoje = agendamentos.filter(agendamento => {
    const hoje = new Date().toISOString().split('T')[0];
    return agendamento.data === hoje;
  }).length;

  // Calcular receita dos leads ganhos
  const receitaTotal = leads
    .filter(lead => lead.status === 'ganho')
    .reduce((total, lead) => {
      const valor = parseFloat(lead.valorPotencial.replace(/[R$\s.]/g, '').replace(',', '.'));
      return total + (isNaN(valor) ? 0 : valor);
    }, 0);

  const formatarReceita = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio agrícola</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Agendamentos Hoje"
          value={agendamentosHoje}
          icon={Calendar}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Tarefas Pendentes"
          value={tarefasPendentes}
          icon={CheckSquare}
          trend={{ value: "5%", isPositive: false }}
        />
        <StatsCard
          title="Leads Ativos"
          value={leadsAtivos}
          icon={Users}
          trend={{ value: "18%", isPositive: true }}
        />
        <StatsCard
          title="Receita Fechada"
          value={formatarReceita(receitaTotal)}
          icon={DollarSign}
          trend={{ value: "22%", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Próximos Agendamentos</h3>
            <Button variant="outline" size="sm">Ver todos</Button>
          </div>
          <div className="space-y-4">
            {[
              { cliente: "Fazenda São João", servico: "Pulverização", hora: "08:00", status: "confirmado" },
              { cliente: "Sítio da Serra", servico: "Mapeamento", hora: "10:30", status: "pendente" },
              { cliente: "Agro Campos", servico: "Monitoramento", hora: "14:00", status: "confirmado" },
            ].map((agendamento, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{agendamento.cliente}</p>
                    <p className="text-sm text-muted-foreground">{agendamento.servico} • {agendamento.hora}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  agendamento.status === 'confirmado' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {agendamento.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Leads Recentes</h3>
            <Button variant="outline" size="sm">Ver todos</Button>
          </div>
          <div className="space-y-4">
            {leads.slice(0, 3).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{lead.nome}</p>
                    <p className="text-sm text-muted-foreground">{lead.empresa}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{lead.valorPotencial}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.status === 'novo' ? 'bg-accent/10 text-accent' :
                    lead.status === 'qualificado' ? 'bg-warning/10 text-warning' :
                    lead.status === 'proposta' ? 'bg-primary/10 text-primary' :
                    lead.status === 'ganho' ? 'bg-success/10 text-success' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {lead.status === 'novo' ? 'Novo' :
                     lead.status === 'qualificado' ? 'Qualificado' :
                     lead.status === 'proposta' ? 'Proposta' :
                     lead.status === 'ganho' ? 'Ganho' : 'Perdido'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;