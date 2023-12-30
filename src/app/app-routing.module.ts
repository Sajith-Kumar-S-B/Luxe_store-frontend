import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsComponent } from './home-products/home-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { MenCollectionComponent } from './men-collection/men-collection.component';
import { WomenCollectionComponent } from './women-collection/women-collection.component';
import { ViewWomenCollectionComponent } from './view-women-collection/view-women-collection.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"",component:HomeProductsComponent
  },
 
  {
    path:"user/login",component:LoginComponent
  },
  {
    path:'user/register',component:RegisterComponent
  },
  {
    path:"view/men/:id",component:ViewProductComponent
  },
  {
    path:"view/women/:id",component:ViewWomenCollectionComponent
  },
  {
    path:'user/wishlist',canActivate:[authGuard],component:WishlistComponent
  },
  {
    path:'user/cart',canActivate:[authGuard],component:CartComponent
  },
  {
    path:'user/checkout',canActivate:[authGuard],component:CheckoutComponent
  },
  {
    path:'men/all-products',component:MenCollectionComponent
  },
  {
    path:'women/all-products',component:WomenCollectionComponent
  },
  {
    path:'**', redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
