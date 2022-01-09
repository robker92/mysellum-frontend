<template>
  <div>
    <div class="ma-3">
      <v-alert type="info" text dense class="text-left">
        Here you can upload your legal documents.
      </v-alert>
    </div>
    <v-card class="ma-3">
      <v-container>
        <div class="text-h5 text-left">
          Legal Documents
        </div>
        <v-card-text>
          <v-row
            v-for="(document, index) in legalDocuments"
            :key="index"
            align="center"
          >
            <v-col>
              <v-select
                v-model="document.type"
                :items="['AGB', 'Datenschutz']"
                label="Type"
                :error-messages="typeErrors[index]"
                @input="$v.legalDocuments.$touch()"
                @change="documentsChanged()"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="document.label"
                label="Label"
                :error-messages="labelErrors[index]"
                @input="$v.legalDocuments.$touch()"
                @change="documentsChanged()"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-file-input
                v-model="document.fileDetails"
                show-size
                accept=".pdf,.doc,.docx"
                label="File input"
                :error-messages="fileErrors[index]"
                @input="$v.legalDocuments.$touch()"
                @change="fileChanged(index)"
              ></v-file-input>
            </v-col>
            <v-col>
              <v-btn v-if="index > 0" icon @click="removeLegalDocument(index)">
                <v-icon color="primary">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- <div
            v-for="(v, index) in $v.legalDocuments.$each.$iter"
            :key="`v${index}`"
          >
            <div v-if="!v.label.required">Label is required.</div>
          </div> -->

          <v-row>
            <v-btn icon class="ml-2 mt-3" @click="addLegalDocument">
              <v-icon color="primary">
                mdi-plus
              </v-icon>
            </v-btn>
            <v-spacer />
          </v-row>

          <div>
            You can use this template to create your own:
          </div>
          <div>
            <a
              href="https://prjctstorageaccount.blob.core.windows.net/prjct-dev-other-files/Template.docx"
              target="_blank"
            >
              View
            </a>
          </div>
        </v-card-text>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getBase64StringFromFile } from "../../../helpers";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

const file_size_validation = (file) => {
  if (!file) {
    return true;
  }
  // return file.size <= 4000000; //4mb
  return file.size <= 1000000; //4mb
};

export default {
  name: "EditStoreLegalTab",
  components: {},

  mixins: [validationMixin],

  validations: {
    label: { required },
    type: { required },
    fileSrc: { required },

    legalDocuments: {
      required,
      $each: {
        label: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(30),
        },
        type: {
          required,
        },
        fileDetails: {
          required,
          file_size_validation,
        },
      },
    },
  },

  props: {
    legalDocumentsArray: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      // legal
      legalDocuments: [],
    };
  },

  computed: {
    labelErrors() {
      const errors = [];

      if (!this.$v.legalDocuments.$dirty) return errors;

      for (const [key, value] of Object.entries(
        this.$v.legalDocuments.$each.$iter
      )) {
        if (!value.label.required) {
          errors.push("A label is required");
        } else if (!value.label.minLength) {
          errors.push("The entered label is too short.");
        } else if (!value.label.maxLength) {
          errors.push("The entered label is too long.");
        } else {
          errors.push("");
        }
      }

      return errors;
    },
    typeErrors() {
      const errors = [];

      if (!this.$v.legalDocuments.$dirty) return errors;

      for (const [key, value] of Object.entries(
        this.$v.legalDocuments.$each.$iter
      )) {
        if (!value.type.required) {
          errors.push("A type is required");
        } else {
          errors.push("");
        }
      }

      return errors;
    },
    fileErrors() {
      const errors = [];

      if (!this.$v.legalDocuments.$dirty) return errors;

      for (const [key, value] of Object.entries(
        this.$v.legalDocuments.$each.$iter
      )) {
        if (!value.fileDetails.required) {
          errors.push("A file is required");
        } else if (!value.fileDetails.file_size_validation) {
          errors.push("The entered file is too large.");
        } else {
          errors.push("");
        }
      }

      return errors;
    },
  },

  watch: {
    legalDocumentsArray() {
      this.initializeData();
    },
  },

  mounted() {
    this.initializeData();
  },

  methods: {
    initializeData() {
      this.legalDocuments = this.legalDocumentsArray;
    },

    documentsChanged() {
      this.$emit("legal-documents-changed", this.legalDocuments);
      // console.log(this.$v.legalDocuments);
      // this.$v.legalDocuments.$touch();
    },

    // LEGAL
    addLegalDocument() {
      this.legalDocuments.push({
        fileDetails: null,
        label: "",
        type: "",
        fileSrc: "",
      });
      this.documentsChanged();
    },

    removeLegalDocument(index) {
      this.legalDocuments.splice(index, 1);
    },

    async fileChanged(index) {
      const file = this.legalDocuments[index].fileDetails;
      if (!file || !(file instanceof File)) {
        return;
      }

      let base64String;
      try {
        console.log(file);
        base64String = await getBase64StringFromFile(file);
        console.log(base64String.substr(0, 50));
        console.log(base64String.substr(base64String.length - 5));
        console.log(base64String.length);
      } catch (error) {
        console.log(error);
        return;
      }

      this.legalDocuments[index].fileSrc = base64String;
      this.legalDocuments[index].fileDetails = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      this.$v.legalDocuments.$touch();
    },
  },
};
</script>

<style></style>
