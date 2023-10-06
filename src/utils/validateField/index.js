const validators = {
  name: /^[A-Za-z0-9]{4,}$/,
};

export const validateField = (value) => {
  let errorMessage = '';

  const errorActions = {
    userName: () => {
      if (!validators.name.test(value)) {
        errorMessage = 'You must enter at least 4 characters';
      }
      if (value === 'doublevpartners') {
        errorMessage = 'Searching for "doublevpartners" is not allowed';
      } 
    }
  };

  errorActions.userName();

  return errorMessage;

};