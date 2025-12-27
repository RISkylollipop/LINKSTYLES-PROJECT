import { FaStar } from "react-icons/fa";

export default function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          color={i < Math.round(rating) ? "gold" : "#ccc"}
          size={15}
        />
      ))}
      <span style={{ marginLeft: "4px", fontSize: "10px" }}>({rating} Verified Rating)</span>
    </div>
  );
}