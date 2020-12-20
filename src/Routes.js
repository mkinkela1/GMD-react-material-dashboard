import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Offer as OfferView,
  CreateOffer as CreateOfferView,
  GeneratePDF as GeneratePDFView,
  EditOffer as EditOfferView,
  Calendar as CalendarView,
  WorkOrders as WorkOrdersView,
  CreateWorkOrder as CreateWorkOrderView,
  GenerateWorkOrderPDF as GenerateWorkOrderPDFView
} from './views';
import RouteWithLayout from './components/RouteWithLayout';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        privateRoute
      />
      <RouteWithLayout
        component={OfferView}
        exact
        layout={MainLayout}
        path="/offer"
        privateRoute
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        privateRoute
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
        privateRoute
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
        privateRoute
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
        privateRoute
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
        privateRoute
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
        privateRoute
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
        privateRoute
      />
      <RouteWithLayout
        component={CreateOfferView}
        exact
        layout={MainLayout}
        path="/offer/create"
        privateRoute
      />
      <RouteWithLayout
        component={GeneratePDFView}
        exact
        layout={MainLayout}
        path="/offer/pdf"
        privateRoute
      />
      <RouteWithLayout
        component={EditOfferView}
        exact
        layout={MainLayout}
        path="/offer/edit/:id"
        privateRoute
      />
      <RouteWithLayout
        component={CalendarView}
        exact
        layout={MainLayout}
        path="/calendar"
        privateRoute
      />
      <RouteWithLayout
        component={WorkOrdersView}
        exact
        layout={MainLayout}
        path="/work-orders"
        privateRoute
      />
      <RouteWithLayout
        component={CreateWorkOrderView}
        exact
        layout={MainLayout}
        path="/work-orders/create"
        privateRoute
      />
      <RouteWithLayout
        component={CreateWorkOrderView}
        exact
        layout={MainLayout}
        path="/work-orders/edit/:id"
        privateRoute
      />
      <RouteWithLayout
        component={GenerateWorkOrderPDFView}
        exact
        layout={MainLayout}
        path="/work-orders/pdf"
        privateRoute
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
