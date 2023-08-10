import { useState, useEffect } from "react";

function Countdown() {
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    setDate(getDate());
  }, [date]);

  return (
    <section className="countdown">
      <p>
        <span>26th August, 2023</span>
        <span></span>
      </p>
      <div>
        <h2>Time remaining till event</h2>
        <p>
          {date.days} DAYS : {date.hours} HOURS : {date.mins} MINS : {date.secs}{" "}
          SECS
        </p>
      </div>
    </section>
  );
}
export default Countdown;

function getDate() {
  const date = new Date(2023, 7, 26);
  const current = new Date();
  const remainder = date - current;
  const days = Math.floor(remainder / 8.64e7);
  const hours = Math.floor((remainder - days * 8.64e7) / 3.6e6);
  const mins = Math.floor(
    (remainder - (days * 8.64e7 + hours * 3.6e6)) / 60000
  );
  const secs = Math.floor(
    (remainder - (days * 8.64e7 + hours * 3.6e6 + mins * 60000)) / 1000
  );
  return { days: days, hours: hours, mins: mins, secs: secs };
}
