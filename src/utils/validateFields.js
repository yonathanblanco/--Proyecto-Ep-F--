import { notifyErrorRequest } from "@/utils/notify.js";

export function validarCampos(email, password, document = null) {
    if (email === '' || password === '') {
      notifyErrorRequest('Por favor llene todos los campos');
      return false;
    }
    if (document !== null && document === '') {
      notifyErrorRequest('Por favor ingrese el documento');
      return false;
    }
    return true;
  }