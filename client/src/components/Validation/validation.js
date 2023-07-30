const containsNumbers = (value) => {
    return /\d/.test(value);
};

const validateForm = () => {
  const errors = {};

  // Validación del campo nombre
  if (!formValues.name.trim()) {
    errors.name = 'Name is required';
  } else if (containsNumbers(formValues.name)) {
    errors.name = 'Name cannot contain numbers';
  }

  // Resto de validaciones...

  setErrors(errors);

  // Retorna true si no hay errores, y false si hay errores
  return Object.keys(errors).length === 0;
};

export default validateForm;