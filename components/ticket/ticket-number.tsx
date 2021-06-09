import { TicketNumberProps } from '@lib/types';

export default function TicketNumber({ number }: TicketNumberProps) {
  const numDigits = `${number}`.length;
  const prefix = `000000`.slice(numDigits);
  return (
    <>
      № {prefix}
      {number}
    </>
  );
}
