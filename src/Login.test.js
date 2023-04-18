// const { render, screen, fireEvent, act } = require('@testing-library/react');
// const userEvent = require('@testing-library/user-event');
// const { Login } = require('./Login');
// const { MemoryRouter } = require('react-router-dom');

// describe('Login component', () => {
//   it('renders the login form', () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
//   });

//   it('updates the input fields and submits the form', async () => {
//     const handleSubmit = jest.fn();

//     render(
//       <MemoryRouter>
//         <Login handleSubmit={handleSubmit} />
//       </MemoryRouter>
//     );

//     const usernameInput = screen.getByLabelText(/nombre de usuario/i);
//     const passwordInput = screen.getByLabelText(/contraseña/i);
//     const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

//     // Simula el ingreso de texto en los campos de entrada.
//     await userEvent.type(usernameInput, 'testuser');
//     await userEvent.type(passwordInput, 'testpassword');

//     // Verifica que los campos de entrada se hayan actualizado.
//     expect(usernameInput).toHaveValue('testuser');
//     expect(passwordInput).toHaveValue('testpassword');

//     // Simula el envío del formulario.
//     fireEvent.click(submitButton);

//     // Comprueba que se haya llamado la función `handleSubmit`.
//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//   });
// });
