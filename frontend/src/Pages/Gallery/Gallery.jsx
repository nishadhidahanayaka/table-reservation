import "./gallery.css";

const Gallery = () => {
  const images = [
    "/gallery/g1.jpg",
    "/gallery/g2.jpg",
    "/gallery/g3.jpg",
    "/gallery/g4.png",
    "/gallery/g5.png",
    "/gallery/g6.png",
  ];

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Our Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
