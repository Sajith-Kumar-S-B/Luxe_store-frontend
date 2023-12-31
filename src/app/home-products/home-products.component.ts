import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit{
     bannerImage:string = "./assets/Images/D-1.0-UHP-22122023-URGENCYSTRIPS-LastFewHrs.gif"
     bannerTwo:string = "./assets/Images/D-1.0-UHP-07122023-FORHER-header.webp"
     bannerThree:string = "./assets/Images/D-1.0-UHP-07122023-FORHIM-header.webp"
    bannerFour:string = "./assets/Images/58afd928-34c3-43bd-b58e-60b2adab6d3e.webp"
     menProducts:any = []
     womenProducts:any = []
     searchString:string=""

     constructor(private api:ApiService,private toaster:ToasterService){}

   ngOnInit(): void {
     this.api.getHomeMenProductsApi().subscribe((res:any)=>{
      this.menProducts = res
    })
    this.api.getHomeWomenProductsApi().subscribe((res:any)=>{
      this.womenProducts = res
    })

    this.api.searchKey.subscribe((data:any)=>{
      this.searchString = data
    })

   }
   getWishlist(){
    this.api.getWishlistApi().subscribe((res:any)=>{
      // this.wishlistProducts = res
      this.api.getWishlistCount()
    })
  }


   addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.AddToWishlistApi(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} added to your wishlist`)
          // this.api.getWishlistCount()
         this.getWishlist()
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
  
        }
      })
  
    }else{
      this.toaster.showWarning('Please Login')
    }
      }


      addToCart(product:any){
        if(sessionStorage.getItem("token")){
          Object.assign(product,{quantity:1})
          this.api.addToCartApi(product).subscribe({
            next:(res:any)=>{
              this.toaster.showSuccess(res)
             this.api.getCartCount()
  
            },
            error:(err:any)=>{
              console.log(err);
              this.toaster.showError(err)
              
            }
          })
        }else{
          this.toaster.showWarning('please Login')
        }
      }
}
