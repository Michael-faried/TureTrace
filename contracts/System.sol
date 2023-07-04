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

    struct Report {
        // string imageLink;
        string Location;
        string description;
    }

    //Product public prod;

    mapping(string => User) users;
    mapping(address => Company) companies;
    address[] private companyAddresses;
    
    mapping(bytes32 => Product) private products;
    mapping(string => bytes32[]) private companyProducts;
    mapping(string => Report[]) private companyReports;





    function register_User(string memory _useraddress,string memory _name, string memory _email, string memory _password) public {
        users[_useraddress] = User(_name,_email,_password);
    }

    function register_Company(address _compaddress,string memory _name, string memory _email, string memory _password,uint256 _cert_num) public {
        companies[_compaddress] = Company(_name,_email,_password,_cert_num);
        companyAddresses.push(_compaddress);
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


    function upload_Products(Product[] memory _products) public returns (bytes32[] memory hashedArray) {
        bytes32[] memory productHashes = new bytes32[](_products.length);
        
        for (uint256 i = 0; i < _products.length; i++) {
            Product memory p = _products[i];
            
            // Encoding Using the Four Attributes (Image Link Not Included)
            bytes32 p_hashed = keccak256(abi.encode(p.id, p.name, p.model, p.description, p.companyName));
            products[p_hashed] = p;
            
            // Add the product ID to the array of product IDs for the respective company
            companyProducts[p.companyName].push(p_hashed);
            
            productHashes[i] = p_hashed;
        }
    
    return productHashes;
}
    
        // Get a Product by its Hash
    function get_product(bytes32 product_add) internal view returns (Product memory Prod) {
        return products[product_add];
    }

    function retrieve_company_products(string memory Company_name) public view returns (Product[] memory products_array) {
        bytes32[] memory products_hashes = companyProducts[Company_name];
        Product[] memory products_of_company = new Product[](products_hashes.length);
        for (uint256 index = 0; index < products_hashes.length; index++) {
            products_of_company[index] = get_product(products_hashes[index]);
        }

        return products_of_company;
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


    function send_report(string memory location, string memory  description,string memory companyname) public
    {
        Report memory report = Report(location,description);
        companyReports[companyname].push(report);
    }

    function get_companies_names() public view returns(string[] memory)
    {
        uint256 length = companyAddresses.length;
        string[] memory allCompanies = new string[](length);
    
        for (uint256 i = 0; i < length; i++) {
            allCompanies[i] = companies[companyAddresses[i]].name;
        }

        return allCompanies;
    }

    function get_function_report(string memory company_name) public  view returns(Report[] memory) {
        Report[] memory reports_of_company = companyReports[company_name];

        return reports_of_company;
    }

    function deleteReport(string memory companyname, uint index) public  {
        require(index < companyReports[companyname].length, "Invalid index");

        // Move the last element to the index being deleted
        companyReports[companyname][index] = companyReports[companyname][companyReports[companyname].length - 1];

        // Remove the last element
        companyReports[companyname].pop();
    }
    
    function delete_allReport(string memory companyname) public {
    
    // Remove the last element
    delete companyReports[companyname];
    }
    

    function deleteProductByModel(string memory companyname, string memory model) public {
        bytes32[] memory keysToDelete = new bytes32[](companyProducts[companyname].length);
        uint256 deleteCount = 0;

        // Identify the keys of the products to delete
        for (uint256 i = 0; i < companyProducts[companyname].length; i++) {
            bytes32 productKey = companyProducts[companyname][i];
            if (keccak256(abi.encodePacked(products[productKey].model)) == keccak256(abi.encodePacked(model))) {
                keysToDelete[deleteCount] = productKey;
                deleteCount++;
            }
        }

        // Delete the identified products from the mappings
        for (uint256 i = 0; i < deleteCount; i++) {
            delete products[keysToDelete[i]];

            // Delete the product hash from the companyProducts mapping
            uint256 index = findIndex(companyProducts[companyname], keysToDelete[i]);
            if (index < companyProducts[companyname].length - 1) {
                companyProducts[companyname][index] = companyProducts[companyname][companyProducts[companyname].length - 1];
            }
            companyProducts[companyname].pop();
        }
    }


    // Helper function to find the index of an element in an array
    function findIndex(bytes32[] memory array, bytes32 element) private pure returns (uint256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return i;
            }
        }
        return array.length;
    }

    //----------------modifers------------

    modifier onlyCompany() {
        require(bytes(companies[msg.sender].name).length != 0, "You are not a Company");
        _;
    }

    
}

