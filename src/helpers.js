window.sgConfirm = (title, msg, button, success, type) => {
  Swal.fire({
    title: title,
    html: msg,
    icon: type == null ? 'info' : type,
    showCancelButton: true,
    confirmButtonText: button == null ? 'Aceptar' : button,
  }).then(function (result) {
    if (result.value) {
      success();
    }
  });
};

window.sgConfirmSelect = (title, msg, button, options, placeholder ,success, type) => {
  Swal.fire({
    title: title,
    input: 'select',
    inputOptions: options,
    inputPlaceholder: placeholder,
    inputValidator: function (value) {
      return new Promise(function (resolve) {
        if (value !== '') {
          resolve();
        } else {
          Toast.fire('Error', 'Tiene que seleccionar una opción', 'error');
        }
      });
    },
    html: msg,
    icon: type == null ? 'info' : type,
    showCancelButton: true,
    confirmButtonText: button == null ? 'Aceptar' : button,
  }).then(function (result) {
    if (result.value) {
      success(result.value);
    }
  });
};


window.sgConfirmText = (title, msg, button, success, type) => {
  Swal.fire({
    title: title,
    input: 'text',
    inputPlaceholder: 'Espeficique el motivo',
    inputValidator: nombre => {
      if (!nombre) {
        return "Ingrese una recomendación para el postulante";
      } else {
        return undefined;
      }
    },

    html: msg,
    icon: type == null ? 'info' : type,
    showCancelButton: true,
    confirmButtonText: button == null ? 'Aceptar' : button,
  }).then(function (result) {
    if (result.value) {
      success(result.value);
    }
  });
};

window.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

window.asyncMap = async function (array, callback) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    newArray[index] = await callback(array[index], index, array);
  }
  return newArray;
};
