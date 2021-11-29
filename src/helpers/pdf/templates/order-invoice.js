import jsPDF from "jspdf";

export { orderInvoiceTemplate };

var pdfConfig = {
  headerTextSize: 20,
  labelTextSize: 12,
  fieldTextSize: 10,
  lineHeight: 6,
  subLineHeight: 4,
};

var colorBlack = "#000000";
var colorGray = "#4d4e53";

const tableHeaders = [
  "#",
  "Product Id",
  "Title",
  "Description",
  "Price",
  "Quantity",
  "Total",
];
const tableConfig = {
  columns: [
    {
      header: "#",
      width: 10,
    },
    {
      header: "Product Id",
      width: 55,
    },
    {
      header: "Title",
      width: 34,
    },
    {
      header: "Quantity Type",
      width: 30,
    },
    {
      header: "Price",
      width: 20,
    },
    {
      header: "Quantity",
      width: 20,
    },
    {
      header: "Total",
      width: 30,
    },
  ],
};

function orderInvoiceTemplate(order, products) {
  let doc = new jsPDF();
  var docWidth = doc.internal.pageSize.width;
  var docHeight = doc.internal.pageSize.height;

  //starting at 15mm
  var currentHeight = 15;
  //var startPointRectPanel1 = currentHeight + 6;

  let result = addBusinessInfo(doc, currentHeight, docWidth);
  doc = result.doc;
  currentHeight = result.currentHeight;

  result = addContactPart(doc, currentHeight, docWidth);
  doc = result.doc;
  currentHeight = result.currentHeight;
  //end contact part

  var tdWidth = (doc.getPageWidth() - 20) / tableHeaders.length;

  // currentHeight += 2;
  // for (let i = 0; i < tableHeaders.length; i++) {
  //   if (i === 0) doc.rect(10, currentHeight, tdWidth, 7);
  //   else doc.rect(tdWidth * i + 10, currentHeight, tdWidth, 7);
  // }
  // currentHeight -= 2;

  result = addTable(doc, currentHeight, tdWidth, order, products, docWidth);
  doc = result.doc;
  currentHeight = result.currentHeight;

  doc = addPageNumbers(doc, currentHeight, docWidth, docHeight);

  // addTableBodyBoarder(doc, currentHeight, tdWidth);

  //TABLE PART
  //var tdWidth = 31.66;
  //10 margin left - 10 margin right

  return doc;
}

function addBusinessInfo(doc, currentHeight, docWidth) {
  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text(docWidth - 10, currentHeight, "MySellum", "right");
  doc.setFontSize(pdfConfig.fieldTextSize);

  // logo
  //   var imageHeader = new Image();
  //   imageHeader.src =
  //     "C:Usersi514032OneDrive - SAP SEpprjct\frontendsrcassets/mysellum_text_green.png";
  //   doc.addImage(imageHeader, 10, currentHeight - 5, 300, 100);

  // Business Address
  doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, "Business Address 1", "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, "0171 111 111 1", "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  // doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, "mysellum email", "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, "mysellum email 1", "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, "mysellum.com", "right");

  //line breaker after logo & business info
  currentHeight += pdfConfig.subLineHeight;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  return { doc, currentHeight };
}

function addContactPart(doc, currentHeight, docWidth) {
  //Contact part
  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  currentHeight += pdfConfig.lineHeight;
  doc.text(10, currentHeight, "Invoice issued for:");
  currentHeight += pdfConfig.lineHeight;
  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  doc.text(10, currentHeight, "Name");
  doc.text(docWidth - 10, currentHeight, "label" + "Num", "right");
  currentHeight += pdfConfig.subLineHeight;

  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize - 2);

  doc.text(10, currentHeight, "address 1");
  doc.text(docWidth - 10, currentHeight, "Payment Date: 10-10-2021", "right");
  currentHeight += pdfConfig.subLineHeight;

  doc.text(10, currentHeight, "0171 222 222 2");
  doc.text(docWidth - 10, currentHeight, "Invoice Date: 10-10-2021", "right");
  currentHeight += pdfConfig.subLineHeight;

  doc.text(10, currentHeight, "Contact Email");
  currentHeight += pdfConfig.subLineHeight;

  doc.text(10, currentHeight, "Other Info");

  currentHeight += pdfConfig.subLineHeight;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  return { doc, currentHeight };
}

function addTable(doc, currentHeight, tdWidth, order, products, docWidth) {
  console.log(tdWidth);
  currentHeight += pdfConfig.subLineHeight + 5;
  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.fieldTextSize);
  //border color
  doc.setDrawColor(colorGray);
  currentHeight += 2;

  // Add Header
  let xPos = 11;
  let i;
  let j;
  for (i = 0; i < tableConfig.columns.length; i++) {
    const column = tableConfig.columns[i];
    doc.text(column.header, xPos, currentHeight);
    // doc.rect(
    //   xPos - 1,
    //   currentHeight + pdfConfig.subLineHeight - 1,
    //   column.width,
    //   pdfConfig.lineHeight
    // );
    xPos = xPos + column.width;
  }
  currentHeight += 8;

  // Add Rows
  // iterate over products
  for (i = 0; i < products.length; i++) {
    xPos = 11;
    const product = products[i];
    // iterate over columns
    for (j = 0; j < tableConfig.columns.length; j++) {
      console.log(xPos);
      const column = tableConfig.columns[j];
      // doc.rect(
      //   xPos - 1,
      //   currentHeight + pdfConfig.subLineHeight - 1,
      //   column.width,
      //   pdfConfig.lineHeight
      // );
      doc.text(getProductText(i, j, product), xPos, currentHeight);
      xPos = xPos + column.width;
    }
    currentHeight += 5;
  }

  currentHeight += 10;

  // Product total
  doc.text(docWidth - 50, currentHeight, "Product Total: ", "right");
  doc.text(docWidth - 25, currentHeight, order.totalSum + "€", "right");
  currentHeight += 5;
  // Shipping Costs
  doc.text(docWidth - 50, currentHeight, "Shipping Costs: ", "right");
  doc.text(
    docWidth - 25,
    currentHeight,
    "+ " + order.shippingCosts + "€",
    "right"
  );
  currentHeight += 5;
  // Platform Fee
  doc.text(docWidth - 50, currentHeight, "Platform Fee: ", "right");
  doc.text(
    docWidth - 25,
    currentHeight,
    "- " + order.platformFee + "€",
    "right"
  );
  currentHeight += 5;
  // Transfer Amount
  doc.text(docWidth - 50, currentHeight, "Transfer Amount: ", "right");
  doc.text(docWidth - 25, currentHeight, order.transferAmount + "€", "right");
  currentHeight += 5;

  currentHeight = currentHeight + pdfConfig.subLineHeight - 1;
  doc.setTextColor(colorGray);

  return { doc, currentHeight };
}

/**
 *
 * @param {integer} i # product
 * @param {integer} j # column
 * @param {*} product
 * @returns
 */
function getProductText(i, j, product) {
  let result;
  switch (j) {
    case 0:
      result = i;
      break;
    case 1:
      result = product._id;
      break;
    case 2:
      result = product.title;
      break;
    case 3:
      result = product.quantityValueType;
      break;
    case 4:
      result = product.price + "€";
      break;
    case 5:
      result = product.quantity;
      break;
    case 6:
      result = product.totalRowSum;
      break;
    default:
      break;
  }

  return result.toString();
}

function addPageNumbers(doc, currentHeight, docWidth, docHeight) {
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setFontSize(pdfConfig.fieldTextSize - 2);
    doc.setTextColor(colorGray);

    doc.text(
      docWidth / 2,
      docHeight - 10,
      "The invoice is valid without signature.",
      "center"
    );
    doc.setPage(i);
    doc.text(
      "Page" + " " + i + " / " + doc.getNumberOfPages(),
      docWidth - 20,
      doc.internal.pageSize.height - 6
    );

    // if (currentHeight + invDescSize > 270) {
    //   doc.addPage();
    //   currentHeight = 10;
    // }
  }
  return doc;
}

//  //body borders
//  if (param.invoice.tableBodyBorder) addTableBodyBoarder(maxHeight + 1);

//  //display text into row cells
//  //Object.entries(row).forEach(function(col, index) {
//  row.forEach(function (rr, index) {
//    let item = splitTextAndGetHeight(rr.toString(), tdWidth - 1); //minus 1, to fix the padding issue between borders

//    if (index == 0) doc.text(item.text, 11, currentHeight + 4);
//    else doc.text(item.text, 11 + index * tdWidth, currentHeight + 4);
//  });

//  currentHeight += maxHeight - 4;

//  //td border height
//  currentHeight += 5;

//  //pre-increase currentHeight to check the height based on next row
//  if (index + 1 < tableBodyLength) currentHeight += maxHeight;

//  if (
//    param.orientationLandscape &&
//    (currentHeight > 185 ||
//      (currentHeight > 178 && doc.getNumberOfPages() > 1))
//  ) {
//    doc.addPage();
//    currentHeight = 10;
//    if (index + 1 < tableBodyLength) addTableHeader();
//  }

//  if (
//    !param.orientationLandscape &&
//    (currentHeight > 265 ||
//      (currentHeight > 255 && doc.getNumberOfPages() > 1))
//  ) {
//    doc.addPage();
//    currentHeight = 10;
//    if (index + 1 < tableBodyLength) addTableHeader();
//    //       else
//    //         currentHeight += pdfConfig.subLineHeight + 2 + pdfConfig.subLineHeight - 1; //same as in addtableHeader
//  }

//  //reset the height that was increased to check the next row
//  if (index + 1 < tableBodyLength && currentHeight > 30)
//    // check if new page
//    currentHeight -= maxHeight;
// });

// const splitTextAndGetHeight = (text, size) => {
//   var lines = doc.splitTextToSize(text, size);
//   return {
//     text: lines,
//     height: doc.getTextDimensions(lines).h,
//   };
// };
