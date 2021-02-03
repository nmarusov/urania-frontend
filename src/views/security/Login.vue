<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ appName }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter="submit">
                <v-text-field
                  @keyup.enter="submit"
                  v-model="login"
                  prepend-icon="mdi-account"
                  name="login"
                  label="Имя для входа"
                  type="text"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="submit"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Пароль"
                  id="password"
                  type="password"
                ></v-text-field>
              </v-form>
              <div v-if="loginError">
                <v-alert
                  :value="loginError"
                  transition="fade-transition"
                  type="error"
                >
                  Неверное имя для входа или пароль
                </v-alert>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="submit" :loading="authLoading"
                >Войти</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { appName } from "@/env"
import { readLoginError } from "@/store/main/getters"
import { dispatchLogIn } from "@/store/main/actions"

@Component
export default class Login extends Vue {
  public login = ""
  public password = ""
  public appName = appName
  private authLoading = false

  public get loginError() {
    return readLoginError(this.$store)
  }

  public submit() {
    this.authLoading = true
    dispatchLogIn(this.$store, {
      username: this.login,
      password: this.password,
    }).then(() => {
      this.authLoading = false
    })
  }
}
</script>

<style></style>
