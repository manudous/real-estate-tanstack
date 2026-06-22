import type { Model, Media } from "@content-island/api-client";

export interface NavigationItem extends Model {
  label: string;
  url?: string;
}

export interface HeaderData extends Model {
  companyName: NavigationItem;
  home: NavigationItem;
  buy: NavigationItem;
  rent: NavigationItem;
  getInTouch: NavigationItem;
}

export interface FooterData extends Model {
  companyName: NavigationItem;
  motto: string;
  copyright: string;
  linkHome: NavigationItem;
  linkBuy: NavigationItem;
  linkRent: NavigationItem;
  linkContact: NavigationItem;
}

export interface HeroData extends Model {
  name: string;
  buy: NavigationItem;
  rent: NavigationItem;
  backgroundImage: Media;
}

export interface ExtraFeature extends Model {
  feature: string;
}

export interface PropertyData extends Model {
  title: string;
  slug: string;
  internalReference: string;
  shortDescription: string;
  longDescription: string;
  zone: string;
  propertyType: string;
  builtArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  hasGarden?: boolean;
  hasAircondition?: boolean;
  floor?: number;
  levels?: number;
  operationType: "Sale" | "Rent";
  price?: number;
  featured?: boolean;
  extraFeatures?: ExtraFeature[];
  mainImage?: Media;
  galleryImages?: Media[];
}
