export function dataExtenso(dataISO: string) {
  const data = new Date(dataISO)

  if (isNaN(data.getTime())) 
    return '-';

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = data.getMonth()
  const ano = data.getFullYear()

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ]

  const dataExtenso = `${dia} de ${meses[mes]} do ano ${ano}`

  return dataExtenso;
}

export function dataFormatada(dataISO: string) {
  const data = new Date(dataISO)
  
  if (isNaN(data.getTime())) 
    return '-';

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = data.getMonth()
  const ano = data.getFullYear()

  const dataFormatada = `${dia}/${(mes + 1).toString().padStart(2, '0')}/${ano}`

  return dataFormatada
}

