<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="message">Message</label>
      <textarea type="text" id="message" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">Please enter a non-empty message.</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (this.message === "") {
        this.formIsValid = false;
        return;
      }
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login to apply!");
        return this.$router.push("/login");
      }
      this.$store.dispatch("requests/applyJob", {
        message: this.message,
        jobId: this.$route.params.id,
        userId: userId
      });
      this.$router.replace("/jobs");
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
