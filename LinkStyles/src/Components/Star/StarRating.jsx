import React, { useCallback, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import My CSS Module Styles
import styles from "./StarRating.module.css"; 

const StarRating = ({ noOFStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(() => {
    try {
      const storedData = localStorage.getItem("review");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      return [];
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !comment.trim()) {
       toast.error("Please enter your name and comment.");
      return;
    }
    if (rating === 0) {
      toast.warn("Please select a rating before submitting.");
      return;
    }

    const newReview = { username, comment, rating };
    const updatedReview = [...addComment, newReview];

    setAddComment(updatedReview);
    localStorage.setItem("review", JSON.stringify(updatedReview));

    setUsername("");
    setComment("");
    setRating(0);
    setHover(0);
  }

  const handleStarClick = useCallback((index) => setRating(index), []);
  const handleMouseHover = useCallback((index) => setHover(index), []);
  const handleMouseLeave = useCallback(() => setHover(rating), [rating]);

  return (
    <div className={styles.starRating}>
      <h3>Please Rate Our Product</h3>
          <ToastContainer/>
      <div className={styles.stars}>
        {Array.from({ length: noOFStars }, (_, index) => {
          index += 1;
          return (
            <FaStar
              className={index <= (hover || rating) ? styles.active : styles.inactive}
              key={index}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleMouseHover(index)}
              onMouseLeave={handleMouseLeave}
              size={25}
            />
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>User Reviews:</h3>
      {addComment.length > 0 ? (
        <div className={styles.reviewList}>
          {addComment.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <strong>{review.username}</strong> ({review.rating} stars):{" "}
              {review.comment}
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default StarRating;



// Check the Comment Below

      // If Review is present Second Approach and make Sure to Set 
      // an array of object in addComment State Value
      
      // then Use Second Approach
      
      // useEffect(()=> {
      //     const storedData = localStorage.getItem("review")
      //     if(storedData){
      //         const savedReview = JSON.parse(storedData) || []
      //         Array.isArray(savedReview) ? setAddComment(savedReview) : []
      //     }
          
      
      
      // }, [])


      // First Approach
//   useEffect(() => {
//     try {
//       const storedData = localStorage.getItem("review");
  
//       if (!storedData) {
//         console.warn("No data found in localStorage. Initializing...");
//         // localStorage.setItem("review", JSON.stringify([]));
//         setAddComment([]);
//         return;
//       }
  
//       const savedReview = JSON.parse(storedData);
//       setAddComment(Array.isArray(savedReview) ? savedReview : []);

//     } catch (error) {
//       console.error("Error parsing reviews from localStorage:", error);
//       setAddComment([]);
//     }
//   }, []);