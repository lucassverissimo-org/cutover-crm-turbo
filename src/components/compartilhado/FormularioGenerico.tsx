import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
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
  dadosEdicao?: Record<string, string> | null
}

export default function FormularioGenerico({ campos, onSalvar, dadosEdicao }: FormularioGenericoProps) {
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    if (dadosEdicao) {
      Object.entries(dadosEdicao).forEach(([key, value]) => {
        setValue(key, value)
      })
    } else {
      reset()
    }
  }, [dadosEdicao, setValue, reset])

  const aoSubmeter = async (dados: any) => {
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
      {campos.map(({ nome, rotulo, tipo = 'texto' }) => (
        <div key={nome} className={tipo === 'area' ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
          <label htmlFor={nome} className="mb-1 font-medium text-sm text-gray-700 dark:text-gray-300">
            {rotulo}
          </label>
          {tipo === 'area' ? (
            <textarea
              id={nome}
              {...register(nome)}
              className="input"
            />
          ) : (
            <input
              id={nome}
              type={tipo === 'data' ? 'date' : 'text'}
              {...register(nome)}
              className="input"
            />
          )}
        </div>
      ))}
      <div className="md:col-span-2">
        <button type="submit" className="button w-full">💾 Salvar</button>
      </div>
    </form>
  )
}
