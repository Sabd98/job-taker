<template>
  <li>
    <h3>{{ title }}</h3>
    <h4 class="flex">
      <DollarSign :size="25" />&nbsp;{{
        currencyFormatter.format(salary)
      }}/month
    </h4>

    <strong class="flex">
      <LucideBuilding :size="25" />&nbsp;{{ companyDetail }}</strong
    >
    <div>
      <base-badge
        v-for="skill in skills"
        :key="skill"
        :type="skill"
        :title="skill"
        >{{ skill }}</base-badge
      >
    </div>
    <div class="actions pt-3" v-show="currentUser.role">
      <base-button v-if="!isEmployer" link mode="outline" :to="jobApplyLink"
        >Apply</base-button
      >
      <base-button link :to="jobDetailsLink">View Detail</base-button>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex";
import { mixinCurrency } from "../../mixins/currencyFormatter";
import { DollarSign, LucideBuilding } from "lucide-vue-next";

export default {
  props: ["id", "title", "company", "location", "salary", "skills"],
  components: {
    DollarSign,
    LucideBuilding,
  },
  mixins: [mixinCurrency],
  computed: {
    ...mapGetters(["isEmployer", "currentUser"]),
    companyDetail() {
      return this.company + "-" + this.location;
    },
    jobApplyLink() {
      return this.$route.path + "/" + this.id + "/apply";
    },
    jobDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #1900ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
