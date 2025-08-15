import { Plus, CheckCircle, Clock, AlertCircle, Edit } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TarefaForm } from '@/components/forms/TarefaForm';
import { useToast } from '@/hooks/use-toast';

const Tarefas = () => {
  const { toast } = useToast();
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "Verificar equipamentos antes do voo",
      descricao: "Inspeção completa dos drones antes do serviço na Fazenda São João",
      prioridade: "alta",
      status: "pendente",
      dataVencimento: "2024-01-15",
      responsavel: "João Silva",
      projeto: "Fazenda São João"
    },
    {
      id: 2,
      titulo: "Preparar relatório de pulverização",
      descricao: "Compilar dados do último serviço realizado",
      prioridade: "média",
      status: "em_andamento",
      dataVencimento: "2024-01-16",
      responsavel: "Maria Santos",
      projeto: "Sítio da Serra"
    },
    {
      id: 3,
      titulo: "Atualizar mapeamento GPS",
      descricao: "Inserir novas coordenadas no sistema",
      prioridade: "baixa",
      status: "concluida",
      dataVencimento: "2024-01-14",
      responsavel: "Carlos Oliveira",
      projeto: "Agro Campos"
    },
    {
      id: 4,
      titulo: "Calibrar sensores de umidade",
      descricao: "Manutenção preventiva dos equipamentos",
      prioridade: "alta",
      status: "pendente",
      dataVencimento: "2024-01-17",
      responsavel: "Ana Costa",
      projeto: "Geral"
    },
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTarefa, setEditingTarefa] = useState<any>(null);

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'média':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'baixa':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'em_andamento':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'pendente':
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleCreateTarefa = (data: any) => {
    const newTarefa = {
      id: tarefas.length + 1,
      ...data,
    };
    setTarefas([...tarefas, newTarefa]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Tarefa criada com sucesso!",
      description: `Tarefa "${data.titulo}" foi adicionada ao sistema.`,
    });
  };

  const handleEditTarefa = (data: any) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === editingTarefa.id 
        ? { ...tarefa, ...data }
        : tarefa
    ));
    setIsEditDialogOpen(false);
    setEditingTarefa(null);
    toast({
      title: "Tarefa atualizada com sucesso!",
      description: `Tarefa "${data.titulo}" foi atualizada.`,
    });
  };

  const openEditDialog = (tarefa: any) => {
    setEditingTarefa(tarefa);
    setIsEditDialogOpen(true);
  };

  const toggleTarefaStatus = (id: number) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id 
        ? { ...tarefa, status: tarefa.status === 'concluida' ? 'pendente' : 'concluida' }
        : tarefa
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tarefas</h1>
          <p className="text-muted-foreground">Organize e acompanhe suas atividades</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Tarefa</DialogTitle>
            </DialogHeader>
            <TarefaForm 
              onSubmit={handleCreateTarefa}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tarefas.map((tarefa) => (
          <Card key={tarefa.id} className="p-6">
            <div className="flex items-start gap-4">
              <Checkbox 
                checked={tarefa.status === 'concluida'} 
                className="mt-1"
                onCheckedChange={() => toggleTarefaStatus(tarefa.id)}
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(tarefa.status)}
                  <h3 className={`text-lg font-semibold ${
                    tarefa.status === 'concluida' ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {tarefa.titulo}
                  </h3>
                  <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                    {tarefa.prioridade}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground">{tarefa.descricao}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>Projeto: <span className="text-foreground">{tarefa.projeto}</span></span>
                  <span>Responsável: <span className="text-foreground">{tarefa.responsavel}</span></span>
                  <span>Vencimento: <span className="text-foreground">
                    {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
                  </span></span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(tarefa)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm">Detalhes</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          {editingTarefa && (
            <TarefaForm 
              initialData={editingTarefa}
              onSubmit={handleEditTarefa}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingTarefa(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tarefas;