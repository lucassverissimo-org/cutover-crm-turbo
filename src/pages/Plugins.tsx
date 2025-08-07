import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function Plugins() {
  return (
    <PaginaEntidade
      nome_tabela="plugins"
      rotulo_formulario="Plugins"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true },
        { nome: 'nome_plugin', rotulo: 'Nome do Plugin', tipo: 'texto', obrigatorio: false },
        { nome: 'mensagem_sdk', rotulo: 'Mensagem do SDK', tipo: 'texto', obrigatorio: false },
        { nome: 'primary_entity', rotulo: 'Primary Entity', tipo: 'texto', obrigatorio: false },
        { nome: 'status', rotulo: 'Status', tipo: 'texto', obrigatorio: false },
        { nome: 'modo_execucao', rotulo: 'Modo de Execução', tipo: 'area', obrigatorio: false },
      ]}
    />
  )
}

/*
create table public.plugins (
  id uuid primary key default gen_random_uuid(),
  estoria text,
  nome_plugin text,
  mensagem_sdk text,
  primary_entity text,
  status text,
  modo_execucao text,
  created_at timestamptz default now()
);

create policy "select" on "public"."plugins"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."plugins"
as PERMISSIVE for INSERT to public
with check (true);
*/