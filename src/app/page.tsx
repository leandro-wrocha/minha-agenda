import { CallLoginWithGoogle } from "./components/call-login-with-google";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center bg-[#0F6B4A]">
      <main className="max-w-[1170px] w-full h-full">
        <header id="header" className="flex justify-between pt-4">
          <img src="" alt="" className="object-contain cursor-pointer"/>

          <CallLoginWithGoogle />
        </header>
      </main>
    </div>
  )
}

