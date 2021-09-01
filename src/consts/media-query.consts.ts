import { Breakpoints, Media } from '../interfaces/breakpoints.interface';

const breakpoints: Breakpoints = {
  mobile: {
    s: 320,
    m: 375,
    l: 410,
  },
  tablet: 600,
  desktop: {
    s: 1024,
    m: 1320,
    l: 1600
  }
};

const mediaQueryFactory = (breakpoint: number | undefined): string => {
  return `(min-width: ${ breakpoint }px)`;
};

export const media: Media = {
  mobile: {
    s: mediaQueryFactory(breakpoints.mobile.s),
    m: mediaQueryFactory(breakpoints.mobile.m),
    l: mediaQueryFactory(breakpoints.mobile.l),
  },
  tablet: mediaQueryFactory(breakpoints.tablet),
  desktop: {
    s: mediaQueryFactory(breakpoints.desktop.s),
    m: mediaQueryFactory(breakpoints.desktop.m),
    l: mediaQueryFactory(breakpoints.desktop.l),
  },
};