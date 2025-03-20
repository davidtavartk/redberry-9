import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  I18nProvider,
  Popover,
} from "react-aria-components";
import type { PopoverProps } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import CalendarIcon from "../../../public/svgs/svgComponent/CalendarIcon";
import Image from "next/image";

const CustomDatePicker = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = parseDate(tomorrow.toISOString().split("T")[0]);

  return (
    <I18nProvider locale="en-GB">
      <DatePicker className="flex w-1/2 flex-col gap-1" aria-label="deadline" defaultValue={defaultDate}>
        <Group className="flex h-[49.6px] items-center gap-1.5 rounded-lg border border-[#DEE2E6] bg-white p-3 text-gray-700 ring-black transition">
          <Button className="flex cursor-pointer items-center">
            <CalendarIcon />
          </Button>

          <DateInput className="flex flex-1">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="text-sm font-light tracking-[-1.25%] text-[#ADB5BD] uppercase outline-hidden focus:bg-purple-100"
              />
            )}
          </DateInput>
        </Group>

        <I18nProvider locale="ka-GE">
          <MyPopover>
            <Dialog className="p-6 text-gray-600">
              <Calendar minValue={defaultDate}>
                <div className="flex">
                  <header className="flex w-full items-center gap-1 px-1 pb-4 font-serif">
                    <Heading className="ml-2 flex-1 text-2xl font-semibold" />
                  </header>
                  <Button
                    slot="previous"
                    className="pressed:bg-gray-200 ring-violet-[#8338EC] flex h-9 w-9 cursor-default items-center justify-center rounded-full border-0 bg-transparent text-gray-600 ring-offset-2 outline-hidden hover:bg-gray-100 focus-visible:ring-3"
                  >
                    <Image src="/svgs/arrowUp.svg" alt="previous" width={20} height={20} />
                  </Button>
                  <Button
                    slot="next"
                    className="pressed:bg-gray-200 ring-violet-[#8338EC] flex h-9 w-9 cursor-default items-center justify-center rounded-full border-0 bg-transparent text-gray-600 ring-offset-2 outline-hidden hover:bg-gray-100 focus-visible:ring-3"
                  >
                    <Image src="/svgs/arrowUp.svg" alt="previous" width={20} height={20} className="rotate-180" />
                  </Button>
                </div>

                <CalendarGrid className="border-separate border-spacing-1">
                  <CalendarGridHeader>
                    {(day) => <CalendarHeaderCell className="text-xs font-semibold text-gray-500">{day}</CalendarHeaderCell>}
                  </CalendarGridHeader>
                  <CalendarGridBody>
                    {(date) => (
                      <CalendarCell
                        date={date}
                        className="outside-month:text-gray-300 pressed:bg-gray-200 selected:bg-[#8338EC] selected:text-white bg-[] ring-violet-[#8338EC] flex h-9 w-9 cursor-default items-center justify-center font-semibold ring-offset-2 outline-hidden hover:bg-[#e0d0f6] focus-visible:ring-3"
                      />
                    )}
                  </CalendarGridBody>
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </MyPopover>
        </I18nProvider>
      </DatePicker>
    </I18nProvider>
  );
};

function MyPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) =>
        `overflow-auto rounded-lg bg-white ring-1 ring-black/10 drop-shadow-lg ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-200 ease-out"
            : ""
        } ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-150 ease-in"
            : ""
        } `
      }
    />
  );
}

export default CustomDatePicker;
