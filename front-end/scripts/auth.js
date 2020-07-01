// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const firstName = signupForm['signup-firstName'].value;
  const lastName = signupForm['signup-lastName'].value;

  console.log(email, password, firstName, lastName)

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password, firstName, lastName)
    .then(cred => {
    console.log(cred.user);
    // // close the signup modal & reset form
    // const modal = document.querySelector('#modal-signup');
    // M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});