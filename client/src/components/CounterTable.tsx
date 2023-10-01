import styled from "styled-components";
import { Counter } from "../models/Counter";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`

const StyledHeader = styled.th`
  background-color: #123456;
  color: #fff;
  padding: 10px;
  text-align: left;
`;

const StyledCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StyledBody = styled.tbody``;

const CounterTable = ({ counters }: { counters: Counter[]; }) => (
  <StyledTable>
    <StyledHeader>
      Username
    </StyledHeader>
    <StyledHeader>
      Count
    </StyledHeader>

    <StyledBody>
      {
        counters.sort((a, b) => b.count - a.count).map((counter) => (
          <StyledRow>
            <StyledCell>{counter.username}</StyledCell>
            <StyledCell>{counter.count}</StyledCell>
          </StyledRow>
        ))
      }
    </StyledBody>
  </StyledTable>
  );

export default CounterTable;