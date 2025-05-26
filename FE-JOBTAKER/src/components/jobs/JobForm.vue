<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !title.isValid }">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        v-model.trim="title.val"
        @blur="clearValidity('title')"
      />
      <p v-if="!title.isValid">title must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !company.isValid }">
      <label for="company">Company</label>
      <input
        type="text"
        id="company"
        v-model.trim="company.val"
        @blur="clearValidity('company')"
      />
      <p v-if="!company.isValid">company must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !location.isValid }">
      <label for="location">Location</label>
      <input
        type="text"
        id="location"
        v-model.trim="location.val"
        @blur="clearValidity('location')"
      />
      <p v-if="!location.isValid">location must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !salary.isValid }">
      <label for="salary">Salary Rate per Month</label>
      <input
        type="number"
        id="salary"
        v-model.number="salary.val"
        @blur="clearValidity('salary')"
      />
      <p v-if="!salary.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !category.isValid }">
      <label for="category">category</label>
      <input
        type="text"
        id="category"
        v-model.trim="category.val"
        @blur="clearValidity('category')"
      />
      <p v-if="!category.isValid">category must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !minimumExperience.isValid }">
      <label for="minimumExperience">Minimum Experience in Year</label>
      <input
        type="number"
        id="minimumExperience"
        v-model.number="minimumExperience.val"
        @blur="clearValidity('minimumExperience')"
      />
      <p v-if="!minimumExperience.isValid">
        Minimum Experience must be greater than 0.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !minimumEducation.isValid }">
      <label for="minimumEducation">Minimum Education</label>
      <input
        type="text"
        id="minimumEducation"
        v-model.number="minimumEducation.val"
        @blur="clearValidity('minimumEducation')"
      />
      <p v-if="!minimumEducation.isValid">
        Minimum Education must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !skills.isValid }">
      <h3>Skills of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="html"
          value="html"
          v-model="skills.val"
          @blur="clearValidity('skills')"
        />
        <label for="html">HTML</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="css"
          value="css"
          v-model="skills.val"
          @blur="clearValidity('skills')"
        />
        <label for="css">CSS</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="javascript"
          value="javascript"
          v-model="skills.val"
          @blur="clearValidity('skills')"
        />
        <label for="javascript">Javascript</label>
      </div>
      <p v-if="!skills.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Add Job</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      title: {
        val: "",
        isValid: true,
      },
      company: {
        val: "",
        isValid: true,
      },
      location: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      salary: {
        val: null,
        isValid: true,
      },
      category: {
        val: "",
        isValid: true,
      },
      skills: {
        val: [],
        isValid: true,
      },
      minimumExperience: {
        val: null,
        isValid: true,
      },
      minimumEducation: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.title.val === "") {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.company.val === "") {
        this.company.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.salary.val || this.salary.val < 0) {
        this.salary.isValid = false;
        this.formIsValid = false;
      }
      if (this.skills.val.length === 0) {
        this.skills.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        title: this.title.val,
        company: this.company.val,
        location: this.location.val,
        desc: this.description.val,
        category: this.category.val,
        salary: this.salary.val,
        minimumExperience: this.minimumExperience.val,
        minimumEducation: this.minimumEducation.val,
        skills: this.skills.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;

  &:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #1900ff;
  }
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;

  &:focus {
    outline: #1900ff solid 1px;
  }

  + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid {
  label {
    color: red;
  }

  input,
  textarea {
    border: 1px solid red;
  }
}
</style>
