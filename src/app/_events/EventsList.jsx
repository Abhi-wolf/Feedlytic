"use client";

import { LoadingSpinner } from "@/components/loadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventsList } from "@/lib/queries/eventQueries";
import { transformDateWithTime } from "@/lib/utils";
import { useEffect, useState } from "react";

function EventsList({ events, domain }) {
  const [filter, setFilter] = useState("all");
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEventList() {
      setIsLoading(true);
      const list = await getEventsList({ domain, eventName: filter });

      setEventList(list);
      setIsLoading(false);
    }

    fetchEventList();
  }, [filter]);

  let totalEventsCount = events?.reduce((acc, curr) => {
    acc += Number(curr.count) || 0; // Default to 0 if 'count' is undefined
    return acc;
  }, 0);

  return (
    <div className="w-full flex flex-col gap-6">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 h-[200px]">
          <CarouselItem
            key={1}
            className="pl-2 md:pl-4 md:basis-1/3"
            onClick={() => setFilter("all")}
          >
            <div
              className={`grid grid-rows-2 border-2 border-gray-300  h-[200px] rounded-md cursor-pointer `}
            >
              <div
                className={`flex items-center justify-center text-xl md:text-2xl bg-gray-600 capitalize ${
                  filter === "all" && "text-purple-500 font-semibold"
                }`}
              >
                All Events
              </div>

              <div
                className={`flex items-center justify-center text-2xl md:text-6xl  ${
                  filter === "all" && "text-purple-500 font-semibold"
                }`}
              >
                {totalEventsCount < 10
                  ? `0${totalEventsCount}`
                  : totalEventsCount}
              </div>
            </div>
          </CarouselItem>

          {events?.map((event) => (
            <CarouselItem
              key={event.eventName}
              className="pl-2 md:pl-4 md:basis-1/3"
              onClick={() => setFilter(event.eventName)}
            >
              <div
                className={`grid grid-rows-2 border-2 border-gray-300  h-[200px] rounded-md cursor-pointer `}
              >
                <div
                  className={`flex items-center justify-center text-xl md:text-2xl bg-gray-600 capitalize ${
                    filter === event.eventName &&
                    "text-purple-500 font-semibold"
                  }`}
                >
                  {event.eventName}
                </div>

                <div
                  className={`flex items-center justify-center text-2xl md:text-6xl  ${
                    filter === event.eventName &&
                    "text-purple-500 font-semibold"
                  }`}
                >
                  {event.count < 10 ? `0${event.count}` : event.count}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full m-4 flex flex-col gap-4">
        <h3 className="text-2xl underline decoration-wavy text-gray-500 font-semibold">
          <span className="capitalize mr-2">{filter}</span> Events
        </h3>

        <EventsTable eventList={eventList} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default EventsList;

function EventsTable({ eventList, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Description</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventList?.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="w-[70%]">{event.eventDescription}</TableCell>
            <TableCell className="text-right">
              {transformDateWithTime(event.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
