<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const handleLogin = async (event) => {
  event.preventDefault();

  emailError.value = '';
  passwordError.value = '';

  let valid = true;

  //email validate
  if (!email.value) {
    emailError.value = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Email is invalid';
    valid = false;
  }

  //password validate
  if (!password.value) {
    passwordError.value = 'Password is required';
    valid = false;
  } else if (password.value.length < 4 || password.value.length > 60) {
    passwordError.value = 'Your password must contain between 4 and 60 characters';
    valid = false;
  }

  if (valid) {
    // Perform login (API call)
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email.value, password: password.value }),
      });
      const result = await response.text();
      console.log(result); // Handle success (e.g., store JWT, navigate to another page)
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
</style>async async 
