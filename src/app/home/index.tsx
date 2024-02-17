import { CallLoginWithGoogle } from "../components/call-login-with-google"

export const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center bg-[#ffffff]">
      <div className="max-w-[1170px] w-full h-full">
        <header id="header" className="flex justify-between pt-4">
          <img src="/logo.svg" alt="logo"/>

          <CallLoginWithGoogle />
        </header>

        <main className="w-full">
          <section className="grid grid-cols-2">
            <div className="flex flex-col justify-center items-start gap-8">
              <h1 className="text-4xl font-semibold text-[#26323E]">
                Controle seu <span className="text-[#4BB05B]">TEMPO</span>,<br />
                e <span className="text-[#4BB05B]">AGENDE</span> horários com facilidade.
              </h1>

              <p className="text-[#B7B7B7]">
                Descubra uma variedade de lembretes inteligentes para simplificar <br />
                sua agenda e explorar seu tempo com facilidade.
              </p>

              <CallLoginWithGoogle />
            </div>

            <div className="flex justify-end">
              <img src="/online-calendar.svg" alt="calendar-online" className="w-[500px] h-[500px] object-contain"/>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
