import React, { useState, useEffect } from "react";
import { getReportedProducts } from "../../web3Client";

const ReportedProducts = () => {
//   const [reportedProducts, setReportedProducts] = useState([]);
// const reportedProducts = [
//     {
//       id: 1,
//       productName: "Product 1",
//       company: "Company A",
//       location: "Location A",
//       description: "Description A",
//     },
//     {
//       id: 2,
//       productName: "Product 2",
//       company: "Company B",
//       location: "Location B",
//       description: "Description B",
//     },
//     {
//       id: 3,
//       productName: "Product 3",
//       company: "Company C",
//       location: "Location C",
//       description: "Description C",
//     },
//   ];

  const companyName2=localStorage.getItem("companyName")
  
  useEffect(() => {
    fetchReportedProducts();
  }, []);

  const fetchReportedProducts = (companyName2) => {
    getReportedProducts()
      .then((res) => {
        setReportedProducts(res);
      })
      .catch((error) => {
        console.error("Error fetching reported products:", error);
      });
  };


  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
    {companyName2}
      </h1>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Reported Products
      </h1>
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
              }}
            >
              <h3>Product #{index + 1}</h3>
              <p>
                <strong>Product Location:</strong> {product.location}
              </p>
              <p>
                <strong>Product Description:</strong> {product.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedProducts;
