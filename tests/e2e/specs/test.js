// https://docs.cypress.io/api/introduction/api.html

describe("Login form", () => {
  it("Shows login page", () => {
    cy.visit("/login")
    cy.contains("div", "Urania").should("have.class", "v-toolbar__title")
    cy.get("#login").type("admin")
    cy.get("#password").type("password")
    cy.get("button")
      .contains("Войти")
      .click()
  })
})
