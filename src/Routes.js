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
  CreateOffer as CreateOfferView
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
