import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")

  constructor(private http:HttpClient){
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

// register
  registerApi(user:any){
    return  this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  // login

  loginApi(user:any){
    return  this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  
  // get home men products
  getHomeMenProductsApi(){
    
    return  this.http.get(`${this.SERVER_URL}/products/men`)
  }

  // get all men products
  getAllMenProductsApi(){
    return  this.http.get(`${this.SERVER_URL}/men/all-products`)

  }

// get a single men product
  getAMenProductApi(id:any){
    return  this.http.get(`${this.SERVER_URL}/view/men/${id}`)

  }

  // get a single women product
  getAWomenProductApi(id:any){
    return  this.http.get(`${this.SERVER_URL}/view/women/${id}`)

  }

  // get all women products
  getHomeWomenProductsApi(){
    return  this.http.get(`${this.SERVER_URL}/products/women`)
  }

   // get all women products
   getAllWomenProductsApi(){
    return  this.http.get(`${this.SERVER_URL}/women/all-products`)

  }

  appendTokenToHeader(){
    let headers = new HttpHeaders()

    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // add to wishlist

  AddToWishlistApi(product:any){
    return  this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenToHeader())

  }

  // get wishlist

  getWishlistApi(){
    return this.http.get(`${this.SERVER_URL}/wishlist/allproducts`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length) 
    })
  }

  // delete from wishlist

  removeFromWishlistApi(id:any){
   return this.http.delete(`${this.SERVER_URL}/wishlist/product/${id}`,this.appendTokenToHeader())
  }


  
  // add to cart

  addToCartApi(product:any){
    return  this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenToHeader())

  }

  // get cart

  getCartApi(){
    return this.http.get(`${this.SERVER_URL}/cart/allproducts`,this.appendTokenToHeader())
  }

  // get cart count

  getCartCount(){
    this.getCartApi().subscribe((res:any)=>{
      console.log(res);
      
      this.cartCount.next(res.length)
    })
  }
// increment cart

    incrementCartApi(id:any){
      return this.http.get(`${this.SERVER_URL}/cart/increment/${id}`,this.appendTokenToHeader())

    }
  // decrement cart

  
  decrementCartApi(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/decrement/${id}`,this.appendTokenToHeader())

  }


  // remove cart item

  removeCartItemApi(id:any){
    return this.http.delete(`${this.SERVER_URL}/cart/remove/${id}`,this.appendTokenToHeader())

  }

  // empty cart
  emptyCartApi(){
    return this.http.delete(`${this.SERVER_URL}/cart/empty/`,this.appendTokenToHeader())

  }



}
