import styled from "styled-components";
import { Counter } from "../models/Counter";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`
const StyledTableHeader = styled.thead``;

const StyledColumnHeader = styled.th`
  background-color: #123456;
  color: #fff;
  padding: 10px;
  width: 150px;
  text-align: center;
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
    <StyledTableHeader>
      <StyledRow>
        <StyledColumnHeader>Username</StyledColumnHeader>
        <StyledColumnHeader>Count</StyledColumnHeader>
      </StyledRow>
    </StyledTableHeader>

    <StyledBody>
      {
        counters.sort((a, b) => b.count - a.count).map((counter) => (
          <StyledRow key={counter.username}>
            <StyledCell>{counter.username}</StyledCell>
            <StyledCell>{counter.count}</StyledCell>
          </StyledRow>
        ))
      }
    </StyledBody>
  </StyledTable>
  );

export default CounterTable;