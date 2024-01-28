import { Login } from "./components/login";
import { Logout } from "./components/logout";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-2">
      <Login />
      <Logout />
    </main>
  );
}
