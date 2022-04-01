const coinCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();

  delete data.USDT;
  let filterKeys = [];
  filterKeys = Object.keys(data);

  return filterKeys;
};

export default coinCurrencies;
