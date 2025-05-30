<template>
  <li 
    class="flex justify-between"
    :class="{
      'opacity-50': isProcessed,
      'pointer-events-none': isProcessed
    }"
  >
    <div>
      <label>{{ title }}</label>
      <p>{{ messages }}</p>
    </div>
    <div v-if="isEmployer">
      <base-button 
        v-if="!isProcessed"
        @click="updateStatus('accepted')"
        :disabled="isUpdating"
      >
        <span v-if="!isUpdating">Accept</span>
        <base-spinner v-else small />
      </base-button>
      
      <base-button 
        v-if="!isProcessed"
        mode="outline" 
        @click="updateStatus('rejected')"
        :disabled="isUpdating"
      >
        <span v-if="!isUpdating">Reject</span>
        <base-spinner v-else small />
      </base-button>

      <strong v-if="isProcessed" class="ml-2">
        {{ status === 'accepted' ? '✓ Accepted' : '✗ Rejected' }}
      </strong>
    </div>
    
    <strong v-else
      :class="{
        'text-red-600': rejectedStyling,
        'text-green-500': acceptedStyling,
        'text-gray-500': isPending
      }"
    >
      {{ formattedStatus }}
    </strong>
  </li>
</template>


<script>
import { mapGetters } from "vuex/dist/vuex";
import BaseButton from '../ui/BaseButton.vue';

export default {
  components: { BaseButton },
  props: ["id","title", "messages", "status"],
  data() {
    return {
      localStatus: this.status, 
      isUpdating: false
    };
  },
  computed: {
    ...mapGetters(["isEmployer", "currentUser"]),
    rejectedStyling() {
      return this.status === "rejected";
    },
    acceptedStyling() {
      return this.status === "accepted";
    },
    isPending() {
      return this.status === "pending";
    },
    isProcessed() {
      return this.status !== "pending";
    },
    formattedStatus() {
      switch (this.status) {
        case 'accepted': return '✓ Accepted';
        case 'rejected': return '✗ Rejected';
        default: return 'Pending';
      }
    }
  },
  methods: {
    async updateStatus(newStatus) {
      this.isUpdating = true;
      try {
        this.localStatus = newStatus;
        this.$emit('update-status', {
          id: this.id,
          status: newStatus
        });
      } catch (error) {
        console.error('Update error:', error);
        this.localStatus = this.status;
      } finally {
        this.isUpdating = false;
      }
    }
  },
  watch:{
    status(newVal) {
      this.localStatus = newVal;
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
