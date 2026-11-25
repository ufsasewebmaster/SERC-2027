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
];
