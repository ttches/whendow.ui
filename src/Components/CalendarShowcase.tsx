import styled from "styled-components";
import ShowcaseCalendar from "./Calendar/ShowcaseCalendar";
import { showcaseIdeas } from "./Calendar/ShowcaseCells";
import { showcaseIdeas2 } from "./Calendar/ShowcaseCells2";
import { showcaseIdeas3 } from "./Calendar/ShowcaseCells3";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";

const mockAvailabilities: MeetingAvailability[] = [
  { date: "2025/7/8", id: 1, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/9", id: 2, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/9", id: 3, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/11", id: 4, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/11", id: 5, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/11", id: 6, meetingId: "showcase", userName: "charlie" },
  { date: "2025/7/11", id: 7, meetingId: "showcase", userName: "diana" },
  { date: "2025/7/12", id: 8, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/12", id: 9, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/12", id: 10, meetingId: "showcase", userName: "charlie" },
  { date: "2025/7/12", id: 11, meetingId: "showcase", userName: "diana" },
  { date: "2025/7/12", id: 12, meetingId: "showcase", userName: "eve" },
  { date: "2025/7/15", id: 13, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/15", id: 14, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/15", id: 15, meetingId: "showcase", userName: "charlie" },
  { date: "2025/7/15", id: 16, meetingId: "showcase", userName: "diana" },
  { date: "2025/7/15", id: 17, meetingId: "showcase", userName: "eve" },
  { date: "2025/7/15", id: 18, meetingId: "showcase", userName: "frank" },
  { date: "2025/7/16", id: 19, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/16", id: 20, meetingId: "showcase", userName: "charlie" },
  { date: "2025/7/16", id: 21, meetingId: "showcase", userName: "eve" },
  { date: "2025/7/18", id: 22, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/22", id: 23, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/22", id: 24, meetingId: "showcase", userName: "diana" },
  { date: "2025/7/22", id: 25, meetingId: "showcase", userName: "frank" },
  { date: "2025/7/24", id: 26, meetingId: "showcase", userName: "alice" },
  { date: "2025/7/24", id: 27, meetingId: "showcase", userName: "bob" },
  { date: "2025/7/24", id: 28, meetingId: "showcase", userName: "charlie" },
  { date: "2025/7/24", id: 29, meetingId: "showcase", userName: "diana" },
  { date: "2025/7/28", id: 30, meetingId: "showcase", userName: "frank" },
];

const SHOWCASE_USER = "frank";
const SHOWCASE_WINNERS = ["2025/7/12", "2025/7/15"];

const allIdeas = [...showcaseIdeas, ...showcaseIdeas2, ...showcaseIdeas3];

const ShowcaseContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #551665;
  font-family: "copasetic";
  text-align: center;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: #666;
  font-family: "simplifica";
  text-align: center;
  max-width: 720px;
  margin: 0 auto 20px;
  line-height: 1.5;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  justify-content: center;
  margin-bottom: 40px;
  font-family: "simplifica";
  color: #551665;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const Swatch = styled.span<{ $color: string; $shape?: "bar" | "star" }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${({ $color, $shape }) =>
    $shape === "star" ? "transparent" : $color};
  color: ${({ $color, $shape }) => ($shape === "star" ? $color : "inherit")};
  font-size: ${({ $shape }) => ($shape === "star" ? "20px" : "inherit")};
  line-height: 18px;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

const CalendarSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #551665;
  font-family: "copasetic";
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Description = styled.p`
  color: #666;
  font-family: "simplifica";
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.4;
  min-height: 60px;
`;

type CalendarShowcaseProps = Record<string, never>;

const CalendarShowcase = (_props: CalendarShowcaseProps) => {
  return (
    <ShowcaseContainer>
      <Title>Calendar Availability Ideas</Title>
      <Subtitle>
        Twenty-five cell designs. Each one encodes availability percentage
        (purple), the current user's selected days (teal or blue), and the
        winning dates decided by the backend (gold). Mock user is{" "}
        <strong>{SHOWCASE_USER}</strong>; winners are{" "}
        <strong>July 12</strong> and <strong>July 15</strong> — July 15 is both
        a winner and one of the user's days, so it layers both treatments. The
        shimmer set (21–25) uses blue for your days and an extra burst of
        faster orange motes for winners; July 28 has Frank as the only person
        available, so every mote there is blue.
      </Subtitle>
      <Legend>
        <LegendItem>
          <Swatch $color="rgba(170, 43, 209, 0.95)" /> % of people available
        </LegendItem>
        <LegendItem>
          <Swatch $color="rgba(20, 184, 166, 0.95)" $shape="bar" /> Your selected
          days
        </LegendItem>
        <LegendItem>
          <Swatch $color="rgba(245, 179, 1, 0.95)" $shape="star">
            ★
          </Swatch>{" "}
          Winning date
        </LegendItem>
      </Legend>
      <CalendarGrid>
        {allIdeas.map((idea) => (
          <CalendarSection key={idea.id}>
            <SectionTitle>{idea.title}</SectionTitle>
            <Description>{idea.description}</Description>
            <ShowcaseCalendar
              availabilities={mockAvailabilities}
              currentUser={SHOWCASE_USER}
              winningDates={SHOWCASE_WINNERS}
              month={6}
              year={2025}
              Cell={idea.Cell}
            />
          </CalendarSection>
        ))}
      </CalendarGrid>
    </ShowcaseContainer>
  );
};

export default CalendarShowcase;
