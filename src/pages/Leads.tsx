import { Plus, Phone, Mail, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Leads = () => {
  const leads = [
    {
      id: 1,
      nome: "Carlos Silva",
      empresa: "Fazenda Vista Verde",
      email: "carlos@fazendalvistav verde.com.br",
      telefone: "(16) 99999-1234",
      status: "novo",
      valorPotencial: "R$ 15.000",
      fonte: "Site",
      ultimoContato: "2024-01-14",
      observacoes: "Interessado em serviços de pulverização para 200 hectares"
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
      observacoes: "Já trabalha com drones, quer expandir para mapeamento"
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
      observacoes: "Solicitou proposta para monitoramento mensal"
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
      observacoes: "Contrato fechado para serviços trimestrais"
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
      observacoes: "Escolheu concorrente por questão de preço"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'qualificado':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'proposta':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'ganho':
        return 'bg-success/10 text-success border-success/20';
      case 'perdido':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'novo': 'Novo',
      'qualificado': 'Qualificado',
      'proposta': 'Proposta Enviada',
      'ganho': 'Ganho',
      'perdido': 'Perdido'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie seus potenciais clientes</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{lead.nome}</h3>
                  <Badge className={getStatusColor(lead.status)}>
                    {getStatusLabel(lead.status)}
                  </Badge>
                </div>
                
                <p className="text-accent font-medium">{lead.empresa}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {lead.telefone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Último contato: {new Date(lead.ultimoContato).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Fonte: {lead.fonte}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{lead.observacoes}</p>
              </div>
              
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-foreground">{lead.valorPotencial}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button size="sm">Acompanhar</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leads;