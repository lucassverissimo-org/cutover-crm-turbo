import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function CargaDados() {
  return (
    <PaginaEntidade
      nome_tabela="carga_dados"
      rotulo_formulario="Cargas de dados"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria_relacionada', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true},
        { nome: 'entidade', rotulo: 'Entidade', tipo: 'texto'},
        { nome: 'total_registros', rotulo: 'Total de Registros', tipo: 'texto'},
        { nome: 'filtro', rotulo: 'Filtro', tipo: 'area'},
        { nome: 'observacoes', rotulo: 'Observações', tipo: 'area'}
      ]}
    />
  )
}

/*
create table public.carga_dados (
  id uuid primary key default gen_random_uuid(),
  id_release uuid references public.releases(id) on delete cascade, 
  estoria_relacionada text,
  entidade text,
  total_registros text,  
  filtro text,  
  observacoes text,      
  created_at timestamptz default now()
);

create policy "select" on "public"."carga_dados"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."carga_dados"
as PERMISSIVE for INSERT to public
with check (true);
*/