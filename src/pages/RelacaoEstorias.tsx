import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function RelacaoEstorias() {
  return (
    <PaginaEntidade
      nome_tabela="relacao_estorias"
      rotulo_formulario="Estórias"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'id_estoria', rotulo: 'ID Estória', tipo: 'texto', obrigatorio: true  },
        { nome: 'titulo', rotulo: 'Título', tipo: 'texto'  },
        { nome: 'status', rotulo: 'Status', tipo: 'texto'  },
        { nome: 'tipo', rotulo: 'Tipo', tipo: 'texto'  },
        { nome: 'sprint', rotulo: 'Sprint', tipo: 'texto'  },
        { nome: 'responsavel', rotulo: 'Responsável', tipo: 'texto'  },
        { nome: 'observacao', rotulo: 'Observação', tipo: 'area'  }
      ]}
    />
  )
}

/*
create table public.relacao_estorias (
  id uuid primary key default gen_random_uuid(),
  id_estoria text,
  titulo text,
  status text,
  tipo text,  
  sprint text,  
  responsavel text,  
  observacao text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."relacao_estorias"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."relacao_estorias"
as PERMISSIVE for INSERT to public
with check (true);
*/