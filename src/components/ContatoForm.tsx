import React from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../supabase/client'

export default function ContatoForm() {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    if (!supabase) {
      alert('Supabase não está configurado!')
      return
    }

    const { error } = await supabase.from('contatos').insert(data)
    if (error) alert('Erro ao salvar')
    else {
      alert('Contato salvo!')
      reset()
    }
  }

  if (!supabase) {
    return <p className="text-red-500">⚠️ Supabase não configurado.</p>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input {...register('nome')} placeholder="Nome Completo" className="input" />
      <input {...register('empresa')} placeholder="Empresa" className="input" />
      <input {...register('papel_projeto')} placeholder="Papel no Projeto" className="input" />
      <input {...register('email')} placeholder="E-mail" className="input" />
      <input {...register('telefone')} placeholder="Telefone" className="input" />
      <input {...register('login')} placeholder="Login" className="input" />
      <input {...register('rg')} placeholder="RG" className="input" />
      <div className="md:col-span-2">
        <button type="submit" className="button w-full">💾 Salvar Contato</button>
      </div>
    </form>
  )
}
