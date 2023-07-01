// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.17<0.9.0;

contract System {

    // Company Information (Certificate Number for Identity Management)
    struct Company {
        string name;
        string email;
        string password;
        uint256 certificate_num;
    }

        struct User {
        string name;
        string email;
        string password;
    }
    // Product Information (Image Link not the Actual Image Bytes)
    // Company Name for Filteration
    struct Product {
        uint id;
        string name;
        string model;
        string description;
        string companyName;
        string imageLink;
    }

    //Product public prod;

    mapping(string => User) users;
    mapping(address => Company) companies;
    mapping(bytes32 => Product) public products;
    mapping(string => uint[]) private companyProducts;




    function register_User(string memory _useraddress,string memory _name, string memory _email, string memory _password) public {
        users[_useraddress] = User(_name,_email,_password);
    }

    function register_Company(address _compaddress,string memory _name, string memory _email, string memory _password,uint256 _cert_num) public {
        companies[_compaddress] = Company(_name,_email,_password,_cert_num);
    }

    function upload_Product(uint _id, string memory _name, string memory _model, string memory _description, string memory _companyName, string memory _imageLink) public returns (bytes32 hashed) {
        Product memory p = Product(_id, _name, _model, _description, _companyName, _imageLink);
        // Encoding Using the Four Attributes (Image Link Not Included)
        bytes32 p_hashed = keccak256(abi.encode(p.id, p.name, p.model, p.description, p.companyName));
        products[p_hashed] = p;

        // Add the product ID to the array of product IDs for the respective company
        companyProducts[_companyName].push(_id);
        return p_hashed;
    }

    function login_user (string memory user_add , string memory _name , string memory _password) public view returns (bool found)
    {
            User memory user = users[user_add];
            
            // str compare keccak256(bytes(a)) == keccak256(bytes(b));
            if(keccak256(bytes(user.name)) == keccak256(bytes(_name)) && keccak256(bytes(user.password)) == keccak256(bytes(_password)))
                return true;
            else
                return false;
    }

    function login_company(address company_add, string memory _name, string memory _password) public view returns (bool found) {
        Company memory company = companies[company_add];
        // Compare company name and password using keccak256
        if (keccak256(bytes(company.name)) == keccak256(bytes(_name)) && keccak256(bytes(company.password)) == keccak256(bytes(_password)))
            return true;
        else
            return false;
    }

    // Verify a product and return its attributes or null values if not found
    function verify_product(bytes32 product_add) external view returns (uint, string memory, string memory, string memory, string memory, string memory) {
        // Get the product using the Company_Con contract's get_product function
        System.Product memory product = products[product_add];

        // Check if the product exists
        if (product.id == 0) {
            // Return null values if the product does not exist
            return (0, "", "", "", "", "");
        }
        else {
            // Return the product attributes if the product exists
            return (product.id, product.name, product.model, product.description, product.companyName, product.imageLink);
        }
    }


    
}




// // Company Smart Contract
// contract Company_Con {
//     // Company Information (Certificate Number for Identity Management)
//     struct Company {
//         string name;
//         string email;
//         string password;
//         uint256 certificate_num;
//     }
//     // Product Information (Image Link not the Actual Image Bytes)
//     // Company Name for Filteration
//     struct Product {
//         uint id;
//         string name;
//         string model;
//         string description;
//         string companyName;
//         string imageLink;
//     }
//     // Reprot Information (Company Name for Filteration)
//     struct Report {
//         uint id;
//         string message;
//         string companyName;
//     }

//     // Map MetaMask Account with the Company Object
//     mapping(address => Company) companies;
//     // Map Product Hash with the Product Object
//     mapping(bytes32 => Product) public products;
//     // Map the Report Id with the Report Object
//     mapping(uint => Report) public reports;
//     // Map Company Name to an array of Product IDs
//     mapping(string => uint[]) private companyProducts;
//     // Map MetaMask Address to the User Obeject
//     mapping(address => User) users;

//     // Register a Company Using It's Address
//     function register_Company(address _compaddress, string memory _name, string memory _email, string memory _password, uint256 _cert_num) public {
//         companies[_compaddress] = Company(_name, _email, _password, _cert_num);
//     }

//     // Login a company Using It's Address
//     function login_company(address company_add, string memory _name, string memory _password) public view returns (bool found) {
//         Company memory company = companies[company_add];
//         // Compare company name and password using keccak256
//         if (keccak256(bytes(company.name)) == keccak256(bytes(_name)) && keccak256(bytes(company.password)) == keccak256(bytes(_password)))
//             return true;
//         else
//             return false;
//     }

//     // Upload a Product & Calculate It's Hash
//     function upload_Product(uint _id, string memory _name, string memory _model, string memory _description, string memory _companyName, string memory _imageLink) public returns (bytes32 hashed) {
//         Product memory p = Product(_id, _name, _model, _description, _companyName, _imageLink);
//         // Encoding Using the Four Attributes (Image Link Not Included)
//         bytes32 p_hashed = keccak256(abi.encode(p.id, p.name, p.model, p.description, p.companyName));
//         products[p_hashed] = p;

//         // Add the product ID to the array of product IDs for the respective company
//         companyProducts[_companyName].push(_id);
//         return p_hashed;
//     }

//     // Get a Product by its Hash
//     function get_product(bytes32 product_add) external view returns (Product memory Prod) {
//         return products[product_add];
//     }

//     // Get Products by Company Name
//     function get_products_by_company(string memory company_name) public view returns (Product[] memory) {
//         uint[] memory productIds = companyProducts[company_name];
//         Product[] memory result = new Product[](productIds.length);

//         for (uint i = 0; i < productIds.length; i++) {
//             bytes32 productKey = keccak256(abi.encode(productIds[i]));
//             result[i] = products[productKey];
//         }
//         return result;
//     }

//     // Receive a Report & Store it in the Mapping
//     function receive_report(uint _id, string memory _message, string memory _companyName) public {
//         Report memory r = Report(_id, _message, _companyName);
//         reports[r.id] = r;
//     }

//     // Get a Report by its ID (Need Modifications)
//     function get_report(uint report_id) external view returns (Report memory rep) {
//         return reports[report_id];
//     }

//     // User Information for Logging In
//     struct User {
//         string name;
//         string email;
//         string password;
//     }

//     // Register a User Using It's Address
//     function register_User(address _useraddress, string memory _name, string memory _email, string memory _password) public {
//         users[_useraddress] = User(_name, _email, _password);
//     }

//     // Login a User Using It's Address
//     function login_user(address user_add, string memory _name, string memory _password) public view returns (bool found) {
//         User memory user = users[user_add];
//         // Compare user name and password using keccak256
//         if (keccak256(bytes(user.name)) == keccak256(bytes(_name)) && keccak256(bytes(user.password)) == keccak256(bytes(_password)))
//             return true;
//         else
//             return false;
//     }

//     // Verify a product and return its attributes or null values if not found
//     function verify_product(bytes32 product_add) external view returns (uint, string memory, string memory, string memory, string memory, string memory) {
//         // Get the product using the Company_Con contract's get_product function
//         Company_Con.Product memory product = products[product_add];

//         // Check if the product exists
//         if (product.id == 0) {
//             // Return null values if the product does not exist
//             return (0, "", "", "", "", "");
//         }
//         else {
//             // Return the product attributes if the product exists
//             return (product.id, product.name, product.model, product.description, product.companyName, product.imageLink);
//         }
//     }
// }