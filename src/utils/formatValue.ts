const formatValue = (value: number): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

const formatDate = (value: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
};

export default formatValue;
export { formatDate };
