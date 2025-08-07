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