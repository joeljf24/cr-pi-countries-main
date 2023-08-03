const validations = (activityData) => {
  const errors = {};

  // Validar el nombre
  if (!activityData.name) {
    errors.name = ' ';
  } else if (activityData.name.length < 2 || activityData.name.length > 20){
    errors.name = 'The name must have between two and twenty letters';
  } else if (!/^[A-Za-z\s]+$/.test(activityData.name)) {
    errors.name = 'Name can only contain letters and spaces.';
  }

  // Validar la dificultad
  if (!activityData.difficulty) {
    errors.difficulty = 'Difficulty is required.';
  }

  if (!activityData.duration) {
    errors.duration = 'Duration is required.';
  }

  if (activityData.duration === "00:00") {
    errors.duration = 'Duration cannot be zero.';
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