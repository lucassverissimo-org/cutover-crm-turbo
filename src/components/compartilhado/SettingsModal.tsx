import { X } from 'lucide-react'
import PaginaEntidade from '../../components/compartilhado/PaginaEntidade'
interface SettingsModalProps {
  onClose: () => void
}
export default function SettingsModal({onClose}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
        
        <div className="flex justify-start gap-2">
          <button
            onClick={onClose}
            className="bg-blue-500 h-6 text-white px-1 py-1 rounded hover:bg-blue-600"
          >
            <X size={12}/>
          </button>
          <h2 className="text-lg font-bold mb-4 text-blue-400">Configurações</h2>
        </div>
        
        <PaginaEntidade
            nome_tabela="releases"
            rotulo_formulario="Releases"
            rotulo_grid="Lista"
            campos={[        
                { nome: 'descricao', rotulo: 'Descrição', tipo: 'texto', obrigatorio: true },
                { nome: 'versao', rotulo: 'Versão', tipo: 'texto', obrigatorio: true },
                { nome: 'patch', rotulo: 'Patch', tipo: 'texto', obrigatorio: false },
                { nome: 'data_gmud', rotulo: 'Data GMUD', tipo: 'data', obrigatorio: true },
                { nome: 'observacoes', rotulo: 'Observações', tipo: 'area', obrigatorio: false }
            ]}
        />                
      </div>
    </div>
  )
}

/*
create table public.releases (
  id uuid primary key default gen_random_uuid(),
  descricao text,
  versao text,
  patch text,
  data_gmud text,
  observacoes text,
  created_at timestamptz default now()
);

create policy "select" on "public"."releases"
as PERMISSIVE for SELECT to public
using (true);

create policy "insert" on "public"."releases"
as PERMISSIVE for INSERT to public
with check (true);
*/