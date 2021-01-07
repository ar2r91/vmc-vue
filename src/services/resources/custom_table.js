export default {
  root: 'custom-table',
  getColumns(reference) {
    return api.get(this.root + '/' + reference);
  },
  getProperties(reference) {
    return api.get(this.root + '/' + reference + '/properties');
  },
  storeColumns(reference, data) {
    return api.post(this.root + '/' + reference, data).then(() => {
      Toast.fire('Felicitaciones', 'Se han guardado los cambios correctamente.', 'success')
    });
  },
}
