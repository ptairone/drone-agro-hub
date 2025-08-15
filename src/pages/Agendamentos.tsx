import { Calendar, Plus, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Agendamentos = () => {
  const agendamentos = [
    {
      id: 1,
      cliente: "Fazenda São João",
      servico: "Pulverização de Defensivos",
      data: "2024-01-15",
      hora: "08:00",
      endereco: "Zona Rural, Ribeirão Preto - SP",
      status: "confirmado",
      valor: "R$ 2.500,00"
    },
    {
      id: 2,
      cliente: "Sítio da Serra",
      servico: "Mapeamento Topográfico",
      data: "2024-01-15",
      hora: "10:30",
      endereco: "Estrada Municipal, Franca - SP",
      status: "pendente",
      valor: "R$ 1.800,00"
    },
    {
      id: 3,
      cliente: "Agro Campos",
      servico: "Monitoramento de Pragas",
      data: "2024-01-16",
      hora: "14:00",
      endereco: "Fazenda Grande, Araraquara - SP",
      status: "confirmado",
      valor: "R$ 3.200,00"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-success/10 text-success border-success/20';
      case 'pendente':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'concluido':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie seus serviços de drone agrícola</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid gap-4">
        {agendamentos.map((agendamento) => (
          <Card key={agendamento.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{agendamento.cliente}</h3>
                  <Badge className={getStatusColor(agendamento.status)}>
                    {agendamento.status}
                  </Badge>
                </div>
                
                <p className="text-accent font-medium">{agendamento.servico}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {agendamento.hora}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {agendamento.endereco}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-foreground">{agendamento.valor}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button size="sm">Ver Detalhes</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Agendamentos;