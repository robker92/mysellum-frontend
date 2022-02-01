<template>
  <v-container>
    <PdfDialog
      v-model="showPdfDialog"
      :pdf-src-url="pdfSrcUrl"
      :pdf-dialog-title="pdfDialogTitle"
      :selected-order="selectedOrderComputed"
    />
    <v-row class="mb-4" no-gutters>
      <div class="text-left text-h4">
        Your Received Orders
      </div>
      <v-spacer />
      <v-progress-circular
        v-if="reloadingStores"
        indeterminate
        color="primary"
      ></v-progress-circular>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="primary"
            class="ml-3"
            v-bind="attrs"
            v-on="on"
            @click="reloadOrders"
          >
            <v-icon color="primary">mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Reload orders</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="primary"
            class="ml-3"
            v-bind="attrs"
            v-on="on"
            @click="console.log('hi')"
          >
            <v-icon color="primary">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>Actions</span>
      </v-tooltip>
    </v-row>

    <!-- CARD FOR SEARCH AND SORT -->
    <v-row v-if="orderList.length > 0" no-gutters>
      <v-col cols="12" sm="4" md="4" lg="3" xl="3">
        <v-card flat>
          <v-row no-gutters>
            <v-col cols="12" sm="9" md="9" lg="9" xl="9">
              <v-text-field
                v-model="searchTerm"
                type="text"
                label="Search"
                :append-outer-icon="'mdi-send'"
                clear-icon="mdi-close-circle"
                clearable
                dense
                class="mr-2"
                @click:clear="clearMessage"
                @keyup.enter="searchOrder"
                @click:append-outer="searchOrder"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="2" lg="2" xl="2">
              <v-menu bottom left :nudge-bottom="10" offset-y max-width="250px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" outlined color="primary" v-on="on">
                    <v-icon color="primary">mdi-sort</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list dense nav>
                    <v-list-item-group v-model="selectedSort" color="primary">
                      <v-list-item
                        v-for="(item, index) in sortTypes"
                        :key="index"
                        link
                        @click="sortListClicked(index)"
                      >
                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="text-left">
                            {{ item.type }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-menu>
              <!-- </div> -->
            </v-col>
          </v-row>
        </v-card>

        <!-- CARD FOR ORDER LIST -->
        <v-card tile flat>
          <v-list max-height="600" class="overflow-y-auto" shaped>
            <v-list-item-group v-model="selectedOrder" color="primary">
              <template v-for="(order, index) in orderList">
                <v-list-item :key="index" three-line class="my-1">
                  <v-list-item-content>
                    <v-list-item-title class="text-left">
                      {{ getStoreTitles(order.products) }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-left">
                      {{ getDateFormatted(order.datetimeCreated) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="text-left">
                      {{ getTotalSumWithComma(order.totalSum)
                      }}{{ getCurrencySymbol(order.currencyCode) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>
                      {{ getComputedDate(order.date) }}
                    </v-list-item-action-text>

                    <v-icon
                      v-if="
                        order.status.finished === true &&
                          order.status.successfully === true
                      "
                      color="success"
                    >
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <v-icon
                      v-if="order.status.finished === false"
                      color="yellow darken-3"
                    >
                      mdi-clock
                    </v-icon>
                    <v-icon
                      v-if="
                        order.status.finished === true &&
                          order.status.successfully === false
                      "
                      color="error"
                    >
                      mdi-close-circle
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="index < orderList.length - 1"
                  :key="'divider' + index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
        <div
          v-if="loadingOrderData === false && numOfPages > 1"
          class="text-center"
        >
          <v-pagination
            v-model="currentPage"
            :length="numOfPages"
          ></v-pagination>
        </div>
      </v-col>

      <!-- CARD FOR ORDER DETAIL VIEW -->
      <v-col cols="12" sm="8" md="8" lg="9" xl="9">
        <v-card v-if="orderList.length > 0">
          <v-row>
            <v-col cols="12" xs="4" sm="10" md="10" lg="10" xl="11">
              <v-card-title>
                Order: {{ selectedOrderComputed._id }}
              </v-card-title>

              <v-card-subtitle class="text-left">
                Submitted: {{ computedDateTime }}
              </v-card-subtitle>
            </v-col>
            <v-col cols="12" xs="3" sm="2" md="2" lg="2" xl="1">
              <v-menu bottom left :nudge-bottom="10" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="mt-3"
                    fab
                    outlined
                    color="primary"
                    v-on="on"
                  >
                    <v-icon large color="primary">mdi-printer</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list dense nav>
                    <v-list-item link @click="createPdf('orderLabel')">
                      <v-list-item-icon>
                        <v-icon>mdi-email-newsletter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-left">
                          Delivery Information and Label
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item link @click="createPdf('orderInvoice')">
                      <v-list-item-icon>
                        <v-icon>mdi-text-box-search</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-left">
                          Order Invoice</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-email-newsletter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="text-left">
                        <v-list-item-title>Post Label</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-table-large</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="text-left">
                        <v-list-item-title>Excel Export</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>

          <v-card-text>
            <div class="blue--text text--darken-2 text-left my-2">
              <b>View and Set Order Status:</b> <br />
            </div>
            <!-- STATUSES FOR DELIVERY AND PICKUP -->

            <StoreOrderOverviewStatusTimeline
              :status="selectedOrderComputed.status"
              :type="selectedOrderComputed.shippingType"
              @set-status="setOrderStatus"
            />

            <div
              class="blue--text text--darken-2 font-weight-bold text-left mt-2"
            >
              Order Overview ({{ selectedOrderComputed.products.length }} Line
              Items):
            </div>
<!-- 
              :total-sum="selectedOrderComputed.totalSum"
              :total-tax="selectedOrderComputed.totalTax"
              :shipping-costs="selectedOrderComputed.shippingCosts" -->
            <StoreOrderOverviewProductTable
              :products="computedProductArray"
              :gross-item-total="selectedOrderComputed.valueBreakdown.grossItemTotal"
              :gross-shipping-costs="selectedOrderComputed.valueBreakdown.grossShippingCosts"
              :platform-fee-total="selectedOrderComputed.valueBreakdown.platformFeeTotal"
              :transfer-total="selectedOrderComputed.valueBreakdown.transferTotal"
              :tax-for-transfer-amount="selectedOrderComputed.valueBreakdown.taxForTransferAmount"

              :currency-symbol="
                getCurrencySymbol(selectedOrderComputed.currencyCode)
              "
            />

            <div
              class="blue--text text--darken-2 font-weight-bold text-left my-2"
            >
              Customer Contact:
            </div>
            <div class="ml-3 black--text text-left my-2">
              {{ selectedOrderComputed.user.email }}
            </div>

            <div
              class="blue--text text--darken-2 font-weight-bold text-left my-2"
            >
              Shipping Address:
            </div>
            <div class="ml-3 black--text text-left my-2">
              {{ getComputedAddress(selectedOrderComputed.shippingAddress) }}
            </div>

            <div
              class="blue--text text--darken-2 font-weight-bold text-left my-2"
            >
              Billing Address:
            </div>
            <div class="ml-3 black--text text-left my-2">
              {{ getComputedAddress(selectedOrderComputed.billingAddress) }}
            </div>

            <div
              class="blue--text text--darken-2 font-weight-bold text-left my-2"
            >
              Payment Received Via:
            </div>
            <div class="ml-3 black--text text-left my-2">
              {{ selectedOrderComputed.payment.method }}
            </div>

            <div
              class="blue--text text--darken-2 font-weight-bold text-left my-2"
            >
              Action List:
            </div>
            <div class="ml-3 black--text text-left my-2">
              Set Status, Print Label, Mark returns
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :disabled="selectedOrder === 0"
              @click="
                selectedOrder > 0
                  ? (selectedOrder = selectedOrder - 1)
                  : selectedOrder
              "
            >
              <v-icon color="primary">
                mdi-arrow-left-bold
              </v-icon>
            </v-btn>
            <v-btn
              icon
              :disabled="selectedOrder + 1 === orderList.length"
              @click="
                selectedOrder + 1 < orderList.length
                  ? (selectedOrder = selectedOrder + 1)
                  : selectedOrder
              "
            >
              <v-icon color="primary">
                mdi-arrow-right-bold
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="loadingError">
      We are sorry, we could not fetch your oders. Please try again later.
    </div>
    <div v-if="loadingOrderData && !loadingError" class="mt-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import { orderService } from "../services";
import { mapState, mapActions } from "vuex";
import StoreOrderOverviewStatusTimeline from "../components/storeOrderOverviewComponents/StoreOrderOverviewStatusTimeline";
import StoreOrderOverviewProductTable from "../components/storeOrderOverviewComponents/StoreOrderOverviewProductTable";
import {
  compareArrayAsc,
  compareArrayDesc,
  getCurrencySymbolHelper,
  getDateFormatDDMMYYYY,
  truncateString,
} from "../helpers";

// pdf
import PdfDialog from "../components/PdfDialog";
import jsPDF from "jspdf";
import { orderInvoiceTemplate } from "../helpers/pdf/templates/order-invoice";

export default {
  name: "StoreOrderOverviewView",

  components: {
    StoreOrderOverviewStatusTimeline: StoreOrderOverviewStatusTimeline,
    StoreOrderOverviewProductTable: StoreOrderOverviewProductTable,
    PdfDialog: PdfDialog,
  },

  data() {
    return {
      loadingOrderData: true,
      loadingError: false,
      orderList: [],
      searchTerm: "",
      selectedOrder: 0,
      selectedSort: 0,
      reloadingStores: false,
      tableHeaders: [
        {
          text: "Product",
          align: "start",
          value: "title",
        },
        { text: "Quantity Type", value: "quantityValueType" },
        { text: "Price", value: "computedPrice" },
        { text: "Order Quantity", value: "quantity" },
        { text: "Total", value: "totalRowSum" },
      ],
      sortTypes: [
        { type: "Date", icon: "mdi-sort-calendar-ascending", tooltip: "" },
        { type: "Date", icon: "mdi-sort-calendar-descending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-ascending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-descending", tooltip: "" },
        {
          type: "Completion",
          icon: "mdi-sort-bool-ascending-variant",
          tooltip: "",
        },
        {
          type: "Completion",
          icon: "mdi-sort-bool-descending-variant",
          tooltip: "",
        },
      ],
      totalOrderCount: 0,
      pageSize: 20,
      currentPage: 1,

      // pdf
      pdfSrcUrl: "",
      showPdfDialog: false,
      pdfDialogTitle: "",
      currentOrder: {},
    };
  },
  computed: {
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter",
    ]),

    selectedOrderComputed: {
      get() {
        if (this.orderList.length > 0) {
          return this.orderList[this.selectedOrder];
        } else {
          return "";
        }
      },
    },

    computedProductArray: {
      get() {
        if (this.orderList.length > 0) {
          let returnArray = [];
          let currentOrder = this.selectedOrderComputed;
          let currentProduct;
          for (let i = 0; i < currentOrder.products.length; i++) {
            currentProduct = currentOrder.products[i].product;
            currentProduct.quantity = currentOrder.products[i].amount;

            if (currentProduct.quantityValue) {
              currentProduct.quantityValueType =
                currentProduct.quantityValue +
                " " +
                currentProduct.quantityType;
            }

            currentProduct.totalRowSum =
              (currentProduct.price * currentProduct.quantity)
                .toFixed(2)
                .toString() + " " + currentProduct.currencySymbol;
            currentProduct.computedPrice =
              currentProduct.price +  " " + currentProduct.currencySymbol;

            returnArray.push(currentProduct);
            currentProduct = {};
          }
          // console.log(returnArray);
          return returnArray;
        } else {
          return [];
        }
      },
    },

    computedDateTime: {
      get() {
        if (this.orderList.length > 0) {
          return this.getDateFormatted(
            this.selectedOrderComputed.datetimeCreated
          );
        } else {
          return "";
        }
      },
    },
    computedTotalSum: {
      get() {
        if (this.orderList.length > 0) {
          return this.selectedOrderComputed.totalSum.toString() + "€";
        } else {
          return "";
        }
      },
    },
    statusAsIntValue: {
      get() {
        if (this.orderList.length > 0) {
          return 1;
        } else {
          return -1;
        }
      },
    },
    numOfPages() {
      return Math.ceil(this.totalOrderCount / parseInt(this.pageSize));
    },
  },
  watch: {
    currentPage() {
      this.searchFilterSort(false);
    },
  },

  async mounted() {
    this.setStartUpQueryParams();

    // const storeId = this.$route.params.id;
    // const response = await orderService.getStoresOrders(storeId);
    try {
      await this.searchFilterSort();
    } catch (error) {
      console.log(error);
      this.loadingError = true;
      return;
    }

    this.loadingOrderData = false;
    // console.log(response);
    // this.orderList = response.orders;
  },

  methods: {
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addErrorSnackbar",
      "addCloseSnackbar",
    ]),

    async reloadOrders() {
      this.reloadingStores = true;
      try {
        await this.searchFilterSort();
      } catch (error) {
        console.log(error);
        this.loadingError = true;
        return;
      }
      this.reloadingStores = false;
    },

    print() {
      console.log(this.$i18n.locale);
    },

    // numOfPages() {
    //   const result = Math.ceil(this.totalOrderCount / parseInt(this.pageSize));
    //   console.log(result);
    //   return result;
    // },

    getComputedDate(orderDate) {
      if (orderDate) {
        let date = new Date(orderDate);
        console.log(date.getMonth().toString() + "." + date.getFullYear());
        return date.getMonth().toString() + "." + date.getFullYear();
      } else {
        return "";
      }
    },

    sortListClicked(index) {
      switch (index) {
        case 0:
          this.orderList.sort(compareArrayDesc("datetimeCreated"));
          break;
        case 1:
          this.orderList.sort(compareArrayAsc("datetimeCreated"));
          break;
        case 2:
          this.orderList.sort(compareArrayDesc("_id"));
          break;
        case 3:
          this.orderList.sort(compareArrayAsc("_id"));
          break;
      }
    },

    async searchOrder() {
      console.log(this.searchTerm);
      const storeId = this.$route.params.id;
      const result = await orderService.searchOrderByTerm(
        this.searchTerm,
        storeId
      );
      this.orderList = result;
    },

    getPayload() {
      let payload = {
        // searchTerm: this.searchTerm,
        // sort: "",
        // status: "",
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      };
      console.log(this.currentPage);
      return payload;
    },

    async searchFilterSort(resetToPage1) {
      let payload = this.getPayload();
      if (resetToPage1 === true) {
        payload.pageNum = 1;
        this.currentPage = 1;
      }
      //console.log(this.getPayload());
      // this.loadingStoreData = true;
      let queryResult;
      try {
        queryResult = await orderService.getStoresOrders(payload);
      } catch (error) {
        console.log(error);
        throw "Error while loading";
      }
      this.setQueryUrlParams();
      this.orderList = queryResult.orders;
      this.totalOrderCount = queryResult.totalCount;
      // this.loadingStoreData = false;
      //console.log(payload);
      // this.filterChanged = false;
    },

    setStartUpQueryParams() {
      // if (this.$route.query.searchTerm) {
      //   this.searchTerm = this.$route.query.searchTerm;
      // }
      if (this.$route.query.pageNum) {
        this.currentPage = parseInt(this.$route.query.pageNum);
      }
      if (this.$route.query.pageSize) {
        this.pageSize = parseInt(this.$route.query.pageSize);
      }
    },

    setQueryUrlParams() {
      // this.updateParam(this.searchTerm, "sort");
      // this.updateParam({ param: "searchTerm", value: this.searchTerm });
      // this.updateParam({ param: "countries", value: this.selectedCountries });
      // this.updateParam({ param: "states", value: this.selectedStates });
      // this.updateParam({ param: "cities", value: this.selectedCities });
      // this.updateParam({ param: "delivery", value: this.checkBoxDelivery });
      // this.updateParam({ param: "pickup", value: this.checkBoxPickup });
      this.updateParam({ param: "pageSize", value: this.pageSize });
      this.updateParam({ param: "pageNum", value: this.currentPage });
    },

    updateParam(objct) {
      // console.log(objct.value);
      // console.log(objct.param);
      if (objct.value) {
        // Value is not an empty string -> check of param was added before, if yes update it via remove and add
        // if not, just add it
        let paramPayload = {};
        paramPayload[objct.param] = objct.value;
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
          this.addQueryParam(paramPayload);
        } else {
          this.addQueryParam(paramPayload);
        }
      } else {
        // Value is an empty string -> remove param if it was added before
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
        }
      }
    },
    addQueryParam(queryObject) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, queryObject),
      });
    },
    removeQueryParam(param) {
      let query = Object.assign({}, this.$route.query);
      delete query[param];
      this.$router.replace({ query });
    },

    getComputedAddress(addressObject) {
      if (addressObject) {
        return (
          addressObject.firstName +
          " " +
          addressObject.lastName +
          ", " +
          addressObject.addressLine1 +
          ", " +
          addressObject.postcode +
          " " +
          addressObject.city
        );
      } else {
        return "";
      }
    },

    getStoreTitles(productList) {
      let titles = "";
      for (const element of productList) {
        titles = titles + element.product.title + ", ";
      }
      titles = titles.slice(0, -2);
      titles = truncateString(titles, 100);
      return titles;
    },

    getCurrencySymbol(currencyCode) {
      return getCurrencySymbolHelper(currencyCode);
    },

    getTotalSumWithComma(totalSum) {
      if(!totalSum){
        return
      }
      let returnTotalSum = totalSum.replace(".", ",");
      return returnTotalSum;
    },

    getDateFormatted(date) {
      return getDateFormatDDMMYYYY(date);
    },

    async setOrderStatus(data) {
      const storeId = this.$route.params.id;
      const payload = {
        storeId: storeId,
        orderId: this.orderList[this.selectedOrder]._id,
        step: data.step,
        type: data.type,
        value: data.value,
        trackingId: data.trackingId,
      };
      console.log(this.orderList[this.selectedOrder]._id);
      console.log(payload);
      let response;
      try {
        response = await orderService.setStepStatus(payload);
      } catch (error) {
        console.log(error);
        // TODO msg snackbar
        return;
      }

      this.orderList[this.selectedOrder].status.steps.inDelivery = true;
      if (response.statusFinished) {
        this.orderList[this.selectedOrder].status.finished = true;
      }
      if (response.statusSuccessfully) {
        this.orderList[this.selectedOrder].status.successfully = true;
      }

      this.addSuccessSnackbar("Oder status successfully set.");
      return;
    },

    clearMessage() {
      this.searchTerm = "";
      this.searchOrder();
    },

    createPdf(type) {
      console.log(this.selectedOrderComputed);
      console.log(this.computedProductArray);
      let doc;
      if (type === "orderInvoice") {
        doc = orderInvoiceTemplate(
          this.selectedOrderComputed,
          this.computedProductArray
        );
        this.pdfDialogTitle = "Order Invoice";
      }

      const url = doc.output("bloburl");
      this.pdfSrcUrl = url;
      this.showPdfDialog = true;

      // const doc = new jsPDF();
      // const contentHtml = "<html><p>Hi, this is a test</p></html>";

      // doc.html(contentHtml, {
      //   callback: (doc) => {
      //     // doc.save();
      //     const url = doc.output("bloburl");
      //     this.pdfSrcUrl = url;
      //     this.showPdfDialog = true;
      //     this.pdfDialogTitle = "Delivery Note";
      //     this.selectedOrder = this.selectedOrderComputed;
      //   },
      //   x: 10,
      //   y: 10,
      // });
    },
  },
};
</script>

<style>
.v-data-table
  /deep/
  tbody
  /deep/
  tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}
</style>
