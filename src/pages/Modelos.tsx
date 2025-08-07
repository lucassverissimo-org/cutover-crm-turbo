import PaginaEntidade from '../components/compartilhado/PaginaEntidade'

export default function Modelos() {
  return (
    <PaginaEntidade
      nome_tabela="modelos"
      rotulo_formulario="Cadastro Modelos (Email / Documentos / Relatórios)"
      rotulo_grid="Lista de Modelos"
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