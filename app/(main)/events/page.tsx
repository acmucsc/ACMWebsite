"use client";
import * as React from "react";
import Navbar from "@/components/Navbar";
import { getEvents } from "@/sanity/sanity-utls";
import styles from "@/styles/events.module.scss";
import { EventsList } from "@/components/EventsList";
import { RightArrowIcon } from "@/components/svg/icons";

export default async function EventsPage() {
  const makeInvisible = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const element = event.target as HTMLDivElement;
    element.style.opacity = "0";
    element.style.animation = "none";
  };

  const futureEvents = await getEvents("future");
  const pastEvents = await getEvents("past");

  return (
    <main>
      <Navbar />

      <div className={styles.eventsContainer}>
        <div className={styles.eventsContent}>
          <h1>
            Don&apos;t miss out! Stay <span>updated</span> here
          </h1>
          <div className={styles.calendar}>
            <div
              className={styles.hintForScroll}
              onMouseEnter={makeInvisible}
              onClick={makeInvisible}
              onDrag={makeInvisible}
              onTouchStart={makeInvisible}
              onTouchMove={makeInvisible}
            >
              <p>
                Scroll <RightArrowIcon /> for more
              </p>
            </div>

            <iframe
              title="ACM google calendar"
              src="https://calendar.google.com/calendar/u/0/embed?src=c_1d01dcebf8b83f84aa2586d9509f3b58f36a7dc2e842c69bdc2ecf475c93281e@group.calendar.google.com&ctz=America/Los_Angeles"
            />
          </div>
        </div>

        <EventsList events={futureEvents} title="Upcoming Events" />
        <EventsList events={pastEvents} title="Past Events" />
      </div>
    </main>
  );
}
