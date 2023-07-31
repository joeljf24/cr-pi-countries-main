const validations = (activityData) => {
  const errors = {};

  // Validar el nombre
  if (!activityData.name) {
    errors.name = ' ';
  } else if (!/^[A-Za-z\s]+$/.test(activityData.name)) {
    errors.name = 'Name can only contain letters and spaces.';
  }

  // Validar la dificultad
  if (!activityData.difficulty) {
    errors.difficulty = 'Difficulty is required.';
  }

  // Validar la temporada
  if (!activityData.season) {
    errors.season = 'Season is required.';
  }

  // Validar los países
  if (!activityData.countries || activityData.countries.length === 0) {
    errors.countries = 'At least one country is required.';
  }

  return errors;
};

export default validations;