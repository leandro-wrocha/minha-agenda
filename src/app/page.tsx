import { CallLoginWithGoogle } from "./components/call-login-with-google";
import { Protected } from "./components/protected";
import SessionProvider from "./providers/session-provider";

export default function Page() {
  return (
    <SessionProvider>
      <Protected />
    </SessionProvider>
  )
}
