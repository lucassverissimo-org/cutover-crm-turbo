import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function Modelos() {
  return (
    <PaginaEntidade
      nome_tabela="modelos"
      rotulo_formulario="Modelos (Email / Documentos / Relatórios)"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true },
        { nome: 'nome_modelo', rotulo: 'Nome do Modelo', tipo: 'texto', obrigatorio: false },
        { nome: 'entidade', rotulo: 'Entidade', tipo: 'texto', obrigatorio: false },
        { nome: 'tipo', rotulo: 'Tipo', tipo: 'texto', obrigatorio: false },
        { nome: 'observacoes', rotulo: 'Observações', tipo: 'area', obrigatorio: false }
      ]}
    />
  )
}

/*
create table public.modelos (
  id uuid primary key default gen_random_uuid(),
  id_release uuid references public.releases(id) on delete cascade, 
  estoria text,
  nome_modelo text,
  entidade text,
  tipo text,
  observacoes text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."modelos"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."modelos"
as PERMISSIVE for INSERT to public
with check (true);
*/