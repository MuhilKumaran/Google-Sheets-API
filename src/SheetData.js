import React, { useState, useEffect } from "react";

const SheetData = () => {
  const [data, setData] = useState({
    CrackersList: [],
    Coupons: [],
  });

  const apiKey = "AIzaSyAl8QuWNjkcBYbQmCL_t0MAtiRxL5nvo7k";
  const spreadsheetId = "1ERjqeQyD_w_t_3t3K2eVi5QxH4m74z252hi7ObivomY";

  // Define the sheet ranges you want to fetch
  const ranges = ["CrackersList", "Coupons"]; // tabs in spreadSheet
  const urls = ranges.map(
    (range) =>
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}&majorDimension=ROWS`
  );

  useEffect(() => {
    // Fetch all sheets data and combine the results
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((results) => {
        const newData = {};
        results.forEach((result, index) => {
          const sheetName = ranges[index];
          newData[sheetName] = result.values || [];
        });
        setData(newData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {console.log(data)}
      <h1>Google Sheets Data</h1>
      {Object.keys(data).map((sheetName) => (
        <div key={sheetName}>
          <h2>{sheetName}</h2>
          <table>
            <thead>
              <tr>
                {data[sheetName].length > 0 &&
                  data[sheetName][0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data[sheetName].slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SheetData;
