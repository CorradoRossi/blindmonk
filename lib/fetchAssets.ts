const fetchAssets = (account: any) => {
  const url = `https://api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20`;
  const options = { method: 'GET' };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
};

export default fetchAssets;
