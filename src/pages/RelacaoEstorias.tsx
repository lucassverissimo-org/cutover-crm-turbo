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