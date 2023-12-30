import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-men-collection',
  templateUrl: './men-collection.component.html',
  styleUrls: ['./men-collection.component.css']
})
export class MenCollectionComponent implements OnInit{


  menCollection :any =[]
  searchString:string=""

  constructor(private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.api.getAllMenProductsApi().subscribe((res:any)=>{
       this.menCollection = res
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
