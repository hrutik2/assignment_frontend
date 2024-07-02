
    import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NetworkRequestTable from './component/NetworkRequestTable';

import Filter from './component/Filter';
const App = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const interceptNetworkRequests = () => {
      
      (function (open) {
        XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
          this.addEventListener('load', function () {
            logRequest(this,method, 'XHR');
          });
          open.call(this, method, url, async, user, pass);
        };
      })(XMLHttpRequest.prototype.open);

      // Intercept Fetch
      (function (fetch) {
        window.fetch = function () {
          const startTime = performance.now();
          return fetch.apply(this, arguments).then((response) => {
            const endTime = performance.now();
            logFetchRequest(arguments[0], response, startTime, endTime);
            return response;
          });
        };
      })(window.fetch);
    };

    const logRequest = (xhr, type,method) => {
      console.log(method)
      const details = {
        type,
        url: xhr.responseURL,
        method: xhr._method,
        status: xhr.status,
        response: xhr.responseText,
        headers: xhr.getAllResponseHeaders(),
        startTime: xhr._startTime,
        endTime: xhr._endTime,
      };  
      console.log('Fetch Requestss:', details); // Log details to console
      setRequests((prevRequests) => [...prevRequests, details]);
     
    };

    const logFetchRequest = (request, response, startTime, endTime) => {
        console.log(response)
       
      response.clone().text().then((body) => {
        const details = {
          Name:request,
          type: response.type,
          url: response.url,
          method: request.method,
          status: response.status,
          response: body,
          headers: [...response.headers.entries()],
          startTime,
          endTime,
        };
        setRequests((prevRequests) => [...prevRequests, details]);
      });
    };

    interceptNetworkRequests();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((req) => req.type === filter));
    }
  }, [requests, filter]);

  return (
    <div className="App">
      <p style={{textAlign:"center"}}>Network</p>
      <input style={{padding:"4px",borderRadius:"20px",paddingLeft:"20px",border:"none", backgroundColor:"whitesmoke",margin:"10px"}} placeholder='Filter'></input>
      <Filter setFilter={setFilter} />
      <div style={{ maxHeight:"670px", overflowY:"auto" }}>
      <NetworkRequestTable requests={filteredRequests} setSelectedRequest={setSelectedRequest} selectedRequest={selectedRequest} />
      </div>
     
    </div>
  );
};

export default App;

  
