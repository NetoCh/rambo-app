<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="true">
          <v-text-field
            v-model="upc"
            :counter="10"
            label="UPC"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="true">
          <v-text-field
            v-model="amount"
            :counter="10"
            label="Cantidad"
            required
            clearable
          ></v-text-field>
        </v-col>
        <v-col sm="1">
          <v-btn elevation="2" rounded x-large @click="addProduct"
            ><v-icon dark> mdi-plus </v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="productList.length > 0">
        <v-col>
          <v-card>
            <v-card-title v-if="docId"
              >{{ docId }}
              <v-icon
                type="button"
                style="margin-left: 1rem"
                color="primary"
                large
                @click="downloadTsv"
                >mdi-download</v-icon
              ></v-card-title
            >
            <v-list subheader two-line>
              <v-list-item-group>
                <v-list-item v-for="row in productList" :key="row.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ row.upc }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      row.amount
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action
                    ><v-btn @click="deleteProduct(row.id)">
                      <v-icon color="grey lighten-1">mdi-minus</v-icon>
                    </v-btn></v-list-item-action
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <a id="download" href="" src="" style="display: none" />
  </v-container>
</template>

<script>
import { db, firebase } from "@/firebase";

export default {
  name: "RegisterInvoice",
  data() {
    return {
      docId: null,
      upc: null,
      amount: null,
      productList: [],
    };
  },
  methods: {
    addProduct() {
      const self = this;
      if (this.upc === null || this.amount === null) return;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      let model = {
        upc: this.upc,
        amount: this.amount,
        createdAt,
      };
      if (this.docId === null) {
        db.collection("invoices")
          .add({ createdAt })
          .then(function (docRef) {
            self.docId = docRef.id;
            self.getProductList();
            db.collection("invoices")
              .doc(self.docId)
              .collection("invoice")
              .doc()
              .set(model)
              .then(() => {
                self.upc = null;
                self.amount = null;
              });
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      } else {
        db.collection("invoices")
          .doc(this.docId)
          .collection("invoice")
          .doc()
          .set(model)
          .then(() => {
            self.upc = null;
            self.amount = null;
          });
      }
    },
    deleteProduct(id) {
      db.collection("invoices")
        .doc(this.docId)
        .collection("invoice")
        .doc(id)
        .delete();
    },
    getProductList() {
      if (this.docId === null) return;
      db.collection("invoices")
        .doc(this.docId)
        .collection("invoice")
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            let model = doc.data();
            model.id = doc.id;
            list.push(model);
          });
          this.productList = list;
        });
    },
    downloadTsv() {
      if (this.productList.length <= 0) return;
      const download = document.getElementById("download");
      let tsv = "";
      this.productList.forEach((item) => {
        tsv += `${item.upc}\t${item.amount}\n`;
      });
      download.href =
        "data:text/tab-separated-values," + encodeURIComponent(tsv);
      download.download = `${this.docId}.txt`;
      download.click();
    },
  },
  created() {
    const docId = this.$route.params.id;
    if (docId) this.docId = docId;
    this.getProductList();
  },
};
</script>
