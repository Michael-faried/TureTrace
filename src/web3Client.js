import Web3 from "web3";
import System from './SmartContracts/System.json';
// import Company_Con from './SmartContracts/Company_Con.json';
// import User_Con from './SmartContracts/User_Con.json';

let selectedAccount;
// let UserSmartcontract;
// let CompanySmartcontract;
let Smartcontract;
let is_initialized = false;




//connection
export const init = async ()=>{
  // connect to MetaMask
  let provider = window.ethereum; 

  if(typeof provider !== 'undefined')
  {
      provider.request({method:'eth_requestAccounts'}).then((accounts)=>
      {
          selectedAccount = accounts[0];
          console.log(selectedAccount);
      }).catch((err)=>{console.log(err);});

      //listen to Metamask account changes
      window.ethereum.on('accountsChanged',function(accounts){
      selectedAccount = accounts[0];
      console.log(selectedAccount);
  });
  }
 
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId(); // connect to network(Ganache)
//   UserSmartcontract = new web3.eth.Contract(User_Con.abi, User_Con.networks[networkId].address);
//   CompanySmartcontract = new web3.eth.Contract(Company_Con.abi, Company_Con.networks[networkId].address);
Smartcontract = new web3.eth.Contract(System.abi, System.networks[networkId].address);


  is_initialized = true;
};


export async function register(_name,_email,_password)
{
    if(!is_initialized)
    {
        await init();
    }
    Smartcontract.methods.register_User(selectedAccount,_name,_email,_password).send({from:selectedAccount});
}


export async function register_comp(_name,_email,_password){
    if(!is_initialized)
    {
        await init();
    }
    console.log("company registration called from web3");
    console.log(_name,_email,_password);
    var _cert_num =1;
    Smartcontract.methods.register_Company(selectedAccount,_name,_email,_password,_cert_num).send({from : selectedAccount});
}

export async function login(_name,_password){
    console.log("login called from web3");
   // console.log(_password);console.log(_name); 
  if(!is_initialized)
  {
      await init();
  }
return  Smartcontract.methods.login_user(selectedAccount,_name,_password).call();
}

export async function login_comp(_name,_password){
    if(!is_initialized)
    {
        await init();
    }
    console.log("company login called from web3")
    // console.log(_name,_password);
    localStorage.setItem("companyName",_name)
    console.log(Smartcontract.methods.login_company(selectedAccount,_name,_password).call());
    return Smartcontract.methods.login_company(selectedAccount,_name,_password).call();
}


export async function UploadProducts_send(_products){
    if(!is_initialized)
    {
        await init();
    }
    
    // console.log(_products);
    return Smartcontract.methods.upload_Products(_products).send({from:selectedAccount});
}

export async function UploadProducts_call(_products){
    if(!is_initialized)
    {
        await init();
    }
    
    // console.log(Smartcontract.methods.upload_Products(_products).call());
    return Smartcontract.methods.upload_Products(_products).call();
}

export async function get_product(product_add){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.get_product(product_add).call();
}

export async function verify(product_add){
    if(!is_initialized)
    {
        await init();
    }
    // //console.log(Smartcontract.methods.verify_product(product_add).call());
    // console.log("web3")
    // console.log(Smartcontract.methods.verify_product(product_add).call());
    return Smartcontract.methods.verify_product(product_add).call();
}

export async function send_report(location,description,companyname){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.send_report(location,description,companyname).send({from:selectedAccount});
}


export async function get_companies_names(){
    if(!is_initialized)
    {
        await init();
    }
    const allCompanies = await Smartcontract.methods.get_companies_names().call();
    return allCompanies;
}

// export async function retrieve_company_products(Company_name){
//     if(!is_initialized)
//     {
//         await init();
//     }
//     return Smartcontract.methods.retrieve_company_products(Company_name).send({from:selectedAccount});
// }

export async function retrieve_company_products(Company_name){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.retrieve_company_products(Company_name).call();
}

export async function get_function_report(Company_name){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.get_function_report(Company_name).call();
}

export async function deleteReport(Company_name,index){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.deleteReport(Company_name,index).send({from:selectedAccount});
}

export async function delete_allReport(Company_name){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.delete_allReport(Company_name).send({from:selectedAccount});
}

export async function deleteProductByModel(companyname,model){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.deleteProductByModel(companyname,model).send({from:selectedAccount});
}
