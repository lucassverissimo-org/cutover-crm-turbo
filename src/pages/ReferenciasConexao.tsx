import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function ReferenciasConexao() {
  return (
    <PaginaEntidade
      nome_tabela="referencias_conexao"
      rotulo_formulario="Referências Conexão"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'estoria', rotulo: 'Estória Relacionada', tipo: 'texto', obrigatorio: true },
        { nome: 'nome_referencia_conexao', rotulo: 'Nome de Exibição da Referência de Conexão', tipo: 'texto', obrigatorio: false },
        { nome: 'nome_logico', rotulo: 'Nome Lógico', tipo: 'texto', obrigatorio: false },
        { nome: 'instrucoes', rotulo: 'Instruções', tipo: 'area', obrigatorio: false },
      ]}
    />
  )
}

/*
create table public.referencias_conexao (
  id uuid primary key default gen_random_uuid(),
  id_release uuid references public.releases(id) on delete cascade, 
  estoria text,
  nome_referencia_conexao text,
  nome_logico text,
  instrucoes text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."referencias_conexao"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."referencias_conexao"
as PERMISSIVE for INSERT to public
with check (true);
*/