import { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AgendamentoForm } from '@/components/forms/AgendamentoForm';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';

const Agendamentos = () => {
  const { toast } = useToast();
  const { agendamentos, updateAgendamento, deleteAgendamento } = useData();
  
  const [editingAgendamento, setEditingAgendamento] = useState<any>(null);
  const [viewingAgendamento, setViewingAgendamento] = useState<any>(null);
  const [deletingAgendamento, setDeletingAgendamento] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


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

  const handleEdit = (agendamento: any) => {
    setEditingAgendamento(agendamento);
    setIsEditDialogOpen(true);
  };

  const handleView = (agendamento: any) => {
    setViewingAgendamento(agendamento);
    setIsViewDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setEditingAgendamento(null);
    setIsEditDialogOpen(false);
  };

  const handleCloseView = () => {
    setViewingAgendamento(null);
    setIsViewDialogOpen(false);
  };

  const handleDelete = (agendamento: any) => {
    setDeletingAgendamento(agendamento);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingAgendamento) {
      await deleteAgendamento(deletingAgendamento.id);
      setDeletingAgendamento(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCloseDelete = () => {
    setDeletingAgendamento(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie seus serviços de drone agrícola</p>
        </div>
        <AgendamentoForm />
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
                    {agendamento.observacoes || 'Endereço não informado'}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-foreground">R$ 0,00</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(agendamento)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleView(agendamento)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(agendamento)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
            <DialogDescription>
              Modifique os dados do agendamento para {editingAgendamento?.cliente}
            </DialogDescription>
          </DialogHeader>
          {editingAgendamento && (
            <AgendamentoForm 
              agendamento={editingAgendamento}
              onClose={handleCloseEdit}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
            <DialogDescription>
              Informações completas do agendamento
            </DialogDescription>
          </DialogHeader>
          {viewingAgendamento && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cliente</label>
                  <p className="text-lg font-semibold">{viewingAgendamento.cliente}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(viewingAgendamento.status)}>
                      {viewingAgendamento.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Serviço</label>
                  <p className="text-base">{viewingAgendamento.servico}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor</label>
                  <p className="text-lg font-bold text-primary">{viewingAgendamento.valor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(viewingAgendamento.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Horário</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{viewingAgendamento.hora}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Endereço</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{viewingAgendamento.endereco}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => {
                  handleCloseView();
                  handleEdit(viewingAgendamento);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Agendamento
                </Button>
                <Button variant="outline" onClick={handleCloseView}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o agendamento de {deletingAgendamento?.cliente}? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Agendamentos;