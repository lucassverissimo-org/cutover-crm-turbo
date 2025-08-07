import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function Contatos() {
  return (
    <PaginaEntidade
      nome_tabela="contatos"
      rotulo_formulario="Contatos"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'nome', rotulo: 'Nome', tipo: 'texto', obrigatorio: true },
        { nome: 'empresa', rotulo: 'Empresa', tipo: 'texto'},
        { nome: 'papel_projeto', rotulo: 'Papel no projeto', tipo: 'texto'},
        { nome: 'email', rotulo: 'Email', tipo: 'texto'},
        { nome: 'telefone', rotulo: 'Telefone', tipo: 'texto'},
        { nome: 'login', rotulo: 'Login', tipo: 'texto'},
        { nome: 'rg', rotulo: 'RG', tipo: 'texto'},
      ]}
    />
  )
}

/*
create table public.contatos (
  id uuid primary key default gen_random_uuid(),
  nome text,
  empresa text,
  papel_projeto text,  
  email text,  
  telefone text,  
  login text,  
  rg text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."contatos"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."contatos"
as PERMISSIVE for INSERT to public
with check (true);
*/