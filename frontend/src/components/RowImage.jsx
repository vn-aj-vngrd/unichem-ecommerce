// import image from "../uploads/promos/1651843033860-132468274PromotionImg=3po.PNG";

const UpdatePromotion = ( imageInfo ) => {
  console.log(imageInfo.src);

//   const src = require(imageInfo.src);
  return (
    <>
      {/* <img className="avatar border-gray-100" alt={imageInfo.alt} src={src} /> */}
      <img className="avatar border-gray-100" alt={imageInfo.alt} src="" />
    </>
  );
};

export default UpdatePromotion;
