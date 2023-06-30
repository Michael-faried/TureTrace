import Web3 from "web3";
import Company_Con from './SmartContracts/Company_Con.json';
import User_Con from './SmartContracts/User_Con.json';


let selectedAccount;
let UserSmartcontract;
let CompanySmartcontract;

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

  const networkId = await web3.eth.net.getId();//connect to network(Ganache)
  UserSmartcontract = new web3.eth.Contract(User_Con.abi,User_Con.networks[networkId].address);
  CompanySmartcontract = new web3.eth.Contract(Company_Con.abi,Company_Con.networks[networkId].address);

  is_initialized = true;
};


export async function register(_name,_email,_password)
{
    if(!is_initialized)
    {
        await init();
    }
    UserSmartcontract.methods.register_User(selectedAccount,_name,_email,_password).send({from:selectedAccount});
}


export async function register_comp(_name,_email,_password,_cert_num){
    if(!is_initialized)
    {
        await init();
    }
    console.log("company registration called from web3");
    console.log(_name,_email,_password,_cert_num);
    CompanySmartcontract.methods.register_Company(selectedAccount,_name,_email,_password,_cert_num).send({from : selectedAccount});
}

export async function login(_name,_password){
    console.log("login called from web3");
   // console.log(_password);console.log(_name); 
  if(!is_initialized)
  {
      await init();
  }
return  UserSmartcontract.methods.login_user(selectedAccount,_name,_password).call();
}

export async function login_comp(_name,_password){
    if(!is_initialized)
    {
        await init();
    }
    console.log("company login called from web3")
    console.log(_name,_password);
    // console.log(CompanySmartcontract.methods.login_company(selectedAccount,_name,_password).call());
    return CompanySmartcontract.methods.login_company(selectedAccount,_name,_password).call();
}


export async function UploadProducts(_id,_name,_model,_description,_companyName,_imageLink){
    if(!is_initialized)
    {
        await init();
    }
    // console.log(_id,_name,_model,_description,_companyName,_imageLink);
    return CompanySmartcontract.methods.upload_Product(_id,_name,_model,_description,_companyName,_imageLink).send({from : selectedAccount});
}

export async function get_product(product_add){
    if(!is_initialized)
    {
        await init();
    }
    // console.log(_id,_name,_model,_description,_companyName,_imageLink);
    return CompanySmartcontract.methods.get_product(product_add).send({from : selectedAccount});
}

export async function verify(product_add){
    if(!is_initialized)
    {
        await init();
    }
    console.log(UserSmartcontract.methods.verify_product(product_add).call());
    //console.log(smartcontract.methods.verify_product("0xb0db4f775c91d016921367c0649ad6d581d2d8bda8b27048f05f6d1c21b2dc4d").call());
    return UserSmartcontract.methods.verify_product(product_add).call();
}

