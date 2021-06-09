async function fetchAssets(account: any) {
  const url = `https://api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20`;
  const options = { method: 'GET' };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  return response;
}

export default fetchAssets;
