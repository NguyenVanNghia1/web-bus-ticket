import React from "react";

const Transshipment = () => {
  return (
    <div className="transshipment grid">
      <div className="header">
        <h2>Đón/ trả tận nơi:</h2>
      </div>
      <div className="content grid">
        <p>
          - Thời gian nhận khách : <i>Trước 4 tiếng.</i>
        </p>
        <p>
          - Thời gian xe đón :{" "}
          <i>
            Chuẩn bị trước 2 -3 tiếng, do mật độ giao thông trong thành phố và
            sẽ kết hợp đón nhiều điểm khác nhau nên thời gian đón cụ thể tài xế
            sẽ liên hệ hẹn giờ.
          </i>
        </p>
        <p>
          - Hẻm nhỏ xe không quay đầu được :{" "}
          <i>Xe trung chuyển sẽ đón Khách đầu hẻm/ đầu đường.</i>
        </p>
        <p>
          - Khu vực có biển cấm dừng đỗ xe không đón được :{" "}
          <i> Xe trung chuyển sẽ đón tại vị trí gần nhất có thể.</i>{" "}
        </p>
        <p>
          - Hành lý :{" "}
          <i>
            Hành lý nhỏ gọn dưới 20 kg, không vận chuyển kèm động vật , thú
            cưng.
          </i>
        </p>
      </div>
    </div>
  );
};

export default Transshipment;
