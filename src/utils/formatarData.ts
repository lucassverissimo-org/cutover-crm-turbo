export function dataExtenso(dataEntrada: string): string {
  const data = extrairDataNumerica(dataEntrada);

  if (!data) return '-';

  const dataObj = new Date(data.ano, data.mes - 1, data.dia);
  if (isNaN(dataObj.getTime())) return '-';

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const diaFormatado = data.dia.toString().padStart(2, '0');
  const mesExtenso = meses[data.mes - 1];
  const anoFormatado = data.ano;

  return `${diaFormatado} de ${mesExtenso} do ano ${anoFormatado}`;
}

export function dataFormatada(dataEntrada: string): string {
  const data = extrairDataNumerica(dataEntrada);

  if (!data) return '-';

  const dataObj = new Date(data.ano, data.mes - 1, data.dia);

  if (isNaN(dataObj.getTime())) return '-';

  const diaFormatado = dataObj.getDate().toString().padStart(2, '0');
  const mesFormatado = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const anoFormatado = dataObj.getFullYear();

  return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}

function extrairDataNumerica(dataEntrada: string): { dia: number, mes: number, ano: number } | null {
  if (!dataEntrada) return null;

  // yyyy-MM-dd
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dataEntrada);
  // dd-MM-yyyy
  const brMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dataEntrada);
  // yyyy/MM/dd
  const barraMatch = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(dataEntrada);

  if (isoMatch) {
    const [ , ano, mes, dia ] = isoMatch;
    return { dia: Number(dia), mes: Number(mes), ano: Number(ano) };
  }

  if (brMatch) {
    const [ , dia, mes, ano ] = brMatch;
    return { dia: Number(dia), mes: Number(mes), ano: Number(ano) };
  }

  if (barraMatch) {
    const [ , ano, mes, dia ] = barraMatch;
    return { dia: Number(dia), mes: Number(mes), ano: Number(ano) };
  }

  return null;
}