import { MapPin, CalendarDays, StickyNote, Circle } from 'lucide-react'

export default function Page() {
  return (
    <div id="container" className="h-full bg-bglp px-4 lg:px-[135px]">
      <div className="max-w-[1170px] w-full flex justify-between pt-6">
        <img className="cursor-pointer w-36 sm:w-auto" src="/logo.svg" alt="logo-minha-agenda" />

        <button className="max-w-[120px] w-full h-10 rounded bg-primary text-white text-base font-medium hover:bg-btn-hover sm:h-12">
          Entrar
        </button>
      </div>

      <div className="max-w-[1170px] w-full flex flex-col gap-[72px] mt-[100px] sm:flex-row sm:mt-[156px]">
        <div className="col-span-6">
          <div className="relative">
            <img className="absolute top-0 -left-[80px] z-0" src="/decor-left.svg" alt="decor-left" />

            <div className="relative z-10">
              <h1 className="text-4xl font-medium text-primary leading-normal sm:text-5xl">
                Controle seu <span className="text-green1">Tempo</span>,<br/>
                e <span className="text-green1">Agende</span> com Facilidade.
              </h1>

              <h3 className="text-base text-secondary leading-normal mt-8 sm:text-lg">
                Descubra uma variedade de lembretes inteligentes para simplificar <br/>
                sua agenda e explorar seu tempo com facilidade.
              </h3>

              <button className="max-w-[170px] w-full h-10 bg-primary rounded text-white font-medium text-base mt-[72px] hover:bg-btn-hover sm:h-12">
                Entrar
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-6">
          <img src="/undraw-schedule.png" alt="img-landingpage-agendas" />
        </div>
      </div>

      <div className="max-w-[1170px] w-full flex mb-[100px] mt-[100px] sm:mt-[79px]">
        <div className="relative max-w-[823px] w-full h-auto py-6 border border-gray-100 shadow-xl bg-white rounded-xl flex flex-col justify-center pl-8 sm:h-[163px] sm:py-0">
          <Circle className='text-textprimary w-9 h-9 absolute -top-4 -left-4 z-0'/>

          <span className="text-base font-medium text-secondary leading-normal">Olá, bom dia! Realize seu agendamento</span>

          <div className="flex flex-col gap-8 mt-5 sm:flex-row">
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex justify-center items-center">
                <MapPin className='text-white h-5 w-5'/>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-secondary">De qualquer lugar</span>
                <span className="text-xs text-primary">Caruaru, PE</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex justify-center items-center">
                <CalendarDays className='text-white h-5 w-5'/>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-secondary">Data</span>
                <span className="text-xs text-primary">Quarta, 21 Junho de 2022</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex justify-center items-center">
                <StickyNote className='text-white h-5 w-5'/>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-secondary">Seja notificado</span>
                <span className="text-xs text-primary">Com lembretes de seus compromissos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1170px] w-full pb-6">
        <div className="col-span-12 flex justify-end items-center text-sm text-primary cursor-pointer">
          Desenvolvido por <img className="h-5" src="/logo-rochaftech.svg" alt="logo-rochaftech" />
        </div>
      </div>
    </div>
  )
}
