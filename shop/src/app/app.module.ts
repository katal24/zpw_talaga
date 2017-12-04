import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadModule } from "angular2-image-upload";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ClarityModule } from "clarity-angular";
import { RouterModule } from '@angular/router';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { BasketService } from './services/basket.service';
import { OrdersService } from './services/orders.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { MatchesCategoryPipe } from './dashboard/dashboard.component';
import { MatchesPricePipe } from './dashboard/dashboard.component';
import { MatchesNamePipe } from './dashboard/dashboard.component';
import { MatchesFinishedPipe } from './manage-orders/manage-orders.component';
import { KeysPipe } from './basket/basket.component';
import { BasketComponent } from './basket/basket.component';
import { routes } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './history/history.component';
import { PromotionComponent } from './promotion/promotion.component'

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductComponent,
    MatchesCategoryPipe,
    MatchesPricePipe,
    MatchesNamePipe,
    MatchesFinishedPipe,
    KeysPipe,
    BasketComponent,
    DashboardComponent,
    OrderComponent,
    AuthenticationComponent,
    AdminPanelComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    ManageProductComponent,
    RegisterComponent,
    HistoryComponent,
    PromotionComponent

  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    NgxPaginationModule,    
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    ProductService, 
    BasketService, 
    OrdersService, 
    UserService, 
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
