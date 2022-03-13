import { LoginProvider, RegisteredProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { UserProvider } from "./UserContext";

export const ContextProviders = (props) => {
  return (
    <UserProvider>
      <LoginProvider>
        <ModalProvider>
          <RegisteredProvider>{props.children}</RegisteredProvider>
        </ModalProvider>
      </LoginProvider>
    </UserProvider>
  );
};
