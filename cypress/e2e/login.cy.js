/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3003/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi username
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
  it('harus menampilkan peringatan ketika password kosong', () => {
    // mengisi username
    cy.get('#email').type('email@example.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi username
    cy.get('#email').type('email@example.com');

    // mengisi password yang salah
    cy.get('#password').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi username
    cy.get('#email').type('icha@dicoding.com');

    // mengisi password
    cy.get('#password').type('123456');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('header').contains(/^IThreads :\)$/).should('be.visible');

    // Menekan tombol dropdown untuk melihat menu Sign out
    cy.get('.nav-profile').click();
    cy.get('.dropdown-item').contains(/^Sign out$/).should('be.visible');
  });
});
