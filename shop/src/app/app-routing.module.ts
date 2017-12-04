import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component'
import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { OrderComponent } from './order/order.component'
import { AuthenticationComponent } from './authentication/authentication.component'
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './services/auth-guard.service';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { HistoryComponent } from './history/history.component'
import { PromotionComponent } from './promotion/promotion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }  ,
  { path: 'basket', component: BasketComponent },
  { path: 'order', component: OrderComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },  
  { path: 'history', component: HistoryComponent },    
  { 
    path: 'admin-panel', 
    component: AdminPanelComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'products', component: ManageProductsComponent},
      { path: 'promotion', component: PromotionComponent },      
      { path: 'product/:id', component: ManageProductComponent }
    ]
  }
];

@NgModule({
  exports: [ RouterModule ]
})

export class AppRoutingModule { 
}
