import type { Context, Config } from "@netlify/edge-functions";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const cookieLang = context.cookies.get("language");
  
  if (cookieLang) {
    return context.next();
  }
  
  const country = context.geo?.country?.code;
  const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'];
  
  if (country && spanishCountries.includes(country)) {
    context.cookies.set({
      name: "language",
      value: "es",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "Lax"
    });
  } else {
    context.cookies.set({
      name: "language",
      value: "en",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "Lax"
    });
  }
  
  return context.next();
};

export const config: Config = {
  path: "/*"
};
