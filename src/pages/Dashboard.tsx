import { Calendar, CheckSquare, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio agrícola</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Agendamentos Hoje"
          value={8}
          icon={Calendar}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Tarefas Pendentes"
          value={23}
          icon={CheckSquare}
          trend={{ value: "5%", isPositive: false }}
        />
        <StatsCard
          title="Leads Ativos"
          value={147}
          icon={Users}
          trend={{ value: "18%", isPositive: true }}
        />
        <StatsCard
          title="Receita Mensal"
          value="R$ 45.2k"
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
            {[
              { nome: "Carlos Silva", empresa: "Fazenda Vista Verde", status: "Novo", valor: "R$ 15.000" },
              { nome: "Ana Costa", empresa: "Plantações do Norte", status: "Qualificado", valor: "R$ 22.500" },
              { nome: "João Santos", empresa: "Agro Sustentável", status: "Proposta", valor: "R$ 8.750" },
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{lead.nome}</p>
                    <p className="text-sm text-muted-foreground">{lead.empresa}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{lead.valor}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.status === 'Novo' ? 'bg-accent/10 text-accent' :
                    lead.status === 'Qualificado' ? 'bg-warning/10 text-warning' :
                    'bg-success/10 text-success'
                  }`}>
                    {lead.status}
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