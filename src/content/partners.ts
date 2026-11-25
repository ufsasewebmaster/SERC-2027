export type Partner = {
  name: string;
  logo: string;
  href?: string;
  logoFit?: "contain" | "cover";
};

export const partners: Partner[] = [
  {
    name: "NASA",
    logo: "/images/partners/nasa.webp",
    href: "https://www.nasa.gov/",
  },
  {
    name: "Mortenson",
    logo: "/images/partners/mortenson.png",
    href: "https://www.mortenson.com/",
  },
  {
    name: "Sandia National Laboratories",
    logo: "/images/partners/sandia.png",
    href: "https://www.sandia.gov/",
  },
  {
    name: "Mayo Clinic",
    logo: "/images/partners/mayo-clinic.png",
    href: "https://www.mayoclinic.org/",
  },
  {
    name: "PepsiCo",
    logo: "/images/partners/pepsico.png",
    href: "https://www.pepsico.com/",
    logoFit: "cover",
  },
  {
    name: "Michelin",
    logo: "/images/partners/michelin.webp",
    href: "https://www.michelin.com/",
  },
  {
    name: "Mitsubishi Motors",
    logo: "/images/partners/mitsubishi-motors.webp",
    href: "https://www.mitsubishicars.com/",
  },
  {
    name: "ExxonMobil",
    logo: "/images/partners/exxonmobil.webp",
    href: "https://corporate.exxonmobil.com/",
  },
];
