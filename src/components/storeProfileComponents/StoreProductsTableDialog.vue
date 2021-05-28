<template>
  <v-dialog
    v-model="show"
    max-width="80%"
    @keydown.esc="cancel"
    @click:outside="cancel"
  >
    <v-card>
      <v-card-title>
        <span class="addProductHeadline">Products - Table View</span>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mb-3"
        />
        <v-btn @click.stop="addProduct" color="pink" dark outlined class="ml-3">
          <v-icon> mdi-plus </v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-data-table
            dense
            :headers="tableHeaders"
            :items="productList"
            :search="search"
            item-key="_id"
            class="elevation-1"
          >
            <template v-slot:item.stockAmount="props">
              <v-edit-dialog
                :return-value.sync="props.item.stockAmount"
                large
                @save="updateStock(props.item)"
              >
                <v-chip
                  :color="getColor(props.item.stockAmount)"
                  dark
                  @click="emptyFunction"
                >
                  {{ props.item.stockAmount }}
                </v-chip>
                <template v-slot:input>
                  <div class="mt-4 title">
                    Update Stock Amount
                  </div>
                  <v-text-field
                    v-model="props.item.stockAmount"
                    type="number"
                    label="Stock Amount*"
                    @keyup.enter="updateStock(props.item)"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                color="orange"
                class="mr-2"
                @click="editProduct(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small color="pink" @click="deleteProduct(item)">
                mdi-delete
              </v-icon>
            </template></v-data-table
          >
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { storeService } from "../../services";

export default {
  name: "StoreProductsTableDialog",

  props: {
    value: Boolean,
    productList: Array
  },

  data() {
    return {
      dialog: false,

      search: "",
      tableHeaders: [
        {
          text: "Title",
          align: "start",
          sortable: true,
          value: "title"
        },
        { text: "Description", value: "description" },
        { text: "Created", value: "datetimeCreated" },
        { text: "Quantity Type", value: "quantityType" },
        { text: "Quantity Value", value: "quantityValue" },
        { text: "Stock Amount", value: "stockAmount" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    cancel() {
      this.show = false;
    },
    deleteProduct: async function(product) {
      let data = {
        storeId: product.storeId,
        productId: product._id
      };
      this.$emit("overlay-start");
      let response = await storeService.deleteProduct(data);
      console.log(response);
      this.$emit("delete-product", product._id);
      this.$emit("overlay-end");
    },
    editProduct(product) {
      this.$emit("edit-product", product);
    },
    addProduct() {
      this.$emit("add-product");
    },
    updateStock: async function(product) {
      var data = {
        storeId: this.$route.params.id,
        _id: product._id,
        stockAmount: parseInt(product.stockAmount)
      };
      this.$emit("overlay-start");
      try {
        await storeService.updateStockAmount(data);
      } catch (error) {
        this.$emit("overlay-end");
        return;
      }
      //console.log(response);
      this.$emit("update-stock", product._id, product.stockAmount);
      this.$emit("overlay-end");
      this.stockAmount = "";
    },
    getColor(stockAmount) {
      if (stockAmount >= 10) {
        return "green";
      } else if (stockAmount < 10 && stockAmount > 0) {
        return "orange";
      }
      return "red";
    },
    emptyFunction() {}
  }
};
</script>

<style></style>
