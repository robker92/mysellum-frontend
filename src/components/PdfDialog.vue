<template>
  <v-dialog
    v-model="show"
    eager
    :width="iFrameWidth + 17"
    height="1025"
    @click:outside="cancel"
  >
    <v-card :width="iFrameWidth + 17" height="1010">
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>{{ pdfDialogTitle }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <iframe
        id="pdfIframe"
        :width="iFrameWidth"
        height="2000"
        frameborder="0"
      ></iframe>
    </v-card>
  </v-dialog>
</template>

<script>
// import orderInvoiceTemplate from "../helpers/pdf/templates/order-invoice";
// import jsPDF from "jspdf";

export default {
  name: "PdfDialog",
  components: {},
  mixins: [],
  props: {
    value: Boolean,
    pdfSrcUrl: String,
    pdfDialogTitle: String,
    // selectedOrder: Object,
  },
  data() {
    return {};
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    iFrameWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 1000;
        // case "xl":
        //   return 800;
      }
      return 1200;
    },
  },
  watch: {
    pdfSrcUrl: (newVal) => {
      console.log(newVal);
      if (newVal !== null) {
        console.log(newVal);
        console.log(document.getElementById("pdfIframe"));
        document.getElementById("pdfIframe").src = newVal;
        // this.download();
      }
    },
  },
  methods: {
    cancel() {
      this.show = false;
    },

    // download() {
    //   const doc = new jsPDF();
    //   /** WITHOUT CSS */
    //   // const contentHtml = this.$refs.content.innerHTML;
    //   const contentHtml = "<html><p>Hi, this is a test</p></html>";
    //   // doc.fromHTML(contentHtml, 15, 15, {
    //   //     width: 170
    //   //   });
    //   // doc.save("sample.pdf");

    //   doc.html(contentHtml, {
    //     callback: (doc) => {
    //       // doc.save();
    //       const url = doc.output("bloburl");
    //       console.log(url);
    //       // myIframe
    //       document.getElementById("pdfIframe").src = url;
    //       // this.iframeSrc = url;
    //     },
    //     x: 10,
    //     y: 10,
    //   });
    // },
  },
};
</script>

<style></style>
