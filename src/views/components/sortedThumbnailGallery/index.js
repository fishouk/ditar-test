import { XCircle } from 'react-bootstrap-icons';

function SortedThumbnailGallery({thumbnails = [], handleDeleteImageById}) {
  return(
    <div className={'sorted-thumbnails'}>
      {thumbnails.length > 0 && thumbnails.map( ({id, thumbnail, loading}, index) => 
        <div className="sorted-thumbnails__item" key={id} >
          {loading ? (
            <p>loading</p>
            ):(
              <div className="sorted-thumbnails__item" >
                <XCircle className="sorted-thumbnails__item-delete" onClick={()=>handleDeleteImageById(id)} />
                  <img src={thumbnail} className="sorted-thumbnails__item-image" />
              </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SortedThumbnailGallery;
