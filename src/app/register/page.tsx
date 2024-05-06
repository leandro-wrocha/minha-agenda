"use client";

import { useState } from "react";
import { translate } from "../helpers/translate";
import { addHours, eachMinuteOfInterval, format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
// constante
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hours = eachMinuteOfInterval(
  {
    start: new Date().setHours(0, 0, 0),
    end: addHours(new Date(), 12),
  },
  { step: 30 },
).map((item) => format(item, "HH:mm"));

interface IService {
  id: number;
  name: string;
  timeInSeconds: number;
}

const defaultService: IService = {
  id: 0,
  name: "",
  timeInSeconds: 900,
};

export default function Page() {
  const router = useRouter();

  const [daysSelect, setDaysSelect] = useState<string[]>([]);
  const [hourStart, setHourStart] = useState<string>("08:00");
  const [hourEnd, setHourEnd] = useState<string>("18:00");
  const [services, setServices] = useState<IService[]>([defaultService]);

  // actions
  const handleDaySelect = (day: string) => {
    if (daysSelect.includes(day)) {
      const daysSelectTemp = daysSelect.filter((item) => item != day);

      setDaysSelect(daysSelectTemp);
    } else {
      const daysSelectTemp = [...daysSelect, day];

      setDaysSelect(daysSelectTemp);
    }
  };

  const handleHourStart = (hour: string) => {
    setHourStart(hour);
  };

  const handleHourEnd = (hour: string) => {
    setHourEnd(hour);
  };

  const handleServiceName = (name: string, position: number) => {
    let servicesTemp = services.map((service) => {
      if (service.id === position) {
        return { ...service, name };
      }

      return service;
    });

    setServices(servicesTemp);
  };

  const handleServiceTimeInSeconds = (seconds: number, position: number) => {
    let servicesTemp = services.map((service) => {
      if (service.id === position) {
        return { ...service, timeInSeconds: seconds };
      }

      return service;
    });

    setServices(servicesTemp);
  };

  const handleAddServices = () => {
    let servicesTemp = services.slice();
    servicesTemp = [
      ...servicesTemp,
      {
        ...defaultService,
        id: servicesTemp[servicesTemp.length - 1].id + 1,
      },
    ];

    setServices(servicesTemp);
  };
  const handleRemoveServices = (position: number) => {
    let servicesTemp = services.slice();
    servicesTemp = servicesTemp.filter((item) => item.id != position);

    setServices(servicesTemp);
  };

  const handleSubmit = async () => {
    const response = await axios.post("/api/schedules", {
      days: daysSelect,
      hourStart: hourStart,
      hourEnd: hourEnd,
      userId: "6e118872-8a3f-4de8-8267-5e41003d8935",
    });

    const responseServices = await axios.post("/api/services", {
      services,
      userId: "6e118872-8a3f-4de8-8267-5e41003d8935",
    });

    router.replace("/dashboard");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <img src="/logo.svg" alt="logo" className="mb-6 mt-4" />
      <div className="max-w-[700px]">
        <ul className="flex gap-3">
          {days.map((day) => (
            <li key={day} className="flex items-center justify-center gap-1">
              <input
                type="checkbox"
                checked={daysSelect.includes(day)}
                onChange={() => handleDaySelect(day)}
              />
              {translate(day)}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="text-center">
            <span>Selecione o horário de abertura e fechamento</span>
            <br />
            <span className="text-sm text-[#333]">
              *após finalizar registro, você pode ajustar todos os horários*
            </span>
          </div>

          <select
            className="h-8 w-full max-w-[150px]"
            onChange={(event) => handleHourStart(event.currentTarget.value)}
            defaultValue={hourStart}
          >
            {hours.map((item, index) => (
              <option key={index} value={item}>
                {" "}
                {item}{" "}
              </option>
            ))}
          </select>

          <select
            className="h-8 w-full max-w-[150px]"
            onChange={(event) => handleHourEnd(event.currentTarget.value)}
            defaultValue={hourEnd}
          >
            {hours.map((item, index) => (
              <option key={index} value={item}>
                {" "}
                {item}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="text-center">
            <span>Insira pelo menos um de seus serviços</span>
            <br />
            <span className="text-sm text-[#333]">
              *determine um valor apróximado do tempo de execução do seu
              serviço*
            </span>
          </div>

          <div>
            <ul className="flex flex-col items-center">
              {services.map((item, index) => (
                <li className="flex gap-2" key={item.id}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="item.namborder-[#333] h-8 max-w-[200px] rounded-sm border pl-2"
                    placeholder="nome do serviço"
                    value={item.name}
                    onChange={(event) =>
                      handleServiceName(event.currentTarget.value, item.id)
                    }
                  />
                  <select
                    className="h-8"
                    defaultValue={item.timeInSeconds}
                    onChange={(event) =>
                      handleServiceTimeInSeconds(
                        Number(event.currentTarget.value),
                        item.id,
                      )
                    }
                    name="timeinseconds"
                    id="timeinseconds"
                  >
                    <option value={900}>15 min</option>
                    <option value={1800}>30 min</option>
                    <option value={3600}>1h</option>
                    <option value={5400}>1h 30 min</option>
                    <option value={7200}>2h</option>
                    <option value={9000}>2h 30 min</option>
                    <option value={10800}>3h</option>
                    <option value={12600}>3h 30 min</option>
                  </select>

                  {services.length - 1 === index ? (
                    <button
                      type="button"
                      className="ml-4 text-lg font-bold"
                      onClick={() => handleAddServices()}
                    >
                      +
                    </button>
                  ) : (
                    services.length > 1 &&
                    services.length - 1 !== index && (
                      <button
                        type="button"
                        className="ml-4 text-lg font-bold"
                        onClick={() => handleRemoveServices(item.id)}
                      >
                        x
                      </button>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="rounded bg-[#4BB05B] p-2 font-bold text-[#eee]"
            onClick={() => handleSubmit()}
          >
            Finalizar registro
          </button>
        </div>
      </div>
    </div>
  );
}
