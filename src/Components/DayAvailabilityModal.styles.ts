import styled from "styled-components";

export const ContentOverlay = styled.div`
  background-color: #eab9ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 480px;
  padding: 32px 24px;
  width: calc(100% - 32px);
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Title = styled.h1`
  color: #4b015e;
  font-family: "copasetic";
  font-size: 32px;
  margin: 0;
`;

export const Weekday = styled.p`
  color: #7a2b93;
  font-family: "simplifica";
  font-size: 20px;
  letter-spacing: 1px;
  margin: 0 0 20px 0;
  text-align: left;
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: #4b015e;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: 4px;

  &:hover {
    color: #aa2bd1;
  }
`;

export const CountRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const CountText = styled.span`
  color: #4b015e;
  flex-shrink: 0;
  font-family: "simplifica";
  font-size: 18px;
`;

export const CountBar = styled.div`
  background-color: rgba(75, 1, 94, 0.15);
  border-radius: 4px;
  flex-grow: 1;
  height: 8px;
  overflow: hidden;
`;

export const CountBarFill = styled.div<{ $percentage: number }>`
  background-color: #aa2bd1;
  border-radius: 4px;
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
`;

export const PeopleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0 0 32px 0;
  max-height: min(320px, 40dvh);
  overflow-y: auto;
  padding: 0;
  scrollbar-color: #aa2bd1 rgba(75, 1, 94, 0.12);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(75, 1, 94, 0.12);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #aa2bd1;
    border-radius: 4px;
  }
`;

export const PersonRow = styled.li<{ $isCurrentUser: boolean }>`
  align-items: center;
  background-color: white;
  border: ${({ $isCurrentUser }) =>
    $isCurrentUser ? "3px solid #aa2bd1" : "1px solid #cb8adf"};
  border-radius: 9px;
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  padding: 10px 12px;
`;

export const Initial = styled.span`
  align-items: center;
  background-color: #cb8adf;
  border-radius: 50%;
  color: #4b015e;
  display: flex;
  flex-shrink: 0;
  font-family: "copasetic";
  font-size: 16px;
  height: 32px;
  justify-content: center;
  text-transform: uppercase;
  width: 32px;
`;

export const PersonName = styled.span`
  color: #4b015e;
  flex-grow: 1;
  font-family: "simplifica";
  font-size: 20px;
  overflow-wrap: anywhere;
  text-align: left;
`;

export const YouTag = styled.span`
  background-color: #aa2bd1;
  border-radius: 80px;
  color: white;
  flex-shrink: 0;
  font-family: "simplifica";
  font-size: 14px;
  letter-spacing: 1px;
  padding: 2px 10px;
  text-transform: uppercase;
`;

export const EmptyState = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.55);
  border: 2px dashed #cb8adf;
  border-radius: 9px;
  color: #4b015e;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
  padding: 28px 16px;
  text-align: center;
`;

export const EmptyTitle = styled.span`
  font-family: "copasetic";
  font-size: 20px;
`;

export const EmptyDescription = styled.span`
  color: #7a2b93;
  font-family: "simplifica";
  font-size: 18px;
`;

export const DoneButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  border-radius: 80px;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  width: 100%;

  &:hover {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
  }
`;
