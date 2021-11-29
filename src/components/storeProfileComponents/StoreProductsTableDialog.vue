<template>
  <v-dialog
    v-model="show"
    max-width="80%"
    @keydown.esc="cancel"
    @click:outside="cancel"
  >
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Products - Table View</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <!-- <span class="addProductHeadline">Products - Table View</span> -->

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mb-3"
        />
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="editStore"
              dark
              outlined
              class="ml-3"
              v-bind="attrs"
              v-on="on"
              @click.stop="addProduct"
            >
              <v-icon> mdi-plus </v-icon></v-btn
            >
          </template>
          <span>Produkt hinzufügen</span>
        </v-tooltip>
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
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      :color="getColor(props.item.stockAmount)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="emptyFunction"
                    >
                      {{ props.item.stockAmount }}
                    </v-chip>
                  </template>
                  <span>Lagerbestand aktualisieren</span>
                </v-tooltip>

                <template v-slot:input>
                  <div class="mt-4 title">
                    Update Stock Amount
                  </div>
                  <v-text-field
                    v-model="props.item.stockAmount"
                    type="number"
                    label="Stock Amount*"
                    single-line
                    counter
                    @keyup.enter="updateStock(props.item)"
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    color="orange"
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="editProduct(item)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Produkt bearbeiten</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteProduct(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Produkt löschen</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { productService } from "../../services";

export default {
  name: "StoreProductsTableDialog",

  props: {
    value: Boolean,
    productList: Array,
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
          value: "title",
        },
        { text: "Description", value: "description" },
        { text: "Created", value: "datetimeCreated" },
        { text: "Quantity Type", value: "quantityType" },
        { text: "Quantity Value", value: "quantityValue" },
        { text: "Stock Amount", value: "stockAmount" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
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
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    cancel() {
      this.show = false;
    },
    deleteProduct: async function(product) {
      let data = {
        storeId: product.storeId,
        productId: product._id,
      };
      this.$emit("overlay-start");
      let response = await productService.deleteProduct(data);
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
        stockAmount: parseInt(product.stockAmount),
      };
      this.$emit("overlay-start");
      try {
        await productService.updateStockAmount(data);
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
    emptyFunction() {},
  },
};
</script>

<style></style>
