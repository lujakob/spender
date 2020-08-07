export const sanitizeAmount = (val: string) => {
  let validated = val.replace(/[^0-9,]/g, '');
  if (validated.indexOf(',') >= 0) {
    const [amount, decimals] = val.split(',');
    if (decimals && decimals.length > 2) {
      validated = amount + ',' + decimals.substr(0, 2);
    }
  }
  return validated;
};

export const fieldValueToCents = (fieldValue: string): number => {
  let cents;

  if (!fieldValue) {
    return null;
  }

  const [amount, decimals] = fieldValue.split(',');

  if (fieldValue) {
    if (!decimals) {
      // this is the case if no colon or colon but no decimals behind it
      cents = +amount * 100;
    } else {
      // truncate decimals to two digits and calc value
      const truncatedDecimals = decimals.substr(0, 2);
      cents = +amount * 100 + parseInt(truncatedDecimals, 10) * (truncatedDecimals.length === 1 ? 10 : 1);
    }
  } else {
    cents = 0;
  }
  return cents;
};
