import React from "react";

const SeatMap = ({ chairBedData, selectedSeats, handleSeatClick }) => {
  return (
    <>
      {chairBedData && chairBedData.seat_map ? (
        chairBedData.seat_map.map((bed, index) => (
          <button
            className="chair-bed"
            key={index}
            style={{
              backgroundColor:
                bed.trangThai === "Đã đặt"
                  ? "rgb(213, 217, 221)"
                  : bed.trangThai === "Còn trống" ||
                      bed.trangThai === "Còn trống"
                    ? selectedSeats.includes(bed.maGhe)
                      ? "rgb(253, 237, 232)"
                      : "rgb(222, 243, 255)"
                    : "",
            }}
            onClick={() =>
              bed.trangThai !== "Đã đặt" && handleSeatClick(bed.maGhe)
            }
            disabled={bed.trangThai === "Đã đặt"}
          >
            {bed.maGhe}
          </button>
        ))
      ) : (
        <p>No properties</p>
      )}
    </>
  );
};

export default SeatMap;
