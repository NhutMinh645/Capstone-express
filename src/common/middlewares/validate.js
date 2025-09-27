import createError from 'http-errors';

export const validate = (schema, source = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });
  if (error) return next(createError(400, error.details.map(d => d.message).join(', ')));
  req[source] = value;
  next();
};
