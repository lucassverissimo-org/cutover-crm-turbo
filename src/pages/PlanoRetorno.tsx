import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function PlanoRetorno() {
  return (
    <PaginaEntidade
      nome_tabela="plano_retorno"
      rotulo_formulario="Plano Retorno"
      rotulo_grid="Lista"
      campos={[        
        { nome: 'step', rotulo: 'Step', tipo: 'texto', obrigatorio: true },
        { nome: 'atividade', rotulo: 'Atividade', tipo: 'texto'  },
        { nome: 'status', rotulo: 'Status', tipo: 'texto'  },
        { nome: 'dependencia', rotulo: 'Dependência', tipo: 'texto'  },
        { nome: 'solicitante', rotulo: 'Solicitante', tipo: 'texto'  },
        { nome: 'executor', rotulo: 'Executor', tipo: 'texto'  },
        { nome: 'inicio', rotulo: 'Início', tipo: 'data'  },
        { nome: 'termino', rotulo: 'Término', tipo: 'data'  },
        { nome: 'observacao', rotulo: 'Observação', tipo: 'area'  }
      ]}
    />
  )
}

/*
create table public.plano_retorno (
  id uuid primary key default gen_random_uuid(),
  id_release uuid references public.releases(id) on delete cascade, 
  step text,
  atividade text,
  status text,  
  dependencia text,  
  solicitante text,  
  executor text,  
  inicio text,  
  termino text,  
  observacao text,  
  created_at timestamptz default now()
);

create policy "select" on "public"."plano_retorno"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."plano_retorno"
as PERMISSIVE for INSERT to public
with check (true);
*/