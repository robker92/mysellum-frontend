<template>
    <v-dialog v-model="show" max-width="85%" @click:outside="cancel">
        <v-card>
            <ShowHelpDialog
                v-model="showShowHelpDialog"
                :title="helpDialogTitle"
                :text="helpDialogMessage"
            />
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title>Edit Your Store</v-toolbar-title>
            </v-toolbar>
            <v-tabs>
                <v-tab>
                    <v-icon left>
                        mdi-store
                    </v-icon>
                    Profile
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-bell-ring
                    </v-icon>
                    Notifications
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-credit-card-outline
                    </v-icon>
                    Payment
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-lock
                    </v-icon>
                    Security
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-cog
                    </v-icon>
                    Settings
                </v-tab>

                <!--       <v-card-title>
        <span class="text-h5">Edit Your Store</span>
      </v-card-title> -->
                <v-tab-item>
                    <v-card-text>
                        <p>
                            Morbi nec metus. Suspendisse faucibus, nunc et
                            pellentesque egestas, lacus ante convallis tellus,
                            vitae iaculis lacus elit id tortor. Sed mollis, eros
                            et ultrices tempus, mauris ipsum aliquam libero, non
                            adipiscing dolor urna a orci. Curabitur ligula
                            sapien, tincidunt non, euismod vitae, posuere
                            imperdiet, leo. Nunc sed turpis.
                        </p>

                        <p>
                            Suspendisse feugiat. Suspendisse faucibus, nunc et
                            pellentesque egestas, lacus ante convallis tellus,
                            vitae iaculis lacus elit id tortor. Proin viverra,
                            ligula sit amet ultrices semper, ligula arcu
                            tristique sapien, a accumsan nisi mauris ac eros. In
                            hac habitasse platea dictumst. Fusce ac felis sit
                            amet ligula pharetra condimentum.
                        </p>
                    </v-card-text>
                </v-tab-item>

                <v-tab-item>
                    <!-- <div class="text-h6 text-left ml-3">Store Address:</div> -->
                    <v-card class="ma-3">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="addressLine1"
                                        :counter="40"
                                        label="Address Line 1*"
                                        required
                                        :error-messages="addressLine1Errors"
                                        @input="$v.addressLine1.$touch()"
                                        @blur="$v.addressLine1.$touch()"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="2" md="2">
                                    <v-text-field
                                        v-model="postcode"
                                        label="Postcode*"
                                        class="inputPostcode"
                                        required
                                        type="number"
                                        maxlength="5"
                                        oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                                        :error-messages="postcodeErrors"
                                        @input="$v.postcode.$touch()"
                                        @blur="$v.postcode.$touch()"
                                    />
                                </v-col>
                                <v-col cols="12" sm="10" md="10">
                                    <v-text-field
                                        v-model="city"
                                        label="City*"
                                        :counter="20"
                                        required
                                        :error-messages="cityErrors"
                                        @input="$v.city.$touch()"
                                        @blur="$v.city.$touch()"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card class="ma-3">
                        <v-container>
                            <div class="text-left text-body-1">
                                Receive a notification if...
                            </div>
                            <v-switch
                                v-model="notificationOrderReceive"
                                label="an order is received."
                                hint="test test test test test"
                                persistent-hint
                                class="ml-5"
                            ></v-switch>
                            <v-switch
                                v-model="notificationOrderReturn"
                                label="a return is submitted."
                                class="ml-5"
                            ></v-switch>
                            <v-row align="center">
                                <v-col cols="12" lg="2" xl="2">
                                    <div>
                                        an order is received.
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="10" xl="10">
                                    <v-switch
                                        v-model="notificationOrderReceive"
                                        class="ml-5"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col cols="12" lg="2" xl="2">
                                    <div>
                                        a return is submitted.
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="10" xl="10">
                                    <v-switch
                                        v-model="notificationOrderReturn"
                                        class="ml-5"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                            <v-switch>
                                <template v-slot:label>
                                    <span>Label text</span>
                                </template>
                            </v-switch>
                            <v-switch
                                class="v-input--reverse v-input--expand"
                                hint="This label matches most of the examples in the Material Design documentation."
                                persistent-hint
                            >
                                <template v-slot:label>
                                    Expanded + reversed label
                                </template>
                            </v-switch>
                        </v-container>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat min-height="600px">
                        <v-card-text>
                            <p>
                                Morbi nec metus. Suspendisse faucibus, nunc et
                                pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor. Sed
                                mollis, eros et ultrices tempus, mauris ipsum
                                aliquam libero, non adipiscing dolor urna a
                                orci. Curabitur ligula sapien, tincidunt non,
                                euismod vitae, posuere imperdiet, leo. Nunc sed
                                turpis.
                            </p>

                            <p>
                                Suspendisse feugiat. Suspendisse faucibus, nunc
                                et pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor.
                                Proin viverra, ligula sit amet ultrices semper,
                                ligula arcu tristique sapien, a accumsan nisi
                                mauris ac eros. In hac habitasse platea
                                dictumst. Fusce ac felis sit amet ligula
                                pharetra condimentum.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat min-height="600px">
                        <v-card-text>
                            <p>
                                Morbi nec metus. Suspendisse faucibus, nunc et
                                pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor. Sed
                                mollis, eros et ultrices tempus, mauris ipsum
                                aliquam libero, non adipiscing dolor urna a
                                orci. Curabitur ligula sapien, tincidunt non,
                                euismod vitae, posuere imperdiet, leo. Nunc sed
                                turpis.
                            </p>

                            <p>
                                Suspendisse feugiat. Suspendisse faucibus, nunc
                                et pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor.
                                Proin viverra, ligula sit amet ultrices semper,
                                ligula arcu tristique sapien, a accumsan nisi
                                mauris ac eros. In hac habitasse platea
                                dictumst. Fusce ac felis sit amet ligula
                                pharetra condimentum.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat min-height="600px">
                        <v-card-text>
                            <p>
                                Morbi nec metus. Suspendisse faucibus, nunc et
                                pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor. Sed
                                mollis, eros et ultrices tempus, mauris ipsum
                                aliquam libero, non adipiscing dolor urna a
                                orci. Curabitur ligula sapien, tincidunt non,
                                euismod vitae, posuere imperdiet, leo. Nunc sed
                                turpis.
                            </p>

                            <p>
                                Suspendisse feugiat. Suspendisse faucibus, nunc
                                et pellentesque egestas, lacus ante convallis
                                tellus, vitae iaculis lacus elit id tortor.
                                Proin viverra, ligula sit amet ultrices semper,
                                ligula arcu tristique sapien, a accumsan nisi
                                mauris ac eros. In hac habitasse platea
                                dictumst. Fusce ac felis sit amet ligula
                                pharetra condimentum.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo" text @click="cancel">Close</v-btn>
                <v-btn color="indigo" dark @click="submitEditStore">Save</v-btn>
            </v-card-actions>
        </v-card>
        <v-overlay v-model="overlay">
            <v-progress-circular indeterminate size="80"></v-progress-circular>
        </v-overlay>
    </v-dialog>
</template>

<script>
//<v-btn text @click="e6 = e6 - 1">Cancel</v-btn>
//<small>Summarize if needed</small>
// eslint-disable-next-line no-unused-vars
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

import ShowHelpDialog from '../components/ShowHelpDialog';
import { mapState, mapActions } from 'vuex';

// eslint-disable-next-line no-unused-vars
import { userService } from '../services';

// eslint-disable-next-line no-unused-vars

//console.log(mapIconList);

export default {
    name: 'EditUserDialog',

    components: {
        ShowHelpDialog: ShowHelpDialog,
    },

    props: {
        value: Boolean,
    },

    mixins: [validationMixin],

    validations: {
        city: { required, maxLength: maxLength(20) },
        postcode: { required },
        addressLine1: { required, maxLength: maxLength(40) },
    },

    watch: {
        profileData: function(newVal) {
            if (newVal != null) {
                console.log(newVal);
                this.storeTitle = newVal.title;
                this.storeSubtitle = '';
                this.storeDescription = newVal.description;
                this.tagsComboBoxModel = newVal.tags;
                this.storeImages = [...newVal.images];
                this.editedHtmlText = newVal.description;
            }
        },
    },

    data() {
        return {
            showAddStoreImageDialog: false,
            overlay: false,

            //Store Profile
            storeTitle: '',
            storeSubtitle: '',
            storeDescription: '',

            //Notifications
            notificationOrderReceive: false,
            notificationOrderReturn: false,

            //Settings
            //Store Address
            addressLine1: '',
            postcode: '',
            city: '',

            showShowHelpDialog: false,
            helpDialogTitle: '',
            helpDialogMessage: '',
        };
    },

    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },

        cityErrors() {
            const errors = [];
            if (!this.$v.city.$dirty) return errors;
            !this.$v.city.required && errors.push('The city is required.');
            !this.$v.city.maxLength &&
                errors.push('The city must be at most 20 characters long.');
            return errors;
        },
        postcodeErrors() {
            const errors = [];
            if (!this.$v.postcode.$dirty) return errors;
            !this.$v.postcode.required && errors.push('Postcode is required.');
            return errors;
        },
        addressLine1Errors() {
            const errors = [];
            if (!this.$v.addressLine1.$dirty) return errors;
            !this.$v.addressLine1.required &&
                errors.push('The addressline is required.');
            !this.$v.addressLine1.maxLength &&
                errors.push(
                    'The addressline must be at most 40 characters long.'
                );
            return errors;
        },

        editButtonDisabled() {
            if (this.show == true) {
                if (
                    this.numberCharactersInEditor >= 100 &&
                    this.numberCharactersInEditor <= 1000 &&
                    !this.$v.storeTitle.$invalid &&
                    !this.$v.storeImages.$invalid &&
                    !this.$v.tagsComboBoxModel.$invalid
                ) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        ...mapState('account', ['user', 'loggedIn']),
    },
    methods: {
        ...mapActions('snackbar', ['addSuccessSnackbar', 'addErrorSnackbar']),

        showHelp(message) {
            console.log(message);
            //this.chosenIcon = "fish";
            console.log(this.mapIcon);
            this.helpDialogTitle = 'Title';
            this.helpDialogMessage = message;
            this.showShowHelpDialog = true;
        },

        printInputs() {
            console.log(this.storeTitle);
            console.log(this.storeDescription);
            console.log(this.tagsComboBoxModel);
            console.log(this.addressLine1);
            console.log(this.postcode);
            console.log(this.city);
            console.log(this.lat);
            console.log(this.lng);
            console.log(this.storeTitleErrors);
            console.log(this.storeDescriptionErrors);
            console.log(this.storeImagesErrors);
            console.log(this.$v.storeImages.$invalid);
            console.log(this.storeImagesErrors[0]);
            console.log(this.mapIcon);
        },

        submitEditStore: async function() {
            console.log(this.addressLine1);
            let payload = {
                storeId: this.$route.params.id,
                title: this.storeTitle,
                description: this.editedHtmlText,
                tags: this.tagsComboBoxModel,
                images: this.storeImages,
                address: {
                    postcode: this.postcode,
                    city: this.city,
                    addressLine1: this.addressLine1,
                    country: 'Germany',
                },
                mapIcon: this.mapIcon,
                location: {
                    lat: this.lat,
                    lng: this.lng,
                },
            };
            console.log(payload);
            //this.$emit("overlay-start");
            this.overlay = true;
            try {
                await userService.editStore(payload);
            } catch (error) {
                this.overlay = false;
                return;
            }
            this.$emit('edit-store', payload);
            this.overlay = false;
            //this.$emit("overlay-end");
            this.addSuccessSnackbar('Store successfully edited!');
            //this.show = false;
        },

        cancel() {
            console.log(this.profileData);
            this.storeTitle = this.profileData.title;
            this.storeDescription = this.profileData.description;
            this.editedHtmlText = this.profileData.description;
            document.getElementById('editor').innerHTML = this.editedHtmlText;
            this.tagsComboBoxModel = this.profileData.tags;
            this.storeImages = [...this.profileData.images];
            //this.$forceUpdate();
            this.show = false;
        },
    },
};
</script>

<style></style>
