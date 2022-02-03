import React, {useState, useEffect} from 'react';
import { XCircle } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function SortedThumbnailGallery({handleDeleteImageById}) {
  const thumbnails = useSelector((state) => state.imagesContent.thumbnails);
  const [sortableThumbnails, setSortableThumbnails] = useState(thumbnails);

  useEffect((()=>{
    setSortableThumbnails(thumbnails);
  }), [thumbnails]);

  /**
   * 
   * Хелпер сортировки массива при dnd
   * 
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  /**
   * 
   * Функция для оканчания dnd для thumbnail 
   * 
   */
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newThumbnails = reorder(
      thumbnails,
      result.source.index,
      result.destination.index
    );

    setSortableThumbnails(newThumbnails);
    console.log(newThumbnails);
  }

  return(
    <div className={'sorted-thumbnails'}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={'sorted-thumbnails'}
            >
                {sortableThumbnails.length > 0 && sortableThumbnails.map( ({id, thumbnail, loading}, index) => 
                  <Draggable className="sorted-thumbnails__item" key={id} draggableId={`${id}`} index={index} >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {loading ? (
                          <p>loading</p>
                          ):(
                            <div className="sorted-thumbnails__item" >
                              <XCircle className="sorted-thumbnails__item-delete" onClick={()=>handleDeleteImageById(id)} />
                                <img src={thumbnail} className="sorted-thumbnails__item-image" alt="" />
                            </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default SortedThumbnailGallery;
