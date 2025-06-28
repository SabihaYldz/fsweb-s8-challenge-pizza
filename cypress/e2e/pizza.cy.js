describe("Pizza Formu Testi", () => {
  beforeEach(() => {
    cy.visit("/order");
  });

  it("İsim inputuna metin girilebilir", () => {
    cy.get('input[name="name"]').type("Sabiha");
    cy.get('input[name="name"]').should("have.value", "Sabiha");
  });

  it("Birden fazla malzeme seçilebilmeli", () => {
    cy.get('input[type="checkbox"]').check([
      "Peynir",
      "Sucuk",
      "Mantar",
      "Zeytin"
    ]);
    cy.get('input[type="checkbox"]:checked').should("have.length.at.least", 4);
  });

  it("Form başarıyla gönderilebilmeli", () => {
    cy.get('input[name="name"]').type("Sabiha");
    cy.get('input[type="radio"][value="Orta"]').check();
    cy.get('input[type="checkbox"]').check(["Peynir", "Sucuk", "Mantar", "Zeytin"]);
    cy.get('textarea[name="note"]').type("Ekstra peynir lütfen");

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    // Success ekranına yönlendirme kontrolü
    cy.url().should("include", "/success");
    cy.contains("Siparişiniz Başarıyla Alındı").should("exist");
  });
});
