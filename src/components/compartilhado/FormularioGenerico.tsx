import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export interface CampoFormulario {
  nome: string
  rotulo: string
  tipo?: 'texto' | 'area' | 'data'
  obrigatorio?: boolean
}

interface FormularioGenericoProps {
  campos: CampoFormulario[]
  onSalvar: (dados: Record<string, string>) => Promise<void> | void
}

export default function FormularioGenerico({ campos, onSalvar }: FormularioGenericoProps) {
  const { register, handleSubmit, reset } = useForm()

  const aoSubmeter = async (dados: any) => {
    // Validação manual básica para obrigatórios
    for (const campo of campos) {
      if (campo.obrigatorio && !dados[campo.nome]) {
        toast.error(`O campo "${campo.rotulo}" é obrigatório`)
        return
      }
    }

    try {
      await onSalvar(dados)
      toast.success('Salvo com sucesso!')
      reset()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar')
    }
  }

  return (
    <form onSubmit={handleSubmit(aoSubmeter)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {campos.map(({ nome, rotulo, tipo = 'texto' }) =>
        tipo === 'area' ? (
          <textarea
            key={nome}
            {...register(nome)}
            placeholder={rotulo}
            className="input md:col-span-2"
          />
        ) : (
          <input
            key={nome}
            type={tipo === 'data' ? 'date' : 'text'}
            {...register(nome)}
            placeholder={rotulo}
            className="input"
          />
        )
      )}
      <div className="md:col-span-2">
        <button type="submit" className="button w-full">💾 Salvar</button>
      </div>
    </form>
  )
}
