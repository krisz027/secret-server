export function createSecret(formData) {
    var url = `${location.origin}/secret`;
    var headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return axios({
        method: 'post',
        url: '/secret',
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        data: formData
    });
  //  return axios.post(url, formData, headers);
}