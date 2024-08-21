describe('Login Form Tests', () => {
    beforeEach(() => {
      cy.visit('/login'); // Testlerin başlaması için login sayfasına git
    });
  
    it('should navigate to the main page upon successful form submission', () => {
      cy.get('input[name="email"]').type('valid.email@example.com');
      cy.get('input[name="password"]').type('validPassword123');
      cy.get('input[name="terms"]').check(); // Kuralları kabul et
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/main'); // Başarıyla yönlendirme kontrolü
    });
  
    it('should show an error message and disable the button when the email is incorrect', () => {
      cy.get('input[name="email"]').type('invalid.email');
      cy.get('input[name="password"]').type('validPassword123');
      cy.get('input[name="terms"]').check(); // Kuralları kabul et
  
      // E-posta alanında hata mesajının görünürlüğünü kontrol et
      cy.get('input[name="email"]').should('have.class', 'is-invalid');
      cy.get('form').contains('Please enter a valid email address').should('be.visible');
      
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('should show error messages and disable the button when both email and password are incorrect', () => {
      cy.get('input[name="email"]').type('invalid.email');
      cy.get('input[name="password"]').type('123');
      cy.get('input[name="terms"]').check(); // Kuralları kabul et
  
      // E-posta ve şifre alanlarında hata mesajlarının görünürlüğünü kontrol et
      cy.get('input[name="email"]').should('have.class', 'is-invalid');
      cy.get('input[name="password"]').should('have.class', 'is-invalid');
      cy.get('form').contains('Please enter a valid email address').should('be.visible');
      cy.get('form').contains('Password must be at least 4 characters long').should('be.visible');
  
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('should disable the button if the terms are not accepted', () => {
      cy.get('input[name="email"]').type('valid.email@example.com');
      cy.get('input[name="password"]').type('validPassword123');
      
      // Kuralları kabul etme
      cy.get('input[name="terms"]').uncheck(); 
  
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });
  