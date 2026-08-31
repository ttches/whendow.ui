import {
  CloseButton,
  ContentOverlay,
  CountBar,
  CountBarFill,
  CountRow,
  CountText,
  DoneButton,
  EmptyDescription,
  EmptyState,
  EmptyTitle,
  Header,
  Initial,
  PeopleList,
  PersonName,
  PersonRow,
  Title,
  Weekday,
  YouTag,
} from "./DayAvailabilityModal.styles";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);

type DayAvailabilityModalProps = {
  date: string;
  onClose: () => void;
  people: string[];
  totalPeople: number;
  userName?: string;
};

const DayAvailabilityModal = ({
  date,
  onClose,
  people,
  totalPeople,
  userName,
}: DayAvailabilityModalProps) => {
  const parsedDate = new Date(date);
  const percentage = totalPeople
    ? Math.round((people.length / totalPeople) * 100)
    : 0;

  return (
    <ContentOverlay>
      <Header>
        <Title>{`${months[parsedDate.getMonth()]} ${parsedDate.getDate()}`}</Title>
        <CloseButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </CloseButton>
      </Header>
      <Weekday>{weekdays[parsedDate.getDay()]}</Weekday>
      {people.length === 0 ? (
        <EmptyState>
          <EmptyTitle>Nobody yet</EmptyTitle>
          <EmptyDescription>
            No one has marked this day as available.
          </EmptyDescription>
        </EmptyState>
      ) : (
        <>
          <CountRow>
            <CountText>
              {people.length} of {totalPeople} available
            </CountText>
            <CountBar>
              <CountBarFill $percentage={percentage} />
            </CountBar>
          </CountRow>
          <PeopleList>
            {people.map((person) => (
              <PersonRow key={person} $isCurrentUser={person === userName}>
                <Initial>{person.charAt(0)}</Initial>
                <PersonName>{person}</PersonName>
                {person === userName && <YouTag>You</YouTag>}
              </PersonRow>
            ))}
          </PeopleList>
        </>
      )}
      <DoneButton onClick={onClose}>Done</DoneButton>
    </ContentOverlay>
  );
};

export default DayAvailabilityModal;
