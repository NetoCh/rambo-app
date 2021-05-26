<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="list" :search="search" loading>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon large @click="download(item)"> mdi-download </v-icon>
              <v-icon large @click="view(item)"> mdi-file-search </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <a id="download" href="" src="" style="display: none" />
  </v-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "InvoiceList",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "Nombre", value: "invoiceName" },
        { text: "Fecha", value: "time" },
        { text: "Accions", value: "actions" },
      ],
      list: [],
    };
  },
  methods: {
    view(row) {
      this.$router.push("/invoice/" + row.id);
    },
    download(row) {
      db.collection("invoices")
        .doc(row.id)
        .collection("invoice")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            let model = doc.data();
            model.id = doc.id;
            list.push(model);
          });
          if (list.length <= 0) return;
          const download = document.getElementById("download");
          const downloadName = row.invoiceName ? row.invoiceName : row.id;
          let tsv = "";
          list.forEach((item) => {
            tsv += `${item.upc}\u0009${item.amount}\u000D\u000A`;
          });
          download.href =
            "data:text/tab-separated-values," + encodeURIComponent(tsv);
          download.download = `${downloadName}.txt`;
          download.click();
        });
    },
  },
  created() {
    const self = this;
    db.collection("invoices")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          const { createdAt, invoiceName } = doc.data();
          const date = new Date(createdAt.toDate());
          list.push({
            id: doc.id,
            invoiceName,
            time: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
          });
        });
        self.list = list;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
