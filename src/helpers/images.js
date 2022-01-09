export async function getBase64StringFromFile(file) {
  return new Promise(function(resolve, reject) {
    let base64String;
    const reader = new FileReader();

    reader.onloadend = async () => {
      // convert image file to base64 string
      base64String = reader.result;
      //   console.log(buffer);
      if (base64String) {
        // console.log(buffer);
        resolve(base64String);
      }

      reject();
    };

    reader.readAsDataURL(file);
    // reader.readAsArrayBuffer(file);
    // reader.readAsText(file, "base64");
  });
}
