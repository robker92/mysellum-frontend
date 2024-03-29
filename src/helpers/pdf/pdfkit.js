// const PDFDocument = require("pdfkit");
// const blobStream = require("blob-stream");
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

var lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.";

export async function createPdf() {
  // create a document the same way as above
  const doc = new PDFDocument();
  // pipe the document to a blob
  const stream = doc.pipe(blobStream());

  // draw some text
  doc.fontSize(25).text("Here is some vector graphics...", 100, 80);

  // some vector graphics
  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

  doc.circle(280, 200, 50).fill("#6600FF");

  // an SVG path
  doc
    .scale(0.6)
    .translate(470, 130)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // and some justified text wrapped into columns
  doc
    .text("And here is some wrapped text...", 100, 300)
    .font("Times-Roman", 13)
    .moveDown()
    .text(lorem, {
      width: 412,
      align: "justify",
      indent: 30,
      columns: 2,
      height: 300,
      ellipsis: true,
    });

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function() {
    // iframe.src = stream.toBlobURL("application/pdf");
    // get a blob you can do whatever you like with
    const blob = stream.toBlob("application/pdf");
    const url = stream.toBlobURL("application/pdf");

    return url;
  });
}
