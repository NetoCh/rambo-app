(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221e22"],{cbf3:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"about"},[o("RegisterInvoice")],1)},c=[],n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("v-form",[o("v-row",[o("v-col",{attrs:{cols:"12",lg:"5",sm:"12"}},[o("v-text-field",{attrs:{counter:10,label:"Nombre",required:"",filled:"",clearable:""},on:{blur:function(e){return t.updateInvoiceName()}},model:{value:t.invoice.invoiceName,callback:function(e){t.$set(t.invoice,"invoiceName",e)},expression:"invoice.invoiceName"}})],1),o("v-col",{attrs:{cols:"12",lg:"4",sm:"12"}},[o("v-text-field",{attrs:{counter:10,label:"UPC",required:"",clearable:""},model:{value:t.upc,callback:function(e){t.upc=e},expression:"upc"}})],1),o("v-col",{attrs:{cols:"12",lg:"2",sm:"12"}},[o("v-text-field",{attrs:{type:"number",counter:10,label:"Cantidad",required:"",clearable:""},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),o("v-col",{attrs:{sm:"1"}},[o("v-btn",{attrs:{elevation:"2",rounded:"","x-large":""},on:{click:t.addProduct}},[o("v-icon",{attrs:{dark:""}},[t._v(" mdi-plus ")])],1)],1)],1),o("v-row",[o("v-col",[o("v-card",[t.docId?o("v-card-title",[t._v(t._s(t.docId)+" "),t.productList.length>0?o("v-icon",{staticStyle:{"margin-left":"1rem"},attrs:{type:"button",color:"primary",large:""},on:{click:t.downloadTsv}},[t._v("mdi-download")]):t._e()],1):t._e(),t.productList.length>0?o("v-list",{attrs:{subheader:"","two-line":""}},[o("v-list-item-group",t._l(t.productList,(function(e){return o("v-list-item",{key:e.id},[o("v-list-item-content",[o("v-list-item-title",[t._v(t._s(e.upc))]),o("v-list-item-subtitle",[t._v(t._s(e.amount))])],1),o("v-list-item-action",[o("v-btn",{on:{click:function(o){return t.deleteProduct(e.id)}}},[o("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-minus")])],1)],1)],1)})),1)],1):t._e()],1)],1)],1)],1),t.docId?o("v-row",[o("v-col",[o("v-btn",{attrs:{elevation:"2"},on:{click:function(e){return t.deleteInvoice()}}},[t._v("Eliminar Factura")])],1)],1):t._e(),o("a",{staticStyle:{display:"none"},attrs:{id:"download",href:"",src:""}})],1)},l=[],a=o("f9f2"),d={name:"RegisterInvoice",data:function(){return{docId:null,invoice:{invoiceName:null,createdAt:null},upc:null,amount:null,productList:[]}},methods:{addProduct:function(){var t=this;if(null!==this.upc&&null!==this.amount){var e=a["b"].firestore.FieldValue.serverTimestamp(),o={upc:this.upc,amount:this.amount,createdAt:e};null===this.docId?a["a"].collection("invoices").add({invoiceName:t.invoice.invoiceName,createdAt:e}).then((function(e){t.docId=e.id,t.getProductList(),a["a"].collection("invoices").doc(t.docId).collection("invoice").doc().set(o).then((function(){t.upc=null,t.amount=null}))})).catch((function(t){console.error("Error adding document: ",t)})):a["a"].collection("invoices").doc(this.docId).collection("invoice").doc().set(o).then((function(){t.upc=null,t.amount=null}))}},deleteProduct:function(t){a["a"].collection("invoices").doc(this.docId).collection("invoice").doc(t).delete()},getProductList:function(){var t=this;null!==this.docId&&(a["a"].collection("invoices").doc(this.docId).onSnapshot((function(e){e.exists&&(t.invoice=e.data())})),a["a"].collection("invoices").doc(this.docId).collection("invoice").orderBy("createdAt","desc").onSnapshot((function(e){var o=[];e.forEach((function(t){var e=t.data();e.id=t.id,o.push(e)})),t.productList=o})))},deleteInvoice:function(){var t=this;null!==t.docId&&a["a"].collection("invoices").doc(t.docId).delete().then((function(){t.$router.push("/")}))},downloadTsv:function(){if(!(this.productList.length<=0)){var t=document.getElementById("download"),e=this.invoice.invoiceName?this.invoice.invoiceName:this.docId,o="";this.productList.forEach((function(t){o+="".concat(t.upc,"\t").concat(t.amount,"\r\n")})),t.href="data:text/tab-separated-values,"+encodeURIComponent(o),t.download="".concat(e,".txt"),t.click()}},updateInvoiceName:function(){null!==this.invoice.invoiceName&&null!==this.docId&&a["a"].collection("invoices").doc(this.docId).set({invoiceName:this.invoice.invoiceName},{merge:!0})}},created:function(){var t=this.$route.params.id;t&&(this.docId=t),this.getProductList()}},r=d,s=o("2877"),u=Object(s["a"])(r,n,l,!1,null,null,null),v=u.exports,m={name:"Invoice",components:{RegisterInvoice:v}},h=m,f=Object(s["a"])(h,i,c,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2d221e22.8f66f476.js.map