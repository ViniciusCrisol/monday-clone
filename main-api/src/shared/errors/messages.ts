export const invalidAccount = {
  status: 400,
  message: 'Error, this account does not exists!',
};

export const projectOwner = {
  status: 401,
  message: 'Error, you must be the project owner to do that!',
};

export const inviteSended = {
  status: 401,
  message: 'Error, this invite was already sended!',
};

export const invalidInvite = {
  status: 401,
  message: 'Error, invalid invite!',
};

export const emailAlreadyInUse = {
  status: 400,
  message: 'Error, email address already in use!',
};

export const maxNumberOfProjects = {
  status: 400,
  message: 'Error, max number of projects!',
};

export const authenticationFail = {
  status: 401,
  message: 'Error, incorrect email/password combination!',
};

export const passwordDoesNotMatch = {
  status: 401,
  message: 'Error, password does not match!',
};

export const jwtIsMissing = {
  status: 401,
  message: 'Error, JWT token is missing!',
};

export const jwtIsInvalid = {
  status: 401,
  message: 'Error, JWT token is invalid!',
};

export const nameAlreadyInUse = {
  status: 400,
  message: 'Error, name already in use!',
};
