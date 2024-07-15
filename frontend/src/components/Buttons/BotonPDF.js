import React from "react";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import templateImage from "../../assets/pdfImageTemplate.jpg";

const BotonPDF = ({ pageTitle, columns, data }) => {
  const handleClick = () => {
    const doc = new jsPDF();
    const maxRecordsPerPage = 15;

    const addTableToPDF = (dataSubset, startY) => {
      let y = startY;
      dataSubset.forEach((row) => {
        Object.keys(columns).forEach((column, colIndex) => {
          const text = String(row[column]);
          const textWidth = doc.getTextWidth(text);
          const cellWidth = 40; // Ancho fijo para cada columna

          // Dividir el texto si es demasiado largo para la celda
          if (textWidth > cellWidth) {
            const splitText = doc.splitTextToSize(text, cellWidth);
            splitText.forEach((line, lineIndex) => {
              doc.text(line, 20 + colIndex * cellWidth, y + lineIndex * 10);
            });
            y += (splitText.length - 1) * 10;
          } else {
            doc.text(text, 20 + colIndex * cellWidth, y);
          }
        });
        y += 10;
      });
    };

    const addTemplateImage = () => {
      doc.addImage(templateImage, "JPEG", 0, 0, 210, 297);
    };

    const addPageHeader = () => {
      addTemplateImage();
      doc.setFontSize(20);
      doc.text(pageTitle, 20, 70);
      doc.setFontSize(12);

      Object.values(columns).forEach((column, index) => {
        doc.text(column, 20 + index * 40, 80);
      });
    };

    // Generar el PDF
    for (let i = 0; i < data.length; i += maxRecordsPerPage) {
      if (i > 0) {
        doc.addPage();
      }
      addPageHeader();
      const dataSubset = data.slice(i, i + maxRecordsPerPage);
      addTableToPDF(dataSubset, 95);
    }

    // Guardar el PDF
    doc.save(`${pageTitle}.pdf`);

    Swal.fire({
      icon: "success",
      title: "PDF generado",
      text: "El PDF se ha generado correctamente",
    });
  };

  return (
    <button
      className="btn btn-secondary"
      onClick={handleClick}
      title="Generar PDF"
    >
      <i className="fas fa-file-pdf"></i>
    </button>
  );
};

export default BotonPDF;
