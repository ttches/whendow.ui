import { useState } from "react";
import styled from "styled-components";
import Calendar, { IndicatorType } from "./Calendar/Calendar";

const mockAvailabilities = [
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
];

const ShowcaseContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #551665;
  font-family: "copasetic";
  text-align: center;
  margin-bottom: 40px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
  margin-bottom: 20px;
  font-size: 18px;
`;

const Description = styled.p`
  color: #666;
  font-family: "simplifica";
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.4;
`;

const PropString = styled.code`
  display: block;
  background: #f5f5f5;
  color: #551665;
  font-family: "Courier New", monospace;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
`;

type CalendarShowcaseProps = Record<string, never>;

const CalendarShowcase = (_props: CalendarShowcaseProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const isInRange = (dateString: string) => {
    return true;
  };

  const calendarConfigs = [
    {
      type: "none" as IndicatorType,
      title: "Original (No Indicators)",
      description:
        "Your current calendar design without availability indicators",
      prop: 'indicatorType="none"',
    },
    {
      type: "gradient-border" as IndicatorType,
      title: "Gradient - Left Border",
      description:
        "Left border that gets thicker and more colorful with higher availability",
      prop: 'indicatorType="gradient-border"',
    },
    {
      type: "gradient-triangle" as IndicatorType,
      title: "Gradient - Corner Triangle",
      description:
        "Triangle in top-right corner that grows larger and more vibrant",
      prop: 'indicatorType="gradient-triangle"',
    },
    {
      type: "gradient-glow" as IndicatorType,
      title: "Gradient - Glow Effect",
      description:
        "Inset box shadow that intensifies with availability percentage",
      prop: 'indicatorType="gradient-glow"',
    },
    {
      type: "gradient-glow-strong" as IndicatorType,
      title: "Gradient - Strong Glow Effect",
      description:
        "Dramatic outer glow with multiple shadow layers - much more pronounced",
      prop: 'indicatorType="gradient-glow-strong"',
    },
    {
      type: "gradient-background" as IndicatorType,
      title: "Gradient - Background Tint",
      description:
        "More obvious background color that gets more vibrant with availability",
      prop: 'indicatorType="gradient-background"',
    },
    {
      type: "dots" as IndicatorType,
      title: "Dot Matrix (Improved) - DEFAULT",
      description: "Only filled dots shown - cleaner with no visual noise",
      prop: 'indicatorType="dots" (or omit for default)',
    },
    {
      type: "bars" as IndicatorType,
      title: "Triangle/Mountain Bars",
      description:
        "Symmetrical triangle pattern - peaks in middle, shrinks outward",
      prop: 'indicatorType="bars"',
    },
    {
      type: "texture" as IndicatorType,
      title: "Height-Based Dots Texture",
      description:
        "Small dots texture that fills from bottom up - no effect when 0%",
      prop: 'indicatorType="texture"',
    },
    {
      type: "texture-squares" as IndicatorType,
      title: "Height-Based Squares Texture",
      description:
        "Small squares texture that fills from bottom up - no effect when 0%",
      prop: 'indicatorType="texture-squares"',
    },
  ];

  return (
    <ShowcaseContainer>
      <Title>Calendar Availability Indicators Showcase</Title>
      <CalendarGrid>
        {calendarConfigs.map((config) => (
          <CalendarSection key={config.type}>
            <SectionTitle>{config.title}</SectionTitle>
            <Description>{config.description}</Description>
            <PropString>{config.prop}</PropString>
            <Calendar
              initialMonth={6}
              isInRange={isInRange}
              onDateClick={handleDateClick}
              selectedDates={[selectedDate]}
              indicatorType={config.type}
              availabilities={mockAvailabilities}
            />
          </CalendarSection>
        ))}
      </CalendarGrid>
    </ShowcaseContainer>
  );
};

export default CalendarShowcase;
