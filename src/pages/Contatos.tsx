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