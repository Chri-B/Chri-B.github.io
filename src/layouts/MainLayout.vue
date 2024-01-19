<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <!-- <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar> -->

      <q-tabs class="q-mt-md">
        <q-route-tab to="/page1" label="About" />
        <q-route-tab to="/page2" label="Portfolio" />
        <q-route-tab to="/page3" :label="t('contatti')" />
      </q-tabs>
    </q-header>

    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white q-px-md q-mb-md">
      <q-toolbar>
        <q-toolbar-title class="flex justify-between">
          <q-btn-toggle
            v-model="locale"
            spread
            toggle-text-color="primary"
            toggle-color="white"
            color="primary"
            text-color="white"
            :options="[
              { label: 'it', value: 'it' },
              { label: 'eng', value: 'en-US' },
            ]"
          />
          <q-icon
            @click="togglePersonalInfoDialog"
            name="fa-regular fa-user"
            size="40px"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-dialog
      v-model="personalInfoDialog"
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card
        class="bg-primary-opacity text-white flex flex-center"
        style="min-width: 50vw; min-height: 50vh"
      >
        <q-card-section>
          <div class="text-h6">{{ t("contact_info") }}</div>
          <q-separator />
          <div>
            <a
              href="mailto:beretta.christian2602@gmail.com"
              style="text-decoration: none; text-transform: inherit"
              >beretta.christian2602@gmail.com</a
            >
          </div>
          <div>
            <a
              href="mailto:beretta.christian2602@gmail.com"
              style="text-decoration: none; text-transform: inherit"
              >+39 3489177955</a
            >
          </div>
          <div>
            LinkedIn profile
            <q-icon name="fa-brands fa-linkedin"></q-icon>
          </div>
          <div>
            GitHub profile
            <q-icon name="fa-brands fa-github" size="40px" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const personalInfoDialog = ref(false);
    const { t, locale } = useI18n();
    console.log("🚀🚀🚀🚀🚀 ~ setup ~ locale:", locale);
    return {
      personalInfoDialog,
      togglePersonalInfoDialog() {
        personalInfoDialog.value = !personalInfoDialog.value;
      },
      t,
      locale,
    };
  },
};
</script>
