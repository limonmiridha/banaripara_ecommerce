const url = `https://api.cloudinary.com/v1_1/dslqiwxxw/image/upload`;

const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'banaripara_ecommerce');

  const dataResponse = await fetch(url, {
    method: 'post',
    body: formData,
  });
  return dataResponse.json();
};

export default uploadImage;
