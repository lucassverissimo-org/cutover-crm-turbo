import React from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../../supabase/client'
import { toast } from 'react-toastify'

export default function PlanoRetornoForm({ onSaved }: { onSaved?: () => void }) {
  const { register, handleSubmit, reset } = useForm()
  
  const onSubmit = async (data: any) => {
    if (supabase == null){
        return;
    }

    const { error } = await supabase.from('plano_retorno').insert(data)
    if (error) {
      toast.error('Erro ao salvar atividade!')
    } else {
      toast.success('Atividade salva com sucesso!')
      reset()
      onSaved?.()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input {...register('step')} placeholder="Step" className="input" />
      <input {...register('atividade')} placeholder="Atividade" className="input" />
      <input {...register('status')} placeholder="Status" className="input" />
      <input {...register('dependencia')} placeholder="Dependência" className="input" />
      <input {...register('solicitante')} placeholder="Solicitante" className="input" />
      <input {...register('executor')} placeholder="Executor" className="input" />
      <input type="date" {...register('inicio')} className="input" />
      <input type="date" {...register('termino')} className="input" />
      <textarea {...register('observacao')} placeholder="Observação" className="input md:col-span-2" />
      <div className="md:col-span-2">
        <button type="submit" className="button w-full">💾 Salvar Atividade</button>
      </div>
    </form>
  )
}
