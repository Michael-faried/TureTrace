import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { get_function_report, delete_allReport, deleteReport } from "../../web3Client";

const ReportedProducts = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const companyName2 = localStorage.getItem("companyName");
  const navigate = useNavigate();
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
    deleteReport(companyName2, index);
    const updatedProducts = [...reportedProducts];
    updatedProducts.splice(index, 1);
    setReportedProducts(updatedProducts);
    navigate('/reported-products');
  };

  const handleDeleteAll = () => {
    // Dummy functionality for delete all
    delete_allReport(companyName2);
    setReportedProducts([]);
    navigate('/reported-products');
  };

  return (
    <div style={{ padding: "20px" }}>
      <video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#FFFFFF" }}>{companyName2}</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#FFFFFF" }}>Reported Products</h1>
        {reportedProducts.length > 0 && (
          <button
            style={{
              backgroundColor: "white",
              color: "red",
              marginTop: "10px",
              marginBottom: "10px",
              padding: "12px 24px",
              borderColor: "white",
            }}
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        )}
      </div>

      {reportedProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#FFFFFF" }}>No reported products found.</p>
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
                flex: "1 0 800px",
                position: "relative",
                width: "300px",
              }}
            >
              <h3>Report #{index + 1}</h3>
              <div style={{ maxHeight: "100px", overflow: "auto" }}>
                <div style={{ wordWrap: "break-word" }}>
                  <p>
                    <strong>Report Location:</strong> {product.Location}
                  </p>
                </div>
                <div style={{ wordWrap: "break-word" }}>
                  <p>
                    <strong>Report Description:</strong> {product.description}
                  </p>
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "white",
                  color: "red",
                  marginTop: "10px",
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  padding: "8px 16px",
                  borderColor: "white",
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
