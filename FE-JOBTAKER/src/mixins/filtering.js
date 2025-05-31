import { dummySkills } from "../utils/dummySkillList";

export const mixinFiltering = {
  emits: ["change-filter"],
  data() {
    return {
      searchTerm: "",
      selectedSkills: [],
      skillOptions: dummySkills,
    };
  },
  methods: {
    applyFilters() {
      const filters = {
        search: this.searchTerm.trim().toLowerCase(),
        skills: this.selectedSkills,
      };
      this.$emit("change-filter", filters);
    },
    resetFilters() {
      this.searchTerm = "";
      this.selectedSkills = [];
      this.applyFilters();
    },
  },
};
