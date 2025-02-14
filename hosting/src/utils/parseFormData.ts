const parseFormData = (formData: FormData) => {
  const object: { [key: string]: unknown } = {};
  formData.forEach((value, key) => {
    if (
      (key.includes('date') || key.toLowerCase().includes('at')) &&
      value === ''
    )
      object[key] = null;
    else if (value === 'false' || value === 'true')
      object[key] = value === 'true';
    else object[key] = value;
  });

  return object;
};

export { parseFormData };
