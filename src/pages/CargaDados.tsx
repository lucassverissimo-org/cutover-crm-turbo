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