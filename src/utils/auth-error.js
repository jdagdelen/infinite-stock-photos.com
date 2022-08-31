export default function authError(code) {
  if (code === 'auth/wrong-password') return 'Invalid Password';
  else if (code === 'auth/user-not-found') return 'Invalid Email';
  else if (code === 'auth/email-already-in-use')
    return 'Email Address already in use';
  else if (code === 'auth/weak-password') return 'Password is weak';
  else return 'Something went wrong';
}
