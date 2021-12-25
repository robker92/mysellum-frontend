<template>
  <v-card class="ma-3">
    <v-container>
      <div class="text-caption text-left grey--text text--darken-1 mx-0">
        {{
          $t(
            "storeProfile.editStoreDialog.tabs.storeProfile.descriptionHeadline"
          )
        }}*
      </div>
      <v-row class="mx-0 mt-1 mb-3">
        <v-card flat class="mr-3 my-1">
          <v-item-group>
            <v-btn @click="setFormat('italic')">
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn @click="setFormat('bold')">
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn @click="setFormat('underline')">
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>
          </v-item-group>
        </v-card>

        <v-card flat class="mr-3 my-1">
          <v-item-group>
            <v-btn @click="setFormat('justifyCenter')">
              <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn @click="setFormat('justifyLeft')">
              <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn @click="setFormat('justifyRight')">
              <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
            <v-btn @click="setFormat('justifyFull')">
              <v-icon>mdi-format-align-justify</v-icon>
            </v-btn>
          </v-item-group>
        </v-card>

        <v-card flat class="mr-3 my-1">
          <v-item-group>
            <v-btn @click="setFormat('insertUnorderedList')">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-btn @click="setFormat('insertOrderedList')">
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
          </v-item-group>
        </v-card>

        <v-card flat class="mr-3 my-1">
          <v-item-group>
            <v-btn @click="fontSizeFunction('addition')">
              <v-icon>mdi-format-font-size-increase</v-icon>
            </v-btn>
            <v-btn @click="fontSizeFunction('subtraction')">
              <v-icon>mdi-format-font-size-decrease</v-icon>
            </v-btn>
          </v-item-group>
        </v-card>

        <v-spacer />
        <v-card flat class="my-1">
          <v-item-group>
            <v-btn @click="setFormat('undo')">
              <v-icon>mdi-undo</v-icon>
            </v-btn>
          </v-item-group>
        </v-card>
      </v-row>

      <!-- <v-btn @click="printInputs()">Print</v-btn> -->
      <div
        id="editor"
        ref="editor"
        class="editor pa-0"
        contenteditable
        autocorrection="off"
        autocomplete="off"
        onkeypress="setTimeout(function() { var height = document.getElementById('editor').scrollHeight; console.log(height); if(height > 350){document.getElementById('editor').style.height = height+'px';}}, 0)"
        onpaste="setTimeout(function() { var height = document.getElementById('editor').scrollHeight; console.log(height); if(height > 350){document.getElementById('editor').style.height = height+'px';}}, 0)"
        tabindex="100"
        @input="onInput"
        v-html="storeDescription"
      />
      <div class="text-caption text-right">
        <div
          v-if="
            numberCharactersInEditor <= storeDescriptionMax &&
              numberCharactersInEditor >= storeDescriptionMin
          "
        >
          {{ numberCharactersInEditor }} / {{ storeDescriptionMax }}
        </div>
        <div v-else class="red--text">
          {{ numberCharactersInEditor }} / {{ storeDescriptionMax }}
        </div>
      </div>
      <div
        v-if="storeDescriptionErrors.length > 0"
        class="text-body-2 red--text"
      >
        {{ storeDescriptionErrors[0] }}
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "EditStoreDialogDescriptionTextArea",

  mixins: [validationMixin],

  props: {
    storeDescriptionInput: String,
  },
  data() {
    return {
      editedHtmlText: "", // Var to save the changed description
      storeDescription: "", // Var which holds the init description value
      storeDescriptionMin: 100,
      storeDescriptionMax: 10000,
      storeDescriptionErrors: [],
    };
  },
  watch: {
    storeDescriptionInput: {
      immediate: true,
      handler(newVal) {
        if (newVal !== null) {
          this.storeDescription = newVal;
          this.editedHtmlText = newVal;
        }
      },
    },
  },

  validations: {
    storeDescription: {
      required,
      minLength: minLength(100),
      maxLength: maxLength(10000),
    },
  },

  computed: {
    numberCharactersInEditor: {
      get() {
        return new DOMParser().parseFromString(this.editedHtmlText, "text/html")
          .body.innerText.length;
      },
    },
  },

  methods: {
    onInput(e) {
      this.editedHtmlText = this.$sanitize(e.target.innerHTML);
      this.validateTextfield();
      this.$emit("description-text-changed", this.editedHtmlText);
    },

    validateTextfield() {
      this.storeDescriptionErrors = [];
      if (this.numberCharactersInEditor > this.storeDescriptionMax) {
        this.storeDescriptionErrors.push(
          `The store description must be at most ${this.storeDescriptionMax} characters long.`
        );
      }
      if (
        this.numberCharactersInEditor < 100 &&
        this.numberCharactersInEditor > 0
      ) {
        this.storeDescriptionErrors.push(
          `The store description must be at least ${this.storeDescriptionMin} characters long.`
        );
      }
      if (this.numberCharactersInEditor === 0) {
        this.storeDescriptionErrors.push("The store description is required.");
      }
      if (this.storeDescriptionErrors.length > 0) {
        this.$emit("description-invalid");
      }
      if (this.storeDescriptionErrors.length === 0) {
        this.$emit("description-valid");
      }
      console.log(this.storeDescriptionErrors);
    },

    setFormat(command) {
      document.execCommand(command, false, "");
    },

    fontSizeFunction(type) {
      const selection = window.getSelection();
      const currentFontSize = window
        .getComputedStyle(selection.anchorNode.parentElement, null)
        .getPropertyValue("font-size");
      console.log(currentFontSize);
      let newFontSize;
      if (type == "addition") {
        newFontSize = this.fontSizeTranslation(currentFontSize) + 1;
      } else if (type == "subtraction") {
        newFontSize = this.fontSizeTranslation(currentFontSize) - 1;
      }
      document.execCommand("fontSize", false, newFontSize);
    },

    fontSizeTranslation(pxSize) {
      if (pxSize == "10px") {
        return 1;
      } else if (pxSize == "13px" || pxSize == "14px") {
        return 2;
      } else if (pxSize == "16px") {
        return 3;
      } else if (pxSize == "18px") {
        return 4;
      } else if (pxSize == "24px") {
        return 5;
      } else if (pxSize == "32px") {
        return 6;
      } else if (pxSize == "48px") {
        return 7;
      }
    },
  },
};
</script>

<style>
.editor {
  height: 350px;
  background-color: white;
}
</style>
