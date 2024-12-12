var productNameInput = document.getElementById("productName") 
var productPriceInput = document.getElementById("productPrice") 
var productDescInput = document.getElementById("productDesc") 
var productCategoryInput = document.getElementById("productCategory") 
var productImageInput = document.getElementById("productImage")
var searchInput = document.getElementById('search')

var productList;
if(localStorage.getItem('products')==null){
    productList = [];
}else{
   productList= JSON.parse(localStorage.getItem('products'))
   display(productList)
}


function addProduct(){
    // console.log(productImageInput.files[0].name); image name
    
    var product = {
        code:productNameInput.value,
        price:productPriceInput.value,
        desc:productDescInput.value,
        category:productCategoryInput.value,
        img:`images/${productImageInput.files[0]?.name}`,
        

    }

    productList.push(product)

    localStorage.setItem('products',JSON.stringify(productList))
    display(productList)
    
    
    
}

function display(arr){
    var productContainer = ''
    for(var i =0; i< arr.length ; i++){
        productContainer += `     
        <div class="col-md-3">
       <div class="card mt-3">
            <img src="${arr[i].img}" alt="...">
            <div class="card-body">
                <h5 class="card-title">Product Name:${arr[i].code}</h5>
                <p class="card-text">Product Describtion:${arr[i].desc}</p>
                <p class="card-text">Product Category:${arr[i].category}</p>
                <p class="card-text">Product Price:${arr[i].price}</p>
                <button  class="btn btn-warning px-3">Update<i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteProduct(${i})" class="btn btn-danger px-3">Delete<i class="fa-solid fa-trash"></i></button>
            
            </div>
            </div>
        </div>
     

        `
    }
        document.getElementById('row').innerHTML = productContainer
}
function deleteProduct(deletedIndex){
    productList.splice(deletedIndex,1)
    
    localStorage.setItem("products",JSON.stringify(productList))
    display(productList)
}

function search(){
    var word = searchInput.value
    var searchedProdutcs = []
    for(var i =0; i< productList.length ; i++){
      if(productList[i].code.toLowerCase().includes(word.toLowerCase())){
            searchedProdutcs.push(productList[i])
            display(searchedProdutcs)
      }
      
    }
    if(searchedProdutcs== ""){
        document.getElementById('row').innerHTML = `
        <div class="alert alert-danger text-center fs-3" role="alert">
             Your Search Has No Match !
        </div>
`
      }
   
    
  
    
}

function validateInputs(element){
    var regex = {
        productName:/^[A-Z][a-z]{2,10}$/,
        productPrice:/^[1-9][0-9]{1,5}$/,
        productCategory:/^(tv|mobile|screen|labtop)$/i,
        productDesc:/^\w{3,}$/,
    }
    if(regex[element.id].test(element.value) == true){
        element.classList.add('is-valid')        
        element.classList.remove('is-invalid')        
    }else{
        element.classList.add('is-invalid')        
        element.classList.remove('is-valid')         
        
    }
}