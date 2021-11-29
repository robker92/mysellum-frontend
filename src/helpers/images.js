export async function getImgBuffer(file) {
  return new Promise(function(resolve, reject) {
    let buffer;
    const reader = new FileReader();

    reader.onloadend = async () => {
      // convert image file to base64 string
      buffer = reader.result;
      //   console.log(buffer);
      if (buffer) {
        // console.log(buffer);
        resolve(buffer);
      }

      reject();
    };

    reader.readAsDataURL(file);
    // reader.readAsArrayBuffer(file);
    // reader.readAsText(file, "base64");
  });
}
