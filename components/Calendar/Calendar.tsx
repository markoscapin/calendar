import { useRef, useState, MouseEvent } from "react";
import {
  weekLabels,
  monthLabels,
  retrieveWeeks,
} from "../../lib/utils/dateCalendar";
import AddIcon from "../Icons/AddIcon";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import ModalLayout from "../Modal/ModalLayout";
import Input from "../Form/Input";
// import { scheduleArray } from "./test"; //test data
import { db } from "../../lib/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import EraseIcon from "../Icons/EraseIcon";

export default function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = useRef(new Date().getFullYear());
  const [selectDate, setSelectDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const modalData = useRef<{[key: string]: string}>({
    title: "",
    description: "",
    date: "",
    start: "",
    end: "",
  });

  const days = retrieveWeeks(month, year.current);

  const scheduleArray = useLiveQuery(async () => {
    let data = await db.table("events").toArray();
    return data;
  });

  function handleMonth(e:MouseEvent<HTMLButtonElement>) {
    const value = parseInt(e.currentTarget.value);
    if (month === 11 && value > 0) {
      year.current = year.current + 1;
    }
    if (month === 0 && value < 0) {
      year.current = year.current - 1;
    }
    setMonth((prev) => {
      if (prev === 11 && value > 0) {
        return 0;
      }
      if (prev === 0 && value < 0) {
        return 11;
      }
      return prev + value;
    });
  }

  function handleSelectDate(date : Date) {
    setSelectDate(date);
  }



  function handleInput(e: MouseEvent<HTMLInputElement>) {
    const prop = e.currentTarget.id

    modalData.current[prop] = e.currentTarget.value;

    
  }

  async function handleSubmit() {
    const modalDate = new Date(modalData.current.date)
    const modalStartTime = new Date(modalData.current.start)
    const modalEndTime = new Date(modalData.current.end)
    const year = modalDate.getFullYear();
    const month = modalDate.getMonth() + 1;
    const day = modalDate.getDate();
    const startHour = modalStartTime.getHours();
    const startMinutes = modalStartTime.getMinutes();
    const endHour = modalEndTime.getHours();
    const endMinutes = modalEndTime.getMinutes();
    const start = new Date(year, month, day, startHour, startMinutes);
    const end = new Date(year, month, day, endHour, endMinutes);
    const { title, description } = modalData.current;
    await db.table("events").add({
      title: title,
      description: description,
      start: start,
      end: end,
    });
    setOpen(false);
  }

  async function deleteEvent(id:number) {
    await db.table("events").delete(id);
  }

  return (
    <div className=" m-3 mt-0 rounded shadow flexflex-col justify-between py-2 px-5 bg-white print:hidden  dark:bg-slate-800 dark:text-white dark:shadow-slate-500 dark:highlight-white/5 ">
      <div className="flex flex-col md:flex-row xs:divide-y-2 md:divide-y-0 md:divide-x-2">
        <div className="md:w-1/2 px-5">
          <div className="flex flex-row py-2 items-center justify-center">
            <div className="flex flex-row gap-3">
              <button type="button" value={-1} onClick={handleMonth}>
                <LeftArrow />
              </button>
              <h1 className="dark:text-white text-lg font-semibold">
                {monthLabels[month]} {year.current}
              </h1>
              <button type="button" value={1} onClick={handleMonth}>
                <RightArrow />
              </button>
            </div>
          </div>
          <div className="w-full grid grid-cols-7 dark:text-white">
            {weekLabels.map((label, idx) => {
              return (
                <p className="grid place-content-center h-14" key={idx}>
                  {label.slice(0, 3)}
                </p>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-7 ">
            {days.map(({ currentMonth, date, today }, idx) => {
              return (
                <div
                  key={idx}
                  className="relative h-14 place-content-center grid border-t-2"
                >
                  <button
                    className={` h-10 w-10 hover:bg-slate-800 hover:text-white  dark:hover:bg-white dark:hover:text-black dark:text-white rounded-full ${
                      !currentMonth && "text-gray-400"
                    } ${
                      today &&
                      "bg-blue-500 text-white shadow dark:shadow-slate-400"
                    } 
                    ${
                      date.toDateString() === selectDate.toDateString() &&
                      "bg-black text-white dark:bg-white dark:text-black "
                    }
                
                `}
                    onClick={() => handleSelectDate(date)}
                    disabled={!currentMonth}
                  >
                    {date.getDate()}
                  </button>
                  {scheduleArray &&
                    scheduleArray.some(
                      (sch) => sch.start.toDateString() === date.toDateString()
                    ) && (
                      <div
                        className={` bg-blue-500 h-1 rounded absolute bottom-0 inset-x-0 m-auto `}
                      />
                    )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:w-1/2 px-5">
          <div className="flex flex-row h-14 items-center justify-between">
            <p>Appuntamenti per il {selectDate.toLocaleDateString()}:</p>
            <button className="" onClick={() => setOpen(true)}>
              <AddIcon />
            </button>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-80 h-full">
            {scheduleArray &&
              scheduleArray
                .filter(
                  (sch) =>
                    sch.start.toDateString() === selectDate.toDateString()
                )
                .map(({ id, title, description, start, end }) => {
                  return (
                    <div key={id} className="bg-slate-100 py-2 px-5 rounded">
                      <div className="flex flex-row justify-between">
                        <p className="font-semibold font-xs dark:text-black">
                          {title}
                        </p>
                        <button
                          className="text-black"
                          onClick={() => deleteEvent(id)}
                        >
                          <EraseIcon />
                        </button>
                      </div>

                      <span className="font-xs font-light text-slate-800">
                        {description}
                      </span>
                      <p className="dark:text-black">
                        {start.getHours()}:
                        {String(start.getMinutes()).padStart(2, "0")} -{" "}
                        {end.getHours()}:
                        {String(end.getMinutes()).padStart(2, "0")}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <ModalLayout
        open={open}
        setOpen={setOpen}
        title="Aggiungi un Appuntamento"
      >
        <div className="flex flex-row divide-x-2 my-5">
          <div className="w-1/2 pr-5">
            <Input
              type={"text"}
              id="title"
              name="title"
              labelDescription={"Titolo"}
              onChange={handleInput}
            />
            <Input
              type={"textarea"}
              id="description"
              name="description"
              labelDescription={"Descrizione"}
              onChange={handleInput}
            />
          </div>
          <div className="w-1/2 pl-5">
            <Input
              type={"date"}
              id="date"
              name="date"
              labelDescription={"Data"}
              defaultValue={selectDate.toISOString().split("T")[0]}
              onChange={handleInput}
            />
            <Input
              type={"time"}
              id="start"
              name="start"
              labelDescription={"Inizio"}
              onChange={handleInput}
            />
            <Input
              type={"time"}
              id="end"
              name="end"
              labelDescription={"Fine"}
              onChange={handleInput}
            />
          </div>
        </div>
        <button
          className=" bg-green-600 text-white hover:bg-green-700 hover:shadow-md rounded p-3 w-full"
          onClick={() => {
            handleSubmit();
          }}
        >
          Aggiungi al Calendario
        </button>
      </ModalLayout>
    </div>
  );
}
