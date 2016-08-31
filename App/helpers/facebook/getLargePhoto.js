export default ({ token, picId, callback }) => {
  if (!picId && !token) return false;

  fetch(`https://graph.facebook.com/v2.7/${picId}/picture?redirect=false&access_token=${token}`)
  .then(data => data.json())
  .then(({ data }) =>  callback({ data, picId }))
  .catch(err => {
    console.log(`Error here: ${err}`)
  })
}
