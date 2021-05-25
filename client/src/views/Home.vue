<template>
  <div class="home">
    <InvoiceList />
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceList from "@/components/InvoiceList.vue";

export default {
  name: "home",
  components: {
    InvoiceList
  }
};
</script>
