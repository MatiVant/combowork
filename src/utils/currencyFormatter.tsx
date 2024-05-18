function currencyFormatter(number:number) {
    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
    return formatter.format(number);
}

export default currencyFormatter