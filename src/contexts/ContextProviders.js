import { LoginProvider, RegisteredProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { UserProvider } from "./UserContext";

export const ContextProviders = (props) => {
  return (
    <UserProvider>
      <LoginProvider>{props.children}</LoginProvider>
    </UserProvider>
  );
};
