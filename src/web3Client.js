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
    console.log(_name,_password);
    // console.log(CompanySmartcontract.methods.login_company(selectedAccount,_name,_password).call());
    return Smartcontract.methods.login_company(selectedAccount,_name,_password).call();
}


export async function UploadProducts_send(_id,_name,_model,_description,_companyName,_imageLink){
    if(!is_initialized)
    {
        await init();
    }
    
    console.log(_id,_name,_model,_description,_companyName,_imageLink);
    return Smartcontract.methods.upload_Product(_id,_name,_model,_description,_companyName,_imageLink).send({from:selectedAccount});
}

export async function UploadProducts_call(_id,_name,_model,_description,_companyName,_imageLink){
    if(!is_initialized)
    {
        await init();
    }
    
    console.log(Smartcontract.methods.upload_Product(_id,_name,_model,_description,_companyName,_imageLink).call());
    return Smartcontract.methods.upload_Product(_id,_name,_model,_description,_companyName,_imageLink).call();
}

export async function get_product(product_add){
    if(!is_initialized)
    {
        await init();
    }
    return Smartcontract.methods.get_product(product_add).call({from : selectedAccount});
}

export async function verify(product_add){
    if(!is_initialized)
    {
        await init();
    }
    //console.log(Smartcontract.methods.verify_product(product_add).call());
    return Smartcontract.methods.verify_product(product_add).call();
}

