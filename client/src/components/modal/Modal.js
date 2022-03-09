import React from 'react'
import closeIcon from '../../resources/close.svg'
import Carousel from '../carousel/Carousel'

function Modal(props) {

    return (
        <div className="modal">
            <div className="modal_inner_scroll">
                <div className="modal_inner">
                    <h3>{props.room.name}</h3>
                    <img className="modal_close" onClick={props.close} src={closeIcon} alt="" />
                    <div className="modal_img_div">
                        <Carousel images={props.room.imageurls} />
                    </div>
                    <div className="modal_text_div">
                        
                        <div className="modal_text_upper">
                            <div>
                                <p className="boldText">Type</p>
                                <p>{props.room.type}</p>
                            </div>
                            <div>
                                <p className="boldText">Max. Count</p>
                                <p>{props.room.maxcount}</p>
                            </div>
                            <div>
                                <p className="boldText">Rate Per Day</p>
                                <p><span>&#8358;</span>{props.room.rentperday}</p>
                            </div>
                        </div>
                        <div className="modal_text_lower">
                            <h4>Description</h4>
                            <p>{props.room.description}</p>
                        </div>
                        <div className="modal_btn_div">
                            <button className="btn">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
