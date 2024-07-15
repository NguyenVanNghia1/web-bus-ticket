import React from 'react'

import gridImage from '../../../public/images/Content.jpg'
import contentImage from '../../../public/images/Content-1.jpg'

const Content = () => {
  return (
    <div className="content container section">
        <div className="sectionContainer">
            <div className="tittlesDiv">
                <h1 className="text-green-700 font-bold ">VANI BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ</h1>
                <p>Được khách hàng lựa chọn và tin tưởng</p>
            </div>

            <div className="infoDiv grid">
                <div className="textDiv grid">
                    <div className="singleInfo">
                        <img src={contentImage} className='imgContent'/>
                        <h4>Hơn 10 triệu lượt khách</h4>
                        <p>VANI phục vụ hơn 10 triệu lượt khách bình quân 1 năm trên toàn quốc</p>
                    </div>

                    <div className="singleInfo">
                        <h4>Hơn 150 phòng vé</h4>
                        <p>VANI có hơn 150 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống</p>
                    </div>
                    <div className="singleInfo">
                        <h4>Hơn 700 chuyến xe</h4>
                        <p>VANI phục vụ hơn 700 chuyến xe đường dài và liên tỉnh mỗi ngày</p>
                    </div>

                </div>

                <div className="imgDiv">
                    <img src={gridImage} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Content