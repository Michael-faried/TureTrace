import React, { useState, useEffect } from "react";
import { get_function_report } from "../../web3Client";

const ReportedProducts = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const companyName2 = localStorage.getItem("companyName");

  useEffect(() => {
    fetchReportedProducts();
  }, []);

  const fetchReportedProducts = () => {
    get_function_report(companyName2)
      .then((res) => {
        setReportedProducts(res);
      })
      .catch((error) => {
        console.error("Error fetching reported products:", error);
      });
  };

  const handleDelete = (index) => {
    // Dummy functionality for delete
    const updatedProducts = [...reportedProducts];
    updatedProducts.splice(index, 1);
    setReportedProducts(updatedProducts);
  };

  return (
    <div style={{ padding: "20px" }}>
      <video src="/videos/video.mp4" autoPlay loop muted />
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#FFFFFF" }}>{companyName2}</h1>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#FFFFFF" }}>Reported Products</h1>
      {reportedProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No reported products found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {reportedProducts.map((product, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cccccc",
                borderRadius: "4px",
                padding: "10px",
                margin: "10px",
                flex: "1 0 300px",
                position: "relative",
              }}
            >
              <h3>Report #{index + 1}</h3>
              <p>
                <strong>Report Location:</strong> {product.Location}
              </p>
              <p>
                <strong>Report Description:</strong> {product.description}
              </p>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: "10px",
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  padding: "8px 16px", // Adjust padding to make the button slightly smaller
                  borderRadius: "3px", // Adjust borderRadius to make the button slightly smaller
                }}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedProducts;
