<template>
  <div class="about">
    <RegisterInvoice />
  </div>
</template>
<script>
// @ is an alias to /src
import RegisterInvoice from "@/components/RegisterInvoice.vue";

export default {
  name: "Invoice",
  components: {
    RegisterInvoice
  }
};
</script>
