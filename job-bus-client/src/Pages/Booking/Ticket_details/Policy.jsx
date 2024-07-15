import React from "react";

const Policy = () => {
  return (
    <div className="policy ">
      <div className="sectionContainerPolicy grid">
        <div className="singlePolicy grid">
          <div className="header">Chính sách hủy vé</div>
          <div className="contentPolicy grid">
            <ul>
              <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
              <li>
                Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so
                với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp
                dụng theo các quy định hiện hành.
              </li>
              <li>
                Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh
                toán, cần liên hệ với Trung tâm tổng đài 0329400938 hoặc quầy vé
                chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé,
                trên email hoặc tin nhắn để được hướng dẫn thêm.
              </li>
            </ul>
          </div>
        </div>

        <div className="singlePolicy grid">
          <div className="header">Yêu cầu khi lên xe</div>
          <div className="contentPolicy grid">
            <ul>
              <li>
                Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30
                phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60
                phút).
              </li>
              <li>
                Xuất trình thông tin vé được gửi qua SMS/Email hoặc liên hệ quầy
                vé để nhận thông tin vé trước khi lên xe.
              </li>
              <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
              <li>
                Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất
                kích thích trên xe.
              </li>
              <li>Không mang các vật dễ cháy nổ lên xe.</li>
              <li>Không vứt rác trên xe.</li>
              <li>Không mang động vật lên xe.</li>
            </ul>
          </div>
        </div>

        <div className="singlePolicy grid">
          <div className="header">Hành lý xách tay</div>
          <div className="contentPolicy grid">
            <ul>
              <li>Tổng trọng lượng hành lý không vượt quá 20kg</li>
              <li>Không vận chuyển hàng hoá cồng kềnh</li>
            </ul>
          </div>
        </div>

        <div className="singlePolicy grid">
          <div className="header">Trẻ em dưới 6 tuổi và phụ nữ có thai</div>
          <div className="contentPolicy grid">
            <ul>
              <li>
                Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg
                thì không phải mua vé.
              </li>
              <li>
                Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ
                mua 01 vé tương đương với người lớn.
              </li>
              <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
              <li>
                Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di
                chuyển.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
