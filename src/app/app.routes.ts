import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductdetailComponent } from './component/productdetail/productdetail.component';
import { AuthComponent } from './component/auth/auth.component';
import { CategoriesComponent } from './component/categories/categories.component';

export const routes: Routes = [
    { 'path': '', redirectTo: '/home', pathMatch: 'full' },
    {'path': 'home', component: HomeComponent },
    {'path':'product/:id',component:ProductdetailComponent},
    {'path':'auth',component:AuthComponent},
    {'path':'categories',component:CategoriesComponent},
    {'path':'checkout',component:CheckoutComponent}
];