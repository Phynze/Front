<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const handleLogin = (event) => {
  event.preventDefault();

  // Reset errors
  emailError.value = '';
  passwordError.value = '';

  let valid = true;

  // Basic email validation
  if (!email.value) {
    emailError.value = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Email is invalid';
    valid = false;
  }

  // Password validation: must contain between 4 and 60 characters
  if (!password.value) {
    passwordError.value = 'Password is required';
    valid = false;
  } else if (password.value.length < 4 || password.value.length > 60) {
    passwordError.value = 'Your password must contain between 4 and 60 characters';
    valid = false;
  }

  if (valid) {
    // Perform login (e.g., API call)
    console.log('Logging in with User :', email.value,'Password : ', password.value);
  }
};

</script>

<template>
  <main>
    <div class="container">
      <form class="responsive-form" @submit="handleLogin">
        <div class="mb-3">
          <label class="form-label" for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email or phone number" />
          <div v-if="emailError" class="text-danger">{{ emailError }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" />
          <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </main>
</template>

<style>
/* Basic styling for the form container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styling for the form */
.responsive-form {
  width: 90%;
  max-width: 500px;
}

/* Media query for screens at least 1280px wide */
@media (max-width: 1920px) {
  .responsive-form {
    width: 300px;
  }
  .btn{
    width: 300px;
  }
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

</style>
