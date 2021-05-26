<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" lg="5" sm="12">
          <v-text-field
            v-model="invoice.invoiceName"
            :counter="10"
            label="Nombre"
            @blur="updateInvoiceName()"
            required
            filled
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" sm="12">
          <v-text-field
            v-model="upc"
            type="number"
            :counter="10"
            label="UPC"
            ref="upc"
            required
            clearable
            v-on:keyup.enter="$refs.cantidad.focus()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" sm="12">
          <v-text-field
            v-model="amount"
            type="number"
            :counter="10"
            label="Cantidad"
            ref="cantidad"
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
      <v-row>
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
                v-if="productList.length > 0"
                >mdi-download</v-icon
              ></v-card-title
            >
            <v-list subheader two-line v-if="productList.length > 0">
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
    <v-row v-if="docId">
      <v-col>
        <v-btn elevation="2" @click="deleteInvoice()">Eliminar Factura</v-btn>
      </v-col>
    </v-row>
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
      invoice:{
        invoiceName: null,
        createdAt: null
      },
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
          .add({ invoiceName: self.invoice.invoiceName, createdAt })
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
                self.$refs.upc.focus();
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
            self.$refs.upc.focus();
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
        .onSnapshot((doc) => {
          if(doc.exists)
            this.invoice = doc.data();
        });
      db.collection("invoices")
        .doc(this.docId)
        .collection("invoice")
        .orderBy("createdAt", "desc")
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
    deleteInvoice() {
      const self = this;
      if (self.docId === null) return;
      db.collection("invoices")
        .doc(self.docId)
        .delete()
        .then(() => {
          self.$router.push("/");
        });
    },
    downloadTsv() {
      if (this.productList.length <= 0) return;
      const download = document.getElementById("download");
      const downloadName = this.invoice.invoiceName ? this.invoice.invoiceName  : this.docId;
      let tsv = "";
      this.productList.forEach((item) => {
        tsv += `${item.upc}\u0009${item.amount}\u000D\u000A`;
      });
      download.href =
        "data:text/tab-separated-values," + encodeURIComponent(tsv);
      download.download = `${downloadName}.txt`;
      download.click();
    },
    updateInvoiceName() {
      if (this.invoice.invoiceName === null || this.docId === null) return;
      db.collection("invoices").doc(this.docId).set(
        {
          invoiceName: this.invoice.invoiceName,
        },
        { merge: true }
      );
    }
  },
  created() {
    const docId = this.$route.params.id;
    if (docId) this.docId = docId;
    this.getProductList();
  },
};
</script>
