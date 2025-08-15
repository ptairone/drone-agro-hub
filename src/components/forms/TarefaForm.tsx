import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const tarefaSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  prioridade: z.enum(['baixa', 'média', 'alta']),
  status: z.enum(['pendente', 'em_andamento', 'concluida']),
  dataVencimento: z.string().min(1, 'Data de vencimento é obrigatória'),
  responsavel: z.string().min(1, 'Responsável é obrigatório'),
  projeto: z.string().min(1, 'Projeto é obrigatório'),
});

type TarefaFormData = z.infer<typeof tarefaSchema>;

interface TarefaFormProps {
  initialData?: Partial<TarefaFormData>;
  onSubmit: (data: TarefaFormData) => void;
  onCancel: () => void;
}

export const TarefaForm = ({ initialData, onSubmit, onCancel }: TarefaFormProps) => {
  const form = useForm<TarefaFormData>({
    resolver: zodResolver(tarefaSchema),
    defaultValues: {
      titulo: initialData?.titulo || '',
      descricao: initialData?.descricao || '',
      prioridade: initialData?.prioridade || 'média',
      status: initialData?.status || 'pendente',
      dataVencimento: initialData?.dataVencimento || '',
      responsavel: initialData?.responsavel || '',
      projeto: initialData?.projeto || '',
    },
  });

  const handleSubmit = (data: TarefaFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição detalhada da tarefa..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="prioridade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="média">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataVencimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Vencimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projeto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projeto</FormLabel>
              <FormControl>
                <Input placeholder="Nome do projeto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialData ? 'Atualizar' : 'Criar'} Tarefa
          </Button>
        </div>
      </form>
    </Form>
  );
};