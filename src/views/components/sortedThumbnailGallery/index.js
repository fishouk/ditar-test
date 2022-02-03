function SortedThumbnailGallery({thumbnails = []}) {
  console.log(thumbnails);
  return(
    <div className={'sorted-thumbnails'}>
      {thumbnails.length > 0 && thumbnails.map( ({id, thumbnail, loading}, index) => 
        <div className="sorted-thumbnails_item" key={id} >
          {loading ? (
            <p>loading</p>
            ):(
              <img src={thumbnail} />
          )}
        </div>
      )}
    </div>
  )
}

export default SortedThumbnailGallery;
