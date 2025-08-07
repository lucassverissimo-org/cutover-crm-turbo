import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function ConectoresPersonalizados() {
  return (
    <PaginaEntidade
      nome_tabela="conectores_personalizados"
      rotulo_formulario="Conectores Personalizados"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true },
        { nome: 'nome_conector', rotulo: 'Nome do Conector', tipo: 'texto', obrigatorio: false },        
        { nome: 'observacoes', rotulo: 'Observações', tipo: 'area', obrigatorio: false },
      ]}
    />
  )
}

/*
create table public.conectores_personalizados (
  id uuid primary key default gen_random_uuid(),
  estoria text,
  nome_conector text,
  observacoes text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."conectores_personalizados"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."conectores_personalizados"
as PERMISSIVE for INSERT to public
with check (true);
*/