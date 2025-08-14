import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function RecursosWeb() {
  return (
    <PaginaEntidade
      nome_tabela="recurso_web"
      rotulo_formulario="Recursos web"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true },
        { nome: 'nome_recurso', rotulo: 'Nome do Recurso Web', tipo: 'texto', obrigatorio: false },
        { nome: 'tipo', rotulo: 'Tipo', tipo: 'texto', obrigatorio: false },
        { nome: 'observacoes', rotulo: 'Observações', tipo: 'area', obrigatorio: false },
      ]}
    />
  )
}

/*
create table public.recurso_web (
  id uuid primary key default gen_random_uuid(),
  id_release uuid references public.releases(id) on delete cascade, 
  estoria text,
  nome_recurso text,
  tipo text,
  observacoes text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."recurso_web"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."recurso_web"
as PERMISSIVE for INSERT to public
with check (true);
*/