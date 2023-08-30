import React from 'react';
import ExcelJS from 'exceljs';

const ExcelDownloadButton = ({ headers, tableData,className }) => {
  const handleDownload = async () => {
    try {
        const excelBuffer = await formatDataForExcel(tableData, headers);
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Companies_Data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error:', error);
      }
  };

  const formatDataForExcel = (data, headers) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.addRow(headers);
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });
  
    return workbook.xlsx.writeBuffer();
  };  
  return (
    <button className={className} onClick={handleDownload}>Download Excel</button>
  );
};

export default ExcelDownloadButton;