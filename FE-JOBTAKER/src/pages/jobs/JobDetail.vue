<template>
  <div>
    <section>
      <base-card>
        <h1 class="mb-2 text-4xl font-bold">{{ title }}</h1>
        <h1  class=" flex mb-2 text-2xl font-bold"> <LucideBuilding :size="28" />&nbsp;{{ companyDetail }}</h1>

        <ul class="my-3 space-y-3">
          <li class="flex"> <DollarSign :size="25" />&nbsp;{{ currencyFormatter.format(salary) }}/month</li>
          <li class="flex"><Layers :size="25" />&nbsp;{{ category }}</li>
          <li class="flex"><CalendarRange :size="25" />&nbsp;{{ minimumExperience }} years</li>
          <li class="flex"><BookOpenText :size="25" />&nbsp;{{ minimumEducation }}</li>
        </ul>
        <p class="indent-10">{{ description }}</p>
      </base-card>
    </section>
    <section  v-if="!isEmployer && currentUser.role" >
      <base-card>
        <header class="space-y-2">
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="applyLink">Apply</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <!-- <section>
      <base-card>
        <base-badge
          v-for="skill in skills"
          :key="skill"
          :type="skill"
          :title="skill"
        ></base-badge>
      </base-card>
    </section> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex";
import { mixinCurrency } from "../../mixins/currencyFormatter";
import { DollarSign, LucideBuilding,Layers, CalendarRange, BookOpenText } from "lucide-vue-next";

export default {
  props: ["id"],
  components: {
    DollarSign,
    LucideBuilding,
    Layers,
    CalendarRange,
    BookOpenText,
  },
  mixins: [mixinCurrency],
  data() {
    return {
      // selectedJob: null,
      isClicked: false,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadSelectedJob() {
      this.isLoading = true;
      this.error = null;
      try {
        await this.$store.dispatch("jobs/loadSelectedJob", {
          jobId: this.id,
          forceRefresh: true,
        });
      
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters('jobs',["selectedJob"]),
    ...mapGetters([
      'isEmployer',
      'currentUser'
    ]),
    companyDetail() {
      return this.selectedJob?.company + "-" + this.selectedJob?.location;
    },
    title() {
      return this.selectedJob?.title;
    },
    category() {
      return this.selectedJob?.category;
    },
    minimumExperience() {
      return this.selectedJob?.minimumExperience;
    },
    minimumEducation() {
      return this.selectedJob?.minimumEducation;
    },
    skills() {
      return this.selectedJob?.skills;
    },
    salary() {
      return this.selectedJob?.salary;
    },
    description() {
      return this.selectedJob?.desc;
    },
    applyLink() {
      return this.$route.path + "/apply";
    },
  },
  created() {
    this.loadSelectedJob();
  },
  watch: {
    id() {
      this.loadSelectedJob(); 
    },
  },
};
</script>
