const errors = {
  'default-message': {
    status: 500,
    message: 'Internal server error',
  },
  projectNotFounded: {
    status: 404,
    message: 'Error, project not found!',
  },
  mustBeProjectOwner: {
    status: 401,
    message: 'Error, you must be the project owner to do that!',
  },
  maxNumberOfProjects: {
    status: 401,
    message: 'Error, max number of projects!',
  },
  invalidInvite: {
    status: 401,
    message: 'Error, invalid invite!',
  },
  inviteAlreadySended: {
    status: 401,
    message: 'Error, this invite was already sended!',
  },
  invalidProject: {
    status: 401,
    message: 'Error, invalid project!',
  },
  emailAlreadyInUse: {
    status: 401,
    message: 'Error, email address already in use!',
  },
  passwordDoesNotMatch: {
    status: 401,
    message: 'Error, password does not match!',
  },
  invalidAccount: {
    status: 401,
    message: 'Error, this account does not exists!',
  },
  nameAlreadyInUse: {
    status: 401,
    message: 'Error, name already in use!',
  },
  permissionDenied: {
    status: 401,
    message: 'Error, permission denied!',
  },
  missingJWT: {
    status: 401,
    message: 'Error, JWT token is missing!',
  },
  invalidJWT: {
    status: 401,
    message: 'Error, JWT token is invalid!',
  },
  authenticationFail: {
    status: 401,
    message: 'Error, incorrect email/password combination!',
  },
};

export default errors;
