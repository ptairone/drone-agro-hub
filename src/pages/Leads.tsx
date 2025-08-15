import { Plus, Phone, Mail, Calendar, TrendingUp, Edit, Trash2, MapPin, Wheat } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { LeadForm } from '@/components/forms/LeadForm';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';

const Leads = () => {
  const { toast } = useToast();
  const { leads, addLead, updateLead, deleteLead } = useData();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [deletingLead, setDeletingLead] = useState<any>(null);

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

  const handleCreateLead = (data: any) => {
    const newLead = {
      id: leads.length + 1,
      ...data,
      ultimoContato: new Date().toISOString().split('T')[0],
    };
    addLead(newLead);
    setIsCreateDialogOpen(false);
    toast({
      title: "Lead criado com sucesso!",
      description: `Lead ${data.nome} foi adicionado ao sistema.`,
    });
  };

  const handleEditLead = (data: any) => {
    const updatedLead = { ...editingLead, ...data };
    updateLead(updatedLead);
    setIsEditDialogOpen(false);
    setEditingLead(null);
    toast({
      title: "Lead atualizado com sucesso!",
      description: `Lead ${data.nome} foi atualizado.`,
    });
  };

  const openEditDialog = (lead: any) => {
    setEditingLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (lead: any) => {
    setDeletingLead(lead);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingLead) {
      deleteLead(deletingLead.id);
      toast({
        title: "Lead excluído",
        description: `O lead "${deletingLead.nome}" foi excluído com sucesso.`,
      });
      setDeletingLead(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCloseDelete = () => {
    setDeletingLead(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie seus potenciais clientes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Lead</DialogTitle>
            </DialogHeader>
            <LeadForm 
              onSubmit={handleCreateLead}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
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
                  {lead.hectares && (
                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4" />
                      {lead.hectares} hectares
                    </div>
                  )}
                  {lead.tipoCultura && (
                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4" />
                      {lead.tipoCultura}
                    </div>
                  )}
                  {lead.cidade && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {lead.cidade}
                    </div>
                  )}
                  {lead.localizacao && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {lead.localizacao}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">{lead.observacoes}</p>
              </div>
              
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-foreground">{lead.valorPotencial}</p>
                 <div className="flex gap-2">
                   <Button variant="outline" size="sm" onClick={() => openEditDialog(lead)}>
                     <Edit className="h-4 w-4 mr-1" />
                     Editar
                   </Button>
                   <Button size="sm">Acompanhar</Button>
                   <Button 
                     variant="destructive" 
                     size="sm" 
                     onClick={() => handleDelete(lead)}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
          </DialogHeader>
          {editingLead && (
            <LeadForm 
              initialData={editingLead}
              onSubmit={handleEditLead}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingLead(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o lead "{deletingLead?.nome}"? 
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

export default Leads;