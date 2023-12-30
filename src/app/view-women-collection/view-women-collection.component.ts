import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-women-collection',
  templateUrl: './view-women-collection.component.html',
  styleUrls: ['./view-women-collection.component.css']
})
export class ViewWomenCollectionComponent implements OnInit{

  womenproduct:any = {}
  constructor(private api:ApiService,private route:ActivatedRoute,private toaster:ToasterService){}
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      // get details of single product
      this.getAWomenProduct(id)
    })
  }

  getAWomenProduct(id:any){
    this.api.getAWomenProductApi(id).subscribe({
      next:(res:any)=>{
          this.womenproduct = res
          console.log(res);
          
      },
      error:(err:any)=>{
           console.log(err.errors)
      }
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
