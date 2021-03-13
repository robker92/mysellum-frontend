<template>
  <v-container>
    <div class="text-left text-h4">
      Your Received Orders
    </div>
    <!--    <v-card class="mx-auto" max-width="400" tile>
      <v-virtual-scroll :items="orderList" :item-height="80" height="500">
       
        <template v-slot:default="{ item }">
          <v-list>
            <v-list-item-group v-model="selectedOrder" color="primary">
              <v-list-item
                three-line
                @click="print"
                v-for="(order, index) in orderList"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-left">{{
                    item.totalSum
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="text-left">
                    Secondary line text Lorem ipsum
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    consectetur adipiscing elit.
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text>15 min</v-list-item-action-text>


                  <v-icon color="yellow darken-3">
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </v-virtual-scroll>
    </v-card> -->

    <!-- CARD FOR SEARCH AND SORT -->
    <v-row v-if="orderList.length > 0">
      <v-col cols="12" md="5" lg="4" xl="3">
        <v-card flat>
          <v-row no-gutters>
            <v-col cols="12" md="10" lg="10" xl="10">
              <v-text-field
                v-model="searchTerm"
                type="text"
                label="Search"
                :append-outer-icon="'mdi-send'"
                clear-icon="mdi-close-circle"
                clearable
                @click:clear="clearMessage"
                dense
                class="mr-3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" lg="2" xl="2">
              <v-menu bottom left :nudge-bottom="10" offset-y max-width="250px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" outlined color="primary">
                    <v-icon color="primary">mdi-sort</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list dense nav>
                    <v-list-item-group v-model="selectedSort" color="primary">
                      <v-list-item
                        v-for="(item, index) in sortTypes"
                        :key="index"
                        @click="sortListClicked(index)"
                        link
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
            </v-col>
          </v-row>
        </v-card>

        <!-- CARD FOR ORDER LIST -->
        <v-card tile>
          <v-list max-height="800" class="overflow-y-auto">
            <v-list-item-group v-model="selectedOrder" color="primary">
              <v-list-item
                three-line
                v-for="(order, index) in orderList"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    Order: {{ order._id }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-left">
                    Payment: {{ order.payment }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    Contact: {{ order.user.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text>
                    {{ getComputedDate(order.date) }}
                  </v-list-item-action-text>

                  <!-- old: {{ getComputedDate(order.date) }} {{ order.date ? getComputedDate(order.date) : "" }}<v-icon color="grey lighten-1">
                mdi-star-outline
              </v-icon> -->
                  <v-icon
                    v-if="
                      order.status.finished == true &&
                        order.status.successfully == true
                    "
                    color="success"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <v-icon
                    v-if="order.status.finished == false"
                    color="yellow darken-3"
                  >
                    mdi-clock
                  </v-icon>
                  <v-icon
                    v-if="
                      order.status.finished == true &&
                        order.status.successfully == false
                    "
                    color="error"
                  >
                    mdi-close-circle
                  </v-icon>
                  <!--  <v-icon color="yellow darken-3">
                    mdi-clock-outline
                  </v-icon>
                  <v-icon color="success">
                    mdi-checkbox-marked-circle-outline
                  </v-icon>
                  <v-icon color="error">
                    mdi-close-circle-outline
                  </v-icon> -->
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- CARD FOR ORDER DETAIL VIEW -->
      <v-col cols="12" md="7" lg="8" xl="9">
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
                    v-on="on"
                    class="mt-3"
                    fab
                    outlined
                    color="primary"
                  >
                    <v-icon large color="primary">mdi-printer</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list dense nav>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-email-newsletter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-left">
                          Delivery Information and Label
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-text-box-search</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-left">
                          Order Overview</v-list-item-title
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
          <!-- <v-card-text>
            <v-card width="50%">
              <v-row align-content="start" align="start">
                <v-timeline align-top>
                  <v-timeline-item
                    small
                    right
                    class="text-left"
                    color="green"
                    fill-dot
                    >Order Received</v-timeline-item
                  >
                  <v-timeline-item
                    small
                    right
                    class="text-left"
                    color="grey"
                    fill-dot
                  >
                    Payment Received
                  </v-timeline-item>
                  <v-timeline-item
                    small
                    right
                    class="text-left"
                    color="grey"
                    fill-dot
                    >Items Packed</v-timeline-item
                  >
                  <v-timeline-item
                    small
                    right
                    class="text-left"
                    color="grey"
                    fill-dot
                    >Package Sent</v-timeline-item
                  >
                </v-timeline>
              </v-row>
            </v-card></v-card-text
          > -->

          <v-card-text>
            <!-- <div class="text--primary text-left my-2">
              <b>Order Status:</b> <br />
              <div class="success--text">Order Received</div>
              <div class="success--text">Payment Pending</div>
              <v-icon color="grey">
                mdi-truck-delivery
              </v-icon>
              <v-icon>mdi-chevron-right</v-icon>

              <v-icon color="success">mdi-check-bold</v-icon>
            </div> -->
            <div class="text--primary text-left my-2">
              <b>View and Set Order Status:</b> <br />
            </div>
            <!-- STATUSES FOR DELIVERY AND PICKUP
            <v-row class="mb-2">
              <v-col cols="12" lg="2" xl="2">
                <v-card flat>
                  <v-icon color="success" large>mdi-file-document</v-icon>
                  <div class="success--text">Order Received</div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="1" xl="1">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-col>
              <v-col cols="12" lg="2" xl="2">
                <v-card flat>
                  <v-icon color="success" large>mdi-cash-multiple</v-icon>
                  <div class="success--text">Payment Received</div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="1" xl="1">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-col>
              <v-col cols="12" lg="2" xl="2">
                <v-hover v-slot="{ hover }">
                  <v-card :elevation="hover ? 10 : 2" @click="print()">
                    <v-icon color="grey" large>mdi-truck-delivery</v-icon>
                    <div class="grey--text">Set Status: In Delivery</div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>

            <v-row class="mb-2">
              <v-col cols="12" lg="2" xl="2">
                <v-card flat>
                  <v-icon color="success" large>mdi-file-document</v-icon>
                  <div class="success--text">Order Received</div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="1" xl="1">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-col>
              <v-col cols="12" lg="2" xl="2">
                <v-card flat>
                  <v-icon color="success" large
                    >mdi-package-variant-closed</v-icon
                  >
                  <div class="success--text">Package Ready For Pick-Up</div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="1" xl="1">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-col>
              <v-col cols="12" lg="2" xl="2">
                <v-hover v-slot="{ hover }">
                  <v-card :elevation="hover ? 10 : 2" @click="print()">
                    <v-icon color="grey" large>mdi-handshake-outline</v-icon>
                    <div class="grey--text">Set Status: Handover completed</div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row> -->

            <StoreOrderOverviewStatusTimeline
              :status="selectedOrderComputed.status"
              :type="selectedOrderComputed.type"
            />

            <div class="text--primary text-left mt-2">
              <b>Line Items ({{ selectedOrderComputed.products.length }}):</b>
            </div>
            <v-data-table
              :headers="tableHeaders"
              :items="computedProductArray"
              dense
              disable-pagination
              disable-sort
              hide-default-footer
              class="elevation-1"
            >
              <template slot="body.append">
                <tr class="text-left primary--text">
                  <td><strong>Total Sum</strong></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{ computedTotalSum }}</td>
                </tr>
              </template>
              <!--  <template v-slot:footer>
                <v-divider />
                <div class="text--primary text-right my-3 mr-5">
                  <strong> Total Sum:</strong> {{ computedTotalSum }}
                </div>
              </template> -->
            </v-data-table>
            <!--   <div class="text--primary text-left my-2">
              <b>Total Sum:</b> <br />
              {{ computedTotalSum }}
            </div> -->
            <div class="text--primary text-left my-2">
              <b>Customer Contact:</b> <br />
              {{ selectedOrderComputed.user.email }}
            </div>
            <div class="text--primary text-left my-2">
              <b>Shipping Address:</b> <br />
              {{ getComputedAddress(selectedOrderComputed.shippingAddress) }}
            </div>
            <div class="text--primary text-left my-2">
              <b>Billing Address:</b> <br />
              {{ getComputedAddress(selectedOrderComputed.billingAddress) }}
            </div>
            <div class="text--primary text-left my-2">
              <b>Payment Method:</b> <br />
              {{ selectedOrderComputed.payment }}
            </div>
            <div class="text--primary text-left my-2">
              <b>Action List:</b> <br />
              Set Status, Print Label, Mark returns
            </div>
          </v-card-text>

          <v-card-actions>
            <!-- <v-btn>
              <v-icon color="primary">
                mdi-truck-delivery
              </v-icon>
              Print Post Label
            </v-btn> -->

            <v-spacer></v-spacer>
            <v-btn
              @click="
                selectedOrder > 0
                  ? (selectedOrder = selectedOrder - 1)
                  : selectedOrder
              "
              icon
            >
              <v-icon color="primary">
                mdi-arrow-left-bold
              </v-icon>
            </v-btn>
            <v-btn
              icon
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
      <!-- <v-card class="mx-auto" width="800" height="500" tile>
    </v-card> -->
    </v-row>
    <div v-else>
      We are sorry, you did not receive orders so far.
    </div>
  </v-container>
</template>

<script>
import { orderService } from "../services";
import StoreOrderOverviewStatusTimeline from "../components/StoreOrderOverviewStatusTimeline";
import { compareArrayAsc, compareArrayDesc } from "../helpers";

export default {
  name: "StoreOrderOverviewView",

  components: {
    StoreOrderOverviewStatusTimeline: StoreOrderOverviewStatusTimeline
  },

  data() {
    return {
      orderList: [],
      searchTerm: "",
      selectedOrder: 0,
      selectedSort: 0,
      tableHeaders: [
        {
          text: "Product",
          align: "start",
          value: "title"
        },
        { text: "Quantity Type", value: "quantityValueType" },
        { text: "Price", value: "computedPrice" },
        { text: "Order Quantity", value: "quantity" },
        { text: "Total", value: "totalRowSum" }
      ],
      sortTypes: [
        { type: "Date", icon: "mdi-sort-calendar-ascending", tooltip: "" },
        { type: "Date", icon: "mdi-sort-calendar-descending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-ascending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-descending", tooltip: "" },
        {
          type: "Completion",
          icon: "mdi-sort-bool-ascending-variant",
          tooltip: ""
        },
        {
          type: "Completion",
          icon: "mdi-sort-bool-descending-variant",
          tooltip: ""
        }
      ]
    };
  },

  computed: {
    selectedOrderComputed: {
      get() {
        if (this.orderList.length > 0) {
          return this.orderList[this.selectedOrder];
        } else {
          return "";
        }
      }
    },

    computedProductArray: {
      get() {
        if (this.orderList.length > 0) {
          let returnArray = [];
          let currentOrder = this.selectedOrderComputed;
          let currentProduct;
          for (var i = 0; i < currentOrder.products.length; i++) {
            currentProduct = currentOrder.products[i][0];
            currentProduct.quantity = currentOrder.products[i][1];

            if (currentProduct.quantityValue) {
              currentProduct.quantityValueType =
                currentProduct.quantityValue +
                " " +
                currentProduct.quantityType;
            }

            currentProduct.totalRowSum =
              (currentProduct.price * currentProduct.quantity)
                .toFixed(2)
                .toString() + currentProduct.currencySymbol;
            currentProduct.computedPrice =
              currentProduct.price + currentProduct.currencySymbol;

            returnArray.push(currentProduct);
            currentProduct = {};
          }
          console.log(returnArray);
          return returnArray;
        } else {
          return [];
        }
      }
    },

    computedDateTime: {
      get() {
        if (this.orderList.length > 0) {
          var date = new Date(this.selectedOrderComputed.date);
          return (
            date.getDate().toString() +
            "." +
            date.getMonth().toString() +
            "." +
            date.getFullYear() +
            "  " +
            date.getHours().toString() +
            ":" +
            date.getMinutes().toString()
          );
        } else {
          return "";
        }
      }
    },
    computedTotalSum: {
      get() {
        if (this.orderList.length > 0) {
          return this.selectedOrderComputed.totalSum.toString() + "€";
        } else {
          return "";
        }
      }
    },
    statusAsIntValue: {
      get() {
        if (this.orderList.length > 0) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    // computedDate: {
    //   get(orderDate) {
    //     if (orderDate) {
    //       let date = new Date(orderDate);
    //       console.log(date.getMonth().toString() + "." + date.getFullYear());
    //       return date.getMonth().toString() + "." + date.getFullYear();
    //     } else {
    //       return "";
    //     }
    //   }
    // }
  },

  async mounted() {
    const storeId = this.$route.params.id;
    const response = await orderService.getStoresOrders(storeId);
    console.log(response);
    this.orderList = response.orders;
  },

  methods: {
    print() {
      console.log(this.$i18n.locale);
    },

    getComputedDate(orderDate) {
      //console.log(orderDate);

      if (orderDate) {
        let date = new Date(orderDate);
        console.log(date.getMonth().toString() + "." + date.getFullYear());
        return date.getMonth().toString() + "." + date.getFullYear();
      } else {
        return "";
      }
    },

    sortListClicked(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.orderList.sort(compareArrayDesc("date"));
          break;
        case 1:
          this.orderList.sort(compareArrayAsc("date"));
          break;
        case 2:
          this.orderList.sort(compareArrayDesc("orderId"));
          break;
        case 3:
          this.orderList.sort(compareArrayAsc("orderId"));
          break;
      }
    },

    // compareArrayElements(a, b, element) {
    //   if (a[element] < b[element]) {
    //     console.log("hi1");
    //     return -1;
    //   }
    //   if (a[element] > b[element]) {
    //     console.log("hi2");
    //     return 1;
    //   }
    //   console.log("hi3");
    //   return 0;
    // },

    // compareArrayDate(a, b) {
    //   if (a.date > b.date) {
    //     console.log("hi1");
    //     return -1;
    //   }
    //   if (a.date < b.date) {
    //     console.log("hi2");
    //     return 1;
    //   }
    //   console.log("hi3");
    //   return 0;
    // },

    // sortDateDescending() {
    //   let sortedList = this.orderList.sort(this.compareArrayDate);
    //   console.log(sortedList);
    // },

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
    // getProductArray(products) {
    //   if (products) {
    //     let returnArray = [];
    //     let currentProduct;
    //     for (var i = 0; i < products.length; i++) {
    //       currentProduct = products[i][0];
    //       currentProduct.quantity = products[i][1];
    //       currentProduct.totalSum =
    //         currentProduct.price * currentProduct.quantity +
    //         currentProduct.currencySymbol;
    //       currentProduct.price =
    //         currentProduct.price + currentProduct.currencySymbol;

    //       returnArray.push(currentProduct);
    //       currentProduct = {};
    //     }
    //     console.log(returnArray);
    //     return returnArray;
    //   } else {
    //     return [];
    //   }
    // },
    // getComputedPrice(price, currencySymbol) {
    //   if (price && currencySymbol) {
    //     return price + currencySymbol;
    //   } else {
    //     return "";
    //   }
    // },
    clearMessage() {
      this.searchTerm = "";
      //this.searchForTerm();
    }
  }
};
</script>

<style></style>
