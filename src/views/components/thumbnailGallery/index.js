function ThumbnailGallery({thumbnails = [], hidden = false}) { 
  return(
    <div className={`thumbnails ${(thumbnails.length <= 0 && hidden) && "thumbnails--hidden"}`}>
      {thumbnails.length > 0 && thumbnails.map( (thumbnail, index) => 
        <img src={thumbnail} className="thumbnails__item" key={index} alt="" />
      )}
    </div>
  )
}
export default ThumbnailGallery;
