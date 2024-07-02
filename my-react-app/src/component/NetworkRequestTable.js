import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const NetworkRequestTable = ({ requests, setSelectedRequest, selectedRequest }) => {
  const [data, setData] = useState('Headers');
  const [showDetails, setShowDetails] = useState(false);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const DetailsView = () => (
    <div style={{ width: '100%', margin: '10px', display: 'flex' }}>
      <div style={{ width: '40%' }}>
        <TableContainer component={Paper} style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {requests.map((el, i) => (
                <TableRow key={i} onClick={() => handleRowClick(el)}>
                  <TableCell component="th" scope="row">
                    {el.Name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ width: '60%', margin: '20px' }}>
        <div style={{ display: 'inline-block', marginTop:"10px" }}>
          <button onClick={handleCloseDetails} style={{ marginRight: '10px' }}>Close</button>
          <button style={{ marginRight: '10px', border: 'none', backgroundColor: 'white' }} onClick={() => setData('Headers')}>Headers</button>
          <button style={{ marginRight: '10px', border: 'none', backgroundColor: 'white' }} onClick={() => setData('Payload')}>Payload</button>
          <button style={{ marginRight: '10px', border: 'none', backgroundColor: 'white' }} onClick={() => setData('Timing')}>Timing</button>
        </div>
        <div style={{ marginTop: '25px', maxHeight: '570px', overflowY: 'auto', scrollbarColor:"none" }}>
          {data === 'Headers' && (
            <div style={{ width: '100%' }}>
              <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                <p style={{ marginLeft: '10px' }}>General</p>
              </div>
              <p style={{ marginLeft: '10px' }}>Request URL: {selectedRequest.url}</p>
              <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                <p style={{ marginLeft: '10px' }}>Response Headers</p>
              </div>
              {selectedRequest.headers.map((el, index) => (
                <p key={index} style={{ marginLeft: '10px' }}>{el[0]}: {el[1]}</p>
              ))}
            </div>
          )}
          {data === 'Payload' && (
            <div style={{ width: '100%' }}>
              <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                <p style={{ marginLeft: '10px' }}>Payload</p>
              </div>
              <pre style={{ marginLeft: '10px' }}>{JSON.stringify(selectedRequest.response, null, 2)}</pre>
            </div>
          )}
          {data === 'Timing' && (
            <div style={{ width: '100%' }}>
              <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                <p style={{ marginLeft: '10px' }}>Timing</p>
              </div>
              <p style={{ marginLeft: '10px' }}>Start Time: {selectedRequest.startTime}</p>
              <p style={{ marginLeft: '10px' }}>End Time: {selectedRequest.endTime}</p>
              <p style={{ marginLeft: '10px' }}>Duration: {(selectedRequest.endTime - selectedRequest.startTime).toFixed(1)} ms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MainTableView = () => (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Initiator</StyledTableCell>
            <StyledTableCell align="left">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {requests.map((el, i) => (
            <StyledTableRow key={i} onClick={() => handleRowClick(el)}>
              <StyledTableCell component="th" scope="row">
                {el.Name}
              </StyledTableCell>
              <StyledTableCell align="left">{el.status}</StyledTableCell>
              <StyledTableCell align="left">{el.type}</StyledTableCell>
              <StyledTableCell align="left">Initiator</StyledTableCell>
              <StyledTableCell align="left">{(el.endTime - el.startTime).toFixed(1)} ms</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{width:"100%"}}>
      {showDetails ? <DetailsView /> : <MainTableView />}
    </div>
  );
};

export default NetworkRequestTable