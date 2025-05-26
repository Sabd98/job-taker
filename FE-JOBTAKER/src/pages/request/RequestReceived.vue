<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured, please try again"
      @close="handleError"
    ></base-dialog>
    <section>
      <base-card>
        <headers>
          <h1 class="font-bold text-2xl">Request History</h1>
        </headers>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :title="req.title"
            :messages="req.message"
            :status="req.status"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any request yet!</h3>
      </base-card>
      {{ console.log(receivedRequests,'judul pt') }}

    </section>
  </div>
</template>

<script>
import RequestItem from "../../components/request/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
