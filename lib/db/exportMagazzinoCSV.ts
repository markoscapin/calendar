export default function exportMagazzinoCSV(headers: string[], data : any[]) {
  //basically we need to have the keys of the first object so to have the header
  function downloadCSV(csvStr:string) {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = "Situazione Magazzino.csv";
    hiddenElement.click();
  }

  function handleDataType(element: any, header: string) {
    if (header === "Data") {
      const testDate = new Date(element);
      return (
        testDate.toLocaleDateString() + " " + testDate.toLocaleTimeString()
      );
      //check if is Float
    } else if (typeof element === "number" && !Number.isSafeInteger(element)) {
      return element.toString().replace(".", ",");
    } else {
      return element;
    }
  }

  const csvHeaders = headers.join(";") + "\n";
  let csv = csvHeaders;
  data.forEach((el) => {
    const dataArray = headers.map((h) => {
      const data = handleDataType(el[h], h);
      return data;
    });
    csv += dataArray.join(";") + "\n";
  });
  downloadCSV(csv);

  return;
}
